class User {
    constructor(name, pass) {
        this.userName = name;
        this.password = pass;
    }
}
//new user
var currentUser;
//FXMLHttpRequest

class FXMLHttpRequest {
    constructor() {
        this.responseText = "";
        this.network = new Network();
        this.statusCode = "";
        this.status = "";
    }

    open(method, url) {
        this._method = method;
        this._url = url;
    }


    send(data) {
        var request = this._method + " " + this._url + " " + data;
        var response = this.network.send(request);
        response = response.split("/");
        this.statusCode = response[0];
        this.status = response[1];
        if (response.length === 3) {
            this.responseText = response[2];
        }
        this.onload();
    }
}


showTemplate('signup');

//document.body.appendChild(signinForm.cloneNode(true));
function showTemplate(templateId) {
    // Get the target element and the selected template
    const target = document.getElementById("target-element");
    const template = document.getElementById(templateId);

    // Clone the template's content and replace the target element's content with the clone
    const content = template.content.cloneNode(true);
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
    target.appendChild(content);
    if (templateId == "main-template") {
        main();
    }
}

function addNewToDo() {
    const ToDoName = document.getElementById("ToDo-name").value;
    const More = document.getElementById("ToDo-more").value;
    const Fdate = document.getElementById("ToDo-date").value;

    var ToDos = {
        name: ToDoName,
        more: More,
        date: Fdate
    };
    var xhr = new FXMLHttpRequest();
    var jsonNewToDo = JSON.stringify(ToDos);
    xhr.open("POST", '/' + currentUser.userName);

    xhr.onload = function () {
        if (this.statusCode === "200") {
            showTemplate('main-template');
        }
        else {
            alert(this.status);
        }
    }
    xhr.send(jsonNewToDo);
}

function editToDo(ToDoName) {
    showTemplate("edit-ToDo-template");
    document.getElementById("ToDoName").innerHTML = ToDoName;

    var xhr = new FXMLHttpRequest();
    xhr.open("GET", "/" + currentUser.userName + "/" + ToDoName);
    xhr.onload = function () {
        if (this.statusCode === "200") {
            var ToDos = JSON.parse(this.responseText);
            var div1 = document.getElementById("name");
            var name = document.createElement("input");
            name.id = "cName";
            name.placeholder = ToDos.name;
            div1.appendChild(name);

            var div2 = document.getElementById("more");
            var more = document.createElement("input");
            more.id = "cMore";
            more.placeholder = ToDos.more;
            div2.appendChild(more);

            var div3 = document.getElementById("date");
            var date = document.createElement("input");
            date.id = "cDate";
            date.placeholder = ToDos.date;
            div3.appendChild(date);
        }
    }
    xhr.send(null);
}

function updateToDo() {
    var ToDoName = document.getElementById("cName");
    var keyName = ToDoName.placeholder;
    if (ToDoName.value === "") {
        ToDoName = ToDoName.placeholder;
    }
    else {
        ToDoName = ToDoName.value;
    }
    var ToDoMore = document.getElementById("cMore");
    if (ToDoMore.value === "") {
        ToDoMore = ToDoMore.placeholder;
    }
    else {
        ToDoMore = ToDoMore.value;
    }
    var ToDoDate = document.getElementById("cDate");
    if (ToDoDate.value === "") {
        ToDoDate = ToDoDate.placeholder;
    }
    else {
        ToDoDate = ToDoDate.value;
    }
    var ToDos = {
        name: ToDoName,
        more: ToDoMore,
        date: ToDoDate
    }
    var xhr = new FXMLHttpRequest();
    var jsonNewToDo = JSON.stringify(ToDos);
    xhr.open("PUT", '/' + currentUser.userName + '/' + keyName);
    xhr.onload = function () {
        if (this.statusCode === "400") {
            alert(this.status);
            document.getElementById("cName").value = "";
        }
    }
    xhr.send(jsonNewToDo);
}

function deleteToDo() {
    var ToDoName = document.getElementById("cName").placeholder;
    var xhr = new FXMLHttpRequest();
    xhr.open("DELETE", '/' + currentUser.userName + '/' + ToDoName);
    xhr.onload = function () {
        if (this.statusCode === "200") {
            showTemplate('main-template');
        }
    }
    xhr.send(null);
}

var buttomList = [];

function main() {
    document.getElementById("userName").innerHTML = "Hello " + currentUser.userName;
    //get all ToDo 
    var xhr = new FXMLHttpRequest();
    xhr.open("GET", "/" + currentUser.userName + "/ToDos");

    xhr.onload = function () {
        if (this.statusCode === "200") {
            var ToDos = JSON.parse(this.responseText);
            var div = document.getElementById("myToDo");
            buttomList = [];
            for (var i = 0; i < ToDos.length; i++) {
                var newButton = document.createElement("button");
                newButton.innerText = JSON.parse(ToDos[i]).name;
                newButton.id = JSON.parse(ToDos[i]).name;
                newButton.addEventListener("click", editToDo.bind(null, JSON.parse(ToDos[i]).name));
                buttomList.push(newButton);
            }
            buttomList.sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
            for (var i = 0; i < buttomList.length; i++) {
                div.appendChild(buttomList[i]);
            }
            const nameInput = document.getElementById('name-input');
            nameInput.addEventListener("input", updateValue);
        }
    }
    xhr.send(null);
}

function updateValue(e) {
    if (e.target.value == "") {
        for (var i = 0; i < buttomList.length; i++) {
            buttomList[i].style.backgroundColor = '#bba2cc';
        }
    }
}

function signin() {
    const UserName = document.getElementById("signin-username").value;
    const Password = document.getElementById("signin-password").value;
    var Usersignin = {
        userName: UserName,
        password: Password
    };
    var xhr = new FXMLHttpRequest();
    var jsonUser = JSON.stringify(Usersignin);
    xhr.open("GET", '/' + UserName);

    xhr.onload = function () {
        if (this.statusCode === "200") {
            currentUser = new User(UserName, Password);
            showTemplate('main-template');
        }
        else {
            alert(this.status);
            if (this.status == "you need to sign up") {
                showTemplate('signup');
            }
        }
    }
    xhr.send(jsonUser);
}

function logOut() {
    currentUser = null;
    showTemplate('signin');
}


function signup() {
    const Email = document.getElementById("signup-email").value;
    const UserName = document.getElementById("signup-username").value;
    const Password = document.getElementById("signup-password").value;
    if (Password == "" || UserName == "" || Email == "") {
        alert("You must fill in all the fields");
    }
    else {

        var newUser = {
            userName: UserName,
            email: Email,
            password: Password,
            ToDos: []
        };
        var xhr = new FXMLHttpRequest();
        var jsonNewUser = JSON.stringify(newUser);
        xhr.open("POST", "/*");

        xhr.onload = function () {
            if (this.statusCode === "200") {
                currentUser = new User(UserName, Password);
                showTemplate('main-template');
            }
            else {
                alert(this.status);
                showTemplate('signin');
            }
        }
        xhr.send(jsonNewUser);


    }
}

function searchToDo() {
    var ToDoName = document.getElementById("name-input").value;
    var ToDoButton = document.getElementById(ToDoName);
    if (ToDoButton === null) {
        alert("There is no ToDo with this name");
        document.getElementById("name-input").value = "";
    }
    else {
        ToDoButton.style.backgroundColor = "#a9e2ab";
    }
}



