"use strict";

// sign up
const signupNameInput = document.getElementById("signupName");
const signupEmailInput = document.getElementById("signupEmail");
const signupPasswordInput = document.getElementById("signupPassword");
// sign in
const signInEmailInput = document.getElementById("signInEmail");
const signInPasswordInput = document.getElementById("signInPassword");

// buttons
const btnLogOut = document.querySelector("#logOut");
if (btnLogOut) {
  btnLogOut.addEventListener("click", logout);
}

const btnSignUp = document.querySelector("#signUp");
if (btnSignUp) {
  btnSignUp.addEventListener("click", signUp);
}

const btnLogin = document.querySelector("#Login");
if (btnLogin) {
  btnLogin.addEventListener("click", signIn);
}

// localStorage
let signUpList;

if (localStorage.getItem("users") === null) {
  signUpList = [];
} else {
  signUpList = JSON.parse(localStorage.getItem("users"));
}

function signUp() {
  if (!signupNameInput.value || !signupEmailInput.value ||!signupPasswordInput.value) {
    document.getElementById("exist").innerHTML = `<span class="text-danger">All inputs are required</span>`;
    return;
  }

  if (signUpList.some(
      (user) =>user.email.toLowerCase() === signupEmailInput.value.toLowerCase())) {
    document.getElementById("exist").innerHTML = `<span class="text-danger">Email already exists</span>`;
    return;
  }

  signUpList.push({
    name: signupNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  });
  localStorage.setItem("users", JSON.stringify(signUpList));
  document.getElementById("exist").innerHTML = `<span class="text-success">Account created successfully</span>`;
}

function signIn() {
  if (!signInEmailInput.value || !signInPasswordInput.value) {
    document.getElementById("incorrect").innerHTML = `<span class="text-danger">All inputs are required</span>`;
    return;
  }

  const user = signUpList.find(
    (user) =>
      user.email.toLowerCase() === signInEmailInput.value.toLowerCase() &&
      user.password === signInPasswordInput.value
  );

  if (user) {
    localStorage.setItem("userName", user.name);
    location.replace("./home.html");
  } else {
    document.getElementById("incorrect").innerHTML = `<span class="text-danger">Incorrect email or password</span>`;
  }
}

// home
const username = localStorage.getItem("userName");
if (username && document.getElementById("username")) {
  document.getElementById("username").innerHTML = `Welcome ${username}`;
}

function logout() {
  localStorage.removeItem("userName");
  location.replace("./index.html");
}
