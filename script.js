// Telegram Web App initialization
const tg = window.Telegram.WebApp;
tg.expand();

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

const cryptoData = {
  USDT: { name: "Tether", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  BTC: { name: "Bitcoin", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  ETH: { name: "Ethereum", icon: "ethereum-eth.svg" },
  BNB: { name: "BNB", icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
  TON: { name: "Toncoin", icon: "https://cryptologos.cc/logos/toncoin-ton-logo.png" },
  TRX: { name: "Tron", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  XRP: { name: "Ripple", icon: "free-icon-xrp-4821657.png" },
};

const networks = {
  USDT: [
    { name: "TRC-20", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
    { name: "ERC-20", icon: "ethereum-eth.svg" },
    { name: "BEP-20", icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
    { name: "TON", icon: "https://cryptologos.cc/logos/toncoin-ton-logo.png" },
  ],
};

function openTopUp() {
  modalBody.innerHTML = `
    <h2>Выберите криптовалюту для пополнения</h2>
    ${Object.keys(cryptoData)
      .map(
        (key) =>
          `<div class="crypto-option" onclick="selectTopUpCrypto('${key}')">
            <img src="${cryptoData[key].icon}" alt="${key}">
            <span>${cryptoData[key].name}</span>
          </div>`
      )
      .join("")}
  `;
  modal.style.display = "block";
}

function selectTopUpCrypto(crypto) {
  if (crypto === "USDT") {
    modalBody.innerHTML = `
      <h2>Выберите сеть для USDT</h2>
      ${networks[crypto]
        .map(
          (net) => `
          <div class="crypto-option" onclick="confirmTopUp('${crypto}', '${net.name}')">
            <img src="${net.icon}" alt="${net.name}">
            <span>${net.name}</span>
          </div>
        `
        )
        .join("")}
    `;
  } else {
    displayWalletAddress(crypto);
  }
}

function confirmTopUp(crypto, network) {
  displayWalletAddress(`${crypto} (${network})`);
}

function displayWalletAddress(crypto) {
  const cryptoInfo = cryptoData[crypto.split(" ")[0]]; 
  const icon = cryptoInfo ? cryptoInfo.icon : ""; 

  modalBody.innerHTML = `
    <h2>Пополнение</h2>
    <h4>Криптовалюта: <img src="${icon}" alt="${crypto}" style="width: 20px; margin-right: 10px;">${crypto}</h4>
    <div class="wallet-address">
      <p>Кошелек:</p>
      <input type="text" value="12345_${crypto}_ADDRESS" id="wallet-address" readonly><br><br>
      <button onclick="copyToClipboard('12345_${crypto}_ADDRESS')">Скопировать</button>
    </div>
  `;
}

function openWithdraw() {
  modalBody.innerHTML = `
    <h2>Выберите криптовалюту для вывода</h2>
    ${Object.keys(cryptoData)
      .map(
        (key) =>
          `<div class="crypto-option" onclick="selectWithdrawCrypto('${key}')">
            <img src="${cryptoData[key].icon}" alt="${key}">
            <span>${cryptoData[key].name}</span>
          </div>`
      )
      .join("")}
  `;
  modal.style.display = "block";
}

function selectWithdrawCrypto(crypto) {
  if (crypto === "USDT") {
    modalBody.innerHTML = `
      <h2>Выберите сеть для вывода USDT</h2>
      ${networks[crypto]
        .map(
          (net) => `
          <div class="crypto-option" onclick="withdrawForm('${crypto}', '${net.name}')">
            <img src="${net.icon}" alt="${net.name}">
            <span>${net.name}</span>
          </div>
        `
        )
        .join("")}
    `;
  } else {
    withdrawForm(crypto);
  }
}


function withdrawForm(crypto, network = null) {
  const networkInfo = network ? ` (${network})` : "";
  
  const cryptoInfo = cryptoData[crypto.split(" ")[0]]; 
  const icon = cryptoInfo ? cryptoInfo.icon : ""; 

  modalBody.innerHTML = `
    <h2>Вывод средств</h2>
    <h4>Криптовалюта: <img src="${icon}" alt="${crypto}" style="width: 20px; margin-right: 10px;">${crypto}${networkInfo}</h4>
    <div class="withdraw-form">
      <label for="withdraw-address">Введите адрес кошелька:</label>
      <input type="text" id="withdraw-address" placeholder="Адрес кошелька">
      <label for="withdraw-amount">Введите сумму:</label>
      <input type="number" id="withdraw-amount" placeholder="Сумма">
      <button onclick="submitWithdraw('${crypto}', '${network}')">Подтвердить</button>
    </div>
  `;
}


function submitWithdraw(crypto, network) {
  const address = document.getElementById("withdraw-address").value;
  const amount = document.getElementById("withdraw-amount").value;
  if (!address || !amount) {
    alert("Заполните все поля!");
    return;
  }
  alert(`Запрос на вывод ${amount} ${crypto} отправлен!`);
  closeModal();
}

function closeModal() {
  modal.style.display = "none";
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Скопировано!");
}function openObmen() {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <h2>Обмен криптовалют</h2>
    <div class="exchange-section">
      <div class="exchange-field">
        <label for="send-crypto">Вы отправляете:</label>
        <div class="custom-select" id="send-crypto">
          <div class="selected-option" id="send-selected">
            <span>Выберите криптовалюту</span>
            <span class="arrow">▼</span>
          </div>
          <div class="options">
            ${Object.keys(cryptoData)
              .map(
                (key) => `
                  <div class="option" data-value="${key}">
                    <img src="${cryptoData[key].icon}" alt="${key}" class="crypto-icon" />
                    <span>${cryptoData[key].name}</span>
                  </div>`
              )
              .join("")}
          </div>
        </div>
        <label for="send-amount">Сколько отправляете:</label>
        <input type="number" id="send-amount" placeholder="Сумма для отправки" />
      </div>
      <div class="exchange-field">
        <label for="receive-crypto">Вы получаете:</label>
        <div class="custom-select" id="receive-crypto">
          <div class="selected-option" id="receive-selected">
            <span>Выберите криптовалюту</span>
            <span class="arrow">▼</span>
          </div>
          <div class="options">
            ${Object.keys(cryptoData)
              .map(
                (key) => `
                  <div class="option" data-value="${key}">
                    <img src="${cryptoData[key].icon}" alt="${key}" class="crypto-icon" />
                    <span>${cryptoData[key].name}</span>
                  </div>`
              )
              .join("")}
          </div>
        </div>
        <label for="receive-amount">Сколько получаете:</label>
        <input type="number" id="receive-amount" placeholder="Сумма для получения" disabled />
      </div>
      <button onclick="confirmExchange()">Продолжить</button>
    </div>
  `;
  modal.style.display = "block";

  // Add event listeners for the custom select
  document.querySelectorAll(".custom-select").forEach((select) => {
    const selectedOption = select.querySelector(".selected-option");
    const optionsList = select.querySelector(".options");

    selectedOption.addEventListener("click", () => {
      optionsList.classList.toggle("visible");
    });

    select.querySelectorAll(".option").forEach((option) => {
      option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        selectedOption.innerHTML = `
          <img src="${cryptoData[selectedValue].icon}" alt="${selectedValue}" class="crypto-icon" />
          <span>${cryptoData[selectedValue].name}</span>
        `;
        optionsList.classList.remove("visible");

        updateReceiveAmount(selectedValue);
      });
    });
  });
}

function updateReceiveAmount(sendCrypto) {
  const sendAmount = document.getElementById("send-amount").value;
  const receiveAmountField = document.getElementById("receive-amount");

  const rate = 1; 
  const receiveAmount = sendAmount * rate;

  if (sendAmount) {
    receiveAmountField.value = receiveAmount.toFixed(2);
  } else {
    receiveAmountField.value = "";
  }
}

function confirmExchange() {
  const sendCrypto = document.getElementById("send-crypto").value;
  const receiveCrypto = document.getElementById("receive-crypto").value;
  const sendAmount = document.getElementById("send-amount").value;
  const receiveAmount = document.getElementById("receive-amount").value;

  if (!sendCrypto || !receiveCrypto || !sendAmount || !receiveAmount) {
    alert("Заполните все поля!");
    return;
  }

  const isSuccess = Math.random() > 0.5;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = isSuccess
    ? `
      <h2>Обмен успешен!</h2>
      <button onclick="goToMainMenu()">На главное меню</button>`
    : `
      <h2>Обмен не успешен!</h2>
      <button onclick="goToMainMenu()">На главное меню</button>`;
}

function goToMainMenu() {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}




const cryptoList = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { id: "the-open-network", symbol: "TON", name: "Toncoin", icon: "https://cryptologos.cc/logos/toncoin-ton-logo.png" },

  { id: "ethereum", symbol: "ETH", name: "Ethereum", icon: "ethereum-eth.svg" },
  { id: "tether", symbol: "USDT", name: "Tether", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png" },
  { id: "tron", symbol: "TRX", name: "TRON", icon: "https://cryptologos.cc/logos/tron-trx-logo.png" },
  { id: "ripple", symbol: "XRP", name: "Ripple", icon: "free-icon-xrp-4821657.png" },
];

async function fetchCryptoPrices() {
  const ids = cryptoList.map((crypto) => crypto.id).join(",");
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
  const data = await response.json();

  const assetsList = document.getElementById("assets-list");
  assetsList.innerHTML = "";

  cryptoList.forEach((crypto) => {
    const price = data[crypto.id].usd;
    const change = data[crypto.id].usd_24h_change.toFixed(2);
    const changeClass = change >= 0 ? "positive" : "negative";

    assetsList.innerHTML += `
      <div class="asset">
        <div class="asset-info">
          <img src="${crypto.icon}" alt="${crypto.name}">
          <span>${crypto.name}</span>
        </div>
        <div>
          <span class="asset-price">$${price.toFixed(2)}</span>
          <span class="asset-change ${changeClass}">${change}%</span>
        </div>
      </div>
    `;
  });
}

setInterval(fetchCryptoPrices, 90000); 
fetchCryptoPrices();

