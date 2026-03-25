let cart;
const saved = localStorage.getItem("cart");
if (saved) {
  cart = JSON.parse(saved);
} else {
  cart = [];
}

function addToCart(name, price) {
  const currentItem = cart.find((item) => item.name === name);
  if (currentItem) {
    currentItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  updateCart();
}

function decreaseQuantity(name) {
  const currentItem = cart.find((item) => item.name === name);
  if (currentItem.quantity > 1) {
    currentItem.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.name !== name);
  }
  saveCart();
  updateCart();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  saveCart();
  updateCart();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cartItems = document.getElementById("cartitems");
  const cartTotal = document.getElementById("carttotal");
  const cartCount = document.getElementById("cartcount");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    if (cart.length === 0) {
      cartItems.innerHTML = "<p class='emptycart'>Your cart is empty.</p>";
    }
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cartitem");
      cartItem.innerHTML = `
  <span>${item.name}</span>
  <div class="quantitycontrols">
    <span>$${(item.price * item.quantity).toFixed(2)}</span>
    <button onclick="decreaseQuantity('${item.name}')">-</button>
    <span>${item.quantity}</span>
    <button onclick="addToCart('${item.name}', ${item.price})">+</button>
    <button class="removebtn" onclick="removeFromCart('${
      item.name
    }')">X</button>
  </div>
`;
      cartItems.appendChild(cartItem);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = "Total: $" + total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

updateCart();
