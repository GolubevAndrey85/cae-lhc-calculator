import React, { useEffect, useState } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import ExampleSet from "./DatePickerSet";

const Calculator = (props) => {

    const [displayValue, setDisplayValue] = useState("");
    const [limit, setLimit] = useState(2);
    const [dob, setDob] = useState(new Date());
    const [appDate, setAppDate] = useState(new Date());
    const [prevCoverDates, setPprevCoverDates] = useState(new Map());
    const [cae, setCae] = useState(30);
    const [validPrevCoverYears, setValidPrevCoverYears] = useState(0);

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
        if (applicationDate.getMonth() >= 6 && applicationDate.getDate() >= 1) {
            applicationDate.setMonth(6);
            applicationDate.setDate(1);
            applicationDate.setFullYear(applicationDate.getFullYear());
        } else {
            applicationDate.setMonth(6);
            applicationDate.setDate(1);
            applicationDate.setFullYear(applicationDate.getFullYear() - 1);
        }
        console.log('appDat2e: ', applicationDate);
        let age_now = applicationDate.getFullYear() - birthDate.getFullYear();
        let m = applicationDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && applicationDate.getDate() < birthDate.getDate())) {
            age_now--;
        }
        console.log('age_now0:' + age_now);
        return age_now;
    }

    useEffect(() => {
        let age_now = calculateAge(dob, appDate);
        setCae(age_now - validPrevCoverYears < 30 ? 30 : age_now - validPrevCoverYears);
    }, [dob, appDate, validPrevCoverYears]);

    const handleDOB = (date, i) => {
        setDob(date);
    }

    const handleAppDate = (date, i) => {
        setAppDate(date);
    }

    const handleCoverStartDate = (date, i) => {
        let temp = prevCoverDates;
        setPprevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [date, temp.get(i)[1]]);
        } else {
            temp.set(i, [date, null]);
        }
        temp.forEach((v, k) => console.log('i: ' + k + ' start: ' + v[0] + ' end: ' + v[1] + '\n'));
        setPprevCoverDates(new Map(temp));
    }

    const handleCoverEndtDate = (date, i) => {
        let temp = prevCoverDates;
        setPprevCoverDates(null);
        if (temp.has(i)) {
            temp.set(i, [temp.get(i)[0], date]);
        } else {
            temp.set(i, [null, date]);
        }
        temp.forEach((v, k) => console.log('i: ' + k + ' start: ' + v[0] + ' end: ' + v[1] + '\n'));
        setPprevCoverDates(new Map(temp));
    }

    useEffect(() => {
        let covered = 0;
        prevCoverDates.forEach((v,k) => {
            let age_now = v[0] && v[1] && calculateAge(v[0], v[1]);
            console.log('-------- age_now1: ' + age_now);
            if (age_now && age_now >= 1) {
                covered = covered + age_now;
            }
        });
        setValidPrevCoverYears(covered);
        console.log('>>> validPrevCoverYears1: ' + covered);
    }, [prevCoverDates]);

    const userDetails = [];
    const renderPickers = (limit) => {
        for (let i = 0; i < limit; i++) {
            userDetails.push(
                <div key={i}>
                    <ExampleSet limit={limit} i={i} setFirstDate={handleCoverStartDate} setSecondDate={handleCoverEndtDate} />
                </div>
            );
        }
        return userDetails;
    }

    return (
        <div className="calculator">
            <Display value={cae} />
            <ExampleSet limit={1} setFirstDate={handleDOB} setSecondDate={handleAppDate} />
            <Keypad onClick={handleClick} />
            <div>{renderPickers(limit)}</div>
        </div>
    );
}

export default Calculator;