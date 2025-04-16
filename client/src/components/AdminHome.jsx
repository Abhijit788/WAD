import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { newEvent } from "../utils/Api.post";
import {useSelector} from 'react-redux';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../utils/Toastify.js';
function AdminHome() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    eventtype: "",
    user:"",
  });
  const user= useSelector((state)=>state.auth.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...values,user};
    const {data} = await newEvent(formData);
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    } else {
      toast("New Event Posted");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // setValues({ ...values, [e.target.name]: e.target.value });
    // const { name, value, type, checked } = e.target;
    // const newValue = type === "radio" ? (checked ? value : "") : value;
    // setValues({ ...values, [name]: newValue });
  };

  return (
    <>
    <div className="signup-card card border  p-4">
      <div className="card border border-primary">
        <div className="card-header bg-primary text-white text-center">
          Admin
        </div>
        <div className="card-body bg-gray">
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                id="title"
                name="title"
                placeholder="Enter event name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event decription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                id="description"
                name="description"
                placeholder="Enter event description"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event date</Form.Label>
              <Form.Control
                type="date"
                placeholder="date"
                id="date"
                name="date"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                id="location"
                name="location"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {/* <Form.Label>Example textarea</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3} 
              type="text"
                placeholder="Address"
                id="place"
                name="place"
                onChange={(e) => {
                  handleChange(e);
                }}
              /> */}
            </Form.Group>
            <h3>What are you organizing ? </h3>
            <Form.Group className="mb-3">
              <Form.Check // prettier-ignore
                type="radio"
                id="eventtype1"
                name="eventtype"
                label="Event"
                value="Event"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <Form.Check // prettier-ignore
                type="radio"
                id="eventtype2"
                name="eventtype"
                value="Drive"
                label="Drive"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
            {/* {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Drive"
                  name="type"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Event"
                  name="type"
                  type={type}
                  id={`inline-${type}-2`}
                />
              </div>
            ))} */}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}

export default AdminHome;
