const capitalizedWord = require("./capitalizedWord");
const checkEmailRegex = require("./checkEmailRegex");

const checkCreateUserData = (firstName, lastName, email, password) => {
  let newFirstName = firstName;
  let newLastName = lastName;
  const userEmail = email.toLocaleLowerCase();

  const whiteSpace = new RegExp(/\s/);

  const checkFirstLetter = new RegExp(/^[A-Z]/);

  if (!checkFirstLetter.test(newFirstName)) {
    newFirstName = capitalizedWord(newFirstName);
  }

  if (!checkFirstLetter.test(newLastName)) {
    newLastName = capitalizedWord(newLastName);
  }

  if (!checkEmailRegex(userEmail)) {
    return false;
  }

  if (password.length < 10) {
    return false;
  }

  const data = {
    firstName: newFirstName,
    lastName: newLastName,
    email: userEmail,
    password,
  };

  return data;
};

module.exports = checkCreateUserData;
