import {addItem,removeItem,removeAllItem,getTotalPrice,updateQuantity,getTotalAmount} from "./localStorage.js";

const totalItemNum = document.getElementById("totalItemNumber");
const totalItemPrice = document.getElementById("totalItemPrice");
const shipPrice = document.getElementById("shipPrice");
const totalPrice = document.getElementById("totalPrice")
const cartItem = document.getElementById("cartItems")


fetch("./items.json").then(
    (res)=>{
    return res.json();
}).then((data)=>{
    localStorage.setItem("items",JSON.stringify(data));
    if(!localStorage.getItem("cart")){
        localStorage.setItem("cart","[]")  
    }
})

let items = JSON.parse(localStorage.getItem("items")); 
let cart = JSON.parse(localStorage.getItem("cart"));


//제품 장바구니에 담기를 클릭해 -> 디비에 들어가 -> 디비에서 꺼내 와-> 장바구니에 담아 
function addItemtoCart(){
    cartItem.innerHTML = `<div class="flex items-center">
    <input type="checkbox" id="check" name="check" class="itemNumber border-solid border border-gray text-center"/>
        <div class="bg-red h-[40%] w-[40%] m-4">
        <img class="object-fit rounded-lg" src="/picnic.jpg" alt="cartImg">
        </div>
    <label for="check" class="itemName text">${}</label>
    </div>
    <div class="flex justify-center items-center">
        <input type="number" min="1" class="w-[2.5rem] h-[1.3rem] border-gray-300 border-solid border rounded-sm"/>
    </div>
    <p class="itemPrice flex justify-center items-center">10,000</p>`   
    
}




























