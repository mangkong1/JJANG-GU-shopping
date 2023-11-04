function returnMain() {
  var currentUrl = window.location.href;
  var newUrl = currentUrl.replace("/order-finish/", "/");
  window.location.href = newUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  var addReturnButton = document.querySelector(".Return_main");
  if (addReturnButton) {
    addReturnButton.addEventListener("click", returnMain);
  }
});
