const checkEmailRegex = (email) => {
  const checkEmail = new RegExp(
    /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/
  );

  return checkEmail.test(email);
};

module.exports = checkEmailRegex;
