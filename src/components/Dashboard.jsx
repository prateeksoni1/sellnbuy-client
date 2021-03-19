import Navbar from "./Navbar";
import React, { useEffect } from "react";
import axios from "axios";

const Dashboard = (req,res) => {
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/products", {
        headers: {
           authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);
  const addToCart = () => {};
  return (
    <>
      <Navbar />
      <div className="card" style={{ width: 30 + "rem" }}>
        <img
          className="card-img-top"
          src={`\\public\\assets\\bg.jpg`}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">TITLE</h5>
          <h6 className="card-subtitle">PRICE</h6>
          <p className="card-text">OWNER DETAILS</p>
          <button className="btn btn-primary w-100" onClick={addToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
