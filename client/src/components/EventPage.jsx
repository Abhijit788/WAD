import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enterEvent, getEventDetail } from '../utils/Api.post';
import { Row, Col, Image, Card, Button, ListGroup, ListGroupItem, Container, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../utils/Toastify.js';


export const EventPage = () => {
    const [Details, setDetails] = useState({});
    const { id: eventId } = useParams();
    const navigate = useNavigate();

    const getDetails = async () => {
        try {
            const { data } = await getEventDetail(eventId);
            console.log(data);
            setDetails(data);
        } catch (error) {
            console.error('Error fetching event details:', error);
        }
    };
    const randomNumber = Math.floor(Math.random() * 2);
    const images=['../public/home/ngo2.jpeg','../public/home/ngo1.jpeg']
    useEffect(() => {
        getDetails();
    }, [eventId]);
    const user= useSelector((state)=>state.auth.user);
    const handleParticipate = async() => {
        console.log(user);
        const {data} = await enterEvent({
            userId: user._id,
            eventId,
        });
        
            toast(data.msg);
        
    };

    return (
        <>
            <Navbar />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <div>
                    <Row>
                        <Col md={5}>
                            <Image src={images[randomNumber]} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>{Details.title }</h3>
                                </ListGroupItem>
                                <ListGroupItem>Description:  {Details.description}</ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Date:</Col>
                                            <Col>
                                                <strong>{Details.date}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Location: {Details.location}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem className="d-flex justify-content-center">
                                        <Button className="btn-block" type="button" onClick={handleParticipate} >
                                            Participate
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        <ToastContainer/>
        </>
    );
};
