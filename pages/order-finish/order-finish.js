function returnMain() {
  var currentUrl = window.location.href;
  var newUrl = currentUrl.replace("/order-finish/", "/");
  window.location.href = newUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  var addReturnButton = document.querySelector(".returnMain");
  if (addReturnButton) {
    addReturnButton.addEventListener("click", returnMain);
  }
});

function returnPurchase() {
  var currentUrl = window.location.href;
  var newUrl = currentUrl.replace("/order-finish/", "/purchase/");
  window.location.href = newUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  var addReturnButton = document.querySelector(".returnPurchase");
  if (addReturnButton) {
    addReturnButton.addEventListener("click", returnPurchase);
  }
});
