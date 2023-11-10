import "../../index.css";

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE-w";

const inputWrap = document.querySelector("#inputWrap");
const userProfileName = document.querySelector("#userProfileName");

const changeInputValue = (user) => {
  return `<div id="${user._id}">
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
    value=""
    class="border rounded-xl border-gray200 inline-block w-[646px] py-2 pl-3 mb-[20px]"
  />
  <label for="password" class="block text-xl pl-[5px] pb-2"
    >현재 비밀번호</label
  >
  <input
  type="password"
  id="currentPassword"
  value=""
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
function fetchUserInfo() {
  fetch(`http://kdt-sw-7-team03.elicecoding.com/api/users`, {
    method: "GET",
    headers: {
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
      console.log("서버 응답 데이터", data);
      renderUserInfo(data[2]);
      updateUserInfo();
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
}
fetchUserInfo();

// 수정 클릭했을 때 유저 정보 수정
async function updateUserInfo() {
  const modifyBtn = document.querySelector(".modifyBtn");

  modifyBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let currentPass = document.querySelector("#currentPassword").value;
    console.log(currentPass);

    const _id = e.target.previousElementSibling.firstElementChild.id;
    const modifyName = document.querySelector("#name").value;
    const modifyEmail = document.querySelector("#email").value;
    const modifyTel = document.querySelector("#phone").value;
    const modifyPass = document.querySelector("#modifyPass").value;
    const modifyPassCheck = document.querySelector("#modifyPassCheck").value;

    if (modifyPass !== modifyPassCheck) {
      alert("비밀번호가 다릅니다. 다시 작성해주세요.");
    } else {
      fetch(`http://kdt-sw-7-team03.elicecoding.com/api/users/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          email: modifyEmail,
          name: modifyName,
          currentPassword: currentPass,
          password: modifyPass,
          phone: modifyTel,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error(res.status, res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          console.log("서버 응답 데이터", data);
          alert(`${data.name}님의 정보가 수정되었습니다.`);
          fetchUserInfo();
        })
        .catch((err) => {
          alert("error", +err);
        });
    }
  });
}

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
