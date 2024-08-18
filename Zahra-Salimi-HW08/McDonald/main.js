let minusButtons = document.querySelectorAll(".minus");
let plusButtons = document.querySelectorAll(".plus");
let sumNumberElements = document.querySelectorAll(".sum_number");
let priceElements = document.querySelectorAll(".price");
let sums = document.querySelectorAll(".sum");
let orderPrices = document.querySelector("#orderPrices");
let ServiceFees = document.querySelector("#ServiceFees");
let Discount = document.querySelector("#discount");
Discount.innerText = 0 + " " + "درصد";
let discountInput = document.querySelector("#discountInput");
let discountSubmit = document.querySelector("#discountSubmit");
let takhfif = document.querySelector(".final");
let finalPrice = document.querySelector("#finalPrice");
let finalSubmit = document.querySelector("#finalSubmit");
let modal = document.getElementById("modal");
const overlay = document.getElementById('overlay');
let foodArray = [];
let sumOrders = 0;
let serviceFee = 0;
let resultDiscount = 0;


function createArray() {
  for (let index = 0; index < 10; index++) {
    let price = Number(priceElements[index].innerText.replace(" تومان", ""));
    obj = { uid: index + 1, Price: price, SumNumber: 0, SumPrice: 0 };
    foodArray.push(obj);
  }
  console.log(foodArray);
}

function sum() {
  sumOrders = foodArray.reduce((total, item) => total + item.SumPrice, 0);
  orderPrices.innerText = sumOrders + " " + "تومان";
}

function service() {
  serviceFee = 0;
  let numbers = 0;
  for (const element of foodArray) {
    numbers += element.SumNumber;
  }
  serviceFee = numbers * 400;
  ServiceFees.innerText = serviceFee + " " + "تومان";
}

function discount() {
  //   Discount.innerText = 0 + " " + "درصد";

  if (discountInput.value === "gold") {
    resultDiscount = 0;
    Discount.innerText = 30 + " " + "درصد";
    resultDiscount = sumOrders - sumOrders * 0.3;
  } else if (discountInput.value === "silver") {
    resultDiscount = 0;
    Discount.innerText = 20 + " " + "درصد";
    resultDiscount = sumOrders - sumOrders * 0.2;
  } else if (discountInput.value === "bronze") {
    resultDiscount = 0;
    Discount.innerText = 10 + " " + "درصد";
    resultDiscount = sumOrders - sumOrders * 0.1;
  } else if (discountInput.value === "0") {
    resultDiscount = 0;
    Discount.innerText = 0 + " " + "درصد";
    resultDiscount = sumOrders;
  } else {
    // err.style.display = "block";
    // correct.style.display = "none";
  }
  finalPrice.innerText = resultDiscount + serviceFee + " " + "تومان";
}

function final() {
  finalPrice.innerText = 0 + " " + "تومان";
  finalPrice.innerText = sumOrders + serviceFee + " " + "تومان";
}

function saveToLocalStorage() {
  localStorage.setItem('foodArray', JSON.stringify(foodArray));
}

function loadFromLocalStorage() {
  const storedFoodArray = localStorage.getItem('foodArray');
  if (storedFoodArray) {
    foodArray = JSON.parse(storedFoodArray);
    updateUI();
  }
}

function updateUI() {
  foodArray.forEach((item, index) => {
    sumNumberElements[index].innerText = item.SumNumber;
    sums[index].innerText = item.SumPrice + " تومان";
  });
  sum();
  service();
  final();
}

// call functions first
createArray();
loadFromLocalStorage();
sum();
service();
final();

// on clicks
minusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let index = button.parentNode.dataset.index;
    let sumNumberElement = button.nextElementSibling;
    for (const el of foodArray) {
      if (index == el.uid) {
        if (el.SumNumber === 0) {
          sum();
          service();
          final();
          break;
        } else {
          el.SumNumber--;
          sumNumberElement.innerText = el.SumNumber;
          el.SumPrice = el.SumPrice - el.Price;
          sums[index - 1].innerText = el.SumPrice + " تومان";
          console.log(foodArray);
          sum();
          service();
          final();
          break;
        }
      }
    }
    saveToLocalStorage();
  });
});

plusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let index = button.parentNode.dataset.index;
    let sumNumberElement = button.previousElementSibling;
    for (const el of foodArray) {
      if (index == el.uid) {
        el.SumNumber++;
        sumNumberElement.innerText = el.SumNumber;
        el.SumPrice = el.SumPrice + el.Price;
        sums[index - 1].innerText = el.SumPrice + " تومان";
        console.log(foodArray);
        sum();
        service();
        final();
        break;
      }
    }
    saveToLocalStorage();
  });
});

discountSubmit.addEventListener("click", function () {
  sum();
  service();
  discount();
  discountInput.value = "";
  // saveToLocalStorage();
});

finalSubmit.addEventListener('click', function() {
  let container=document.getElementById('container');
  foodArray.forEach(item => {
    item.SumNumber = 0;
    item.SumPrice = 0;
  });
  updateUI();
  localStorage.removeItem('foodArray');
  Discount.innerText = 0 + " " + "درصد";
  modal.style.display = 'block';
  overlay.style.display = 'block';
});

modal.addEventListener('click', function() {
  overlay.style.display = 'none';
  modal.style.display = 'none';
  
});