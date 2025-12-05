// --- DOM Element Selection ---
// Store references to DOM elements we'll need to interact with.
// This is more efficient than querying the DOM every time.
const quoteContainer = document.getElementById('quoteContainer');
const quoteButton = document.getElementById('quoteButton');

// --- API Interaction ---
/**
 * Fetches a random quote from the Quotable API.
 * @returns {Promise<string|null>} The quote content as a string, or null if an error occurs.
 */
async function getRandomQuote() {
    try {
        // Use the fetch API to make a request to the quotable.io endpoint.
        const response = await fetch('https://api.quotable.io/random');
        // If the response is not successful (e.g., 404 or 500), throw an error.
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response body.
        const data = await response.json();
        // Return the 'content' property from the response data.
        return data.content;
    } catch (error) {
        // Log the detailed error to the developer console for debugging.
        console.error('Error fetching quote:', error);
        // Return null to indicate that the fetch operation failed.
        return null;
    }
}

// --- DOM Manipulation ---
/**
 * Fetches a new quote and displays it on the page.
 * Handles both success and error cases for the API call.
 */
async function displayNewQuote() {
    const quote = await getRandomQuote();
    if (quote) {
        // On success, format the quote inside a paragraph tag and set it as the container's HTML.
		quoteContainer.innerHTML = `<p class="fs-1">"${quote}"</p>`;
    } else {
        // On failure, display a user-friendly error message.
        quoteContainer.innerHTML = `<p class="fs-4 text-danger">Failed to fetch a quote. Please try again.</p>`;
    }
}

// --- Event Listeners & Initial Load ---
// Add a click event listener to the button to fetch and display a new quote.
quoteButton.addEventListener('click', displayNewQuote);

// Immediately fetch and display a quote when the page first loads.
displayNewQuote();