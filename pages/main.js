import '../style.css'
import '../index.css';

// 배너 슬라이드
function initSlide(time) {

    let currentIndex = 0;
    const sliderWrap = document.querySelector('.sliderWrap');
    const sliderClone = sliderWrap.firstElementChild.cloneNode(true);
    sliderWrap.appendChild(sliderClone);  

    const sliderCircle = document.querySelectorAll('.slider_circle p');
  
    setInterval(() => {
      currentIndex += 1;
      sliderWrap.style.marginLeft = -currentIndex * 100 + "%";
      sliderWrap.style.transition = 'all 0.6s';

      if(currentIndex === 1) {
        sliderCircle[0].classList.add('bg-black/30');
        sliderCircle[0].classList.remove('bg-black');
        sliderCircle[1].classList.add('bg-black');
        sliderCircle[1].classList.remove('bg-black/30');
      }
  
      if(currentIndex === 2) {
        setTimeout(() => {
          sliderWrap.style.marginLeft = '0';
          sliderWrap.style.transition = '0s';

          sliderCircle[0].classList.add('bg-black');
          sliderCircle[0].classList.remove('bg-black/30');
          sliderCircle[1].classList.add('bg-black/30');
          sliderCircle[1].classList.remove('bg-black');
  
          currentIndex = 0;
        }, 700)
      }
    }, time)
  }
  initSlide(3000);

  
// 아이템 마우스 올렸을 때 장바구니 아이콘 보이고, 사라지고
const productItemThumb = document.querySelector('.All_product_item_thumb');
const viewCart = document.querySelector('.view_cart');

productItemThumb.addEventListener('mouseover', () => {
    viewCart.classList.remove('hidden');
});
productItemThumb.addEventListener('mouseout', () => {
    viewCart.classList.add('hidden');
});


// 버튼 클릭시 최상단으로 스크롤
const scrollTopBtn = document.querySelector('.Scroll_top');

scrollTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scroll({ top: 0, behavior: "smooth" });  
})