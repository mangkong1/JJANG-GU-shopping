import "../../index.css";

const categoryList = document.querySelector(".categoryList");
const changeCategoryList = (category) => {
  return `<li class="border-b border-gray200 grid-cols-3 py-4">
  <input
    type="text"
    value="${category.name}"
    class="text-xl w-[500px] mr-[52px] py-2 rounded-2xl"
  />
  <button 
    class="categoryUpdateBtn w-[98px] h-[38px] bg-white rounded-[50px] border border-black mr-4 hover:border-red hover:text-red"
  >
    수정
  </button>
  <button 
    class="categoryDelBtn w-[98px] h-[38px] bg-white rounded-[50px] border border-black hover:border-red hover:text-red"
  >
    삭제
  </button>
</li>`;
};

// 카테고리 조회 함수
function fetchCategories() {
  fetch("https://localhost:5000/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }
      return res.json();
    })
    .then((categories) => {
      categories.forEach((category) => {
        const categoryLi = changeCategoryList(category);
        categoryList.innerHTML += categoryLi;
      });

      deleteBtnEvent();
      updateBtnEvent();
    })
    .catch((err) => {
      alert("error:" + err);
    });
}

function updateBtnEvent() {
  const categoryUpdateBtn = document.querySelectorAll(".categoryUpdateBtn");

  categoryUpdateBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const _id = "수정될 카테고리의 아이디값";
      const inputValue = e.target.previousElementSibling.value;

      fetch(`https://localhost:5000/categories/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValue,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("서버 응답 오류");
          }
          return res.json();
        })
        .then((data) => {
          console.log("서버 응답 데이터:", data);
          alert(`${inputValue}로 수정되었습니다.`);
          // 다시 카테고리 조회
          fetchCategories();
        })
        .catch((err) => {
          alert("error " + err);
        });
    });
  });
}

// 삭제 버튼에 이벤트 리스너 등록 함수
function deleteBtnEvent() {
  const categoryDelBtn = document.querySelectorAll(".categoryDelBtn");

  categoryDelBtn.forEach((categoryDelBtn) => {
    categoryDelBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // 삭제될 카테고리의 아이디값 가져오기
      const _id = "삭제될 카테고리의 아이디값";

      fetch(`https://localhost:5000/categories/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("서버 응답 오류");
          }
          return res.json();
        })
        .then((data) => {
          console.log("서버 응답 데이터", data);
          alert("카테고리가 삭제되었습니다.");
          // 다시 카테고리 조회
          fetchCategories();
        })
        .catch((err) => {
          alert("error:" + err);
        });
    });
  });
}

// 카테고리 추가
const categoryAddBtn = document.querySelector(".categoryAddBtn");

categoryAddBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputEl = e.target.previousElementSibling;
  const inputElValue = inputEl.value;

  fetch("https://localhost:5000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputElValue,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("서버 응답 오류");
      }
      return res.json();
    })
    .then((data) => {
      console.log("서버 응답 데이터:", data);
      alert(`${inputElValue} 카테고리가 추가되었습니다.`);
      // 다시 카테고리 조회
      fetchCategories();
      inputEl.value = "";
    })
    .catch((err) => {
      alert("error " + err);
    });
});
