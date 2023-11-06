fetch("purchase-item.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      const buyList = (document.querySelector(".buyList").innerHTML += `
        <div class="py-[20px] bg-white grid grid-cols-4 gap-4 flex items-center">
          <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
            ${item.date}<br />${item.num}
          </p>
          <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
            ${item.info}
          </p>
          <p class="text-black text-[17px] font-normal">${item.state}</p>
          <p class="flex items-center justify-center">
            <button id="${item.num}" class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black">
              주문취소
            </button>
          </p>
        </div>`);
    });
  });
