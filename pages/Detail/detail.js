import "../../index.css";

document.addEventListener("DOMContentLoaded", function () {
  var addCartButton = document.querySelector(".Add_cart");
  if (addCartButton) {
    addCartButton.addEventListener("click", function () {
      window.location.href = "http://localhost:8080/cart/";
    });
  }
});

// 현재 페이지의 URL을 가져옴
const currentPageUrl = window.location.href;

// pages 폴더의 index.html 파일의 URL을 만듦
const pagesFolderUrl = currentPageUrl.replace(
  "/detail/index.html",
  "/pages/index.html"
);

// pages 폴더의 index.html 파일의 이미지 경로를 가져옴
fetch(pagesFolderUrl)
  .then((response) => response.text())
  .then((data) => {
    // 가져온 페이지의 HTML 코드에서 img 태그의 src를 추출
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const imgSrc = htmlDoc.querySelector("img").getAttribute("src");

    // detail 폴더의 index.html의 img 태그의 src를 변경
    document.getElementById("detailImage").src = imgSrc;
  })
  .catch((error) => console.error("Error:", error));
