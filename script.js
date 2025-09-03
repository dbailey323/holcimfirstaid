document.addEventListener('DOMContentLoaded', () => {
    // Paste your Google Sheet published CSV URLs here
    // Make sure they are published correctly as CSV
    const firstAidersUrl = 'YOUR_FIRST_AIDERS_CSV_URL'; 
    const fireWardensUrl = 'YOUR_FIRE_WARDENS_CSV_URL';

    const firstAidersList = document.getElementById('first-aiders-list');
    const fireWardensList = document.getElementById('fire-wardens-list');

    // Function to fetch and process data from a CSV URL
    async function fetchData(url, container) {
        try {
            const response = await fetch(url);
            const data = await response.text();
            
            // Simple CSV parsing
            const rows = data.trim().split('\n').slice(1); // Skip header row
            
            rows.forEach(row => {
                const [name, location] = row.split(','); // Assuming two columns
                
                const card = document.createElement('div');
                card.className = 'person-card';
                card.innerHTML = `<h3>${name.trim()}</h3><p>Location: ${location.trim()}</p>`;
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            container.innerHTML = '<p>Could not load data.</p>';
        }
    }

    // Call the function for both lists
    fetchData(firstAidersUrl, firstAidersList);
    fetchData(fireWardensUrl, fireWardensList);
});
