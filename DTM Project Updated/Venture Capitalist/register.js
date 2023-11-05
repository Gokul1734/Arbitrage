document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var vc = document.getElementById("vc").value;
  var link = document.getElementById("pan").value;
  var type = document.querySelector("#Btype").value;
  var address = {
    country: document.querySelector("#country").value,
    state: document.querySelector("#state").value,
    zip: document.getElementById("zip").value,
  };

  var firebaseref = firebase.database();
  var storageRef = firebase.storage().ref();
  var metadata = {
    contentType: "image/jpeg",
  };

  var mountainsRef = storageRef.child(`${vc}.jpg`);

  // Create a reference to 'images/mountains.jpg'
  var mountainImagesRef = storageRef.child(`vc/${vc}.jpg`);

  var choosefile = document.getElementById("vcp");
  const files = choosefile.files[0];
  if (files) {
    const FileR = new FileReader();
    FileR.readAsDataURL(files);
  }
  // Upload the file and metadata
  var uploadTask = storageRef.child(`vc/${vc}.jpg`).put(files, metadata);

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("user created");

      function savedata() {
        var user_data = {
          vc: vc,
          pan: pan,
          name: fname + " " + lname,
          email: email,
          link: link,
          type: type,
          uid: user.uid,
        };
        console.log(link);
        firebaseref.ref("ventures/" + user.uid).set(user_data);
        sessionStorage.setItem("id", user.uid);
        console.log("Data Saved !!");
      }
      savedata();

      setTimeout(() => {
        window.location.href = "../login.html";
      }, 3000);
      // location.reload(); // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      // ..
    });
});
