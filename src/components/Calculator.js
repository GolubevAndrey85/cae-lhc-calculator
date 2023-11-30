import React, { useEffect, useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import ExampleSet from "./DatePickerSet";
import Moment from 'moment';
import BasicTable2 from "./Table2";

const Calculator = (props) => {

    const defaultDOB = new Date('1970-07-01');
    const defaultAppDate = new Date('2023-07-01');
    const defaultStartDate = '2005-01-01';
    const defaultEndDate = '2010-01-01';
    const get30BirthDate = (dob) => {
        let dob30 = new Date(dob);
        dob30.setFullYear(dob.getFullYear() + 30);
        return dob30;
    }

    const [limit, setLimit] = useState(1);
    const [dob, setDob] = useState(defaultDOB);
    const [appDate, setAppDate] = useState(defaultAppDate);
    const [prevCoverDates, setPrevCoverDates] = useState(new Map().set(0, [new Date(defaultStartDate), new Date(defaultEndDate)]));
    const [cae, setCae] = useState(30);
    const [years30Dob, setYears30Dob] = useState(get30BirthDate(defaultDOB));
    const [caeHistory, setCaeHistory] = useState([]);


    const handleAddRemoveCoverDates = (value) => {
        if (limit === 0) return;
        setLimit(limit + value);
        if (value < 0) {
            const newCoverDates = new Map(prevCoverDates);
            newCoverDates.delete(limit - 1);
            setPrevCoverDates(newCoverDates);
        }
    };


    const calculateDiffInYears = (start, end) => {
        let diff = end.getFullYear() - start.getFullYear();
        let m = end.getMonth() - start.getMonth();
        if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
            diff--;
        }
        return diff;
    }


    const handleDOB = (date, i) => {
        setYears30Dob(get30BirthDate(date));
        setDob(date);
    }


    const handleAppDate = (date, i) => {
        setAppDate(date);
    }


    const handleCoverStartDate = (date, i) => {
        let temp = prevCoverDates;
        // setPrevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [new Date(date), temp.get(i)[1]]);
        } else {
            temp.set(i, [new Date(date), null]);
        }
        setPrevCoverDates(new Map(temp));
    }


    const handleCoverEndDate = (date, i) => {
        let temp = prevCoverDates;
        // setPrevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [temp.get(i)[0], new Date(date)]);
        } else {
            temp.set(i, [null, new Date(date)]);
        }
        setPrevCoverDates(new Map(temp));
    }


    const getNextFinYearStartDate = (date) => {
        const nextDate = new Date(date);
        if (nextDate.getMonth() >= 6) {
            nextDate.setMonth(6);
            nextDate.setDate(1);
            nextDate.setFullYear(nextDate.getFullYear() + 1);
        } else {
            nextDate.setMonth(6);
            nextDate.setDate(1);
            nextDate.setFullYear(nextDate.getFullYear());
        }
        return nextDate;
    }


    const getPrevFinYearStartDate = (date) => {
        const nextDate = new Date(date);
        if (nextDate.getMonth() >= 6) {
            nextDate.setMonth(6);
            nextDate.setDate(1);
            nextDate.setFullYear(nextDate.getFullYear());
        } else {
            nextDate.setMonth(6);
            nextDate.setDate(1);
            nextDate.setFullYear(nextDate.getFullYear() - 1);
        }
        return nextDate;
    }


    useEffect(() => {
        setCaeHistory([]);
        let cae = 30;
        let id = 0;
        var last10YearsDate = null;
        let isCovered = false;
        var incrementCAE = true;
        var nextFinYear = getNextFinYearStartDate(years30Dob);
        var caeHistory = [
            { id: ++id, cae: cae, date: Moment(dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2 },
            { id: ++id, cae: cae, date: Moment(years30Dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2 }
        ];

        if (years30Dob.getDate() === 1 && years30Dob.getMonth() === 6) {
            caeHistory.push({ id: ++id, cae: cae++, date: Moment(new Date(nextFinYear)).format('DD MMM YYYY'), lhc: (cae - 30) * 2 });
        }

        console.log(`prev cover hist size ${prevCoverDates.size}`);
        for (let i = 0; i < 50; i++) {
            nextFinYear = getNextFinYearStartDate(nextFinYear);
            const coverDatesFind = Array.from(prevCoverDates).filter(v => v[1][0] && v[1][1] && v[1][0] < nextFinYear && nextFinYear < v[1][1]);
            let coverDatesFinal = [];
            if (coverDatesFind.length > 1) {
                const starts = [];
                const ends = [];
                coverDatesFind.forEach(d => {
                    starts.push(d[1][0]);
                    ends.push(d[1][1]);
                });
                starts.sort();
                ends.sort();
                coverDatesFinal = [starts[0], ends[ends.length - 1]];
            } else {
                coverDatesFinal = coverDatesFind && coverDatesFind[0] && coverDatesFind[0][1];
            }
            coverDatesFinal?.forEach(d => console.log(`coverDatesFinal[0]: ${Moment(new Date(coverDatesFinal[0])).format('DD MMM YYYY')}, coverDatesFinal[1]: ${Moment(new Date(coverDatesFinal[1])).format('DD MMM YYYY')}`));
            if (coverDatesFinal) {
                const coverDates = coverDatesFinal;
                isCovered = isCovered || (coverDates[0] && coverDates[1] && coverDates[0] < nextFinYear && nextFinYear < coverDates[1]);
                if (isCovered && calculateDiffInYears(coverDates[0], coverDates[1]) >= 10) {
                    cae = 30;
                    last10YearsDate = coverDates[1];
                    incrementCAE = false;
                }
            }
            if (last10YearsDate && calculateDiffInYears(last10YearsDate, nextFinYear) >= 3) {
                cae = 30;
                last10YearsDate = null;
                incrementCAE = true;
            }
            if (!isCovered && incrementCAE) {
                cae++;
            }
            isCovered = false;
            caeHistory.push({ id: ++id, cae: cae, date: Moment(nextFinYear).format('DD MMM YYYY'), lhc: (cae - 30) * 2 });
        }
        //  caeHistory.forEach(h => console.log(`id: ${h.id}, cae: ${h.cae}, lhc: ${h.lhc}, date: ${Moment(h.date).format('DD MMM YYYY')}\n`));
        setCaeHistory(caeHistory);
        const prevFinYear = getPrevFinYearStartDate(appDate);
        const dataAtAppDate = Array.from(caeHistory).find(v => v.date === Moment(prevFinYear).format('DD MMM YYYY'));
        console.log(`---------> CAE app date: ${dataAtAppDate.cae}`);
        setCae(dataAtAppDate?.cae);
    }, [prevCoverDates, dob, appDate, years30Dob]);


    const renderPickers = (limit) => {
        const prevCoverDetails = [];
        for (let i = 0; i < limit; i++) {
            prevCoverDetails.push(
                <div key={i}>
                    <ExampleSet limit={limit} i={i} setFirstDate={handleCoverStartDate} setSecondDate={handleCoverEndDate} startDate={new Date(defaultStartDate)} endDate={new Date(defaultEndDate)} />
                </div>
            );
        }
        // setPrevCoverDates(prevCoverDetails);
        return prevCoverDetails;
    }


    return (
        <div className="calculator">
            <Display value={cae} dob30={years30Dob} />
            <ExampleSet limit={1} setFirstDate={handleDOB} setSecondDate={handleAppDate} startDate={dob} endDate={appDate} />
            <Keypad onClick={handleAddRemoveCoverDates} />
            <div>{renderPickers(limit)}</div>
            <div style={{ width: '30%' }}><BasicTable2 data={caeHistory} /></div>
        </div>
    );
}

export default Calculator;