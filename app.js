const balance = document.querySelector('#balance');
const plus = document.querySelector('#money-plus');
const minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#title');
const amount = document.querySelector('#amount');

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction to DOM
function addTransactionDOM(trans) {
    // get + or -
    const sign = trans.amount < 0 ? '-' : '+';
    const li = document.createElement('li');
    // add plus or minus class
    li.classList.add(trans.amount < 0 ? 'minus' : 'plus');
    li.innerHTML = `
   ${trans.text} <span>${sign}${Math.abs(trans.amount)}</span><button onclick="removeItem(${trans.id})"class="delete">X</button>
   `;

    list.appendChild(li)
}

// update balance, income, expense
function updateDOM() {
    const amount = transactions.map(trans => trans.amount);
    const income = amount
        .filter(sum => sum > 0)
        .reduce((a, b) => (a + b), 0)
        .toFixed(2);
    const expense = amount
        .filter(sum => sum < 0)
        .reduce((a, b) => (a + b), 0)
        .toFixed(2);
    const total = amount.reduce((a, b) => (a + b), 0).toFixed(2);
    plus.innerHTML = `+${income} zł`;
    minus.innerHTML = `${expense} zł`;
    balance.innerHTML = `${total} zł`;
    if (total > 0) {
        balance.style.color = '#2ecc71'
    } else if (total < 0) {
        balance.style.color = '#c0392b'
    } else {
        balance.style.color = '#000'
    }
}

// remove item
function removeItem(id) {
    transactions = transactions.filter(trans => trans.id !== id);

    init();
}

// add item
function addItem(e) {
    e.preventDefault();

    if (text.input === '' || amount.value === '' || isNaN(amount.value)) {
        alert('Enter Correct Values')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateDOM();
        updateLS();
        text.value = '';
        amount.value = '';
    }
}

// generate id
function generateID() {
    return Math.floor(Math.random() * 100000)
}

// update LS
function updateLS() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


// init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateDOM();
    updateLS();
}

init()

form.addEventListener('submit', addItem);