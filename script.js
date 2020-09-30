var notes = [
  {
    title: "Bank Info",
    text: "My account PIN is 1234",
    importance: 5
  },
  {
    title: "Pizza",
    text: "My favorite pizza is deep dish pepperoni",
    importance: 2
  },
  {
    title: "Taco Recipe",
    text: "Tacos require meat, cheese, and lots of veggies",
    importance: 2
  }
];

function app() {
  var pages = ["Home", "New Note", "My Notes"];
  init();
  nav(pages);
  renderPage("Home");
}

function init() {
  var nav = document.createElement("nav");
  nav.classList.add("nav");
  var wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(nav);
  document.body.appendChild(wrapper);
}

function nav(list) {
  for (var i = 0; i < list.length; i++) {
    const button = document.createElement("button");
    const val = list[i];
    button.innerHTML = list[i];
    button.addEventListener("click", function () {
      renderPage(val);
    });
    document.body.querySelector(".nav").appendChild(button);
  }
}

function renderPage(page) {
  if (page === "Home") {
    home();
  } else if (page === "New Note") {
    addNotes();
  } else if (page === "My Notes") {
    displayNotes();
  }
}

function home() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "Welcome to Notes! To add a new note or see the notes you have already created, click on the respective buttons above.";
}

function addNotes() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "";

  // Input Title
  var inputTitleEle = document.createElement("input");
  document.body.querySelector(".wrapper").appendChild(inputTitleEle);
  inputTitleEle.setAttribute("id", "inputTitle");
  inputTitleEle.setAttribute("placeholder", "Title");
  var inputTitle = document.getElementById("inputTitle");
  
  // Input Text
  var inputTextEle = document.createElement("input");
  document.body.querySelector(".wrapper").appendChild(inputTextEle);
  inputTextEle.setAttribute("id", "inputText");
  inputTextEle.setAttribute("placeholder", "Text");
  var inputText = document.getElementById("inputText");

  // Input Importance
  var inputImpEle = document.createElement("input");
  document.body.querySelector(".wrapper").appendChild(inputImpEle);
  inputImpEle.setAttribute("id", "inputImportance");
  inputImpEle.setAttribute("placeholder", "Importance");
  inputImpEle.setAttribute("type", "number");
  var inputImportance = document.getElementById("inputImportance");

  // Create Submit Note Button
  var submitNoteEle = document.createElement("div");
  submitNoteEle.innerHTML = "Submit Note";
  document.body.querySelector(".wrapper").appendChild(submitNoteEle);
  submitNoteEle.setAttribute("class", "submitButton");

  // Click Submit Note Button
  var noteErrorEle = document.createElement("div");
  noteErrorEle.setAttribute("class", "noteError");
  noteErrorEle.style.color = "red";
  document.body
    .querySelector(".submitButton")
    .addEventListener("click", function () {
      if (inputValue(inputTitle) && inputValue(inputText) && inputValue(inputImportance)) {
        submitNote();
        noteErrorEle.innerHTML = "Note added successfully";
        document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        renderPage("My Notes");
      } else {
        if (!inputValue(inputTitle) && inputValue(inputText) && inputValue(inputImportance)) {
          noteErrorEle.innerHTML = "Please enter a title for your note";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        } else if (inputValue(inputTitle) && !inputValue(inputText) && inputValue(inputImportance)) {
          noteErrorEle.innerHTML = "Please enter text for your note";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        } else if (inputValue(inputTitle) && inputValue(inputText) && !inputValue(inputImportance)) {
          noteErrorEle.innerHTML = "Please enter a valid importance value for your note";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        } else {
          noteErrorEle.innerHTML = "Please enter a title, text, and importance value for your note";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        }
      }
    });

  function submitNote() {
    var obj = {
      title: inputTitle.value,
      text: inputText.value,
      importance: inputImportance.value
    };
    notes.push(obj);
  }

  function inputValue(ele) {
    if (ele.value !== "") {
      return true;
    } else {
      return false;
    }
  }
}

function displayNotes() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "My Notes";

  var sortBy = [
    {
      prop: "importance",
      direction: -1
    },
    {
      prop: "title",
      direction: 1
    }
  ];

  notes.sort(function (a, b) {
    let i = 0,
      result = 0;
    while (i < sortBy.length && result === 0) {
      result =
        sortBy[i].direction *
        (a[sortBy[i].prop].toString() < b[sortBy[i].prop].toString()
          ? -1
          : a[sortBy[i].prop].toString() > b[sortBy[i].prop].toString()
          ? 1
          : 0);
      i++;
    }
    return result;
  });

  for (var i = 0; i < notes.length; i++) {
    var titleEle = document.createElement("h4");
    var textEle = document.createElement("div");
    titleEle.innerHTML = notes[i].title;
    textEle.innerHTML = notes[i].text;
    document.body.querySelector(".wrapper").appendChild(titleEle);
    document.body.querySelector(".wrapper").appendChild(textEle);
  }
}

function loginPage() {
  var login1 = false;
  var wrapper2 = document.createElement("div");
  wrapper2.classList.add("wrapper2");
  document.body.appendChild(wrapper2);
  var wrapper2 = document.querySelector(".wrapper2");
  wrapper2.innerHTML = "";

  // Input Username
  var inputUsernameEle = document.createElement("input");
  document.body.querySelector(".wrapper2").appendChild(inputUsernameEle);
  inputUsernameEle.setAttribute("id", "inputUsername");
  inputUsernameEle.setAttribute("placeholder", "Username");
  var inputUserame = document.getElementById("inputUsername");

  // Input Password
  var inputPassEle = document.createElement("input");
  document.body.querySelector(".wrapper2").appendChild(inputPassEle);
  inputPassEle.setAttribute("id", "inputPass");
  inputPassEle.setAttribute("placeholder", "Password");
  inputPassEle.setAttribute("type", "password");
  var inputPass = document.getElementById("inputPass");

  // Create Login Button
  var loginEle = document.createElement("div");
  loginEle.innerHTML = "Log In";
  document.body.querySelector(".wrapper2").appendChild(loginEle);
  loginEle.setAttribute("class", "loginButton");

  // Click Login Button
  var loginErrorEle = document.createElement("div");
  loginErrorEle.setAttribute("class", "loginError");
  loginErrorEle.style.color = "red";
  document.body
    .querySelector(".loginButton")
    .addEventListener("click", function () {
      if (inputVal(inputUserame) && inputVal(inputPass)) {
        document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
         if (inputCor(inputUserame) && inputCor(inputPass)) {
          submitLogin();
        } else {
          if (!inputCor(inputUserame) && inputCor(inputPass)) {
            loginErrorEle.innerHTML = "Your username is incorrect";
            document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
          } else if (inputCor(inputUserame) && !inputCor(inputPass)) {
            loginErrorEle.innerHTML = "Your password is incorrect";
            document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
          } else {
            loginErrorEle.innerHTML =
              "Your username and password are incorrect";
            document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
          }
        }
        
        if (login1 == true) {
          loginErrorEle.innerHTML = "";
          wrapper2.style.display = "none";
          app();
        }
      } else {
        if (!inputVal(inputUserame) && inputVal(inputPass)) {
          loginErrorEle.innerHTML = "You didn't type in your name";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        } else if (inputVal(inputUserame) && !inputVal(inputPass)) {
          loginErrorEle.innerHTML = "You didn't type in your password";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        } else {
          loginErrorEle.innerHTML = "You didn't type anything";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        }
      }
    });

  // loginList not displayed, simply kept as a "record of logins"
  var loginList = [];
  function submitLogin() {
    var obj = {
      name: inputUserame.value,
      pass: inputPass.value
    };
    loginList.push(obj);
    console.log(loginList);
    login1 = true;
  }

  function inputVal(ele) {
    if (ele.value !== "") {
      return true;
    } else {
      return false;
    }
  }
  function inputCor(ele) {
    if (ele.value === "johnnyappleseed" || ele.value === "app1eCider") {
      return true;
    } else {
      return false;
    }
  }
}

loginPage();