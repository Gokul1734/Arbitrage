document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#floatingInput").value;
  const password = document.querySelector("#floatingPassword").value;

  var cbase = firebase.database().ref("Conceptualist");
  var sbase = firebase.database().ref("startups");
  var vbase = firebase.database().ref("ventures");

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
          sessionStorage.setItem("id", uid);
          sessionStorage.setItem("email", email);

          cbase.once("value", function (snapshot) {
            var data = snapshot.val();
            for (let i in data) {
              if (email == data[i].email) {
                window.location.href = "Conceptualist/Conceptualist.html";
              }
            }
          });

          sbase.once("value", function (snapshot) {
            var data = snapshot.val();
            for (let i in data) {
              if (email == data[i].email) {
                window.location.href = "startups/s.html";
              }
            }
          });

          vbase.once("value", function (snapshot) {
            var data = snapshot.val();
            for (let i in data) {
              if (email == data[i].email) {
                window.location.href = "Venture Capitalist/vc.html";
              }
            }
          });
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      // swal({
      //   title: "Login Successfull",
      //   icon: "success",
      // });
    })
    .catch((err) => {
      alert("Invalid Credentials !!");
      // swal({
      //   title: "Error",
      //   icon: "Error",
      // });
    });

  // const auth = getAuth();
});
