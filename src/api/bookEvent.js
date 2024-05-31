import React from 'react'

async function bookEvent(email, eventId) {
    try {
        const res = await fetch(`http://localhost:3000/api/booking`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, eventId})
        })
        const data = await res.json({ email, eventId })
        return data
    } catch (error) {
        console.log(error)
    }
}

export default bookEvent