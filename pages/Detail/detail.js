import "../../index.css";

document.addEventListener("DOMContentLoaded", function () {
  var addCartButton = document.querySelector(".Add_cart");
  if (addCartButton) {
    addCartButton.addEventListener("click", function () {
      window.location.href = "http://localhost:8080/cart/";
    });
  }
});
