import React, { useState } from "react";
import "../App.css";
import { collection, query, limit, getDocs, where } from "@firebase/firestore";
import { db } from "../firebase";

export default function FloorHistoryDisplay(props) {

    const [location, setLocation] = useState('floor2');
    const [day, setDay] = useState(0);

    const [history, setHistory] = useState([]);

    const timeOptions = [
        {
            label: '12AM-1AM',
            value: 0,
        },
        {
            label: '1AM-2AM',
            value: 1,
        },
        {
            label: '2AM-3AM',
            value: 2,
        },
        {
            label: '3AM-4AM',
            value: 3,
        },
        {
            label: '4AM-5AM',
            value: 4,
        },
        {
            label: '5AM-6AM',
            value: 5,
        },
        {
            label: '6AM-7AM',
            value: 6,
        },
        {
            label: '7AM-8AM',
            value: 7,
        },
        {
            label: '8AM-9AM',
            value: 8,
        },
        {
            label: '9AM-10AM',
            value: 9,
        },
        {
            label: '10AM-11AM',
            value: 10,
        },
        {
            label: '11AM-12PM',
            value: 11,
        },
        {
            label: '12PM-1PM',
            value: 12,
        },
        {
            label: '1PM-2PM',
            value: 13,
        },
        {
            label: '2PM-3PM',
            value: 14,
        },
        {
            label: '3PM-4PM',
            value: 15,
        },
        {
            label: '4PM-5PM',
            value: 16,
        },
        {
            label: '5PM-6PM',
            value: 17,
        },
        {
            label: '6PM-7PM',
            value: 18,
        },
        {
            label: '7PM-8PM',
            value: 19,
        },
        {
            label: '8PM-9PM',
            value: 20,
        },
        {
            label: '9PM-10PM',
            value: 21,
        },
        {
            label: '10PM-11PM',
            value: 22,
        },
        {
            label: '11PM-12AM',
            value: 23,
        },
    ];

    async function getFloorDataOnDay(location, day, time) {
        const floorCollection = collection(db, location);
        const locationDataForDay = query(floorCollection, where("TimeObj.dayOfWeek", "==", day), where("TimeObj.hour", "==", time), limit(10));
        const querySnapshot = await getDocs(locationDataForDay);
        const data = querySnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
        return data;
    }

    async function refreshTable() {
        const fullHistory = [];
        for (let timeOption of getHours(location, day)) {
            const promiseData = getFloorDataOnDay(location, day, timeOption.value);
            const data = await promiseData;
            if (data.length > 0) {
                const { avgCapacity, maxCapacity } = calculateAverage(data);
                fullHistory.push({time: timeOption, avgCapacity: avgCapacity, maxCapacity: maxCapacity});
            }
        }
        setHistory(fullHistory);
    }

    function calculateAverage(data) {
        const totalCapacity = data.reduce((acc, cur) => acc + cur.data.Capacity, 0);
        const avgCapacity = totalCapacity / data.length;
        const { maxCapacity } = props.getInformation(location);
        return {avgCapacity: Math.round(avgCapacity), maxCapacity: maxCapacity}
    }

    function filterTimeOptions(lowerLimit, upperLimit, inclusive) {
        const options = inclusive 
            ? timeOptions.filter((time) => time.value >= lowerLimit && time.value <= upperLimit) 
            : timeOptions.filter((time) => time.value >= lowerLimit && time.value < upperLimit);
        return options;
    }

    function getHours(location, dayOfWeek) {
        if (location === 'squash') {
            switch (dayOfWeek) {
                case 0:
                case 1:
                case 2:
                case 3:
                    return filterTimeOptions(6, 24, false);
                case 4:
                    return filterTimeOptions(6, 21, true);
                case 5:
                    return filterTimeOptions(8, 21, true);
                case 6:
                    return filterTimeOptions(10, 21, true);
                default:
                    throw new Error('Unrecognized day of week');
            }
        } else {
            switch (dayOfWeek) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    return filterTimeOptions(5, 24, false);
                case 5:
                case 6:
                    return filterTimeOptions(8, 24, false);
                default:
                    throw new Error('Unrecognized day of week');
            }
        }
    }

    return (
        <div className="history">
            <select name="location" id="location" onChange={(e) => setLocation(e.target.value)} value={location}>
                <option value="floor2">Floor 2</option>
                <option value="floor3weight">Weights</option>
                <option value="floor3select">Floor 3</option>
                <option value="squash">Squash</option>
                <option value="gymnasium">Gym</option>
                <option value="track">Track</option>
            </select>
            <select name="day" id="day" onChange={(e) => setDay(Number(e.target.value))} value={day}>
                <option value={0}>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
                <option value={6}>Sunday</option>
            </select>
            <button onClick={refreshTable}>
                View History
            </button>
            <div className="table">
                {history.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th style={{width:"150px"}}>Time</th>
                                <th>Average Count</th>
                                <th>Average Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(data => (
                                <tr key={data.time.value}>
                                    <td>{data.time.label}</td>
                                    <td>{data.avgCapacity}</td>
                                    <td>{Math.round(data.avgCapacity / data.maxCapacity * 100)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}