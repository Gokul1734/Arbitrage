var cbase = firebase.database().ref("Conceptualist/");

cbase.once("value", function (snapshot) {
  var data = snapshot.val();
  for (let i in data) {
    var e = data[i].email;
    var u = data[i];
  }
  console.log(u);
});

document.querySelector("#create").addEventListener("click", (e) => {
  e.preventDefault();

  var title = document.getElementById("title").value;
  var type = document.querySelector("#type").value;
  var budget = document.getElementById("budget").value;
  var objective = document.getElementById("desc").value;
  let email = sessionStorage.getItem("email");
  let date = new Date().toLocaleDateString("en-GB");

  let project_data = {
    date: date,
    title: title,
    type: type,
    budget: budget,
    objective: objective,
  };

  var firebaseref = firebase.database().ref("Conceptualist/");

  firebaseref
    .child(sessionStorage.getItem("id"))
    .child("projects")
    .push(project_data);
  setTimeout(() => {
    window.location.href = "projects.html";
  }, 5000);
});
