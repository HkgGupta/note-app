// main.js
import { register, login, fetchNotes, fetchDetails, createNote } from './api.js';
import { setToken, getToken } from './auth.js';
import { createCard, formatDate } from './ui.js';

const apiUrl = 'https://notes-app-backend-xt2o.onrender.com/user';

export const registerUser = async () => {
    const formData = new FormData(document.getElementById('registrationForm'));
    console.log(formData);
    try {
        const data = await register(formData);

        const bootstrapModel = new bootstrap.Modal(document.getElementById('bootstrapModel'));
        const modalBody = document.querySelector('#bootstrapModel .modal-body');
        const modalFooterLink = document.querySelector('#bootstrapModel .modal-footer a');

        if (data.success_message) {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/tick.png" width="100" alt="Success">` +
                `<h5 class="mt-3">${data.success_message}</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/login.html';
            modalFooterLink.textContent = 'Login';
            reg_modal.show();
        } else if (data.error_message == "User already exists") {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Success">` +
                `<h5 class="mt-3">${data.error_message}</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/login.html';
            modalFooterLink.textContent = 'Login';
            bootstrapModel.show();
        } else {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Success">` +
                `<h5 class="mt-3">Something is missing!</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/registration.html';
            modalFooterLink.textContent = 'Retry';
            bootstrapModel.show();
        }

        console.log(data);
    } catch (error) {
        // Bootstrap Modal
        // Change modal body content
        modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Success">` +
            `<h5 class="mt-3">Something Went Wrong</h5>`;
        // Change modal footer link
        modalFooterLink.href = '../html/registration.html';
        modalFooterLink.textContent = 'Retry';
        bootstrapModel.show();
        console.error('Registration Error:', error);
    }
};

export const loginUser = async () => {

    const formData = new FormData(document.getElementById('loginForm'));
    try {
        const bootstrapModel = new bootstrap.Modal(document.getElementById('bootstrapModel'));
        const modalBody = document.querySelector('#bootstrapModel .modal-body');
        const modalFooterLink = document.querySelector('#bootstrapModel .modal-footer a');
        const data = await login(formData);

        if (data.success_message) {

            setToken(data.token);

            // window.location.href = 'notes.html';

            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/tick.png" width="100" alt="Success">` +
                `<h5 class="mt-3">${data.success_message}</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/notes.html';
            modalFooterLink.textContent = 'See Notes';
            bootstrapModel.show();
        } else {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Failed">` +
                `<h5 class="mt-3">${data.error_message}</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/login.html';
            modalFooterLink.textContent = 'Retry';
            bootstrapModel.show();
        }

    } catch (error) {
        console.error('Login Error:', error.message);
        // Bootstrap Modal
        // Change modal body content
        modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Failed">` +
            `<h5 class="mt-3">Login Error</h5>`;
        // Change modal footer link
        modalFooterLink.href = '../html/login.html';
        modalFooterLink.textContent = 'Retry';
        bootstrapModel.show();
    }
};

export const fetchAndDisplayNotes = async () => {
    try {
        const token = getToken();

        const data = await fetchNotes(token);
        const userDetails = await fetchDetails(token);

        if (data && Array.isArray(data) && data.length === 0) {
            console.log("No notes added yet.");
        }

        if (data.error_message || userDetails.error_message) {
            localStorage.removeItem('user');
            window.location.href = "../html/login.html";
        }

        const photo = userDetails.success_message.photo;
        document.getElementById('profile-image').src = "data:" + photo[0].mimetype + ";base64," + photo[0].data;

        data.notes.forEach(note => {
            const noteDate = formatDate(note.date);
            createCard(note.title, note.desc, noteDate);
        });
    } catch (error) {
        console.error('Fetch Notes Error:', error);

    }
};

export const createNewNote = async () => {
    const formData = new FormData(document.getElementById('newNoteForm'));

    try {
        const token = getToken();

        const data = await createNote(formData, token);
        const bootstrapModel = new bootstrap.Modal(document.getElementById('bootstrapModel'));
        const modalBody = document.querySelector('#bootstrapModel .modal-body');
        const modalFooterLink = document.querySelector('#bootstrapModel .modal-footer a');

        if (data.error_message) {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" height="100" alt="Error">` +
                `<h5 class="mt-3">Failed to add New Note</h5>`;
            // Remove user
            localStorage.removeItem('user');
            // Change modal footer link
            modalFooterLink.href = '../html/new-note.html';
            modalFooterLink.textContent = 'Relogin';
            bootstrapModel.show();
        }

        if (data.success_message) {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/tick.png" width="100" height="100" alt="Done">` +
                `<h5 class="mt-3">New Note Added</h5>`;
            // Change modal footer link
            modalFooterLink.href = '../html/notes.html';
            modalFooterLink.textContent = 'View Notes';
            bootstrapModel.show();
        }

    } catch (error) {
        console.error('Create Note Error:', error);
    }
};

export const fetchUserDetails = async () => {

    try {

        const token = getToken();
        const data = await fetchDetails(token);

        const bootstrapModel = new bootstrap.Modal(document.getElementById('bootstrapModel'));
        const modalBody = document.querySelector('#bootstrapModel .modal-body');
        const modalFooterLink = document.querySelector('#bootstrapModel .modal-footer a');

        if (data.error_message) {
            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" height="100" alt="Error">` +
                `<h5 class="mt-3">User Not Found</h5>`;
            localStorage.removeItem('user');
            // Change modal footer link
            modalFooterLink.href = '../html/login.html';
            modalFooterLink.textContent = 'Relogin';
            bootstrapModel.show();
        }

        if (data.success_message) {
            const name = data.success_message.name;
            const email = data.success_message.email;
            const phone = data.success_message.phone;
            const photo = data.success_message.photo;

            let createdAt = new Date(data.success_message.createdAt);
            createdAt = createdAt.toLocaleString('en-IN');
            let updatedAt = new Date(data.success_message.updatedAt);
            updatedAt = updatedAt.toLocaleString('en-IN');

            document.getElementById('name').value = name;
            document.getElementById('email').value = email;
            document.getElementById('phone').value = phone;
            document.getElementById('profile-name').innerHTML = name;
            document.getElementById('createdAt').innerHTML = "Account Created: " + createdAt;
            document.getElementById('updatedAt').innerHTML = "Last Updated: " + updatedAt;
            document.getElementById('profile-image').src = "data:" + photo[0].mimetype + ";base64," + photo[0].data;
        }
    } catch (error) {
        modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Error">` +
            `<h5 class="mt-3">User Not Found</h5>`;
        localStorage.removeItem('user');
        // Change modal footer link
        modalFooterLink.href = '../html/login.html';
        modalFooterLink.textContent = 'Relogin';
        bootstrapModel.show();
    }

}

