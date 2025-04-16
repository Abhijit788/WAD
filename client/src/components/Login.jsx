import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../utils/Toastify";
import { LoginRoute } from "../utils/APIRoutes"
import { Link } from "react-router-dom";
import { setAuth } from '../store/authSlice.js';
// import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formData = { ...values };
    const { data } = await axios.post(LoginRoute, formData, {
      withCredentials: true,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    } else {
      dispatch(setAuth(data));
      toast("Logged in");
      navigate("/home");
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* {left side} */}
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Welcome back</span>
              <span className="font-light text-gray-400 mb-8">
                Welcome back! Please enter your details
              </span>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <div className="py-6">
                <button
                  type="submit"
                  className="w-full  bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                >
                  Sign in
                </button>
              </div>
              

              <div className="text-center text-gray-400">
                Don't have an account?
                <span className="font-bold text-black">
                  {" "}
                  <Link to="/signup">Sign up for free</Link>
                </span>
              </div>
              <div className="text-center text-green-400">
                <span className="font-bold text-green">
                  {" "}
                  <Link to="/AdminLogin">Login as NGO organizations</Link>
                </span>
              </div>
            </div>
            {/* right side */}
            <div className=" relative">
              <img
                src="./login/3d.jpeg"
                alt="img"
                className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </form>
    </>
  );
}

export default Login;
