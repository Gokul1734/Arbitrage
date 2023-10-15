document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var vc = document.getElementById("vc").value;
  var pan = document.getElementById("pan").value;
  var address = {
    country: document.querySelector("#country").value,
    state: document.querySelector("#state").value,
    zip: document.getElementById("zip").value,
  };

  var firebaseref = firebase.database();

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
          name: fname + lname,
          email: email,
          pan: pan,
        };

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
