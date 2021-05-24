import './App.css';
import React, { useState } from 'react'
const axios = require('axios');

function App() {
  const [apiResponse, setApiResponse] = useState('No Data Yet')
  const [numberToConvert, setNumberToConvert] = useState(1776)
  const [metricUnit, setMetricUnit] = useState('km')
  const [fUnit, setFUnit] = useState('g')
  function apiCall() {
    axios.get(`http://localhost:5000/convert?number=${numberToConvert}&metric_unit=${metricUnit}&f_utype=${fUnit}`, {
      headers: {
        'Access-Control-Allow-Origin': true,
        crossdomain: true
      }
    })
      .then(
        (result) => {
          console.log(result['data']['freedom_units'])
          setApiResponse(result['data']['freedom_units'])
        })
      .catch((error) => {
        console.log(error);
      }
      )
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div className="container">
          <a href="#" className="navbar-brand mr-3">Metric 2 Freedom Converter</a>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="container">
        <div className="jumbotron">
          <p className="lead">Confused and enraged by the metric system? You're not alone, just toss those strange units
          in below and
                let us convert 'em to units we're all familiar with!</p>
          <div className="form-group">
            <label htmlFor="metric_Number">Unit Count</label>
            <input onChange={(e) => setNumberToConvert(e.target.value)} type="number" className="form-control" id="unitCountInput" placeholder="1776" />
          </div>
          <div className="form-group">
            <label htmlFor="MetricTypeSelection">Metric Unit Type</label>
            <select onChange={(e) => setMetricUnit(e.target.value)} className="form-control" id="metricUnitTypeSelector">
              <option value="km">Kilometers (km)</option>
              <option value="m">Meters (m)</option>
            </select>
            <label htmlFor="MetricTypeSelection">Freedom Unit Type</label>
            <select onChange={(e) => setFUnit(e.target.value)} className="form-control" id="freedomUnitTypeSelector">
              <option value="g">Glock</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => apiCall(200, 'cm', 'g')}>Convert!</button>
          <div>{apiResponse}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default App;
