import "../../index.css";

function addCart() {
  var currentUrl = window.location.href;
  var newUrl = currentUrl.replace("/detail/", "/cart/");
  window.location.href = newUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  var addCartButton = document.querySelector(".Add_cart");
  if (addCartButton) {
    addCartButton.addEventListener("click", addCart);
  }
});
