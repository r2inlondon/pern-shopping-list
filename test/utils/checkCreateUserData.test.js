const checkCreateUserData = require("../../src/utils/checkUserData");

describe("Test checkCreateUSerData function", () => {
  let firstName = "federico";
  let lastName = "pantalone";
  let email = "fed@itlab.com";
  let password = "Pompino1212";

  test("Check Name gets capitalized", () => {
    const result = checkCreateUserData(firstName, lastName, email, password);
    expect(result.lastName).toBe("Pantalone");
  });

  test("Submitting wrong email format, result must be false", () => {
    const wrongEmail = "fed@itlab";
    const result = checkCreateUserData(
      firstName,
      lastName,
      wrongEmail,
      password
    );
    expect(result).toBe(false);
  });

  test("Submitting short password, result must be false", () => {
    const wrongPassword = "Pompino";
    const result = checkCreateUserData(
      firstName,
      lastName,
      email,
      wrongPassword
    );
    expect(result).toBe(false);
  });
});
