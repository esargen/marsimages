import Head from 'next/head';
import styles from '../styles/Home.module.css';
import axios from 'axios';
import queryString from "query-string";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import cameras from '../public/cameras.json';
import percameras from '../public/percameras.json';
import Calendarsel from "../components/calendarsel";
import Calendar from 'react-calendar';

var dateFormat = require("dateformat");

export default function Home() {
  const [rover, setRover] = useState("Curiosity");
  const [mars, setMars] = useState([]);
  const [camera, setCamera] = useState("FHAZ");
  const [loading, setLoading] = useState(false);
  const [nophotos, setNophotos] = useState("");
  const [date, onChange] = useState(new Date());
  const [height, setHeight] = useState("fullheight");
  const [camheight, setCamheight] = useState("fullheight");


  const formattedDate = dateFormat(date, "yyyy-mm-dd");
  console.log(formattedDate, rover, camera);

    const toggleClass = () => {
        var newHeight = (height ? "" : "fullheight");
        setHeight(newHeight);
    };
    const toggleCam = () => {
        var newcamHeight = (camheight ? "" : "fullheight");
        setCamheight(newcamHeight);
    };

    const submit = () => {
      setLoading(true);

      const url = queryString.stringifyUrl({
        url: `/api/mars`,
        query: {
          rover,
          camera,
          formattedDate
        },
      });

      axios.get(url)
        .then((response) => {
          setLoading(false);
          setNophotos("no photos");
          setMars(response.data.results);
          console.log(mars);
          console.log(nophotos);
        });
    }

    const marsmap = mars.slice(0, 20).map((mar, index) =>
      <div style={{width: "65%", display:"flex"}}>
        <img style={{width:"100%"}} src={mar.img_src} />
        <div>
          <p>{mar.sol}</p>
          <p>{mar.rover.name}</p>
          <p>{mar.camera.full_name}</p>
          <p>{mar.earth_date}</p>
        </div>
      </div>
  )

  const camerasmap = cameras.map((camera, index) =>
    <div>
      <button className="camera" onClick={() => setCamera(camera.acronym)}>{camera.fullname}</button>
    </div>
)

  const percamerasmap = percameras.map((percamera, index) =>
    <div>
      <button className="camera" onClick={() => setCamera(percamera.acronym)}>{percamera.fullname}</button>
    </div>
)


  return (
    <div className="all">
      <Head>
        <title>NASA Research</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/vqv3myg.css" />
      </Head>

      <main>
        <h1>Mars Photos,</h1>
        <h1><span className="normy">taken by</span> {rover} <span className="normy">using</span> {camera}</h1>
        <div className="flex">
          <div className="menus">
            <h2>Rover</h2>
            <div className="buttonarray" style={{display:"flex"}}>
              <button className="rover" onClick={() => setRover("Curiosity")}>Curiosity</button>
              <button className="rover" onClick={() => setRover("Spirit")}>Spirit</button>
              <button className="rover" onClick={() => setRover("Opportunity")}>Opportunity</button>
              <button className="rover" onClick={() => setRover("Perseverance")}>Perseverance</button>
            </div>
            <div className={height} id="pers">
              <h3>Perserverance Cameras</h3>
              <div className="buttonarray" >{percamerasmap}</div>
            </div>
            <div className={camheight} id="cam">
              <h3>Camera</h3>
              <div className="buttonarray">{camerasmap}</div>
            </div>

          </div>
          <Calendarsel onChange={onChange} value={date}/>
        </div>
        <button className="submit" onClick={submit}>View photos</button>
          {loading ?
            <p>Loading...</p>
            :
            <div style={{display:"flex", flexWrap: "wrap", justifyContent: "space-between", width:"85vw"}}>
              {marsmap}
            </div>
          }
      </main>
    </div>
  );
}
