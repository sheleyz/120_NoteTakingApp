var notes = [
  {
    text: "Top Secret Documents",
    importance: 5
  },
  {
    text: "My favorite pizza is deep dish",
    importance: 2
  },
  {
    text: "Call Bob at 3:00",
    importance: 2
  }
];

function app() {
  var pages = ["home", "addNotes", "displayNotes"];
  init();
  nav(pages);
  renderPage("home");
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
    button.addEventListener("click", function() {
      renderPage(val);
    });
    document.body.querySelector(".nav").appendChild(button);
  }
}

function renderPage(page) {
  if (page === "home") {
    home();
  } else if (page === "addNotes") {
    addNotes();
  } else if (page === "displayNotes") {
    displayNotes();
  }
}

function home() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "Home";
}

function addNotes() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "";

  //Input Text
  var inputTextEle = document.createElement("input");
  document.body.querySelector(".wrapper").appendChild(inputTextEle);
  inputTextEle.setAttribute("id", "inputText");
  inputTextEle.setAttribute("placeholder", "Text");
  var inputText = document.getElementById("inputText");

  //Input Importance
  var inputImpEle = document.createElement("input");
  document.body.querySelector(".wrapper").appendChild(inputImpEle);
  inputImpEle.setAttribute("id", "inputImportance");
  inputImpEle.setAttribute("placeholder", "Importance");
  inputImpEle.setAttribute("type", "number");
  var inputImportance = document.getElementById("inputImportance");

  //Submit Note Button
  var submitNoteEle = document.createElement("div");
  submitNoteEle.innerHTML = "Submit Note";
  document.body.querySelector(".wrapper").appendChild(submitNoteEle);
  submitNoteEle.setAttribute("class", "submitButton");

  //Click Submit Note Button
  var noteErrorEle = document.createElement("div");
  noteErrorEle.setAttribute("class", "noteError");
  document.body
    .querySelector(".submitButton")
    .addEventListener("click", function() {
      if (inputValue(inputText) && inputValue(inputImportance)) {
        submitNote();
        noteErrorEle.innerHTML = "Note added successfully";
        document.body.querySelector(".wrapper").appendChild(noteErrorEle);
      } else {
        if (!inputValue(inputText) && inputValue(inputImportance)) {
          noteErrorEle.innerHTML = "You didn't type in any text";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        } else if (inputValue(inputText) && !inputValue(inputImportance)) {
          noteErrorEle.innerHTML =
            "You didn't type in a valid importance value";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        } else {
          noteErrorEle.innerHTML = "You didn't type anything valid";
          document.body.querySelector(".wrapper").appendChild(noteErrorEle);
        }
      }
    });

  function submitNote() {
    var obj = {
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
  wrapper.innerHTML = "Notes";

  var sortBy = [
    {
      prop: "importance",
      direction: -1
    },
    {
      prop: "text",
      direction: 1
    }
  ];

  notes.sort(function(a, b) {
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
    var ele = document.createElement("div");
    ele.innerHTML = notes[i].text;
    document.body.querySelector(".wrapper").appendChild(ele);
  }
}

function loginPage() {
  var login1 = false;
  var wrapper2 = document.createElement("div");
  wrapper2.classList.add("wrapper2");
  document.body.appendChild(wrapper2);
  var wrapper2 = document.querySelector(".wrapper2");
  wrapper2.innerHTML = "";

  //Input Name
  var inputNameEle = document.createElement("input");
  document.body.querySelector(".wrapper2").appendChild(inputNameEle);
  inputNameEle.setAttribute("id", "inputName");
  inputNameEle.setAttribute("placeholder", "Name");
  var inputName = document.getElementById("inputName");

  //Input Password
  var inputPassEle = document.createElement("input");
  document.body.querySelector(".wrapper2").appendChild(inputPassEle);
  inputPassEle.setAttribute("id", "inputPass");
  inputPassEle.setAttribute("placeholder", "Password");
  inputPassEle.setAttribute("type", "password");
  var inputPass = document.getElementById("inputPass");

  //Login Button
  var loginEle = document.createElement("div");
  loginEle.innerHTML = "Log In";
  document.body.querySelector(".wrapper2").appendChild(loginEle);
  loginEle.setAttribute("class", "loginButton");

  //Click Login Button
  var loginErrorEle = document.createElement("div");
  loginErrorEle.setAttribute("class", "loginError");
  document.body
    .querySelector(".loginButton")
    .addEventListener("click", function() {
      if (inputVal(inputName) && inputVal(inputPass)) {
        document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        submitLogin();
        if (login1 == true) {
          inputNameEle.style.display = "none";
          inputPassEle.style.display = "none";
          loginErrorEle.innerHTML = "";
          loginEle.style.display = "none";
          app();
        }
      } else {
        if (!inputVal(inputName) && inputVal(inputPass)) {
          loginErrorEle.innerHTML = "You didn't type in your name";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        } else if (inputVal(inputName) && !inputVal(inputPass)) {
          loginErrorEle.innerHTML = "You didn't type in your password";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        } else {
          loginErrorEle.innerHTML = "You didn't type anything";
          document.body.querySelector(".wrapper2").appendChild(loginErrorEle);
        }
      }
    });

  //loginList not displayed, simply kept as a "record of logins"
  var loginList = [];
  function submitLogin() {
    var obj = {
      name: inputName.value,
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
}

loginPage();