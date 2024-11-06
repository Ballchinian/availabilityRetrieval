function mainInfo(users) {

    const dateCounts = {};
    users.forEach(user => {
        user.selectedDates.forEach((date, index) => {
            if (!dateCounts[date]) {
                dateCounts[date] = { count: 0, firstAppearance: index, users: [] };
            }
            dateCounts[date].count++;
            dateCounts[date].firstAppearance = Math.min(dateCounts[date].firstAppearance, index);
            dateCounts[date].users.push(user.name); // Add user's name to the list for the date
        });
    });

    // Convert dateCounts object to an array and sort by count and then by firstAppearance
    const sortedDates = Object.entries(dateCounts)
        .map(([date, { count, firstAppearance, users }]) => ({ date, count, firstAppearance, users }))
        .sort((a, b) => b.count - a.count || a.firstAppearance - b.firstAppearance);

    // Display the sorted dates and associated users on the page
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = sortedDates.map(item => `
        <p><strong>Date: ${item.date} (Count: ${item.count})</strong></p>
        <ul>
            ${item.users.map(user => `<li>${user}</li>`).join('')}
        </ul>
    `).join('');
}