import { menuArray } from "/data.js"

let menuItems = document.getElementById('menu-items')
let orderList = []
let total = 0
let subCheckout = ``

render()

document.addEventListener("click", function(e){
    if(e.target.id === 'plus-icon'){
        getOrderPrice(Number(e.target.dataset.product))
    }else if(e.target.id === 'complete-button'){
        showPayDetails()
    }else if(e.target.id === 'pay-button'){
        renderThankNote()
}})

function getMenuItem(){

    // const orderPriceId = getOrderPrice()
    let orders = []
    let orderPriceHTML = ""
    let itemHTML = ""

    menuArray.forEach(element => {
        itemHTML += `
            <div class="menu-detail" id="menu-detail">
                <span class="item-photo" id="item-photo">
                    <img src="${element.img}"> 
                </span>
                <span class="item-desc" id="item-desc">
                    <h3>${element.name}</h3>
                    <p>${element.ingredients}</p>
                    <h3>${element.price} sum</h3>
                </span>
                <span>
                    <i id="plus-icon" class="fa-regular fa-square-plus" data-product="${element.id}"></i>               
                </span>
            </div>`
                
    });
    return itemHTML
}

function renderOrder(){
    orderList.forEach(function(order){
        subCheckout += `
        <div class="item-name">
                <h3 id="checkout-item" class="checkout-item">${order.name}</h3>
                <h3 id="checkout-price" class="checkout-price">${order.price}</h3>
        </div>`
    })

    handleAddClickRender(subCheckout, total)
    subCheckout = ``
}

function handleAddClickRender(){
    let checkoutContent = ``
    checkoutContent = `
            <h1>Your order</h1>
            <section class="complete-order">
                ${subCheckout}
            <hr>
            <span class="total">
                <h3>Total price:</h3>
                <h3>${total}</h3>
            </span>
            <button class="complete-button" id="complete-button">Complete order</button>
    `

    document.getElementById('complete-order').innerHTML = checkoutContent
}


function getOrderPrice(itemId){
    const targetMenuObj = menuArray.filter(function(menu) {
        return menu.id === itemId
    })[0]

    orderList.push(targetMenuObj)

    total += targetMenuObj.price
    // console.log(total)

    renderOrder()

} 

function showPayDetails(){
    document.getElementById('card-details').style.display = "flex"
}

function renderThankNote() {

    document.getElementById("card-details").style.display = "none"
    document.querySelector(".thank-note").style.display = "flex"
    
    setTimeout(function(){
        document.querySelector(".thank-note").style.display = 'none'
        render()
    }, 3000)
// empty the order list after pay-btn is clicked
    orderList = []

}

function render(){
    menuItems.innerHTML = getMenuItem()
}


