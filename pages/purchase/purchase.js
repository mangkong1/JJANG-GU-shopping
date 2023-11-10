document.addEventListener("DOMContentLoaded", function () {
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/orders/", {
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
        newItem.classList.add(
          "py-[20px]",
          "bg-white",
          "grid",
          "grid-cols-4",
          "gap-4",
          "flex",
          "items-center"
        );
        newItem.innerHTML = `
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
          ${item.date}<br />${item._id}
        </p>
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
          ${item.name}
        </p>
        <p class="text-black text-[17px] font-normal">${item.state}</p>
        <p class="flex items-center justify-center">
          <button class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black">
            주문취소
          </button>
        </p>`;
        buyList.appendChild(newItem);

        const deleteBtn = newItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
          buyList.removeChild(newItem);
          data.items = data.items.filter((i) => i.num !== item.num);
        });
      });
    })
    .catch((error) => {
      alert("상품 조회 중 오류가 발생했습니다.");
    });
});
