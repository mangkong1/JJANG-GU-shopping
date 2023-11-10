let counter = 0;
fetch("http://kdt-sw-7-team03.elicecoding.com/api/orders/")
  .then((res) => {
    if (res === 200) {
      alert("주문 조회 완료");
    } else if (res === 400) {
      alert("인증 실패, 잘못된 요청");
    } else if (res === 500) {
      alert("서버 오류");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const buyList = document.querySelector(".buyList");
    data.forEach((order, i) => {
      const date = new Date(order.createdAt);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      console.log(date);
      console.log("formatDate", formattedDate); // "2023-01-01"
      console.log("images", order.products);
      const newItem = document.createElement("div");
      newItem.classList.add("grid", "grid-cols-5", "gap-4", "flex", "items-center");
      newItem.innerHTML = `
        <div class="flex justify-center items-center ">
          <div class="mb-[24px] mt-[27px] w-[144px] h-[144px] bg-gray200 rounded-2xl">
            <img class="rounded-2xl" src="${order.products[0].images[0]}">
          </div>
        </div>
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
          ${formattedDate}<br />${order._id}
        </p>
        <p class="text-black text-[17px] font-normal">${order.products[i].price}원</p>
        <div class="stateContainer">
          <p class="text-black text-[17px] font-normal">${order.status}</p>
        </div>
        <p class="flex-col items-center justify-center">
          <button id="selectBtn-${counter}" class="selectBtn w-[99px] h-[34px] rounded-[50px] border border-black mb-[11px] hover:border-red hover:text-red">수정</button>
          <button class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black hover:border-0 hover:bg-red hover:text-white">삭제</button>
        </p> `;
      buyList.appendChild(newItem);

      const deleteBtn = newItem.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        // fetch(`http://kdt-sw-7-team03.elicecoding.com/api/orders/${order._id}`);
        buyList.removeChild(newItem);
        data.items = data.items.filter((i) => i._id !== order._id);
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
          <option value="상품 준비중">주문 완료</option>
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
