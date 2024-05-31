export async function getEvents() {
  try {
    const res = await fetch('http://localhost:3000/api/event');

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data;  // Return the fetched data

  } catch (error) {
    console.log('Error:', error, 'Could not fetch events');
    return [];  // Return an empty array or handle the error appropriately
  }
}
