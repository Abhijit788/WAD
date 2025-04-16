import React from 'react'
import styles from './V.module.css'
import { useNavigate } from 'react-router-dom'
export const V = ({event}) => {
  const navigate=useNavigate();

  return (
    <div >
        <div onClick={()=>{
            navigate(`/event/${event._id}`)
          }}
         className={styles.card}>
          <div className={styles.title}>{event.title}</div>
          <div className={styles.owner}>{event.owner}</div>
        </div>
    </div>
  )
}