
  var emailInput = document.getElementById("inputEmail");
  var passInput = document.getElementById("inputPassword");
  var signUpName = document.getElementById("signUpName");
  var signUpEmail = document.getElementById("signUpEmail");
  var signUpPass = document.getElementById("signUpPassword");

var allUsers = [];
if(localStorage.getItem('users')){
  allUsers = JSON.parse(localStorage.getItem('users'));
}

// login function
function logIn(){
  var email = emailInput.value
  var password = passInput.value
  if (email === "" || password === "") {
    alert('Please fill all inputs')
  }else {
    for (var i = 0; i < allUsers.length; i++){
      if (allUsers[i].signUpEmail.toLowerCase() == email.toLowerCase() && allUsers[i].signUpPass == password){
        localStorage.setItem('loggedIn', allUsers[i].signUpName);
        window.location.href = 'pages/home.html';
        return;
      }
    }
  }
}

//Sign Up Function

function signUp() {
  var email = signUpEmail.value.toLowerCase();
  var userName = signUpName.value.toLowerCase();
  var password = signUpPass.value;
  var emailFound = false;
  if (email === "" || password === "" || userName === "") {
    alert('Please fill all inputs')
  }else {
  for (var i = 0; i < allUsers.length; i ++){
    if(allUsers[i].signUpEmail.toLowerCase() == email){
      emailFound = true;
      break;
    }
  }
  if (emailFound) {
    alert('This email is already registered.');
    clearData();
  }else {
    var userData = {
          signUpName: signUpName.value,
          signUpEmail: signUpEmail.value,
          signUpPass: signUpPass.value
        };
        allUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(allUsers));
        alert('Registration successful!');
        window.location.href = 'index.html';
        clearData();
  }
}
}

var loggedIn = localStorage.getItem('loggedIn');

if (loggedIn){
  document.getElementById('sayWelcome').innerHTML = 'Welcome' +' ' +loggedIn;
}



//logout function
function logOut(){
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html'
}


//validate
function validateData(element) {
  var regex = {
    inputEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    signUpEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    signUpName: /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]\S$/,
    signUpPassword: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}


//Clear Data function
function clearData() {
  signUpEmail.value = null;
  signUpName.value = null;
  signUpPass.value = null;
  signUpEmail.classList.remove("is-valid");
  signUpName.classList.remove("is-valid");
}

