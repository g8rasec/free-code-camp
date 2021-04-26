function palindrome(str) {
  const cleanedStr = str.toLowerCase().match(/[a-z0-9]/g);
  return cleanedStr.join("") === cleanedStr.reverse().join("") ? true : false;
}
