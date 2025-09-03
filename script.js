document.addEventListener('DOMContentLoaded', () => {
    // Paste your Google Sheet published CSV URLs here
    // Make sure they are published correctly as CSV
    const firstAidersUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiHfACNiF3WYMAMKhx2XHdUFP3ZPYx6DSJV7WW4EZzAsoolQE75HbZPNcgpCK56Sy7o9LVDmodesI/pub?gid=0&single=true&output=csv'; 
    const fireWardensUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYiHfACNiF3WYMAMKhx2XHdUFP3ZPYx6DSJV7WW4EZzAsoolQE75HbZPNcgpCK56Sy7o9LVDmodesI/pubhtml?gid=1769995281&single=true';

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
