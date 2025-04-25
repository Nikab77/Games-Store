let cart = {}; 

// Add event listener for payment form submission
document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipcode = document.getElementById('zipcode').value;
    const country = document.getElementById('country').value;

    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Validate personal details (address, city, state, zip, country)
    if (!address || !city || !state || !zipcode || !country) {
        alert("Please fill in all the address fields.");
        return;
    }

    // Validate zip code (5 digits)
    if (zipcode.length !== 5 || isNaN(zipcode)) {
        alert("Invalid zip code. Please enter a 5-digit zip code.");
        return;
    }

    // Validate payment details (card number, expiry date, CVV)
    if (!cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all the payment details.");
        return;
    }

    // Validate ATM Card Number (16 digits)
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        alert("Invalid card number. Please enter a 16-digit card number.");
        return;
    }

    // Validate Expiry Date (MM/YY format)
    if (expiryDate.length !== 5 || !expiryDate.includes('/')) {
        alert("Invalid expiry date. Please use the format MM/YY.");
        return;
    }

    // Validate CVV (3 digits)
    if (cvv.length !== 3 || isNaN(cvv)) {
        alert("Invalid CVV. Please enter a 3-digit CVV.");
        return;
    }

    // If all validations pass, show success message and calculate delivery date
    showSuccessMessage();
    handlePayment();

    // Clear the form
    document.getElementById('paymentForm').reset();
});

// Show the Thank You message and calculate delivery date
function showSuccessMessage() {
    const thankYouMessage = document.getElementById('thank-you-message');
    const deliveryDate = document.getElementById('delivery-date');

    // Calculate delivery date (add 3 days)
    const today = new Date();
    const deliveryDateObj = new Date(today);
    deliveryDateObj.setDate(today.getDate() + 3);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDeliveryDate = deliveryDateObj.toLocaleDateString('en-US', options);

    deliveryDate.textContent = formattedDeliveryDate;
    thankYouMessage.style.display = 'block';  // Show the thank you message
}

// Handle payment, show thank you message with delivery date
function handlePayment() {
    // This function is now empty because the logic to show the message and calculate delivery
    // date is in showSuccessMessage().
}
