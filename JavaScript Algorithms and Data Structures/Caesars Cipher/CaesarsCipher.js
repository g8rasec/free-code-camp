function rot13(str) {
  const regex = /[A-Z]/;
  return str
    .split("")
    .map((letter) => {
      return regex.test(letter)
        ? letter.charCodeAt() - 13 < 65
          ? String.fromCharCode(letter.charCodeAt() + 13)
          : String.fromCharCode(letter.charCodeAt() - 13)
        : letter;
    })
    .join("");
}
