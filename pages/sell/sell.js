document.addEventListener("DOMContentLoaded", function () {
  fetch("https://localhost:5000/products/{_id}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
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
                ${item.category}
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
          buyList.removeChild(newItem);
          data.items = data.items.filter((i) => i.num !== item.num);
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

        const popupBtnBack = document.querySelector(
          ".popupBtns button:first-child"
        );
        const popupBtnChange = document.querySelector(
          ".popupBtns button:last-child"
        );

        function hiddenPopup() {
          modifyCheckPopup.classList.add("hidden");
          popupBg.classList.add("hidden");
        }

        popupBtnBack.addEventListener("click", () => {
          hiddenPopup();
        });

        popupBtnChange.addEventListener("click", () => {
          hiddenPopup();
          alert("수정이 완료되었습니다!");
        });
      });
    })
    .catch((error) => {
      alert("상품 조회 중 오류가 발생했습니다.");
    });
});

// fetch("../product.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const buyList = document.querySelector(".buyList");

//     data.forEach((item) => {
//       const newItem = document.createElement("div");
//       newItem.classList.add("py-[20px]", "flex", "items-center");
//       newItem.innerHTML = `
//         <img
//           class="mx-[40px] rounded-[15px] w-[115px] h-[115px]"
//           src="/imgs/sss.jpeg"
//           alt="사진"
//         />
//         <p class="w-[150px] mx-[3px]">
//           ${item.name}
//           <br />
//           ${item.category}
//         </p>
//         <p class="mx-[150px]">${item.price}</p>
//         <button
//           type="submit"
//           class="modifyBtn mx-[15px] w-[98px] h-[38px] bg-white rounded-[50px] border border-black"
//         >
//           수정
//         </button>
//         <button
//           class="deleteBtn mx-[15px] w-[98px] h-[38px] bg-white rounded-[50px] border border-black"
//         >
//           삭제
//         </button>
//       `;
//       buyList.appendChild(newItem);

//       const deleteBtn = newItem.querySelector(".deleteBtn");
//       deleteBtn.addEventListener("click", () => {
//         buyList.removeChild(newItem);
//         data.items = data.items.filter((i) => i.num !== item.num);
//       });

//       const modifyCheckPopup = document.querySelector("#modifyCheckPopup");
//       const popupBg = document.querySelector(".popupBg");

//       const modifyBtns = document.querySelectorAll(".modifyBtn");
//       modifyBtns.forEach((modifyBtn) => {
//         modifyBtn.addEventListener("click", (e) => {
//           e.preventDefault();

//           modifyCheckPopup.classList.remove("hidden");
//           popupBg.classList.remove("hidden");
//           window.scroll({ top: 0, behavior: "smooth" });
//         });
//       });

//       const inputItem = document.getElementById("inputItem");
//       const showItem = document.getElementById("showItem");

//       inputItem.addEventListener("change", (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (e) => {
//           showItem.src = e.target.result;
//         };

//         reader.readAsDataURL(file);
//       });

//       const inputInfo = document.getElementById("inputInfo");
//       const showInfo = document.getElementById("showInfo");

//       inputInfo.addEventListener("change", (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.onload = (e) => {
//           showInfo.src = e.target.result;
//         };

//         reader.readAsDataURL(file);
//       });

//       const popupBtnBack = document.querySelector(
//         ".popupBtns button:first-child"
//       );
//       const popupBtnChange = document.querySelector(
//         ".popupBtns button:last-child"
//       );

//       function hiddenPopup() {
//         modifyCheckPopup.classList.add("hidden");
//         popupBg.classList.add("hidden");
//       }

//       popupBtnBack.addEventListener("click", () => {
//         hiddenPopup();
//       });

//       popupBtnChange.addEventListener("click", () => {
//         hiddenPopup();
//         alert("수정이 완료되었습니다!");
//       });
//     });
//   });
