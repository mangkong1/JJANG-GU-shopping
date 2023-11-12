import "../style.css";
import "../index.css";
import { addItem } from "./cart/localStorage.js";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", "[]");
}
// 배너 슬라이드
function initSlide(time) {
  let currentIndex = 0;
  const sliderWrap = document.querySelector(".sliderWrap");
  const sliderClone = sliderWrap.firstElementChild.cloneNode(true);
  sliderWrap.appendChild(sliderClone);

  const sliderCircle = document.querySelectorAll(".sliderCircle p");

  setInterval(() => {
    currentIndex += 1;
    sliderWrap.style.marginLeft = -currentIndex * 100 + "%";
    sliderWrap.style.transition = "all 0.6s";

    if (currentIndex === 1) {
      sliderCircle[0].classList.add("bg-black/30");
      sliderCircle[0].classList.remove("bg-black");
      sliderCircle[1].classList.add("bg-black");
      sliderCircle[1].classList.remove("bg-black/30");
    }

    if (currentIndex === 2) {
      setTimeout(() => {
        sliderWrap.style.marginLeft = "0";
        sliderWrap.style.transition = "0s";

        sliderCircle[0].classList.add("bg-black");
        sliderCircle[0].classList.remove("bg-black/30");
        sliderCircle[1].classList.add("bg-black/30");
        sliderCircle[1].classList.remove("bg-black");

        currentIndex = 0;
      }, 700);
    }
  }, time);
}
initSlide(3000);

// 카테고리
const categoryTabList = document.querySelector(".categoryTabList");
const createCategoryTab = (category) => {
  return `<li
  class="categoryTab inline-block border border-gray400 rounded-full mr-3 mb-3 text-gray400 overflow-hidden"
  >
    <a class="w-full block py-1.5 px-7 cursor-pointer" id="${category._id}">${category.name}</a>
  </li>`;
};

// 카테고리 조회
fetch("http://kdt-sw-7-team03.elicecoding.com/api/categories", {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      console.error(res.status, res.statusText);
    }
    return res.json();
  })
  .then((categoryList) => {
    // 카테고리 categoryTabList에 넣기
    categoryList.forEach((category) => {
      const categoryLi = createCategoryTab(category);
      categoryTabList.innerHTML += categoryLi;
    });
  })
  .catch((err) => {
    alert("error:" + err);
  });

// 제품
const productList = document.querySelector(".productList");
const createProduct = (item) => {
  const productId = item["categories._id"];
  return `<li class="productItem">
  <div
    class="productItemThumb h-[360px] w-full rounded-2xl overflow-hidden relative"
  >
    <i id="${productId}"
      data-id="${item._id}"
      class="addCart fa-solid fa-cart-shopping text-2xl text-red w-14 h-14 bg-white90 flex justify-center items-center rounded-full hidden cursor-pointer block absolute left-[50%] bottom-[40px] translate-x-[-50%]"
    ></i>
    <a href="detail/">
      <img
      data-id="${item._id}"
        class="h-full"
        src="${item.images[0]}"
        alt="${item.name}"
      />
    </a>
  </div>

  <div class="productItemInfo pl-1">
    <p class="price pt-2 inline-blocks font-semibold text-lg">
    ${item.name}
    </p>
    <p>${item.price}원</p>
  </div>
</li>`;
};

// 제품 JSON으로 가져오기
fetch("http://kdt-sw-7-team03.elicecoding.com/api/products", {
  method: "GET",
})
  .then((res) => {
    if (!res.ok) {
      console.error(res.status, res.statusText);
    }
    return res.json();
  })
  .then((productLiList) => {
    productLiList.forEach((product) => {
      const productLi = createProduct(product);
      productList.innerHTML += productLi;
    });

    return productLiList;
  })
  .then((productLiList) => {
    const categoryLi = document.querySelectorAll(".categoryTab");

    showCartIcon();

    // 카테고리 클릭했을 때 스타일 변경
    categoryLi.forEach((category) => {
      category.addEventListener("click", (e) => {
        e.preventDefault();

        categoryLi.forEach((category) => {
          category.classList.remove("clicked");
          category.children[0].classList.remove("clicked");
        });

        category.classList.add("clicked");
        category.children[0].classList.add("clicked");

        productList.textContent = "";
        const searchByCategoryProduct = [];
        const clickedCategoryTab = e.target.id;

        // 카테고리와 연관된 상품을 searchByCategoryProduct 배열에 담기
        if (clickedCategoryTab === "63620bfed246d98cfee9ad70") {
          searchByCategoryProduct.push(...productLiList);
        } else {
          productLiList.forEach((product) => {
            const productCategoryId = product["category"][0]["_id"];
            if (productCategoryId === clickedCategoryTab) {
              searchByCategoryProduct.push(product);
            }
          });
        }

        // searchByCategoryProduct 배열에 상품이 있는지 없는지
        if (searchByCategoryProduct.length === 0) {
          productList.innerHTML = `<div class="text-center text-gray400 absolute left-2/4 translate-x-[-50%] ">상품이 없습니다.<div>`;
        } else {
          const newProduct = searchByCategoryProduct
            .map((product) => createProduct(product))
            .join("");
          productList.innerHTML = newProduct;
        }

        showCartIcon();
      });
    });
  })
  .catch((err) => {
    alert(`에러 : ${err}`);
  });

// 아이템 마우스 올렸을 때 장바구니 아이콘 보이고, 사라지고
function showCartIcon() {
  const productItemThumbElList = document.querySelectorAll(".productItemThumb");

  for (let i = 0; i < productItemThumbElList.length; i++) {
    const targetEl = productItemThumbElList[i];
    const viewCartEl = targetEl.children[0];

    viewCartEl.addEventListener("click", (e) => {
      addItem(e.target.dataset.id);
      let isconfirm = confirm(
        "아이템이 장바구니에 담겼습니다. 확인해보시겠습니까?"
      );
      if (isconfirm) {
        window.location.href = "/cart/";
      } else {
        window.location.href = "/";
      }
    });

    targetEl.addEventListener("click", (e) => {
      sessionStorage.setItem("idTemp", e.target.dataset.id);
    });

    targetEl.addEventListener("mouseover", () => {
      viewCartEl.classList.remove("hidden");
    });
    targetEl.addEventListener("mouseout", () => {
      viewCartEl.classList.add("hidden");
    });
  }
}

localStorage.removeItem("idTemp");
