async function getOneEvent(eventId) {
        try {
            const res = await fetch(`http://localhost:3000/api/event/${eventId}`)

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            return data

        } catch (error) {
            console.log('Error:', error, 'Could not fetch events')
            return []
        }
    }

export default getOneEvent

