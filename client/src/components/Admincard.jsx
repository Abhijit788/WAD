import React from 'react'
import { Card, CardBody, CardText } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export const Admincard = ({event}) => {
    const navigate = useNavigate();
  return (
    <Card key={event._id} onClick={()=>{
        navigate(`/admin/${event._id}`)
      }} className='my-3 p-3 rounded'>
      <CardBody >
      <Card.Img src="../public/home/ngo2.jpeg" variant="top"/>
  
              <Card.Title as='div' className='product-title d-flex justify-content-center align-items-center'>
                {event.title}
                  </Card.Title>
              
       </CardBody>  
      </Card>
  )
}
