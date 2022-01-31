import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("");
  const [cnt, setCnt] = useState("");
  const callApi = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${cnt}&appid=ee79a981af6eda48c391deddd8b947cc`
      )
      .then((res) => {
        const data = res.data;
        console.log("weather cast",  data.list);
        setWeatherData(data.list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InputGroup className="mb-3 mt-3">
            <FormControl
              onChange={(e) => {
                console.log("onchange calling", e.target.value);
                setCity(e.target.value);
              }}
              type="input"
              placeholder="Enter the city name to find wearher"
              value={city}
              aria-label="Text input with dropdown button"
            />

            <Dropdown
              onSelect={(event) => {
                console.log("dropdown=>", event);
                setCnt(event);
              }}
            >
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey={"10"}>10</Dropdown.Item>
                <Dropdown.Item eventKey={"16"}>16</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
          <div style={{ width: "30%" }}>
            <Button
              onClick={() => {
                callApi();
              }}
              disabled={city === "" || cnt === "" ? true : false}
              variant="primary"
            >
              Find
            </Button>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            border: "4px solid #4840d30d",
           
          }}
        >
          {
            //date
            //sunrise
            //sunset
            //weather
            //description
            //temp
          }
          <div className="weatherData">
           
            <h3>Weather</h3>
            <h3>Description</h3>
            <h3>Temp</h3>
          </div>
          {weatherData.map((item,index) => {
            return (
              <div key={index} className="weatherData">
                <p>{`${item.weather[0].main}`}</p>

               
                <p>{`${item.weather[0].description}`}</p>
                <p>{`${item.temp.day}`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
