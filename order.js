let cart = {}; 

// Add item to cart
function addToCart(name, price) {
    if (!cart[name]) {
        cart[name] = { price: price, qty: 0 };
    }
    cart[name].qty += 1;  // Increase quantity by 1 on add
    updateOrder();  // Update the order summary
    updateProductQuantity(name);  // Update product quantity display
}

// Update quantity (increase or decrease)
function updateQuantity(name, price, change) {
    if (cart[name]) {
        cart[name].qty += change;

        // Prevent the quantity from going below 0
        if (cart[name].qty < 0) {
            cart[name].qty = 0;  // Reset to 0 if negative
        }

        // Update the displayed quantity
        updateProductQuantity(name);
        updateOrder();  // Update the order summary
    }
}

// Update the quantity on the product display (span)
function updateProductQuantity(name) {
    const quantityElement = document.getElementById(`${name.toLowerCase().replace(/ /g, '-')}-quantity`);
    if (quantityElement) {
        quantityElement.textContent = cart[name].qty;
    }
}

// Update the order table with the cart data
function updateOrder() {
    const tbody = document.querySelector('#orderTable tbody');
    tbody.innerHTML = '';  // Clear current order table

    let total = 0;

    // Loop through cart and display the items in the table
    for (let item in cart) {
        const qty = cart[item].qty;
        const price = cart[item].price;
        const row = `
            <tr id="row-${item}">
                <td>${item}</td>
                <td>
                    <button type="button" onclick="updateQuantity('${item}', ${price}, -1)">-</button>
                    <span id="qty-${item}">${qty}</span>
                    <button type="button" onclick="updateQuantity('${item}', ${price}, 1)">+</button>
                </td>
                <td>${qty * price}</td>
                <td><button type="button" onclick="removeFromCart('${item}')">Remove</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
        total += qty * price;
    }

    // Update total price in the order summary
    document.getElementById('totalPrice').textContent = total;

    // Save the cart and total in localStorage
    localStorage.setItem('currentCart', JSON.stringify(cart));
    localStorage.setItem('currentTotal', total);
}

// Remove item from cart
function removeFromCart(item) {
    delete cart[item];
    updateOrder();  // Update the order table after removal
}

// Save the current order to localStorage as a favourite
function saveOrderAsFavourite() {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
    alert('Order saved as a favourite!');
}

// Apply the saved favourite order to the current form and table
function applyFavouriteOrder() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (favouriteOrder) {
        cart = favouriteOrder;
        updateOrder();  // Refresh the order summary with the favourite order
        alert('Favourite order applied!');
    } else {
        alert('No favourite order found.');
    }
}

// Function to redirect to BuyNow page
function goToBuyNow() {
    window.location.href = 'BuyNow.html';
}

// Load saved cart from localStorage (if any) when the page loads
window.onload = () => {
    const savedCart = localStorage.getItem('currentCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateOrder();  // Refresh the order summary
    }
};
