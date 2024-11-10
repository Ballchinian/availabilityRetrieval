async function fetchData() {
    try {
        const response = await fetch('/.netlify/functions/app'); // Adjust URL if the function name differs
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const users = await response.json();

        mainInfo(users) 
        
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('data').textContent = 'Failed to load data';
    }
}



fetchData();