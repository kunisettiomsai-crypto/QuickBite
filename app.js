// Sample data
const restaurants = [
  {
    id: "r1",
    name: "Spice Garden",
    description: "Indian specialities",
    menu: [
      { id: "m1", name: "Butter Chicken", price: 250 },
      { id: "m2", name: "Paneer Tikka", price: 180 },
      { id: "m3", name: "Garlic Naan", price: 40 }
    ]
  },
  {
    id: "r2",
    name: "Noodle House",
    description: "Asian fast food",
    menu: [
      { id: "m4", name: "Chicken Noodles", price: 210 },
      { id: "m5", name: "Veg Spring Roll", price: 80 },
      { id: "m6", name: "Momos", price: 120 }
    ]
  }
];

let currentRestaurant = null;
let cart = [];

// DOM references
const restaurantList = document.getElementById("restaurant-list");
const menuSection = document.getElementById("menu");
const menuTitle = document.getElementById("menu-title");
const menuList = document.getElementById("menu-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkout = document.getElementById("checkout");

// Render restaurant list
function renderRestaurants() {
  restaurantList.innerHTML = "";
  restaurants.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${r.name}</h3>
      <p>${r.description}</p>
      <button onclick="openMenu('${r.id}')">View Menu</button>
    `;
    restaurantList.appendChild(div);
  });
}

// Open menu
function openMenu(rid) {
  currentRestaurant = restaurants.find(r => r.id === rid);
  menuTitle.textContent = currentRestaurant.name;
  menuList.innerHTML = "";
  currentRestaurant.menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart('${item.id}')">Add</button>
    `;
    menuList.appendChild(div);
  });
  document.getElementById("restaurants").classList.add("hidden");
  menuSection.classList.remove("hidden");
}

// Go back
function goBack() {
  menuSection.classList.add("hidden");
  document.getElementById("restaurants").classList.remove("hidden");
}

// Add to cart
function addToCart(itemId) {
  const item = currentRestaurant.menu.find(m => m.id === itemId);
  const existing = cart.find(c => c.id === itemId);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

// Render cart
function renderCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No items yet</p>";
    cartTotal.textContent = "Total: ₹0";
    checkout.classList.add("hidden");
    return;
  }
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "row";
    const lineTotal = item.qty * item.price;
    total += lineTotal;
    div.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>₹${lineTotal} <button onclick="removeFromCart('${item.id}')">❌</button></span>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = "Total: ₹" + total;
  checkout.classList.remove("hidden");
}

// Remove item
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

// Place order
function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  if (!name || !address) {
    alert("Please enter name and address");
    return;
  }
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  alert(`✅ Order placed!\nName: ${name}\nAddress: ${address}\nItems: ${cart.length}\nTotal: ${cart.reduce((sum, i) => sum + i.qty * i.price, 0)}`);
  cart = [];
  renderCart();
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
}

// Initialize
renderRestaurants();
renderCart();
