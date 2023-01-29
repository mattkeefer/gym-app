import React from "react";
import "../App.css";
import CapacityDisplay from "./CapacityDisplay";
import FloorHistoryDisplay from "./FloorHistoryDisplay";

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
            <FloorHistoryDisplay getInformation={props.getInformation}/>
        </section>
    );
}