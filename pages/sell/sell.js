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
                src="${item.images[0]}"
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

        const modifyBtn = newItem.querySelector(".modifyBtn");
        const popupBg = document.querySelector(".popupBg");
        modifyBtn.addEventListener("click", (e) => {
          const modifyCheckPopup = document.querySelector(".modifyCheckPopup");

          const modalItem = document.createElement("div");
          modalItem.classList.add("modalInside", "absolute", "flex", "top-1/2", "left-1/2", "z-40", "translate-x-[-50%]", "translate-y-[-50%]", "w-[1011px]", "p-9", "text-center", "bg-white", "rounded-2xl", "box-border");
          modalItem.innerHTML = `
          <div class="mx-[41px]">
            <img class="showItem mb-[24px] w-[367px] h-[288px] bg-zinc-300 rounded-[15px]" src="/imgs/upload.png" alt="상품이미지사진" />

            <img class="showInfo mb-[24px] w-[367px] h-[288px] bg-zinc-300 rounded-[15px]" src="/imgs/upload.png" alt="상세정보사진" />
          </div>

          <div class="flex flex-col items-start">
            <p class="pl-[5px] text-xl mb-[8px]">상품 이름</p>
            <input class="itemName mb-[13px] px-[20px] w-[519px] h-[49px] bg-white rounded-[15px] border border-gray-200" type="text" placeholder="상품 이름을 입력하세요" />
            <p class="pl-[5px] text-xl mb-[8px]">상품 가격</p>
            <input class="itemPrice mb-[13px] px-[20px] w-[519px] h-[49px] bg-white rounded-[15px] border border-gray-200" type="text" placeholder="상품 가격을 입력하세요(숫자만)" />
            <p class="pl-[5px] text-xl mb-[8px]">상품 설명</p>
            <input class="itemDes mb-[13px] px-[20px] w-[519px] h-[49px] bg-white rounded-[15px] border border-gray-200" type="text" placeholder="상품 설명을 입력하세요" />
            <p class="pl-[5px] text-xl mb-[8px]">카테고리</p>
            <select class="itemCategory mb-[13px] px-[20px] w-[519px] h-[49px] bg-white rounded-[15px] border border-gray-200">
              <option value="">카테고리를 선택하세요</option>
            </select>
            <p class="pl-[5px] text-xl mb-[8px]">상품 이미지 업로드</p>
            <input class="inputItem mb-[13px] p-[10px] w-[519px] text-md text-gray-400 border border-gray-200 rounded-[15px] cursor-pointer" type="file" />

            <p class="pl-[5px] text-xl mb-[8px]">상세정보 이미지 업로드</p>
            <input class="inputInfo mb-[13px] p-[10px] w-[519px] text-md text-gray-400 border border-gray-200 rounded-[15px] cursor-pointer" type="file" />

            <div class="popupBtns w-full flex justify-end">
              <button type="reset" class="mt-[20px] mr-[20px] w-[176px] border rounded-2xl h-[49px]">뒤로가기</button>
              <button id="changeDataBtn" type="submit" class="modifyItem mt-[20px] ml-[20px] w-[176px] bg-[#F13737] text-white rounded-2xl h-[49px]">수정하기</button>
            </div>
          </div>`;

          e.preventDefault();
          modifyCheckPopup.appendChild(modalItem);
          modifyCheckPopup.classList.remove("hidden");
          popupBg.classList.remove("hidden");
          window.scroll({ top: 0, behavior: "smooth" });

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

          const popupBtnBack = modalItem.querySelector(".popupBtns button:first-child");
          const popupBtnChange = modalItem.querySelector(".popupBtns button:last-child");

          function hiddenPopup() {
            modifyCheckPopup.classList.add("hidden");
            modifyCheckPopup.removeChild(modalItem);
            popupBg.classList.add("hidden");
          }

          popupBtnBack.addEventListener("click", () => {
            hiddenPopup();
          });

          popupBtnChange.addEventListener("click", () => {
            hiddenPopup();
            console.log("modal's item", item._id);
            // modifyItem(item._id);
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
        });
      });
    });
});
