fetch('http://localhost:5000/api/v1/events', {
  method: 'POST', 
  headers: {'Content-Type': 'application/json'}, 
  body: JSON.stringify({})
})
.then(async r => {
  console.log("Status:", r.status);
  const text = await r.text();
  console.log("Response Body:", text);
})
.catch(console.error)