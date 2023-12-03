const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/')));

// Define the route to handle the API request
app.get('/api', async (req, res) => {
    try {
        const departureAirport = req.query.departure || '';
        const destinationAirport = req.query.destination || '';

        // Construct the URL to fetch data from the external API
        const apiUrl = `https://mini-project-api-three.vercel.app/?departure=${departureAirport}&destination=${destinationAirport}`;

        // Fetch data from the external API
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Send the fetched data as the response
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//






app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
