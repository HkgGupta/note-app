// auth.js
let yourToken = '';

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

function setToken(token) {
    // encode token
    yourToken = encodeBase64(token);
    // save encoded token to localstorage
    localStorage.setItem('user', yourToken);
}

function getToken() {
    // get encoded token from localstorage
    const encodedToken = localStorage.getItem('user');
    if (!encodedToken) {
        // Redirect to the login page if token does not exist
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
    // Check if the token has an expiration date
    const decodedToken = decodeBase64(encodedToken);

    if (decodedToken.exp) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

        // Compare the expiration timestamp with the current timestamp
        if (decodedToken.exp < currentTimestamp) {
            // Token is expired, redirect to the login page
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            console.log("token expired");

            // Bootstrap Modal
            // Change modal body content
            modalBody.innerHTML = `<img src="../image/cross.png" width="100" alt="Success">` +
                `<h5 class="mt-3">Token expired</h5>`;
            // Change modal footer link
            // modalFooterLink.href = '../html/login.html';
            modalFooterLink.textContent = 'Relogin';
            bootstrapModel.show();
        }
    }

    return decodedToken;
}

export { setToken, getToken };
