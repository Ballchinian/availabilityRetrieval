function mainInfo(users) {

    const dateCounts = {};
    users.forEach(user => {
        user.selectedDates.forEach((date, index) => {
            if (!dateCounts[date]) {
                dateCounts[date] = { count: 0, firstAppearance: index, users: [] };
            }
            dateCounts[date].count++;
            dateCounts[date].firstAppearance = Math.min(dateCounts[date].firstAppearance, index);

            const userId = user._id ? user._id.toString() : "MISSING_ID"; 
            console.log(`Processing user: ${user.name}, ID: ${userId}`);
            dateCounts[date].users.push({ name: user.name, id: userId });
        });
    });

    // Convert dateCounts object to an array and sort by count and then by firstAppearance
    const sortedDates = Object.entries(dateCounts)
        .map(([date, { count, firstAppearance, users }]) => ({ date, count, firstAppearance, users }))
        .sort((a, b) => b.count - a.count || a.firstAppearance - b.firstAppearance);

    // Display the sorted dates and associated users on the page
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = sortedDates.map(item => `
        <p><strong>Date: ${item.date}</strong></p>
        <ul>
            ${item.users.map(user => `
                <li>
                    ${user.name}
                    <button onclick="deleteUser('${user.id}')">Delete</button>
                </li>
            `).join('')}
        </ul>
    `).join('');
}