document.querySelector("#submit").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector("#floatingInput").value;
  const password = document.querySelector("#floatingPassword").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // swal({
      //   title: "Login Successfull",
      //   icon: "success",
      // });
      window.location.href = "Conceptualist.html";
    })
    .catch((err) => {
      alert("Invalid Credentials !!");
      // swal({
      //   title: "Error",
      //   icon: "Error",
      // });
    });
});
