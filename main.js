/* Values from text inputs */
const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

/* Values from range inputs */
const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

/* Result values */
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

/* All range: */
const inputsRange = document.querySelectorAll('.input-range');
const inputsNumbers = document.querySelectorAll('.input-number');

/* All buttons with шnterest rate: */
const bankBtns = document.querySelectorAll('.bank');

// Mapping value from RANGE to input.VALUE
const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
// Mapping value from input.VALUE to RANGE
const assignValueNumber = () => {
    totalCostRange.value = totalCost.value;
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
}

assignValue();
assignValueNumber();

const banks = [
    {
        name: 'alfa',
        precents: 8.7   
    },
    {
        name: 'sberbank',
        precents: 8.4   
    },
    {
        name: 'pochta',
        precents: 7.9   
    },
    {
        name: 'tinkoff',
        precents: 9.2   
    }
];

let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find( bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

// for (let inputNumber of inputsNumbers) {
//     inputNumber.addEventListener('inputNumber', () => {
//         assignValueNumber();
//         calculation(totalCost.value, anInitialFee.value, creditTerm.value);
//     })
// }

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /*
        MP - Monthly Payment
        LA - Loun Amount
        IR - Interest Rate
        NM - Numver of Months

        MP = (LA + (( LA / 100) * IR / 12) * NM) / NM;
    */

    let monthlyPayment; // Monthly Payment
    let lounAmount = totalCost - anInitialFee; // Loun Amount
    let interestRate = currentPrecent; // Interest Rate
    let numberOfYears = creditTerm; // Numver of Years
    let numberOfMonths = 12 * numberOfYears; // Numver of Months

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12 ) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} $`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} $`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35) }$`;
    }

    // Creating a Chart doughnut
    var ctx = document.getElementById('chart');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Сумма кредита',
                'Ежемесячный платеж',
                'Рекомендуемый доход',
            ],
            datasets: [{
                label: 'My First dataset',
                data: [`${lounAmount}`, `${monthlyPaymentArounded}`, `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35) }`],
                backgroundColor: [
                    'rgb(113, 19, 72)',
                    'rgb(165, 19, 117)',
                    'rgb(206, 50, 147)',
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutoutPercentage: 80,
            legend: {
                display: false,
            },
            // Turn off tooltips at chart
            tooltips: {
                enabled: false,
            }
        },
    });
}


// Creating a Chart doughnut
var ctx = document.getElementById('chart');
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            backgroundColor: [
                'rgb(113, 19, 72)',
                'rgb(165, 19, 117)',
                'rgb(206, 50, 147)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutoutPercentage: 80,
    },
});

