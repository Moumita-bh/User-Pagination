// script.js

document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const paginationContainer = document.getElementById('pagination-container');
    const limit = 6;

    let currentPage = 1;

    const fetchData = async (page) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            displayUsers(data);
        } catch (error) {
            userContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    };

    const displayUsers = (users) => {
        userContainer.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Website:</strong> ${user.website}</p>
            `;
            userContainer.appendChild(userCard);
        });
    };

    const createPaginationButtons = (totalPages) => {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('pagination-button');
            button.innerText = i;
            button.addEventListener('click', () => {
                currentPage = i;
                fetchData(currentPage);
            });
            paginationContainer.appendChild(button);
        }
    };

    // Fetch the initial page
    fetchData(currentPage);
    // Assuming there are 2 pages as we have 10 users in total and we display 6 per page
    createPaginationButtons(2);
});
