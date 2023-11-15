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
    const buyList = document.querySelector(".buyList");
    data.forEach((order, i) => {
      const newItem = document.createElement("div");
      newItem.classList.add("grid", "grid-cols-5", "gap-4", "flex", "items-center");
      let price = 0;

      order.products.forEach((item) => {
        price += item.productId.price * item.qty;
      });
      newItem.innerHTML = `
        <div class="flex justify-center items-center ">
          <div class="mb-[24px] mt-[27px] w-[144px] h-[144px] bg-gray200 rounded-2xl">
            <img class="rounded-2xl" src="${order.products[0].productId.images[0]}">
          </div>
        </div>
        <p class="overflow-hidden text-ellipsis text-black text-[17px] font-normal">
        ${new Date(order.createdAt).toLocaleDateString()}<br />${order._id}
        </p>
        <p class="text-black text-[17px] font-normal">${price}원</p>
        <div class="stateContainer">
          <p class="text-black text-[17px] font-normal">${order.status}</p>
        </div>
        <p class="flex-col items-center justify-center">
          <button class="selectBtn w-[99px] h-[34px] rounded-[50px] border border-black mb-[11px] hover:border-red hover:text-red">수정</button>
          <button class="deleteBtn w-[99px] h-[34px] rounded-[50px] border border-black hover:border-0 hover:bg-red hover:text-white">삭제</button>
        </p> `;
      buyList.appendChild(newItem);

      const deleteBtn = newItem.querySelector(".deleteBtn");
      if (!sessionStorage.getItem("data")) {
        sessionStorage.setItem("data", "[]");
      }

      const adminToken = JSON.parse(sessionStorage.getItem("data")).token;
      console.log(adminToken);
      deleteBtn.addEventListener("click", () => {
        fetch(`http://kdt-sw-7-team03.elicecoding.com/api/orders/${order._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        })
          .then((res) => {
            if (res.status == 200) {
            } else if (res.status === 403) {
              alert("권한 없음");
            } else if (res.status === 400) {
              alert("인증실패, 잘못된 요청");
            } else if (res.status === 500) {
              alert("서버 오류");
            } else {
              alert("주문 삭제 실패");
            }
            return res.json();
          })
          .then((data) => {
            alert("주문 삭제가 완료되었습니다!");
            buyList.removeChild(newItem);
          });
      });

      const stateContainer = newItem.querySelector(".stateContainer");
      let selectBtn = newItem.querySelector(".selectBtn");

      let putData = order;
      selectBtn.addEventListener("click", () => {
        const id = order._id;
        if (selectBtn.textContent === "수정") {
          // 수정버튼
          selectBtn.textContent = "수정 완료";
          const stateSelect = document.createElement("select");
          stateSelect.id = "stateSelect";
          stateSelect.innerHTML = `
            <option value="주문완료">주문완료</option>
            <option value="상품준비중">상품준비중</option>
            <option value="배송준비중">배송준비중</option>
            <option value="상품배송중">상품배송중</option>
            <option value="배송완료">배송완료</option>
            <option value="구매확정">구매확정</option>
          `;
          stateContainer.innerHTML = "";
          stateContainer.appendChild(stateSelect);
        } else {
          const stateSelect = document.getElementById("stateSelect");

          putData.status = stateSelect.value;
          fetch(`http://kdt-sw-7-team03.elicecoding.com/api/orders/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(putData),
          })
            .then((res) => {
              if (res.status == 200) {
              } else if (res.status == 400) {
                alert("인증실패, 잘못된 요청");
              } else if (res.status == 500) {
                alert("서버 오류");
              } else {
                alert("주문 수정 실패");
              }
              return res.json();
            })
            .then((data) => {
              stateContainer.innerHTML = `<p class="text-black text-[17px] font-normal">${order.status}</p>`;
              selectBtn.textContent = "수정";
            });
        }
      });
    });
  });
