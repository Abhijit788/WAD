import React from "react";
import { Card, CardBody, CardText } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from './V.module.css'
const VCSS = ({ event }) => {
  const navigate = useNavigate();
  
  const images=['../public/home/ngo2.jpeg','../public/home/ngo1.jpeg','../public/home/girlchildedu.webp','../public/home/ngo3.jpeg','../public/home/ngo4.jpeg','../public/home/mental_health.webp','../public/home/women.jpeg']
  const randomNumber = Math.floor(Math.random() * 7);
  return (
    <div className="equal-height-card">
    <Card
      key={event._id}
      onClick={() => {
        navigate(`/event/${event._id}`);
      }}
      className="my-3 p-3 rounded"
    >
      <CardBody>
        <div className={styles.a}>
        <Card.Img src={images[randomNumber]}    variant="top" 
        className={styles.b} />
        </div>

        <Card.Title
          as="div"
          className="product-title d-flex justify-content-center align-items-center"
        >
          {event.title}
        </Card.Title>
      </CardBody>
    </Card>
    </div>
  );
};

export default VCSS;
