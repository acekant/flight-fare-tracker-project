document.addEventListener('DOMContentLoaded', function () {
  const flightForm = document.getElementById('flightForm');
  const flightDataContainer = document.getElementById('flightData'); // Define flightDataContainer

  flightForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const departureAirportSelect = document.getElementById('departureAirport');
      const destinationAirportSelect = document.getElementById('destinationAirport');

      const departureAirport = departureAirportSelect.value;
      const destinationAirport = destinationAirportSelect.value;

      // Check if departure and destination are the same
      if (departureAirport === destinationAirport) {
          alert('Departure and destination cannot be the same. Please select different airports.');
          return;
      }

      // Call the function to fetch and display flight data
      fetchFlightData(departureAirport, destinationAirport, flightDataContainer);
  });

  function fetchFlightData(departureAirport, destinationAirport) {
    // Convert inputs to uppercase
    const uppercaseDeparture = departureAirport.toUpperCase();
    const uppercaseDestination = destinationAirport.toUpperCase();

    const apiUrl = `http://localhost:3000/api?departure=${uppercaseDeparture}&destination=${uppercaseDestination}`;

    fetch(apiUrl)
        .then(response => response.text())  // Get raw response text
        .then(dataText => {
            console.log('Raw data from API:', dataText);  // Log raw data
            return JSON.parse(dataText);  // Try to parse as JSON
        })
        .then(data => {
            console.log('Data after parsing:', data); // Log the parsed data
            displayFlightData(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            flightDataContainer.innerHTML = 'Error fetching flight data.';
        });
}

  
function displayFlightData(data) {
  // Clear previous data
  flightDataContainer.innerHTML = '';

  // Display flight data in the container
  const ul = document.createElement('ul');

  // Check if the data is an array
  if (Array.isArray(data)) {
      data.forEach(flight => {
          const li = document.createElement('li');
          li.textContent = `Flight ${flight.id || 'N/A'} from ${flight.departure || 'N/A'} to ${flight.destination || 'N/A'} - Vendor: ${flight.vendor || 'N/A'}, Price: ${flight.price || 'N/A'}`;
          ul.appendChild(li);
      });
  } else {
      // Log an error if the structure is unexpected
      console.error('Unexpected data structure:', data);
  }

  flightDataContainer.appendChild(ul);
}
});


