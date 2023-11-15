import "../../index.css";

if (!sessionStorage.getItem("data")) {
  sessionStorage.setItem("data", "[]");
}

const adminToken = JSON.parse(sessionStorage.getItem("data")).token;

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
            alert("권한이 없습니다.");
          } else {
            alert(`${inputValue}로 수정되었습니다.`);
          }
          return res.json();
        })
        .then((data) => {})
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
          if (res === 403) {
            alert("권한이 없습니다.");
          }
          if (!res.ok) {
            console.error(res.status, res.statusText);
            //main.js에서 임시로 사용중인 api와 겹쳐서 무조건 오류남
          } else {
            alert("카테고리가 삭제되었습니다.");
          }
          return res.json();
        })
        .then((data) => {
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
          alert("권한이 없습니다.");
        } else {
          alert(`${inputElValue} 카테고리가 추가되었습니다.`);
        }
        return res.json();
      })
      .then((data) => {
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
