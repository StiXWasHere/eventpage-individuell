import React from 'react';
import Link from "next/link";
import bookEvent from '@/api/bookEvent'
import unbookEvent from '@/api/unbookEvent';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

function EventCard({ event }) {

    const { isSignedIn, user, isLoaded } = useUser()
    const [userEmail, setUserEmail] = useState(null);
  
    useEffect(() => {
        if (isLoaded && user) {
            setUserEmail(user.primaryEmailAddress.emailAddress);
        }
    }, [isLoaded, user]);

    const handleBookEvent = async () => {
        try {
            await bookEvent(userEmail, event.id)
            window.location.reload()
        } catch (error) {
            console.error('Booking failed:', error)
        }
    }

    const handleUnbookEvent = async () => {
        try {
            await unbookEvent(userEmail, event.id)
            window.location.reload()
        } catch (error) {
            console.error('Unbooking failed:', error)
        }
    }

    const isUserAttending = event.attendees && event.attendees.includes(userEmail)
    const fullyBookedEvent = event.seats == 0

  return (
    <div className='event-card'>
        <div className='event-card-top'>
            <h2>{event.title}</h2>
            <div className='event-card-top-right'>
                <p className='event-text'>{event.date}</p>
                <p className='event-text'>{event.city}</p>
            </div>
            
        </div>
        
        <div className='event-card-center'>
            <p id='eventText'>{event.description}</p>
        </div>
        <div className='event-card-bottom'>
            <p>remaining spots: {event.seats}</p>
            <div className="event-card-bottom-right">
                <Link href={`/event-page/${event.id}`}>
                    <button className='event-reserve-btn'>MORE INFO</button>
                </Link>
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
  );
}

export default EventCard;