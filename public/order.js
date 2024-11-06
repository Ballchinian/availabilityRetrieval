function mainInfo(users) {

    const dateCounts = {};
    users.forEach(user => {
        user.selectedDates.forEach((date, index) => {
            if (!dateCounts[date]) {
                dateCounts[date] = { count: 0, firstAppearance: index };
            }
            dateCounts[date].count++;
            dateCounts[date].firstAppearance = Math.min(dateCounts[date].firstAppearance, index);
        });
    });

    // Convert dateCounts object to an array and sort by count and then by firstAppearance
    const sortedDates = Object.entries(dateCounts)
        .map(([date, { count, firstAppearance }]) => ({ date, count, firstAppearance }))
        .sort((a, b) => b.count - a.count || a.firstAppearance - b.firstAppearance);

    // Display the sorted dates on the page
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = sortedDates.map(item => `
        <p>Date: ${item.date} (Count: ${item.count})</p>
    `).join('');
    }