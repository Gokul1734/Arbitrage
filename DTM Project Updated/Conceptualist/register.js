// var uid = "";

document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();

  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;
  var pno = document.getElementById("pno").value;
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var city = document.getElementById("city").value;

  function passvalues() {
    sessionStorage.setItem("email", email);
    return false;
  }
  var firebaseref = firebase.database();

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;
      // db.collection("Conceptualist Login").doc(user.uid).set({ user_data });
      console.log(user.uid);

      function savedata() {
        var user_data = {
          email: email,
          pno: pno,
          name: fname + " " + lname,
          city: city,
          id: user.uid,
        };
        alert("User Created");
        firebaseref.ref("Conceptualist/" + user.uid).set(user_data);
        sessionStorage.setItem("id", user.uid);
        console.log("Data Saved !!");
      }
      savedata();
      passvalues();
      setTimeout(() => {
        window.location.href = "../login.html";
      }, 3000);
      // location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);
      // ..
    });
});

// window.onload() = () => {
//  try {
//   const currentUser = window.localStorage.getItem('Current_loggedIn')
//   if (currentUser === null ) {
//    throw new Error('No Current User ')
//   }else {
//    loginform.style.display = 'none'
//    signupform.style.display = 'none'
//   }
//  }catch(err) {
//   loginform.style.display = 'block'
//  }
// };
