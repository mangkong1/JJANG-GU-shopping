import "../../index.css";

let itemCategory = "";

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
  // 여기서 selectElement를 정의하고 가져오기
  const selectElement = document.querySelector(".itemCategory");

  // Fetch 카테고리 정보
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/categories", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((categories) => {
      // 카테고리 정보를 받아온 후 옵션을 생성하여 select에 추가
      categories.forEach((category) => {
        const optionElement = document.createElement("option");
        optionElement.value = category._id;
        optionElement.text = category.name;
        selectElement.appendChild(optionElement);
      });
      // 카테고리 선택 변경 이벤트 리스너 추가
      selectElement.addEventListener("change", function () {
        itemCategory = selectElement.value;
      });
    })
    .catch((error) => {
      alert("카테고리 정보를 가져오는 중 오류 발생");
    });

  const registerBtn = document.querySelector(".registerBtn");

  registerBtn.addEventListener("click", function () {
    const itemName = document.querySelector(".itemName").value; // 상품 이름 입력 필드 값 가져오기
    const itemPrice = parseInt(document.querySelector(".itemPrice").value); // 가격 입력 필드 값 가져오기
    const itemStock = parseInt(document.querySelector(".itemStock").value); // 재고 입력 필드 값 가져오기

    const data = {
      name: itemName,
      price: itemPrice,
      stock: itemStock,
      category: itemCategory,
      images: ["", ""],
    };

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE - w";

    fetch("http://kdt-sw-7-team03.elicecoding.com/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  });
});
