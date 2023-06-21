//filter function using jquery library
$(function() {
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault()
        let category = $(this).data('filter')
        console.log(category)
        //all filter
        if(category === 'all') {
            $("[data-category").removeClass("hide") 
            
        } else {
            $("[data-category").each(function() {
                //get value of category in cards. we get all 6
                let productCategory = $(this).data('category');
                if(productCategory !== category) {
                    $(this).addClass('hide')
                } else {
                    $(this).removeClass('hide')
                }
               })
        }
       
    })
}) 

//Shopping cart
//Select elements
const productsEl = document.querySelector(".render-products");
const cartElementsEl = document.querySelector(".cart-products");
const totalItemsInCart = document.querySelector('.item-qty')
const basketTotal = document.querySelector('.basketTotal')

//Render products
function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <div class="col" data-category='${product.dataCategory}'>
    <div class="card mb-4 rounded-3 shadow-sm">
      <div class="card-body" >
          <img src="${product.imgSrc}" width="100%">
          <h5>${product.name}</h5>
          <p>${product.price}</p>
          <p>${product.description}</p>
        <button type="button" class="w-100 btn btn-lg btn-add-to-cart" onClick="addToCart(${product.id})">Add to cart</button>
      </div>
    </div>
  </div>
    `
  })
}

renderProducts()

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//Add to cart
function addToCart(id) {
  // check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    alert("Product already in cart!")
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

//update Cart
function updateCart() {
  renderCartItems();
  renderSubTotal()
  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubTotal () {
  let totalItems = 0;
  let totalPrice = 0;
  
  cart.forEach((item) => {
    totalItems += item.numberOfUnits;
    totalPrice += item.price * item.numberOfUnits
  })

  totalItemsInCart.innerHTML = totalItems;
  basketTotal.innerHTML = `${totalPrice.toFixed(2)}`
}

//Render Cart items
function renderCartItems() {
  cartElementsEl.innerHTML= "";
  cart.forEach((item) => {
    cartElementsEl.innerHTML += `
    <div class="allProducts">
            <div class="product">
            <svg class="remove-icon" onclick="removeItemFromCart(${item.id})" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
<img class="cart-img" src="${item. imgSrc}">
<span class="product-name"> ${item.name}</span>
            </div>
            <div class="price">${item.price}</div> 
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})"><svg class="add-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
              </svg></div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})"><svg class="remove-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg></div>           
            </div> 
         <div class="total">${(item.numberOfUnits * item.price).toFixed(2)}</div>  
        </div> 
    `
  })
  
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}







