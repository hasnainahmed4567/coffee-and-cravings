const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click",() => {
    // Toggle mobile menu visibility
document.body.classList.toggle("show-mobile-menu");
});

// close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// close menu when the nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", ()=> menuOpenButton.click());
});








// ===== CART SCRIPT =====

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =============== ADD TO CART FUNCTION ===============
function addToCart(name, price) {
  // Check if item already exists
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1; // increase quantity
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Optional: Alert message
  alert(`${name} added to cart!`);

  // Redirect to cart page (optional)
//   window.location.href = "cart.html";
}

// =============== DISPLAY CART FUNCTION ===============
function displayCart() {
  const cartBody = document.getElementById("cart-body");
  const totalEl = document.getElementById("total");

  if (!cartBody || !totalEl) return; // prevent errors

  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>
          <button onclick="updateQuantity(${index}, -1)">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${index}, 1)">+</button>
        </td>
        <td>Rs ${itemTotal}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
    cartBody.insertAdjacentHTML("beforeend", row);
  });

  totalEl.textContent = `Rs ${total}`;
}

// =============== UPDATE QUANTITY FUNCTION ===============
function updateQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // remove if quantity 0
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// =============== REMOVE ITEM FUNCTION ===============
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// =============== CLEAR CART FUNCTION ===============
function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  displayCart();
}

// =============== PLACE ORDER FUNCTION ===============
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you! Your order has been placed successfully.");
  clearCart();
}

// Call displayCart() on cart.html page load
window.onload = displayCart;