// api.js
//const apiUrl = 'http://localhost:3000/user';
const apiUrl = 'https://notes-app-backend-xt2o.onrender.com/user';

async function register(formData) {
    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
}

async function login(formData) {
    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            body: formData,
        });

        return await response.json();
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
}

async function fetchNotes(token) {
    try {
        const response = await fetch(`${apiUrl}/notes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch Notes Error:', error);
        throw error;
    }
}

async function fetchDetails(token) {
    try {
        const response = await fetch(`${apiUrl}/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Fetch Details Error:', error);
        throw error;
    }
}

async function createNote(formData, token) {
    try {
        const response = await fetch(`${apiUrl}/new-note`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Create Note Error:', error);
        throw error;
    }
}

export { register, login, fetchNotes, fetchDetails, createNote };
