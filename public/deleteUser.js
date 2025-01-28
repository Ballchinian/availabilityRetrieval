async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    console.log("Deleting user with ID:", userId); // Debugging log

    try {
        const response = await fetch('/.netlify/functions/app', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ userId })  // Ensure correct JSON format
        });

        if (!response.ok) throw new Error('Failed to delete user');
        const result = await response.json();
        alert(result.message);

        // Reload data to reflect changes
        fetchData();
    } catch (error) {
        console.error('Delete error:', error);
        alert('Error deleting user. Please try again.');
    }
}