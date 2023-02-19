const capitalizedWord = require("./capitalizedWord");
const checkEmailRegex = require("./checkEmailRegex");

const checkCreateUserData = (firstName, lastName, email, password) => {
  let newFirstName = firstName;
  let newLastName = lastName;

  const checkEmail = checkEmailRegex(email);

  const whiteSpace = new RegExp(/\s/);

  const checkFirstLetter = new RegExp(/^[A-Z]/);

  if (!checkFirstLetter.test(newFirstName)) {
    newFirstName = capitalizedWord(newFirstName);
  }

  if (!checkFirstLetter.test(newLastName)) {
    newLastName = capitalizedWord(newLastName);
  }

  if (!checkEmail.test(email)) {
    return false;
  }

  if (password.length < 10) {
    return false;
  }

  const data = {
    firstName: newFirstName,
    lastName: newLastName,
    email,
    password,
  };

  return data;
};

module.exports = checkCreateUserData;
