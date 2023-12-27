// ui.js

function formatDate(inputDate) {
    // Parse the input date string
    const dateParts = inputDate.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{1,2}):(\d{1,2}) (am|pm)/i);
    if (!dateParts) {
        return inputDate;
    }

    const day = parseInt(dateParts[1], 10);
    const month = parseInt(dateParts[2], 10) - 1; // Months are zero-based
    const year = parseInt(dateParts[3], 10);
    let hours = parseInt(dateParts[4], 10);
    const minutes = parseInt(dateParts[5], 10);
    const seconds = parseInt(dateParts[6], 10);
    const period = dateParts[7].toLowerCase();

    // Adjust hours for PM
    if (period === 'pm' && hours < 12) {
        hours += 12;
    }

    // Create a Date object
    const dateObj = new Date(year, month, day, hours, minutes, seconds);

    // Format the date and time
    const formattedDate = dateObj.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const newformattedDate = formattedDate.replace('at', '-');

    return newformattedDate;

}

function createCard(title, description, date) {
    const colDiv = document.createElement('div');
    const cardDiv = document.createElement('div');
    const cardBodyDiv = document.createElement('div');
    const cardTitle = document.createElement('h3');
    const cardText = document.createElement('p');
    const dateText = document.createElement('p');

    colDiv.className = 'col-lg-4 col-md-6 col-12 mb-4';
    cardDiv.className = 'card h-100 d-flex flex-column';
    cardBodyDiv.className = 'card-body d-flex flex-column';
    cardTitle.className = 'card-title';
    cardText.className = 'card-text flex-grow-1';
    dateText.className = 'card-text text-muted';

    cardTitle.textContent = title;
    cardText.textContent = description;
    dateText.textContent = date;

    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(dateText);

    cardDiv.appendChild(cardBodyDiv);
    colDiv.appendChild(cardDiv);

    document.getElementById('notesContainer').appendChild(colDiv);
}

export { formatDate, createCard };
