const capitalizedWord = require("./capitalizedWord");
const checkEmailRegex = require("./checkEmailRegex");

const checkCreateUserData = (firstName, lastName, email, password) => {
  let newFirstName = firstName;
  let newLastName = lastName;
  const userEmail = email.toLocaleLowerCase();
  const errors = {};

  const whiteSpace = new RegExp(/\s/);

  const checkFirstLetter = new RegExp(/^[A-Z]/);

  if (!checkFirstLetter.test(newFirstName)) {
    newFirstName = capitalizedWord(newFirstName);
  }

  if (!checkFirstLetter.test(newLastName)) {
    newLastName = capitalizedWord(newLastName);
  }

  if (!checkEmailRegex(userEmail)) {
    return { error: "Invalid email address format" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 chars" };
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
