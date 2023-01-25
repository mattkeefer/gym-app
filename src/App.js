import React, { useEffect, useState } from "react";
import "./App.css";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import StatusBoard from './components/StatusBoard';

function App() {

  const [gymData, setGymData] = useState([]);

  async function fetchFloorData(floorName) {
      const floorCollection = collection(db, floorName);
      const latestFloor = query(floorCollection, orderBy("Updated", "desc"), limit(1));
      const querySnapshot = await getDocs(latestFloor);
      const { title, maxCapacity } = getInformation(floorName);
      return ({id: querySnapshot.docs[0].id, data: querySnapshot.docs[0].data(), title: title, maxCapacity: maxCapacity});
  }

  async function refreshData() {
      const floorList = ['floor2', 'floor3weight', 'floor3select', 'squash', 'gymnasium', 'track'];
      const promiseFloorDataList = floorList.map(floor => fetchFloorData(floor));
      const data = await Promise.all(promiseFloorDataList);
      setGymData(data);
      console.log(gymData);
  }

  function getInformation(floorName) {
      switch(floorName) {
          case 'floor2':
              return ({title: 'Marino Second Floor', maxCapacity: 105});
          case 'floor3weight':
              return ({title: 'Marino Weight Room', maxCapacity: 65});
          case 'floor3select':
              return ({title: 'Marino Select & Cardio', maxCapacity: 90});
          case 'squash':
              return ({title: 'SquashBusters Center', maxCapacity: 60});
          case 'gymnasium':
              return ({title: 'Marino Gymnasium', maxCapacity: 60});
          case 'track':
              return ({title: 'Marino Track Area', maxCapacity: 20});
          default:
              throw new Error('Unrecognized floor name');
      }
  }

  useEffect(() => {
    refreshData();  
  }, []);

  return (
    <StatusBoard refreshData={refreshData} gymData={gymData}/>
  );
}

export default App;
