async function fetchData() {
    try {
        const response = await fetch('/.netlify/functions/app'); // Adjust URL if the function name differs
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Display the data on the page
        console.log(user.selectedDates);
        console.log(user.names);
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('data').textContent = 'Failed to load data';
    }
}

fetchData();