import { menuArray } from './data.js'

const menuSection = document.querySelector('#menu-section')
const orderSummary = document.querySelector('#order-summary')
const order = document.querySelector('#order')
const totalPrice = document.querySelector('#total-price')
const payModel = document.querySelector('#pay-model')
const paymentForm = document.querySelector('#payment-form')
const fullName = document.querySelector('#full-name')
let total = 0

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    if (document.querySelector('.thanks')) {
      document.querySelector('.thanks').style.display = 'none'
      location.reload();
    }
    orderSummary.style.display = 'block'
    addOrder(e.target.dataset.add)
  }
  else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove)
  }
  else if (e.target.id === 'complete-order') {
    complateOrder()
  }
})

paymentForm.addEventListener('submit', function (e) {
  e.preventDefault()
  payModel.style.display = 'none'
  orderSummary.innerHTML =
    `
    <div class="thanks">
      <div class="your-name">
        Thanks, ${fullName.value}! Your order is on its way!
      </div>
    </div>
  `

})

function complateOrder() {
  payModel.style.display = 'block'
}

function removeOrder(orderId) {
  const orderItem = order.getElementsByClassName('order-item')
  for (let i = 0; i < orderItem.length; i++) {
    if (orderItem[i].getElementsByClassName('order-item__remove')[0].dataset.remove === orderId) {
      const subtractTotal = menuArray.filter(function (item) {
        if (item.id == orderId) {
          return item
        }
      })[0]
      total -= subtractTotal.price
      totalPrice.textContent = `$${total}`
      orderItem[i].remove()
      break
    }
  }
  if (orderItem.length === 0) {
    orderSummary.style.display = 'none'
  }
}

function addOrder(orderId) {
  const targetedOrder = menuArray.filter(function (item) {
    return item.id == orderId
  })[0]
  order.innerHTML +=
    `
    <div class="order-item">
      <div class="order-item__add-remove">
        <p class="order-item__name">${targetedOrder.name}</p>
        <button class="order-item__remove" data-remove="${targetedOrder.id}">remove</button>
      </div>
      <p class="order-item__price">$${targetedOrder.price}</p>
    </div>
  `
  total += targetedOrder.price
  totalPrice.textContent = `$${total}`
}

function feedMenuSection(menu) {
  for (let i = 0; i < menu.length; i++) {
    menuSection.innerHTML +=
      `
      <div class='menu__item'>
        <div class='item__description'>
          <span class='icon span-class'>${menu[i].emoji}</span>
          <div class='content'>
            <h4>${menu[i].name}</h4>
            <small>${menu[i].ingredients}</small>
            <h5>$${menu[i].price}</h5>
          </div>
        </div>
        <span class="item__add-item span-class" 
              data-add=${menu[i].id}>
          +
        </span>
      </div>
    `
  }
}

feedMenuSection(menuArray)
