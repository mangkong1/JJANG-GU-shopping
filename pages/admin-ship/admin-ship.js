let counter = 0;
fetch("purchase-item.json")
  .then((response) => response.json())
  .then((data) => {
    const buyList = document.querySelector(".buyList");

    data.items.forEach((item) => {
      const newItem = document.createElement("div");
      newItem.classList.add("grid", "grid-cols-5", "gap-4", "flex", "items-center");
      newItem.innerHTML = `
        <div class="flex justify-center items-center ">
          <div class="mb-[24px] mt-[27px] w-[144px] h-[144px] bg-gray200 rounded-2xl">
            <img class="rounded-2xl" src="${item.images[0]}">
          </div>
        </div>
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
          ${item.date}<br />${item.num}
        </p>
        <p class="text-black text-[17px] font-normal">${item.price}원</p>
        <div class="stateContainer">
          <p class="text-black text-[17px] font-normal">${item.state}</p>
        </div>
        <p class="flex-col items-center justify-center">
          <button id="selectBtn-${counter}" class="selectBtn w-[99px] h-[34px] rounded-[50px] border border-black mb-[11px] hover:border-red hover:text-red">수정</button>
          <button class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black hover:border-0 hover:bg-red hover:text-white">삭제</button>
        </p> `;
      buyList.appendChild(newItem);

      const deleteBtn = newItem.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        buyList.removeChild(newItem);
        data.items = data.items.filter((i) => i.num !== item.num);
      });

      const stateContainer = newItem.querySelector(".stateContainer");
      let selectBtn = document.getElementById(`selectBtn-${counter}`);
      selectBtn.addEventListener("click", () => {
        if (selectBtn.textContent === "수정") {
          selectBtn.textContent = "수정 완료";
          const stateSelect = document.createElement("select");
          stateSelect.id = "stateSelect";
          stateSelect.classList.add("text-black", "text-[17px]", "font-normal");
          stateSelect.innerHTML = `
            <option value="상품 준비중">상품 준비중</option>
            <option value="배송 준비중">배송 준비중</option>
            <option value="상품 배송 중">상품 배송중</option>
            <option value="배송 완료">배송 완료</option>
            <option value="구매 확정">구매 확정</option>
          `;
          stateContainer.innerHTML = "";
          stateContainer.appendChild(stateSelect);
        } else {
          const stateSelect = document.getElementById("stateSelect");
          item.state = stateSelect.value; //아마 post요청을 해야될듯 ?
          stateContainer.innerHTML = `<p class="text-black text-[17px] font-normal">${item.state}</p>`;
          selectBtn.textContent = "수정";
        }
      });
      counter++;
    });
  });
