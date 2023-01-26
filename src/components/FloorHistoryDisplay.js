import React, { useState } from "react";
import "../App.css";
import { collection, query, orderBy, limit, getDocs, where } from "@firebase/firestore";
import { db } from "../firebase";

export default function FloorHistoryDisplay(props) {

    const [location, setLocation] = useState('floor2');
    const [day, setDay] = useState(0);
    const [time, setTime] = useState(0);

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

    async function refreshData() {
        const promiseData = getFloorDataOnDay(location, day, time);
        const data = await promiseData;
        setHistory(data);
    }

    function calculateAverage(history) {
        const totalCapacity = history.reduce((acc, cur) => acc + cur.data.Capacity, 0);
        const avgCapacity = totalCapacity / history.length;
        return avgCapacity;
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
            <select name="time" id="time" onChange={(e) => setTime(Number(e.target.value))} value={time}>
                {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <button onClick={refreshData}>
                View History
            </button>
            {history.length > 0 && <h4>Average Capacity: {calculateAverage(history)}</h4>}
        </div>
    );
}