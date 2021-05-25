import './App.css';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import americanFlag from './american-flag.jpg'

const axios = require('axios');
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    margin: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function App() {
  const [apiResponse, setApiResponse] = useState(' ')
  const [numberToConvert, setNumberToConvert] = useState(1776)
  const [metricUnit, setMetricUnit] = useState('km')
  const [fUnit, setFUnit] = useState('bmac')

  const classes = useStyles();

  function apiCall() {
    axios.get(`https://metric-2-freedom-api.herokuapp.com/convert?number=${numberToConvert}&metric_unit=${metricUnit}&f_utype=${fUnit}`, {
      // axios.get(`http://localhost:5000/convert?number=${numberToConvert}&metric_unit=${metricUnit}&f_utype=${fUnit}`, {
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
    <div className={classes.paper}>
      <header><img src={americanFlag} alt="America!" /></header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3">
        <div>Metric 2 Freedom Converter</div>
      </nav>
      <div className="container">
        <div className="jumbotron">
          <p className="lead">Confused and enraged by the metric system? You're not alone, just toss those strange units
          in below and
                let us convert 'em to units we're all familiar with!</p>
          <div className="form-group">
            <label htmlFor="metric_Number">Unit Count: </label>
            <input onChange={(e) => setNumberToConvert(e.target.value)} type="number" className="form-control" id="unitCountInput" placeholder="1776" />
          </div>
          <div className="form-group">
            <label htmlFor="MetricTypeSelection">Metric Type: </label>
            <select onChange={(e) => setMetricUnit(e.target.value)} className="form-control" id="metricUnitTypeSelector">
              <option value="km">Kilometers (km)</option>
              <option value="m">Meters (m)</option>
            </select>
            <div></div>
            <label htmlFor="MetricTypeSelection">Freedom Type: </label>
            <select onChange={(e) => setFUnit(e.target.value)} className="form-control" id="freedomUnitTypeSelector">
              <option value="bmac">Big Mac</option>
              <option value="g">Glock</option>
              <option value="ar15">AR-15</option>
              <option value="pdrone">Predator Drone</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={() => apiCall()}>Convert!</button>
          <div>{apiResponse}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default App;
