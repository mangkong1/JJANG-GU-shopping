// export function setupCounter(element) {
//   let counter = 0
//   const setCounter = (count) => {
//     counter = count
//     element.innerHTML = `count is ${counter}`
//   }
//   element.addEventListener('click', () => setCounter(counter + 1))
//   setCounter(0)
// }


function slide() {

  let currentIndex = 0;
  const sliderWrap = document.querySelector('.sliderWrap');
  const sliderClone = sliderWrap.firstElementChild.cloneNode(true);
  sliderWrap.appendChild(sliderClone);  

  setInterval(() => {
    currentIndex += 1;
    sliderWrap.style.marginLeft = -currentIndex * 100 + "%";
    sliderWrap.style.transition = 'all 0.6s';


    if(currentIndex === 2) {
      setTimeout(() => {
        sliderWrap.style.marginLeft = '0';
        sliderWrap.style.transition = '0s';

        currentIndex = 0;
      }, 700)
    }
  }, 3000)
}
slide();