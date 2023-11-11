import "../../index.css";

const inputWrap = document.querySelector("#inputWrap");
const userProfileName = document.querySelector("#userProfileName");

const changeInputValue = (user) => {
  return `<div>
  <label for="name" class="block text-xl pl-[5px] pb-2">이름</label>
  <input
    type="text"
    id="name"
    name="user_name"
    value="${user.name}"
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />

  <label for="email" class="block text-xl pl-[5px] pb-2"
    >이메일</label
  >
  <input
    type="email"
    id="email"
    name="user_email"
    value="${user.email}"
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />
  <label for="email" class="block text-xl pl-[5px] pb-2"
    >전화번호</label
  >
  <input
    type="tel"
    id="phone"
    name="user_phone"
    value="${user.phone}"
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />
  <label for="password" class="block text-xl pl-[5px] pb-2"
    >비밀번호 변경</label
  >
  <input
    type="password"
    id="modifyPass"
    value=""
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />

  <label for="passwordCheck" class="block text-xl pl-[5px] pb-2"
    >변경된 비밀번호 확인</label
  >
  <input
    type="password"
    id="modifyPassCheck"
    value=""
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />
</div>`;
};

const changeUserName = (user) => {
  return `<p class="inline-block text-[28px] font-semibold underline">
  ${user.name}
</p>`;
};

// 유저 정보 조회
fetch("user.json")
  .then((res) => {
    if (!res.ok) {
      console.error(res.status, res.statusText);
    }
    return res.json();
  })
  .then((data) => {
    renderUserInfo(data[0]);
  })
  .catch((err) => {
    alert("error:" + err);
  });

// 유저 정보 넣기
function renderUserInfo(data) {
  inputWrap.innerHTML = "";
  const userInfo = changeInputValue(data);
  inputWrap.innerHTML += userInfo;

  userProfileName.innerHTML = "";
  const userName = changeUserName(data);
  userProfileName.innerHTML += userName;
}

const modifyBtn = document.querySelector(".modifyBtn");

modifyBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const updateUserInfo = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
    pass: document.querySelector("#modifyPass").value,
    passCheck: document.querySelector("#modifyPassCheck").value,
  };

  renderUserInfo(updateUserInfo);
  alert("정보가 수정되었습니다.");
});

// 아이콘 변경 버튼 클릭
const userThumbChangeBtn = document.querySelector(".userThumbBtn");
const userThumbOtherList = document.querySelector(".userThumbOther");

userThumbChangeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  userThumbOtherList.classList.toggle("hidden");
});

// 캐릭터 이미지 클릭시 변경
const userThumb = document.querySelector(".userThumb>img");
const otherThumbs = document.querySelectorAll(".userThumbOther div");
const otherThumbList = Array.from(otherThumbs);

otherThumbList.map((list) => {
  list.addEventListener("click", (img) => {
    const otherImgSrc = img.srcElement.src;

    userThumb.src = otherImgSrc;
  });
});
