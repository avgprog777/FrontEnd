import React from 'react'
import Navbar from '../Navbar/Navbar';
import './UserHome.css'
import SentCourier from '../Assets/sentcourier.png'
import Parcel from '../Assets/parcel.png'
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const navigate = useNavigate();
  const handleSendCourierClick  =() =>{
    navigate('../PlaceOrder')
  }
  return (
    <div className="background">
      <Navbar></Navbar>
      <main>
        <h1>Welcome, Customer!</h1>
        <div className="card-container">
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={SentCourier} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
              </p>
              <button className="btn-primary" onClick={handleSendCourierClick}>Send Courier</button>
            </div>
          </div>

          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={Parcel} alt="Card image cap" />
            <div className="card-body">
              <p className="card-text">
              </p>
              <button className="btn-primary">View Order</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserHome