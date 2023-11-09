import "../../index.css";

const inputItem = document.getElementById("inputItem");
const showItem = document.getElementById("showItem");

inputItem.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    showItem.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

const inputInfo = document.getElementById("inputInfo");
const showInfo = document.getElementById("showInfo");

inputInfo.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    showInfo.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.querySelector(".registerBtn");

  registerBtn.addEventListener("click", function () {
    const productName = document.querySelector(".itemName").value; // 상품 이름 입력 필드 값 가져오기
    const productPrice = parseInt(document.querySelector(".itemPrice").value); // 가격 입력 필드 값 가져오기
    const stock = parseInt(document.querySelector(".itemStock").value); // 재고 입력 필드 값 가져오기
    const description = document.querySelector(".itemDes").value; // 설명 입력 필드 값 가져오기

    const data = {
      "categories._id": 111,
      name: productName,
      price: productPrice,
      stock: stock,
      description: description,
      images: [showItem.src, showInfo.src],
    };

    fetch("http://kdt-sw-7-team03.elicecoding.com/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("상품 등록이 완료되었습니다!");
      })
      .catch((error) => {
        alert("제품 등록 중 오류가 발생했습니다.");
      });
    console.log(data);
  });
});
