const title = document.querySelector("#title");
const vendor = document.querySelector("#vendor");
const price = document.querySelector("#curr-price");
const compareAtPrice = document.querySelector("#prev-price");
const yellowBox = document.querySelector("#box1");
const greenBox = document.querySelector("#box2");
const blueBox = document.querySelector("#box3");
const pinkBox = document.querySelector("#box4");

const description = document.querySelector("#description");
const offer = document.querySelector("#offer");
const minusBtn = document.querySelector("#minusButton");
const plusBtn = document.querySelector("#plusButton");
const quantityEl = document.querySelector("#quantity");
const addBtn = document.querySelector("#addToCartButton");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

const productTitleEl = document.getElementById("product-title");
const productVendorEl = document.getElementById("product-vendor");
const productPriceEl = document.getElementById("product-price");
const productQuantityEl = document.getElementById("product-quantity");
const productColorEl = document.getElementById("product-color");
const productSizeEl = document.getElementById("product-size");


let productTitle;
let productVendor;
let productPrice;

const fetchProduct = async() => {
const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';

await fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let resData = response.json();
    return resData;
  })
  .then(data => {
    productTitle = data.product.title;
    console.log(productTitle);
    title.innerHTML = data.product.title;

    vendor.innerHTML = data.product.vendor;
    productVendor = data.product.vendor;

    price.innerHTML = data.product.price;
    productPrice = data.product.price;

    compareAtPrice.innerHTML = data.product.compare_at_price;
    
    let priceD = data.product.price;
    priceD = priceD.split("$")[1];

    let comparePrice = data.product.compare_at_price;
    comparePrice = comparePrice.split("$")[1];

    let calcOffer = ((Number(comparePrice) - Number(priceD)) / Number(comparePrice)) * 100;
    calcOffer = Math.round(calcOffer);

    offer.innerHTML = " " + calcOffer + "%";

    description.innerHTML = data.product.description;

  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
}

let count = 0; 

function updateCounter() {
    quantityEl.textContent = count;
}

plusBtn.addEventListener('click', function() {
  count++;
  productQuantityEl.textContent = "Quantity: " + count;
  updateCounter();
});

minusBtn.addEventListener('click', function() {
    if(count > 0){
        count--;
        productQuantityEl.textContent = "Quantity: " + count;
    }
  updateCounter();
});

updateCounter();

function checkSelected() {
    const radioButtons = document.querySelectorAll('input[name="size"]');

    let selectedOption = null;

    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            selectedOption = radioButton.value;
        }
    });

    if (selectedOption !== null) {
        console.log("Selected radio button value:", selectedOption);
    } else {
        console.log("No radio button selected.");
    }

    return selectedOption;
}

const setData = async () => {
    try {
        await fetchProduct();

        productTitleEl.innerHTML = "Product: " +  productTitle;
        productVendorEl.innerHTML = "Vendor: " + productVendor;
        productPriceEl.innerHTML = "Price: " + productPrice;

        yellowBox.addEventListener('click', function() {
           productColorEl.innerHTML = "Color: " + "Yellow";
           yellowBox.parentNode.style = "border: 2px solid #ECDECC";
           greenBox.parentNode.style = "border: none";
           blueBox.parentNode.style = "border: none";
           pinkBox.parentNode.style = "border: none";

        });

        greenBox.addEventListener('click', function() {
            productColorEl.innerHTML = "Color: " + "Green";
            yellowBox.parentNode.style = "border: none";
            greenBox.parentNode.style = "border: 2px solid #BBD278";
            blueBox.parentNode.style = "border: none";
            pinkBox.parentNode.style = "border: none";  
        });

         blueBox.addEventListener('click', function() {
            productColorEl.innerHTML = "Color: " + "Blue";
            yellowBox.parentNode.style = "border: none";
            greenBox.parentNode.style = "border: none";
            blueBox.parentNode.style = "border: 2px solid #BBC1F8"
            pinkBox.parentNode.style = "border: none";
        });

         pinkBox.addEventListener('click', function() {
            productColorEl.innerHTML = "Color: " + "Pink";
            yellowBox.parentNode.style = "border: none";
            greenBox.parentNode.style = "border: none"
            blueBox.parentNode.style = "border: none";
            pinkBox.parentNode.style = "border: 2px solid #FFD3F8"         
        });

        const size = checkSelected();

        productSizeEl.innerHTML = "Size: " + size;

    } catch (error) {
        console.error('Error setting data:', error);
    }
}

setData();


// Display Cart Message
addBtn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





