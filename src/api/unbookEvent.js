import React from 'react'

async function unbookEvent(email, eventId) {
    try {
        const res = await fetch(`http://localhost:3000/api/avbookning`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, eventId})
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default unbookEvent