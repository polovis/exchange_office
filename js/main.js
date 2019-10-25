document.addEventListener("DOMContentLoaded", init)

function init() {
    console.log(`DOM is fully loaded`);
    const apiURL = 'http://localhost:4500';
    const exchange_db = 'http://localhost:3000';
    let availablePlnAmount = 1200;
    document.querySelector('.wallet-vaule td').innerText = `Available PLN ${availablePlnAmount}`;
    let aaa;

    updateAvailablePlnCurrency = (earnPln) => {
        let newPlnAmount = availablePlnAmount + earnPln;
        availablePlnAmount = newPlnAmount;

        document.querySelector('.wallet-vaule td').innerText = `Available PLN ${(availablePlnAmount).toFixed(2)}`;
    }

    // Fill Currency with actual prices
    setCurrencyActualBuingPrice = (data) => {
        const unitValue = document.querySelectorAll('.currencies-wrapper .currency-price');

        for (i = 0; i <= unitValue.length - 1; i++) {
            unitValue[i].innerText = data.items[i].purchasePrice;  
        }
    }

    //operation of the currency buy button
    buyCurrency = (data) => {
        const buyCurrencyBtn = document.querySelectorAll('.currencies-wrapper .currency-buyBtn-wrapper button');
        let newCurrencyAmount;

        buyCurrencyBtn.forEach((btn, i) => {
            btn.previousSibling.value = 0;

            btn.addEventListener('click', function (e) {
                e.preventDefault();

                getCurrencyStock = (curr) => {
                    const currencyPrice = parseFloat(this.parentElement.parentElement.querySelector('.currency-price').innerText);
                    const amountCurrencyToBuy = Math.round(parseFloat(this.parentElement.querySelector('input').value));
                    const paymentForBuingCurrences = currencyPrice * amountCurrencyToBuy;                    

                    const {
                        usd: usd,
                        eur: eur,
                        chf: chf,
                        rub: rub,
                        czk: czk,
                        gbp: gbp
                    } = curr;

                    let currenciesInStock = [usd, eur, chf, rub, czk, gbp];

                    if  (availablePlnAmount < paymentForBuingCurrences) {
                        this.setAttribute('disabled', 'disabled');

                    } else {
                        updateAvailablePlnCurrency(-paymentForBuingCurrences);                          
                    }
                }
                //get currencies amount from DB
                fetch(`${exchange_db}/currencies`)
                .then(res => res.json())
                .then((curr) => { 
                    getCurrencyStock(curr);
                })
                .catch(err => console.log(err)
                );                
            })            
        })
    }


    // Fill my Wallet with actual prices
    setWalletActualSellingPrice = (data) => {
        const unitValue = document.querySelectorAll('.my-wallet-wrapper .currency-price');

        for (i = 0; i <= unitValue.length - 1; i++) {
            unitValue[i].innerText = data.items[i].sellPrice;
            countActualCurrencyValue(data.items[i].sellPrice, i);
        }
    }
    
    // count actual currency value
    countActualCurrencyValue = (price, i) => {
        const value = document.querySelectorAll('.my-wallet-wrapper .currency-value');

        value[i].innerText = price * parseFloat((value[i].parentElement.querySelector('.currency-amount').innerText) * 100) / 100;
    }

    //operation of the currency sales button
    sellCurrency = () => {
        const sellCurrencyBtn = document.querySelectorAll('.currency-sellBtn-wrapper button');
        let newCurrencyAmount;

        for (btn of sellCurrencyBtn) {

            btn.previousSibling.value = 0;

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let currencyPrice = parseFloat(this.parentElement.parentElement.querySelector('.currency-price').innerText);

                let currencyAmountToDespose = (parseFloat(this.parentElement.parentElement.querySelector('.currency-amount').innerText)).toFixed(2);
                let currencyValue = parseFloat(this.parentElement.parentElement.querySelector('.currency-value').innerText);
                let amountCurrencyToSell = parseFloat(this.previousSibling.value);

                if (currencyAmountToDespose - amountCurrencyToSell >= 0) {

                    //set up new currency value
                    let newCurrencyValue = this.parentElement.parentElement.querySelector('.currency-value');
                                      
                    newCurrencyValue.innerText = (currencyPrice * (currencyAmountToDespose-amountCurrencyToSell)).toFixed(2);

                    //set up new currency amount to dispose
                    let currencyAmountToDesposeAfterSell = this.parentElement.parentElement.querySelector('.currency-amount');
                    currencyAmountToDesposeAfterSell.innerText = parseInt((currencyAmountToDespose - amountCurrencyToSell));
                } else {
                    this.setAttribute('disabled', 'true');
                    alert(`You don't have enought currency`)
                }
                //update amount of PLN
                updateAvailablePlnCurrency(currencyPrice * amountCurrencyToSell);
            })
        }
    }    

    // /logged in form - register user and set up curriences amount
    const sendUserData = document.querySelector('.loggin-form');
    const loggedInUser = document.querySelector('.fas.fa-power-off');

    loggedInUser.addEventListener('click', function () {
        sendUserData.classList.add('show');
    });

    sendUserData.addEventListener('submit', function (e) {
        e.preventDefault();
        
        sendUserData.classList.remove('show');

        const userName = document.querySelector('.user-name').value;
        const userSurname = document.querySelector('.user-surname').value;
        const userPassword = document.querySelector('.user-password').value;

        const usdCurrency = document.querySelector('.usd-currency').value;
        const eurCurrency = document.querySelector('.eur-currency').value;
        const chfCurrency = document.querySelector('.chf-currency').value;
        const rubCurrency = document.querySelector('.rub-currency').value;
        const czkCurrency = document.querySelector('.czk-currency').value;
        const gbpCurrency = document.querySelector('.gbp-currency').value;

        const loggedInUserName = document.querySelector('.logged-user');
        loggedInUserName.innerText = `Logged in as: ${userName} ${userSurname}`;

        let data = {
            name: userName,
            surname: userSurname,
            pass: userPassword,
            currencies: {
                usd: usdCurrency,
                eur: eurCurrency,
                chf: chfCurrency,
                rub: rubCurrency,
                czk: czkCurrency,
                gbp: gbpCurrency
            }
        }

        let {
            name,
            surname,
            pass,
            currencies: {
                usd: usd,
                eur: eur,
                chf: chf,
                rub: rub,
                czk: czk,
                gbp: gbp
            }
        } = data;

        const userCurrencyAmountNode = document.querySelectorAll('.currency-amount');
        const aaa = document.querySelectorAll('.my-wallet-wrapper .currency-price');
        const bbb = document.querySelectorAll('.my-wallet-wrapper .currency-value');
        const userCurrencyAmount = [usd, eur, chf, rub, czk, gbp];


        for (let i = 0; i <= userCurrencyAmountNode.length - 1; i++) {
          
            if (userCurrencyAmount[i] != "") {
                userCurrencyAmountNode[i].innerText = parseInt(userCurrencyAmount[i]);
                bbb[i].innerText = parseInt(userCurrencyAmount[i])*(parseFloat(aaa[i].innerText))*100/100;
            } else {
                userCurrencyAmountNode[i].innerText = 0;
                bbb[i].innerText = 0;
            }
        }

        const request = new Request(`${exchange_db}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        fetch(request)
            .then(function () {               
                sellCurrency();
                buyCurrency(request);
            })
    })

    //fetch currencies data from server
    function setCurrencyExchangeRateTime(time) {
        document.querySelector('.time-exchange-rate').innerText = `Currency exchange rate base on hour: ${time}`
    }
     setInterval(function(){     
    fetch(`${apiURL}`)
        .then(res => res.json())
        .then((data) => {
            setCurrencyExchangeRateTime(data.publicationDate);
            setCurrencyActualBuingPrice(data);
            setWalletActualSellingPrice(data);
        })
        .catch(err => console.log(err)
        );

     }, 15000)
}