import "../style.css";
import "../index.css";

// 배너 슬라이드
function initSlide(time) {
  let currentIndex = 0;
  const sliderWrap = document.querySelector(".sliderWrap");
  const sliderClone = sliderWrap.firstElementChild.cloneNode(true);
  sliderWrap.appendChild(sliderClone);

  const sliderCircle = document.querySelectorAll(".slider_circle p");

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

// 아이템 마우스 올렸을 때 장바구니 아이콘 보이고, 사라지고
// const productItemThumb = document.querySelector(".productItemThumb");
// const viewCart = document.querySelector(".addCart");

// productItemThumb.addEventListener("mouseover", () => {
//   viewCart.classList.remove("hidden");
// });
// productItemThumb.addEventListener("mouseout", () => {
//   viewCart.classList.add("hidden");
// });

// 카테고리 모듈화
const categoryTabList = document.querySelector(".categoryTabList");
const createCategoryTab = (category) => {
  return `<li
  class="categoryTab inline-block border border-gray400 rounded-full py-1.5 px-7 mr-3 mb-3 text-gray400"
  >
    <a href="/">${category.name}</a>
  </li>`;
};

// 카테고리 JSON으로 가져오기
fetch("./category.json")
  .then((res) => {
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
    alert(`에러 : ${err}`);
  });

// 제품 모듈화
const productList = document.querySelector(".productList");
const createProduct = (item) => {
  return `<li class="productItem">
  <div
    class="productItemThumb h-[360px] w-full rounded-2xl overflow-hidden relative"
  >
    <i
      class="addCart fa-solid fa-cart-shopping text-2xl text-red w-14 h-14 bg-white90 flex justify-center items-center rounded-full hidden cursor-pointer block absolute left-[50%] bottom-[40px] translate-x-[-50%]"
    ></i>
    <a href="detail/">
      <img
        class="h-full"
        src="${item.img}"
        alt="${item.name}"
      />
    </a>
  </div>

  <div class="productItemInfo pl-1">
    <p class="price pt-2 inline-blocks font-semibold text-lg">
    ${item.price}원
    </p>
    <p>${item.name}</p>
  </div>
</li>`;
};

// 제품 JSON으로 가져오기
fetch("./product.json")
  .then((res) => {
    return res.json();
  })
  // 제품 productList에 넣기
  .then((productLiList) => {
    productLiList.forEach((product) => {
      const productLi = createProduct(product);
      productList.innerHTML += productLi;
    });
  })
  // 카테고리별로 해당 제품 보이게
  .then((productList) => {
    const categoryLi = document.querySelectorAll(".categoryTab");

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

        const searchByCategoryProduct = [];
        const clickedCategoryTab = e.target.innerHTML;
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
