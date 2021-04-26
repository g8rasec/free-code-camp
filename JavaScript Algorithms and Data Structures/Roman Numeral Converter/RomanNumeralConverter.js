function convertToRoman(num) {
  const decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romans = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  let result = "";

  for (const idx of Object.keys(decimals)) {
    if (decimals[idx] <= num) {
      const integer = Math.trunc(num / decimals[idx]);
      result = result.concat(romans[idx].repeat(integer));
      num -= integer * decimals[idx];
    }
  }
  return result;
}
