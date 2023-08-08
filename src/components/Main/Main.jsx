import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import '../Main/main.css'
const Main = () => {
  return (
    <div className="hero">

    <h1 className="card-title">Find the Perfect Destination</h1>
    <p className="card-text">
      Our app will help you find the perfect path for your next trip. With an easy to use interface and a host of itinerary options, planning your next trip has never been easier.
    </p>
    <div id="button" className="container-fluid">
      <a type="button" className="btn btn-dark" href="#">
       View Cities
      </a>
    </div>
  </div>

  )
}

export default Main
