document.querySelector("#signup").addEventListener("click", (e) => {
  e.preventDefault();

  var password = document.getElementById("password").value;
  var email = document.getElementById("email").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in

      var dob = document.getElementById("dob").value;
      var pno = document.getElementById("pno").value;
      var fname = document.getElementById("fname").value;
      var lname = document.getElementById("lname").value;

      var user_data = {
        email: email,
        dob: dob,
        pno: pno,
        name: fname + " " + lname,
      };
      console.log(user_data);
      const user = userCredential.user;
      db.collection("Conceptualist Login").doc(user.uid).set({ user_data });
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
