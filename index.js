const fnameEl = document.querySelector("#fname");
const lnameEl = document.querySelector("#lname");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

const form = document.querySelector("#form");

const checkFname = () => {
  let valid = false;

  let min = 3;
  let max = 15;

  const firstname = fnameEl.value.trim();

  if (!isRequired(fnameEl)) {
    showError(fnameEl, "Firstname cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      fnameEl,
      `Firstname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(fnameEl);
    valid = true;
  }
  return valid;
};

const checkLname = () => {
  let valid = false;

  let min = 3,
    max = 15;

  const lastname = lnameEl.value.trim();

  if (!isRequired(username)) {
    showError(lnameEl, "Lastname cannot be blank.");
  } else if (!isBetween(lnameEl.length, min, max)) {
    showError(
      lnameEl,
      `Lastname must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(lnameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  // prevent the form from submitting
  e.preventDefault();

  let isUsernameValid = checkFname();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "fname":
        checkFname();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);
