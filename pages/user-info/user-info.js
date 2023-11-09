import "../../index.css";

document.querySelector("#mypageMenu").innerHTML = `<div class="userInfo_left">
<a href="/user-info/" class="block text-4xl font-semibold pb-6 pl-[5px]">마이페이지</a>
<div
  class="userInfoList w-[236px] h-[532px] border border-gray200 rounded-2xl px-[25px] py-[36px] box-border"
>
  <ul>
    <li class="font-semibold text-2xl mb-[87px]">
      쇼핑 정보
      <ul class="mt-[10px]">
        <li>
          <a class="buyBtn text-xl font-normal text-gray400" href="/purchase/"
            >구매 내역</a
          >
        </li>
      </ul>
    </li>
    <li class="font-semibold text-2xl">
      내 정보
      <ul class="mt-[10px]">
        <li>
          <a class="profileBtn text-xl font-normal text-gray400" href="/user-profile-modify/"
            >프로필 정보</a
          >
        </li>
      </ul>
    </li>
  </ul>
</div>
</div>`;

// location.href로 현재 페이지에 따라 해당 글자 색상, 굵기 변경
const buyBtn = document.querySelector(".buyBtn");
const profileBtn = document.querySelector(".profileBtn");

if (location.href.indexOf("http://localhost:8080/user-profile-modify/") > -1) {
  profileBtn.classList.add("text-black");
  profileBtn.classList.add("font-semibold");
  profileBtn.classList.remove("text-gray400");
  profileBtn.classList.remove("font-normal");
}

if (location.href.indexOf("http://localhost:8080/purchase/") > -1) {
  buyBtn.classList.add("text-black");
  buyBtn.classList.add("font-semibold");
  buyBtn.classList.remove("text-gray400");
  buyBtn.classList.remove("font-normal");
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/orders")
    .then((response) => response.json())
    .then((data) => {
      const orderList = document.querySelector(".orderList");
      data.forEach((order) => {
        const newItem = document.createElement("li");
        newItem.classList.add("mb-[20px]");
        newItem.innerHTML = `
          <a class="flex justify-between">
            <p>${order.name}</p>
            <span>${order.status}</span>
          </a>
        `;
        orderList.appendChild(newItem);
      });
    })
    .catch((error) => {
      alert("구매내역 요약창을 불러오는 데 오류가 발생했습니다.");
    });
});
