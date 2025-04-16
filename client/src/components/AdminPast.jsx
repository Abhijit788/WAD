import React, { useEffect, useState } from 'react'
import { getNGOPast } from '../utils/Api.post';
import {useSelector} from 'react-redux'
import VCSS from './VCSS.jsx'; // Import the Card component
import { Row,Col } from 'react-bootstrap'
import { Admincard } from './Admincard.jsx';

export const AdminPast = () => {
    const [Data,setData] = useState([]);
    const user = useSelector((state)=>state.auth.user);
    const fetchPastEvents=async()=>{
        const {data} = await getNGOPast({user});
        setData(data.events);
        console.log(Data);
    }
    useEffect(()=>{
      fetchPastEvents();
    },[])
  return (
    <>
      {Data?.map((event) => (
        <Col key={event._id} sm={12} md={6} lg={4} xl={4}> 
                       <Admincard event={event}/>
                       
         </Col>
     ))}
    </>
  )
}


