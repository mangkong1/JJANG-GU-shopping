const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE-w";
function deleteItem(id) {
  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/orders/${id}`, {
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
          ${new Date(item.createdAt).toLocaleDateString()}<br />${item._id}
        </p>
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
          ${item.name}
        </p>
        <p class="text-black text-[17px] font-normal">${item.status}</p>
        <p class="flex items-center justify-center">
          <button class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black">
            주문취소
          </button>
        </p>`;
        buyList.appendChild(newItem);

        const deleteBtn = newItem.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
          deleteItem(item._id);
          buyList.removeChild(newItem);
        });
      });
    })
    .catch((error) => {
      alert("상품 조회 중 오류가 발생했습니다.");
    });
});
