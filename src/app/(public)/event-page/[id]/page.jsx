"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import { useParams } from 'next/navigation'
import getOneEvent from '@/api/getOneEvent'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import bookEvent from '@/api/bookEvent'
import { useUser } from '@clerk/nextjs'
import unbookEvent from '@/api/unbookEvent'

function page() {

    const [event, setEvent] = useState(null)
    const { isSignedIn, user, isLoaded } = useUser()
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        if (isLoaded && user) {
            setUserEmail(user.primaryEmailAddress.emailAddress);
        }
    }, [isLoaded, user]);
    
    const url = usePathname()
    const parts = url.split("/")
    const eventId = parts[parts.length - 1]
    
    useEffect(() => {

        const fetchEvent = async () => {
            const fetchedEvent = await getOneEvent(eventId)
            setEvent(fetchedEvent)
        }

        fetchEvent()
    }, [url])

    const handleUnbookEvent = async () => {
        try {
            await unbookEvent(userEmail, eventId)
            
            const updatedEvent = await getOneEvent(eventId)
            setEvent(updatedEvent);
        } catch (error) {
            console.error('Unbooking failed:', error)
        }
    }

    const handleBookEvent = async () => {
        try {
            await bookEvent(userEmail, eventId)
            
            const updatedEvent = await getOneEvent(eventId)
            setEvent(updatedEvent)
        } catch (error) {
            console.error('Booking failed:', error)
        }
    }

    if (!event) {
        return <div>Loading...</div>;
    }

    const isUserAttending = event.attendees && event.attendees.includes(userEmail)

    const fullyBookedEvent = event.seats == 0

    return (
    <>
    <Navbar/>
        <div className='event-page'>
            <div className="event-page-container">
                <div className="event-page-container-top">
                    <div className="event-page-container-top-left">
                        <img id='eventPageImg' src={event.imageUrl} alt={event.imageName} />
                        <div className="event-page-container-top-left-right">
                            <h1>{event.title}</h1>
                            <p>{event.city}</p>
                        </div>
                        
                    </div>
                    <div className="event-page-container-top-right">
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </div>
                    
                </div>
                <div className="event-page-container-center">
                    
                    <p>{event.description}</p>
                </div>
                <div className="event-page-container-bottom">
                    <p>remaining spots: {event.seats}</p>

                    {fullyBookedEvent ? (
                        <p id='bookedStatus'>Fully booked</p>
                    ) : (
                        isUserAttending ? (
                            <button className='event-unreserve-btn' onClick={handleUnbookEvent}>REMOVE BOOKING</button>
                        ) : (
                            <button className='event-reserve-btn' onClick={handleBookEvent}>RESERVE SPOT</button>
                        )
                    )}
                </div>
            </div>
        </div>
    </>
  )
}

export default page