// a.js
const apiUrl = 'http://localhost:3000/user';

const response_result = document.getElementById('response_result');

let yourToken = ''; // Variable to store the authentication token

async function registerUser() {
    const formData = new FormData(document.getElementById('registrationForm'));

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.success_message) {
            response_result.innerHTML = data.success_message;
            response_result.style.color = "green";
        }
        else {
            response_result.innerHTML = data.error_message;
            response_result.style.color = "red";
        }
        console.log(data);
    } catch (error) {
        console.error('Errorr:', error);
    }
}

// Encode a string using Base64
function encodeBase64(text) {
    return btoa(text);
}

// Decode a Base64-encoded string
function decodeBase64(encodedText) {
    try {
        return atob(encodedText);
    } catch (error) {
        console.error('Decoding Error:', error);
        throw error;
    }
}

async function loginUser() {
    const formData = new FormData(document.getElementById('loginForm'));

    try {
        // Show loading spinner or other user feedback
        // (optional but enhances user experience)

        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.success_message) {
            response_result.innerHTML = data.success_message;
            response_result.style.color = "green";
        }
        else {
            response_result.innerHTML = data.error_message;
            response_result.style.color = "red";
            return;
        }

        yourToken = encodeBase64(data.token); // Encode and store the token for future requests
        console.log(data.token);

        // To store the encoded token
        localStorage.setItem('user', yourToken);

        // Redirect to notes.html
        window.location.href = 'notes.html';

    } catch (error) {
        console.error('Error:', error.message);
        response_result.innerHTML = data.error_message;
        response_result.style.color = "red";
    }
}

async function fetchAndDisplayNotes() {
    try {
        // To retrieve the encoded token
        const encodedToken = localStorage.getItem('user');
        // console.log('Encoded Token:', encodedToken);

        if (!encodedToken) {
            // Redirect to the login page if token does not exist
            window.location.href = 'login.html';
        }

        const token = decodeBase64(encodedToken);
        // console.log('Decoded Token:',token);
        // Response
        const response = await fetch(`${apiUrl}/notes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (data.error_message) {
            localStorage.removeItem('userData');
            fetchNotes();
        }
        data.notes.forEach(note => {
            createCard(note.title, note.desc, note.date);
            // console.log(note.title, note.desc, note.date);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}


async function createNote() {
    const formData = new FormData(document.getElementById('newNoteForm'));

    try {
        const response = await fetch(`${apiUrl}/new-note`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${yourToken}`, // Include the token
            },
        });

        const data = await response.json();
        console.log(data.success_message);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Function to create and append a card
function createCard(title, description, date) {
    // Create elements
    var colDiv = document.createElement('div');
    var cardDiv = document.createElement('div');
    var cardBodyDiv = document.createElement('div');
    var cardTitle = document.createElement('h3');
    var cardText = document.createElement('p');
    var dateText = document.createElement('p');

    // Set class names
    colDiv.className = 'col-lg-4 col-md-6 col-12 mb-4';
    cardDiv.className = 'card';
    cardBodyDiv.className = 'card-body';
    cardTitle.className = 'card-title';
    cardText.className = 'card-text';
    dateText.className = 'card-text text-muted';

    // Set content
    cardTitle.textContent = title;
    cardText.textContent = description;
    dateText.textContent = date;

    // Append elements to the card body
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(dateText);

    // Append card body to the card
    cardDiv.appendChild(cardBodyDiv);

    // Append the card to the column
    colDiv.appendChild(cardDiv);

    // Append the column to the container
    document.getElementById('notesContainer').appendChild(colDiv);
}