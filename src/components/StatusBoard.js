import React from "react";
import "../App.css";
import CapacityDisplay from "./CapacityDisplay";

export default function StatusBoard(props) {

    const gymData = props.gymData;

    return (
        <section className="main">
            <h1 className="title">Northeastern Gym Facility Counts</h1>
            <div className="home">
                <CapacityDisplay floorData={gymData[0]} />
                <CapacityDisplay floorData={gymData[1]} />
                <CapacityDisplay floorData={gymData[2]} />
                <CapacityDisplay floorData={gymData[3]} />
                <CapacityDisplay floorData={gymData[4]} />
                <CapacityDisplay floorData={gymData[5]} />
            </div>
            <button onClick={props.refreshData}>Refresh</button>
        </section>
    );
}