import React, { useEffect, useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import ExampleSet from "./DatePickerSet";
import Moment from 'moment';

const Calculator = (props) => {

    const [displayValue, setDisplayValue] = useState("");
    const [limit, setLimit] = useState(1);
    const [dob, setDob] = useState(new Date('1991-07-01'));
    const [appDate, setAppDate] = useState(new Date('2023-07-01'));
    const [prevCoverDates, setPrevCoverDates] = useState(new Map());
    const [cae, setCae] = useState(30);
    const [validPrevCoverYears, setValidPrevCoverYears] = useState(0);
    const [years30Dob, setYears30Dob] = useState(new Date());
    const [caeHistory, setCaeHistory] = useState([]);

    const handleClick = (value) => {
        setDisplayValue(displayValue + value);
        setLimit(limit + value);
        if (value < 0) {
            prevCoverDates.delete(limit - 1);
        }
    };

    const calculateAge = (dob, appDate) => {
        let applicationDate = new Date(appDate);
        let birthDate = new Date(dob);
        if (applicationDate.getMonth() >= 6) {
            applicationDate.setMonth(6);
            applicationDate.setDate(1);
            applicationDate.setFullYear(applicationDate.getFullYear());
        } else {
            applicationDate.setMonth(6);
            applicationDate.setDate(1);
            applicationDate.setFullYear(applicationDate.getFullYear() - 1);
        }
        // console.log('appDat2e: ', applicationDate);
        let age_now = applicationDate.getFullYear() - birthDate.getFullYear();
        let m = applicationDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && applicationDate.getDate() < birthDate.getDate())) {
            age_now--;
        }
        // console.log('age_now0:' + age_now);
        return age_now;
    }

    const calculateDiffInYears = (start, end) => {
        let diff = end.getFullYear() - start.getFullYear();
        let m = end.getMonth() - start.getMonth();
        if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
            diff--;
        }
        return diff;
    }

    useEffect(() => {
        let age_now = calculateAge(dob, appDate);
        setCae(age_now - validPrevCoverYears < 30 ? 30 : age_now - validPrevCoverYears);
    }, [dob, appDate, validPrevCoverYears]);

    const handleDOB = (date, i) => {
        get30BirthDate(date);
        setDob(date);
    }

    const handleAppDate = (date, i) => {
        setAppDate(date);
    }

    const handleCoverStartDate = (date, i) => {
        let temp = prevCoverDates;
        setPrevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [new Date(date), temp.get(i)[1]]);
        } else {
            temp.set(i, [new Date(date), null]);
        }
        // temp.forEach((v, k) => console.log('i: ' + k + ' start: ' + v[0] + ' end: ' + v[1] + '\n'));
        setPrevCoverDates(new Map(temp));
    }

    const handleCoverEndtDate = (date, i) => {
        let temp = prevCoverDates;
        setPrevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [temp.get(i)[0], new Date(date)]);
        } else {
            temp.set(i, [null, new Date(date)]);
        }
        // temp.forEach((v, k) => console.log('i: ' + k + ' start: ' + v[0] + ' end: ' + v[1] + '\n'));
        setPrevCoverDates(new Map(temp));
    }

    const getNextFinYearStartDate = (date) => {
        let nextDate = new Date(date);
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

    useEffect(() => {
        let covered = 0;
        setCaeHistory([]);
        let cae = 30;
        let caeHistory = [{ cae: cae, date: dob }];
        caeHistory.push({ cae: cae, date: years30Dob });
        let nextFinYear = getNextFinYearStartDate(years30Dob);
        if (years30Dob.getDate() === 1 && years30Dob.getMonth() === 6) {
            cae++;
        }
        caeHistory.push({ cae: cae, date: nextFinYear });
        let last10YearsDate = null;
        let isCovered = false;
        let incrementCAE = true;
        for (let i = 0; i < 50; i++) {
            nextFinYear = getNextFinYearStartDate(nextFinYear);
            let coverDatesFind = Array.from(prevCoverDates).find(v => v[1][0] && v[1][1] && v[1][0] < nextFinYear && nextFinYear < v[1][1]);
            console.log(`----- coverDates: ${coverDatesFind}`);
            if (coverDatesFind) {
                let coverDates = coverDatesFind[1];
                console.log(`----- coverDates: ${coverDates[0]}, ${coverDates[1]}`);
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
                cae = cae + 1;
            }
            isCovered = false;
            caeHistory.push({ cae: cae, date: nextFinYear });
        }
        caeHistory.forEach(h => console.log(`cae: ${h.cae}, date: ${Moment(h.date).format('DD MMM YYYY')}\n`));

        prevCoverDates.forEach((v, k) => {
            let yearsCovered = v[0] && v[1] && v[1] > years30Dob && calculateAge(v[0], v[1]);
            if (yearsCovered && yearsCovered >= 1) {
                covered = covered + yearsCovered;
            }
        });
        setValidPrevCoverYears(covered);
    }, [prevCoverDates]);

    const get30BirthDate = (dob) => {
        let dob30 = new Date(dob);
        dob30.setFullYear(dob.getFullYear() + 30);
        console.log(`=== 30 birthday: {0}`, new Date(dob30));
        setYears30Dob(dob30);
        setCaeHistory([[dob30, 30]]);
        return dob30;
    }

    const prevCoverDetails = [];
    const renderPickers = (limit) => {
        for (let i = 0; i < limit; i++) {
            prevCoverDetails.push(
                <div key={i}>
                    <ExampleSet limit={limit} i={i} setFirstDate={handleCoverStartDate} setSecondDate={handleCoverEndtDate} startDate={new Date('2005-01-01')} endDate={new Date('2010-01-01')} />
                </div>
            );
        }
        return prevCoverDetails;
    }

    return (
        <div className="calculator">
            <Display value={cae} dob30={years30Dob} />
            <ExampleSet limit={1} setFirstDate={handleDOB} setSecondDate={handleAppDate} startDate={dob} endDate={appDate} />
            <Keypad onClick={handleClick} />
            <div>{renderPickers(limit)}</div>
        </div>
    );
}

export default Calculator;