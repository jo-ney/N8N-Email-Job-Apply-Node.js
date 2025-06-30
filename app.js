const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post("/submit", async(req, res)=> {
    const email = req.body.email
    console.log(req.body.email)

    try {
        const response = await fetch('https://n8n-xaxl.onrender.com/webhook/email-job-apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
    
        const data = await response.text(); // or .json() if n8n returns JSON
        console.log('Response from n8n:', data);
        res.status(201).json({message: data})
      } catch (err) {
        console.error('Failed to send to n8n:', err.message);
        res.status(500).json({message: err.message})
      }
})

app.listen(5000, ()=>{
    console.log('http://localhost:5000')
})