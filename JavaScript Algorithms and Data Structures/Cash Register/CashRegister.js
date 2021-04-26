function checkCashRegister(price, cash, cid) {
  const currency = {
    'ONE HUNDRED': 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };

  function getSum(cashInDrawer) {
    return cashInDrawer.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue[1]);
    }, 0);
  }

  function formatSum(sumOfCashInDrawer) {
    return parseFloat(sumOfCashInDrawer.toFixed(2));
  }

  let change = cash - price;

  const availableCurrency = [];

  function getValuesAvailableForExchange() {
    for (const [curName, value] of Object.entries(currency)) {
      if (value < change) {
        cid.reverse().forEach(curr => {
          if (curName === curr[0]) {
            availableCurrency.push(curr);
          }
        });
      }
    }
  }

  const changeValues = [];

  function getChangeValues() {
    const values = [];

    for (const [curName, value] of Object.entries(currency)) {
      cid.forEach(curr => {
        if (curr[0] === curName) {
          if (value < change) {
            while (curr[1] != 0 && change >= value) {
              curr[1] -= value;
              change -= value;
              change = change.toFixed(2);
              values.push([curName, value]);
            }
          }
        }
      });
    }

    let control = false;

    values.forEach(chValue => {
      changeValues.forEach(value => {
        if (value[0] === chValue[0]) {
          value[1] += chValue[1];
          control = true;
        } else {
          control = false;
        }
      });
      if (!control) {
        changeValues.push(chValue);
      }
    });
  }

  // CLOSED
  const sumOfAllCash = getSum(cid);
  const formattedSumOfAllCash = formatSum(sumOfAllCash);

  if (formattedSumOfAllCash === change) {
    return {
      status: 'CLOSED',
      change: cid,
    };
  }

	// INSUFFICIENT_FUNDS
  getValuesAvailableForExchange();
  const partialCashSum = getSum(availableCurrency);
  const formattedPartialCashSum = formatSum(partialCashSum);

  if (formattedPartialCashSum < change) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: [],
    };
  }

  // OPEN
  getChangeValues();
  return {
    status: 'OPEN',
    change: changeValues,
  };
}

checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);