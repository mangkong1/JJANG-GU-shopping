const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE-w";
function deleteItem(id) {
  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error(res.status, res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      alert("상품 삭제가 완료되었습니다!");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/products")
    .then((response) => response.json())
    .then((data) => {
      const buyList = document.querySelector(".buyList");

      data.forEach((item) => {
        const newItem = document.createElement("div");
        newItem.classList.add("py-[20px]", "flex", "items-center");
        newItem.innerHTML = `
              <img
                class="mx-[40px] rounded-[15px] w-[115px] h-[115px]"
                src="/imgs/sss.jpeg"
                alt="사진"
              />
              <p class="w-[150px] mx-[3px]">
                ${item.name}
                <br />
                <span class="text-gray400">
                ${item.category[0].name}
                </span>
              </p>
              <p class="mx-[150px]">${item.price}</p>
              <button
                type="submit"
                class="modifyBtn mx-[15px] w-[98px] h-[38px] bg-white rounded-[50px] border border-black"
              >
                수정
              </button>
              <button
                class="deleteBtn mx-[15px] w-[98px] h-[38px] bg-white rounded-[50px] border border-black"
              >
                삭제
              </button>
            `;
        buyList.appendChild(newItem);

        const deleteBtn = newItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
          deleteItem(item._id);
          buyList.removeChild(newItem);
        });

        const modifyCheckPopup = document.querySelector("#modifyCheckPopup");
        const popupBg = document.querySelector(".popupBg");

        const modifyBtns = document.querySelectorAll(".modifyBtn");
        modifyBtns.forEach((modifyBtn) => {
          modifyBtn.addEventListener("click", (e) => {
            e.preventDefault();

            modifyCheckPopup.classList.remove("hidden");
            popupBg.classList.remove("hidden");
            window.scroll({ top: 0, behavior: "smooth" });
          });
        });

        const inputItem = document.querySelector(".inputItem");
        const showItem = document.querySelector(".showItem");

        inputItem.addEventListener("change", (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            showItem.src = e.target.result;
          };

          reader.readAsDataURL(file);
        });

        const inputInfo = document.querySelector(".inputInfo");
        const showInfo = document.querySelector(".showInfo");

        inputInfo.addEventListener("change", (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
            showInfo.src = e.target.result;
          };

          reader.readAsDataURL(file);
        });

        const popupBtnBack = document.querySelector(".popupBtns button:first-child");
        const popupBtnChange = document.querySelector(".popupBtns button:last-child");

        function hiddenPopup() {
          modifyCheckPopup.classList.add("hidden");
          popupBg.classList.add("hidden");
        }

        popupBtnBack.addEventListener("click", () => {
          hiddenPopup();
        });

        popupBtnChange.addEventListener("click", () => {
          hiddenPopup();
          // modifyItem(item._id); //누르면 전체 수정됨 (위치 옮기거나 모달창 전체를 모듈로 빼야할 것 같습니다.)
        });
      });
    })
    .catch((error) => {
      alert("상품 조회 중 오류가 발생했습니다.");
    });
});

function modifyItem(id) {
  const itemName = document.querySelector(".itemName").value;
  const itemPrice = document.querySelector(".itemPrice").value;
  const itemDes = document.querySelector(".itemDes").value;
  const itemCategory = document.querySelector(".itemCategory").value;
  const putData = {
    categoryId: itemCategory,
    name: itemName,
    price: itemPrice,
    stock: 100,
    description: itemDes,
    // images: [showItem, showInfo],
    //임시
    images: ["/views/images/짱구는못말려2024미니캘린더_1.jpg", "/views/images/짱구는못말려2024미니캘린더_2.jpg"],
  };

  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(putData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("상품 수정이 완료되었습니다!");
    })
    .catch((error) => {
      alert("상품 수정 중 오류가 발생했습니다.");
    });
}
