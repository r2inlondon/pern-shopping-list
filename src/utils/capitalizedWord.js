const capitalizedWord = (name) => {
  const firstLetter = name.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = name.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;

  return capitalizedName;
};

module.exports = capitalizedWord;
