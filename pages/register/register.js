// register.js

document.addEventListener("DOMContentLoaded", function () {
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

  const selectElement = document.querySelector(".itemCategory");

  fetch("http://kdt-sw-7-team03.elicecoding.com/api/categories", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const optionElement = document.createElement("option");
        optionElement.value = category._id;
        optionElement.text = category.name;
        selectElement.appendChild(optionElement);
      });

      selectElement.addEventListener("change", function () {
        itemCategory = selectElement.value;
      });
    })
    .catch((error) => {
      alert("카테고리 정보를 가져오는 중 오류 발생");
    });

  const registerBtn = document.querySelector(".registerBtn");

  registerBtn.addEventListener("click", function () {
    const itemName = document.querySelector(".itemName").value;
    const itemPrice = parseInt(document.querySelector(".itemPrice").value);
    const itemStock = parseInt(document.querySelector(".itemStock").value);

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("price", itemPrice);
    formData.append("stock", itemStock);
    formData.append("category", itemCategory);

    const imageInput = document.querySelector("#inputItem");
    const imageFile = imageInput.files[0];

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE - w";

    fetch("http://kdt-sw-7-team03.elicecoding.com/api/products/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        alert("상품 등록이 완료되었습니다!");
      })
      .catch((error) => {
        alert("제품 등록 중 오류가 발생했습니다.");
      });
  });
});
