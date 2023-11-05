document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var BusinessName = document.getElementById("BusinessName").value;
  var pan = document.getElementById("pan").value;
  var doc = document.getElementById("CommDate").value;
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

      function savedata() {
        var user_data = {
          user: username,
          bname: BusinessName,
          pan: pan,
          doc: doc,
          address: address,
          name: fname + lname,
          email: email,
          pan: pan,
        };

        firebaseref.ref("startups/" + user.uid).set(user_data);
        sessionStorage.setItem("id", user.uid);
        console.log("Data Saved !!");
        alert("Thank you registering your details !!");
      }
      savedata();

      setTimeout(() => {
        window.location.href = "../Main.html";
      }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      // ..
    });
});
