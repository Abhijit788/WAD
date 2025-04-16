import { useState } from "react";
import axios from "axios";
import { RegisterRoute } from "../utils/APIRoutes";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from "../utils/Toastify";
import {useNavigate} from "react-router-dom";
const genders = [
  "-Select-",
  "Male",
  "Female",
  "Non-Binary",
  "Prefer not to say",
];
const timeAvailabilities = ["Weekdays", "Weekends", "Specific Hours"];
const volunteer_types = ["On-site", "Remote", "Events"];
const SignUp = () => {
  const navigate= useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    password:"",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    confirmpassword:"",
    volunteertype: [], 
    timeavailability: "", 
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? [...prevData.volunteertype, value] : value,
    }));
  };

 const handleValidation=()=>{
  const {firstname, lastname,password,email,gender, mobile,confirmpassword, volunteertype, timeavailability}= user;
  if(password!==confirmpassword){
    toast.error("Password should match Confirm Password", toastOptions);
    return false;
  }
  return true;


 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {firstname, lastname,password,email,gender, mobile, volunteertype, timeavailability}= user;
    if(handleValidation()){
      const {data}= await axios.post(RegisterRoute,{
        firstname,
        lastname,
        password,
        email,
        gender,
        mobile,
        volunteertype,
        timeavailability,
      });
      if(data.status===false){
        toast.error(data.msg,toastOptions);
      }
      else{
        toast("Registered");
        navigate("/home");
      }
    }
    
  };
  return (
    <>
      <div className="md:p-20 bg-slate-200">
        <div className="h-auto shadow-xl bg-slate-50 md:rounded-3xl text-slate-700">
          <div className="flex justify-center">
            <span className="mt-12 font-sans text-5xl font-bold text-center">
              Registration
            </span>
          </div>
          <div>
            <form
              className="h-full mx-8 my-8 md:mx-4 rounded-xl"
              onSubmit={(e)=>handleSubmit(e)}
            >
              <div className="flex flex-col py-12 border-t-2 border-gray-300 md:space-y-6 md:flex-row md:grow-0 sm:m-3">
                <div className="w-full my-6 text-3xl font-bold md:px-6 md:w-1/3 sm:h-auto">
                  Personal Information
                </div>
                <div className="flex flex-wrap w-full md:w-2/3">
                  <div className="mt-6 md:mt-0 md:px-6 grow sm:grow-0 md:w-full lg:w-1/2">
                    <label
                      htmlFor="first_name"
                      className="block col-span-1 my-2 text-base font-medium text-left"
                    >
                      First Name
                    </label>
                    <div>
                      <input
                        
                        id="first_name"
                        name="firstname"
                        type="text"
                        autoComplete="text"
                        onChange={(e)=>handleChange(e)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:px-6 grow sm:grow-0 md:w-full lg:w-1/2">
                    <label
                      htmlFor="last_name"
                      className="block col-span-1 my-2 text-base font-medium text-left"
                    >
                      Last Name
                    </label>
                    <div>
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="text"
                        onChange={(e)=>handleChange(e)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-6 md:px-6 md:grow-0 lg:w-1/2">
                    <label
                      htmlFor="dob"
                      className="block col-span-1 my-2 text-base font-medium text-left"
                    >
                      Date of Birth
                    </label>
                    <div className="col-span-1">
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        autoComplete="bday-day"
                        required
                        onChange={(e)=>handleChange(e)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="w-full mt-6 md:px-6 md:grow-0 lg:w-1/2">
                    <label
                      htmlFor="gender"
                      className="block col-span-1 my-2 text-base font-medium text-left"
                    >
                      Gender
                    </label>
                    <div>
                      <select
                        name="gender"
                        id="gender"
                        onChange={(e)=>handleChange(e)}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      >
                        {genders.map((gender) => {
                          return <option key={gender}>{gender}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="w-full mt-6 md:px-6 md:grow-0 lg:w-1/2">
                    <label
                      htmlFor="mobile"
                      className="block w-full my-2 text-base font-medium text-left"
                    >
                      Mobile no.
                    </label>
                    <div className="col-span-1">
                      <input
                        id="mobile"
                        name="mobile"
                        type="text"
                        autoComplete="mobile"
                        onChange={(e)=>handleChange(e)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:px-6 grow sm:grow-0 md:w-full lg:w-1/2">
                    <label
                      htmlFor="email"
                      className="block col-span-1 my-2 text-base font-medium text-left"
                    >
                      Email address
                    </label>
                    <div className="col-span-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e)=>handleChange(e)}
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-12 border-t-2 border-gray-300 md:flex-row md:grow-0 sm:m-3">
                <div className="w-full my-6 text-3xl font-bold md:px-6 md:w-1/3 sm:h-auto">
                  Volunteer Preferences
                </div>
                <div className="flex flex-wrap items-center w-full mt-6 sm:mt-0 md:w-2/3">
                  <div className="flex flex-col w-full mt-6 sm:w-2/3 md:grow-0 md:px-6 lg:w-1/2">
                    <div className="text-lg font-semibold text-gray-900">
                      Preferred Type of Volunteer Work
                    </div>
                    <div className="mt-6 space-y-6">
                      {volunteer_types.map((volunteer_type) => {
                        return (
                          <div
                            key={volunteer_type}
                            className="flex px-6 gap-x-3"
                          >
                            <input
                              id={volunteer_type}
                              name="volunteertype"
                              onChange={(e)=>handleChange(e)}
                              type="checkbox"
                              value={volunteer_type}
                              className="w-5 h-5 border-gray-300 rounded-full text-emerald-600 focus:ring-emerald-600"
                            />
                            <label
                              htmlFor={volunteer_type}
                              className="block text-base font-medium leading-6 text-gray-900"
                            >
                              {volunteer_type}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col w-full mt-6 sm:w-2/3 md:grow-0 md:px-6 lg:w-1/2">
                    <div className="text-lg font-semibold text-gray-900">
                      Time Availability
                    </div>

                    <div className="mt-6 space-y-6">
                      {timeAvailabilities.map((timeAvailability) => {
                        return (
                          <div
                            key={timeAvailability}
                            className="flex px-6 gap-x-3"
                          >
                            <input
                              id={timeAvailability}
                              name="timeavailability"
                              type="radio"
                              onChange={(e)=>handleChange(e)}
                              value={timeAvailability}
                              className="w-5 h-5 border-gray-300 text-emerald-600 focus:ring-emerald-600"
                            />
                            <label
                              htmlFor={timeAvailability}
                              className="block text-base font-medium leading-6 text-gray-900"
                            >
                              {timeAvailability}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-12 border-gray-300 md:flex-row md:grow-0 sm:m-3 border-y-2">
                <div className="w-full my-6 text-3xl font-bold md:px-6 sm:w-1/3 sm:h-auto">
                  Profile Credentials
                </div>
                <div className="flex flex-wrap items-center w-full md:w-2/3">
                  <div className="flex flex-col w-full lg:flex-row">
                    <div className="flex flex-col items-center w-full mt-6">
                      <label
                        htmlFor="photo-uploaded"
                        className="block text-base font-medium leading-6 text-gray-900"
                      >
                        Photo
                      </label>
                      <div className="flex flex-col items-center mt-2 gap-x-3">
                        <svg
                          className="text-gray-300 h-52 w-52"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <button
                          id="photo-uploaded"
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center w-full mt-6">
                      <label
                        htmlFor="file-uploaded"
                        className="block text-base font-medium leading-6 text-gray-900"
                      >
                        Cover photo
                      </label>
                      <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 mx-auto text-gray-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="flex mt-4 text-base leading-6 text-gray-600">
                            <label
                              htmlFor="file-uploaded"
                              className="relative px-2 font-semibold bg-white rounded-md cursor-pointer text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-uploaded"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-sm leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 md:px-6 grow sm:grow-0 md:w-full lg:w-1/2">
                    <label
                      htmlFor="password"
                      className="block my-2 text-base font-medium text-left"
                    >
                      Password
                    </label>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e)=>handleChange(e)}
                        autoComplete="new-password"
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:px-6 grow sm:grow-0 md:w-full lg:w-1/2">
                    <label
                      htmlFor="confirm_password"
                      className="block my-2 text-base font-medium text-left"
                    >
                      Confirm Password
                    </label>
                    <div>
                      <input
                        id="confirm_password"
                        name="confirmpassword"
                        type="password"
                        onChange={(e)=>handleChange(e)}
                        autoComplete="new-password"
                        required
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full py-10 gap-x-6">
                <button
                  type="reset"
                  className="px-3 py-2 text-base font-semibold bg-gray-300 rounded-md shadow-sm text-slate-600 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-base font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
export default SignUp;