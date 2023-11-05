var cbase = firebase.database().ref("Conceptualist/");

// Create a root reference
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'

var metadata = {
  contentType: "image/jpeg",
};

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

  var mountainsRef = storageRef.child(`${title}.jpg`);

  // Create a reference to 'images/mountains.jpg'
  var mountainImagesRef = storageRef.child(`projects/${title}.jpg`);

  var choosefile = document.getElementById("photo");
  const files = choosefile.files[0];
  if (files) {
    const FileR = new FileReader();
    FileR.readAsDataURL(files);
  }
  // Upload the file and metadata
  var uploadTask = storageRef
    .child(`projects/${title}.jpg`)
    .put(files, metadata);

  var firebaseref = firebase.database().ref("Conceptualist/");

  firebaseref
    .child(sessionStorage.getItem("id"))
    .child("projects")
    .child(project_data.title)
    .update(project_data);
  setTimeout(() => {
    window.location.href = "projects.html";
  }, 5000);
});
