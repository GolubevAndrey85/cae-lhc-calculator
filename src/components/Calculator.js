import React, { useEffect, useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import ExampleSet from "./DatePickerSet";
import Moment from 'moment';
import BasicTable2 from "./Table2";

const Calculator = (props) => {

    const defaultDOB = new Date('1970-08-01');
    const defaultAppDate = new Date('2023-09-01');
    const defaultStartDate = '2005-01-01';
    const defaultEndDate = '2010-01-01';
    const daysOfAbsence = 1094;
    const get30BirthDate = (dob) => {
        let dob30 = new Date(dob);
        dob30.setFullYear(dob.getFullYear() + 30);
        return dob30;
    }

    const [limit, setLimit] = useState(1);
    const [dob, setDob] = useState(defaultDOB);
    const [appDate, setAppDate] = useState(defaultAppDate);
    const [prevCoverDates, setPrevCoverDates] = useState(new Map().set(0, [new Date(defaultStartDate), new Date(defaultEndDate)]));
    // const [prevCoverDates2, setPrevCoverDates2] = useState(new Map().set(0, {start: new Date(defaultStartDate), end: new Date(defaultEndDate), 
    //     days: calculateDiffInDays(new Date(defaultStartDate), new Date(defaultEndDate)), previousGap: calculateDiffInDays(new Date(get30BirthDate(defaultDOB)), new Date(defaultStartDate))}));
    const [cae, setCae] = useState(30);
    const [years30Dob, setYears30Dob] = useState(get30BirthDate(defaultDOB));
    const [caeHistory, setCaeHistory] = useState([]);
    const [daysOfAbsenceLeft, setDaysOfAbsenceLeft] = useState(daysOfAbsence);


    const handleAddRemoveCoverDates = (value) => {
        if (limit === 0 && value < 0) return;
        setLimit(limit + value);
        const newCoverDates = new Map(prevCoverDates);
        if (value < 0) {
            newCoverDates.delete(limit - 1);
        } else {
            newCoverDates.set(limit, [new Date(defaultStartDate), new Date(defaultEndDate)]);
        }
        setPrevCoverDates(newCoverDates);
    };


    const calculateDiffInYears = (start, end) => {
        let diff = end.getFullYear() - start.getFullYear();
        let m = end.getMonth() - start.getMonth();
        if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
            diff--;
        }
        return diff;
    }

    const calculateDiffInDays = (start, end) => {
        let Difference_In_Time = end.getTime() - start.getTime();
        return Math.round(Difference_In_Time / (1000 * 3600 * 24));
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
        if (temp.has(i)) {
            temp.set(i, [new Date(date), temp.get(i)[1]]);
        } else {
            temp.set(i, [new Date(date), null]);
        }
        setPrevCoverDates(new Map(temp));
    }


    const handleCoverEndDate = (date, i) => {
        let temp = prevCoverDates;
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

    // const sortAndFilterCoverDates = (dates) => {
    //     const coverDatesFind = Array.from(dates).filter(v => v[1][0] && v[1][1] && v[1][0] < nextFinYear && nextFinYear < v[1][1]);
    //     let coverDatesFinal = [];
    //     if (coverDatesFind.length > 1) {
    //         const starts = [];
    //         const ends = [];
    //         coverDatesFind.forEach(d => {
    //             starts.push(d[1][0]);
    //             ends.push(d[1][1]);
    //         });
    //         starts.sort();
    //         ends.sort();
    //         coverDatesFinal = [starts[0], ends[ends.length - 1], calculateDiffInDays(starts[0], ends[ends.length - 1])];
    //     } else {
    //         coverDatesFinal = coverDatesFind && coverDatesFind[0] && [...coverDatesFind[0][1], calculateDiffInDays(coverDatesFind[0][1][0], coverDatesFind[0][1][1])];
    //     }
    // }

    useEffect(() => {
        const res = new Map();
        const arr =  Array.from(prevCoverDates);
        arr.forEach((d, i) => {
            res.set(i, {start: new Date(d[1][0]), end: new Date(d[1][1]), days: calculateDiffInDays(new Date(d[1][0]), new Date(d[1][1])), 
                previousGap: calculateDiffInDays(new Date(i === 0 ? get30BirthDate(defaultDOB) : arr(i-1)[1][1]), new Date(d[1][0]))})
        });
        // var caeHistory = [
        //     { id: ++id, cae: cae, date: Moment(dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, dob), doa: daysOfAbsence},
        //     { id: ++id, cae: cae, date: Moment(years30Dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, years30Dob), doa: daysOfAbsence }
        // ];
        // for (let i = 0; i < 50; i++) {s
        //     nextFinYear = getNextFinYearStartDate(nextFinYear);
        console.log('---- Dates: ', res);
        // }
    }, [prevCoverDates, dob, appDate, years30Dob]);


    useEffect(() => {
        setCaeHistory([]);
        let cae = 30;
        let id = 0;
        var lastDayOf10PlusYearsCover = null;
        let isCovered = false;
        var incrementCAE = true;
        var nextFinYear = getNextFinYearStartDate(years30Dob);
        var lastDateOfPreviousCover;
        var doal = daysOfAbsence;
        var daysInCoverIncludingAllowedGaps = 0;
        var caeHistory = [
            { id: ++id, cae: cae, date: Moment(dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, dob), doa: daysOfAbsence},
            { id: ++id, cae: cae, date: Moment(years30Dob).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, years30Dob), doa: daysOfAbsence }
        ];

        if (years30Dob.getDate() === 1 && years30Dob.getMonth() === 6) {
            caeHistory.push({ id: ++id, cae: cae++, date: Moment(new Date(nextFinYear)).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, nextFinYear), doa: daysOfAbsence });
        }

        // console.log(`prev cover hist size ${prevCoverDates.size}`);
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
                coverDatesFinal = [starts[0], ends[ends.length - 1], calculateDiffInDays(starts[0], ends[ends.length - 1])];
            } else {
                coverDatesFinal = coverDatesFind && coverDatesFind[0] && [...coverDatesFind[0][1], calculateDiffInDays(coverDatesFind[0][1][0], coverDatesFind[0][1][1])];
            }
            coverDatesFinal?.forEach(() => console.log(`coverDatesFinal[0]: ${Moment(new Date(coverDatesFinal[0])).format('DD MMM YYYY')}, coverDatesFinal[1]: ${Moment(new Date(coverDatesFinal[1])).format('DD MMM YYYY')}, days: ${calculateDiffInDays(new Date(coverDatesFinal[0]), new Date(coverDatesFinal[1]))}, days2: ${coverDatesFinal[2]}`));
            
            if (coverDatesFinal) {
                lastDateOfPreviousCover = coverDatesFinal[1];
                isCovered = coverDatesFinal[0] && coverDatesFinal[1] && coverDatesFinal[0] < nextFinYear && nextFinYear < coverDatesFinal[1];
                // Holding for 10+ years
                if (isCovered && calculateDiffInYears(coverDatesFinal[0], coverDatesFinal[1]) >= 10) {
                    cae = 30;
                    lastDayOf10PlusYearsCover = coverDatesFinal[1];
                    incrementCAE = false;
                }

            }
            // Hold for 10+ years, but cancelled and gap is > 3 years
            if (lastDayOf10PlusYearsCover && calculateDiffInYears(lastDayOf10PlusYearsCover, nextFinYear) >= 3) {
                cae = 30;
                lastDayOf10PlusYearsCover = null;
                incrementCAE = true;
            }

            if (!isCovered && lastDateOfPreviousCover) {
                doal = doal - calculateDiffInDays(lastDateOfPreviousCover, nextFinYear);
                setDaysOfAbsenceLeft(doal);
                // incrementCAE = false;
                if (doal <= 0) {
                    // incrementCAE = true;
                    doal = 0;
                    setDaysOfAbsenceLeft(0);
                }
            }
            
            // !isCovered - Your loading % will lock-in when you insure yourself with an eligible policy. It will not go up by another 2% every year as long as you are holding cover.
            // https://fairhealthcare.com.au/lifetime-health-cover-loading-explained/
            // But ChatGPT says LHC is decreasing 2% per year since joining Hospital insurance
            if (!isCovered && incrementCAE) {
                cae++;
            } else if (isCovered) {
                cae--;
            }
            if (cae < 30) cae = 30;
            if (cae > 70) cae = 70;
            isCovered = false;
            caeHistory.push({ id: ++id, cae: cae, date: Moment(nextFinYear).format('DD MMM YYYY'), lhc: (cae - 30) * 2, age: calculateDiffInYears(dob, nextFinYear), doa: doal });
        }
        //  caeHistory.forEach(h => console.log(`id: ${h.id}, cae: ${h.cae}, lhc: ${h.lhc}, date: ${Moment(h.date).format('DD MMM YYYY')}\n`));
        setCaeHistory(caeHistory);
        const prevFinYear = getPrevFinYearStartDate(appDate);
        const dataAtAppDate = Array.from(caeHistory).find(v => v.date === Moment(prevFinYear).format('DD MMM YYYY'));
        // console.log(`---------> CAE app date: ${dataAtAppDate.cae}`);
        setCae(dataAtAppDate?.cae);
    }, [prevCoverDates, dob, appDate, years30Dob]);


    const renderPickers = (limit) => {
        const prevCoverDetails = [];
        for (let i = 0; i < limit; i++) {
            prevCoverDetails.push(
                <div key={i}>
                    <ExampleSet labelFirst={`#${i}: Hospital cover start date`} labelSecond={`#${i}: Hospital cover end date`} limit={limit} i={i} setFirstDate={handleCoverStartDate} setSecondDate={handleCoverEndDate} startDate={new Date(defaultStartDate)} endDate={new Date(defaultEndDate)} />
                </div>
            );
        }
        // setPrevCoverDates(prevCoverDetails);
        return prevCoverDetails;
    }


    return (
        <div className="calculator">
            <Display value={cae} dob30={years30Dob} />
            <ExampleSet labelFirst={'Date of Birth'} labelSecond={'Application date'} limit={1} setFirstDate={handleDOB} setSecondDate={handleAppDate} startDate={dob} endDate={appDate} />
            <Keypad onClick={handleAddRemoveCoverDates} />
            <div>{renderPickers(limit)}</div>
            <div style={{ width: '500px' }}><BasicTable2 data={caeHistory} /></div>
        </div>
    );
}

export default Calculator;