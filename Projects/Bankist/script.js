'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  interestRate: 1.2,
  pin: 1111,
  locale: 'pt-PT',
  currency: 'EUR', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 1.5,
  pin: 2222,
  locale: 'en-US',
  currency: 'USD', // de-DE
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-05-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 0.7,
  pin: 3333,
  locale: 'bn-BD',
  currency: 'BDT', // de-DE
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2020-01-25T14:18:46.235Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  interestRate: 1,
  pin: 4444,
  locale: 'pt-PT',
  currency: 'USD', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const formateMovementDate = function (date, locale) {
  const calcDaysPassed = (startDate, endDate) =>
    Math.round(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(date, new Date());

  if (daysPassed === 0) return `Today`;
  else if (daysPassed === 1) return `Yesterday`;
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else return Intl.DateTimeFormat(locale).format(date);
};

const displayMovement = function (account, sort = false) {
  const { movements, movementsDates, locale, currency } = account;

  containerMovements.innerHTML = '';
  const displayMovementArr = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  displayMovementArr.forEach((mov, i) => {
    const movementType = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementsDates[i]);
    const movDate = formateMovementDate(date, locale);
    const formattedMov = formatCurrency(locale, currency, mov);

    const htmlTemplate = `<div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
    <div class="movements__date">${movDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', htmlTemplate);
  });
};

const generateUserNames = accounts => {
  accounts.forEach(account => {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
generateUserNames(accounts);

function formatCurrency(locale, currency, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const calcDisplayBalance = function (account) {
  const { movements, locale, currency } = account;
  account.balance = movements.reduce((accum, cur) => accum + cur, 0);
  labelBalance.textContent = `${formatCurrency(
    locale,
    currency,
    account.balance
  )}`;
};

const calcDisplaySummary = function (account) {
  const { movements, interestRate, locale, currency } = account;
  const income = movements
    .filter(mov => mov >= 0)
    .reduce((accum, cur) => accum + cur, 0);
  labelSumIn.textContent = `${formatCurrency(locale, currency, income)}`;

  const outging = movements
    .filter(mov => mov < 0)
    .reduce((accum, cur) => accum + cur, 0);
  labelSumOut.textContent = `${formatCurrency(locale, currency, outging)}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(dep => (dep * interestRate) / 100)
    .filter(inter => inter >= 1)
    .reduce((accum, cur) => accum + cur, 0);
  labelSumInterest.textContent = `${formatCurrency(
    locale,
    currency,
    interest
  )}`;
};

let currentAccount, timer;

function updateUI(account) {
  displayMovement(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
  updateDate();
}

function updateDate() {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const date = new Intl.DateTimeFormat(currentAccount.locale, options).format(
    now
  );
  labelDate.textContent = date;
}

const startLogoutTimer = function () {
  let time = 10;
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0),
      sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    updateUI(currentAccount);
    resetTimer();

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

function resetTimer() {
  if (timer) clearInterval(timer);
  timer = startLogoutTimer();
}

function transferMoney(amount, receiverAcc) {
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
}

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  resetTimer();

  const transfeAmount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  transferMoney(transfeAmount, receiverAcc);
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  resetTimer();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  resetTimer();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let movementState = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  resetTimer();
  movementState = !movementState;
  displayMovement(currentAccount, movementState);
});
