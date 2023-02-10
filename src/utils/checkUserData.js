const capitalizedWord = require("./capitalizedWord");

const checkCreateUserData = (firstName, lastName, email, password) => {
  let newFirstName = firstName;
  let newLastName = lastName;

  const checkEmail = new RegExp(
    /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/
  );
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
