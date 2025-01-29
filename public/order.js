function mainInfo(users) {
    const dateCounts = {};

    users.forEach(user => {
        user.selectedDates.forEach((date, index) => {
            if (!dateCounts[date]) {
                dateCounts[date] = { count: 0, users: [] };
            }
            dateCounts[date].count++;
            dateCounts[date].users.push({ name: user.name, id: user._id });
        });
    });

    const sortedDates = Object.entries(dateCounts)
        .map(([date, { count, users }]) => ({ date, count, users }))
        .sort((a, b) => b.count - a.count);

    const maxCount = sortedDates.length ? sortedDates[0].count : 0;

    const dropdown = document.getElementById("userCountFilter");
    dropdown.innerHTML = Array.from({ length: maxCount }, (_, i) => 
        `<option value="${maxCount - i}">${maxCount - i} Users</option>`
    ).join("");

    dropdown.addEventListener("change", function () {
        updateDisplayedDates(sortedDates, parseInt(this.value));
    });

    updateDisplayedDates(sortedDates, maxCount);
}

function updateDisplayedDates(sortedDates, selectedCount) {
    const dataContainer = document.getElementById('data');
    const filteredDates = sortedDates.filter(item => item.count === selectedCount);

    dataContainer.innerHTML = filteredDates.map(item => generateDateHTML(item)).join('');
}

function generateDateHTML(item) {
    return `
        <div class="date-box">
            <p><strong>Date: ${item.date} (${item.count} people)</strong></p>
            <ul>
                ${item.users.map(user => `
                    <li>
                        ${user.name}
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}
