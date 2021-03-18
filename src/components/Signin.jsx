import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Signin = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const [error,setError] = useState("");
  const onSubmit = async (values) => {
    const res = await axios.post("http://localhost:8000/api/v1/users/login", values);
    if(res.data.ok === true && res.data.token!=null ){
      history.push("/dashboard");
    }
    else{
      setError("Email or Password is incorrect");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-5 container" style={{ maxWidth: "30vw" }}>
        <h3 className="display-5 mb-4">Sign In</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your mail"
              ref={register({
                required: true,
              })}
            />
            <p className="text-danger">
              {errors.email && "Invalid Email provided"}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              ref={register({
                required: true,
              })}
            />
          </div>
          <div className="text-danger">{error}</div>

          <button type="submit" className="mt-3 btn btn-primary w-100 btn-lg">
            Sign In
          </button>
          <div className="mb-4">
          <Link to="/Signup" className="navbar-brand">
            Not an Existing User ?
           <br/>Create your free Account here!
          </Link>
          </div>
        </form>

        
      </div>
    </>
  );
};

export default Signin;
