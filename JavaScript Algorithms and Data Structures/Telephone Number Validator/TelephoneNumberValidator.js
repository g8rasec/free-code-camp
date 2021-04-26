function telephoneCheck(str) {
  return /^1? ?\(\d{3}\)[\- ]?\d{3}[\- ]\d{4}$|^1? ?\d{3}[\- ]?\d{3}[\- ]?\d{4}$/g.test(
    str
  );
}
