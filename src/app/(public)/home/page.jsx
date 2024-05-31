"use client"
import React from 'react'
import EventCard from '@/components/EventCard'
import Navbar from '@/components/Navbar'
import { getEvents } from '@/api/getEvents'
import { useEffect, useState } from 'react'

function landingPage() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    }

    fetchEvents();
  }, []);

  return (
    <>
    <Navbar/>
      <div className='landing-page'>
        
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
      </div>
    </>
  )
}

export default landingPage