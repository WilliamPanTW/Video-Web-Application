const UserInput = document.getElementById('User');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('cpassword');
const form = document.getElementById('reg-form');
const alpha = /(?=.*[A-Za-z])/;
const hasupper = /(?=.*[A-Z])/;
const hasnumber = /(?=.*[0-9])/;
const hasspecial = /(?=.*[\/\*\-\+\!\@\#\$\^\&\~\[\]])/;
//----------------------User validation----------------------//

UserInput.addEventListener('focus', () => {
  document.getElementById("UserValidation").style.display = "inline-block";
});

UserInput.addEventListener('blur', () => {
  document.getElementById("UserValidation").style.display = "none";
});

UserInput.addEventListener('input', () => {
  const user = UserInput.value;
  document.getElementById("UserBegins").classList.toggle("valid-text", alpha.test(user.charAt(0)));
  document.getElementById("UserBegins").classList.toggle("invalid-text", !alpha.test(user.charAt(0)));
});

UserInput.addEventListener('input', () => {
  const user = UserInput.value.replace(/[^a-zA-Z0-9]/g, '');
  const isValid = user.length >= 3;

  document.getElementById('UserAlpha').classList.toggle('valid-text', isValid);
  document.getElementById('UserAlpha').classList.toggle('invalid-text', !isValid);
});
//----------------------Password validation----------------------//
passwordInput.addEventListener('focus', () => {
  document.getElementById("PassValidation").style.display = "inline-block";
});

passwordInput.addEventListener('blur', () => {
  document.getElementById("PassValidation").style.display = "none";
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  
  document.getElementById("check0").classList.toggle("valid-text", password.length >= 8);
  document.getElementById("check0").classList.toggle("invalid-text", password.length < 8);
  
  document.getElementById("check1").classList.toggle("valid-text", hasupper.test(password));
  document.getElementById("check1").classList.toggle("invalid-text", !hasupper.test(password));
  
  document.getElementById("check2").classList.toggle("valid-text", hasnumber.test(password));
  document.getElementById("check2").classList.toggle("invalid-text", !hasnumber.test(password));
  
  document.getElementById("check3").classList.toggle("valid-text", hasspecial.test(password));
  document.getElementById("check3").classList.toggle("invalid-text", !hasspecial.test(password));

});

//----------------------comfirm validation----------------------//


confirmInput.addEventListener('focus', () => {
  document.getElementById("match").style.display = "inline-block";
});

confirmInput.addEventListener('blur', () => {
  document.getElementById("match").style.display = "none";
});

confirmInput.addEventListener('input', () => {
  const confirm = confirmInput.value;
  const password = passwordInput.value;
  document.getElementById("match").classList.toggle("valid-text", confirm === password);
  document.getElementById("match").classList.toggle("invalid-text", confirm !== password);
});

// Update confirm to prevent User enter confirm first
passwordInput.addEventListener('input', () => {
  const confirm = confirmInput.value;
  const password = passwordInput.value;
  document.getElementById("match").classList.toggle("valid-text", confirm === password);
  document.getElementById("match").classList.toggle("invalid-text", confirm !== password);
});

//----------------------Submit validation----------------------//
form.addEventListener('submit', function(event) {
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  const userbegin = UserInput.value.charAt(0);
  const usertrim = UserInput.value.replace(/[^a-zA-Z0-9]/g, '');
  const isValid = usertrim.length >= 3;
  // Validate user
  if (!isValid ||!alpha.test(userbegin)) {
    event.preventDefault();
    alert("Invalid username.");
    document.getElementById("UserValidation").style.display = "inline-block";
  }

  // Validate password
  if (password.length<8||!hasupper.test(password)||!hasnumber.test(password)||!hasspecial.test(password)) {
    event.preventDefault();
    alert("Invalid password.");
    document.getElementById("PassValidation").style.display = "inline-block";
  }

  // Validate confirm password
  if (confirm !== password) {
    event.preventDefault();
    alert("Passwords do not match.");
    document.getElementById("match").style.display = "inline-block";
  }
});
