import "../../index.css";

const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRkMGIxOWQ5NDExN2E1ZTJlMzk3YTQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTk1NTA2NTJ9.td4t4QMCj8U3A923THtanJLEfBLSbrggONfdKjOnE-w";

const categoryList = document.querySelector(".categoryList");
const changeCategoryList = (category) => {
  return `<li class="border-b border-gray200 grid-cols-3 py-4">
  <input
    type="text"
    value="${category.name}"
    class="text-xl w-[500px] mr-[52px] py-2 rounded-2xl"
  />
  <button 
    data-category-id="${category._id}"
    class="categoryUpdateBtn w-[98px] h-[38px] bg-white rounded-[50px] border border-black mr-4 hover:border-red hover:text-red"
  >
    수정
  </button>
  <button 
    data-category-id="${category._id}"
    class="categoryDelBtn w-[98px] h-[38px] bg-white rounded-[50px] border border-black hover:border-red hover:text-red"
  >
    삭제
  </button>
</li>`;
};

// 카테고리 조회
function fetchCategories() {
  fetch("http://kdt-sw-7-team03.elicecoding.com/api/categories", {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        console.error(res.status, res.statusText);
      }
      return res.json();
    })
    .then((categories) => {
      renderCategories(categories);
      deleteBtnEvent();
      updateBtnEvent();
    })
    .catch((err) => {
      alert("error:" + err);
    });
}
fetchCategories();

// 카테고리 나열
function renderCategories(categories) {
  categoryList.innerHTML = "";
  categories.forEach((category) => {
    const categoryLi = changeCategoryList(category);
    categoryList.innerHTML += categoryLi;
  });
}

// 카테고리 수정
function updateBtnEvent() {
  const categoryUpdateBtn = document.querySelectorAll(".categoryUpdateBtn");

  categoryUpdateBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const _id = e.target.dataset.categoryId;
      const inputValue = e.target.previousElementSibling.value;

      fetch(`http://kdt-sw-7-team03.elicecoding.com/api/categories/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          _id: _id,
          name: inputValue,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            console.error(res.status, res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          console.log("서버 응답 데이터:", data);
          alert(`${inputValue}로 수정되었습니다.`);
        })
        .catch((err) => {
          alert("error " + err);
        });
    });
  });
}

// 카테고리 삭제
function deleteBtnEvent() {
  const categoryDelBtn = document.querySelectorAll(".categoryDelBtn");

  categoryDelBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const _id = e.target.dataset.categoryId;
      console.log(_id);

      fetch(`http://kdt-sw-7-team03.elicecoding.com/api/categories/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          _id: _id,
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
          alert("카테고리가 삭제되었습니다.");
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

  if (inputElValue) {
    fetch("http://kdt-sw-7-team03.elicecoding.com/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        name: inputElValue,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(res.status, res.statusText);
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
  } else {
    alert("카테고리명을 입력해주세요.");
  }
});
