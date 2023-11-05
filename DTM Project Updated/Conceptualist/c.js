var cbase = firebase.database().ref("Conceptualist/");

var email = sessionStorage.getItem("email");

cbase.once("value", function (snapshot) {
  var data = snapshot.val();
  for (let i in data) {
    if (email == data[i].email) {
      // console.log(data[i]);
      document.getElementById("user").innerHTML = data[i].name;
      sessionStorage.setItem("user", JSON.stringify(data[i]));
    }
  }
});

document.querySelector("#logout").addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(
    function () {
      console.log("Signed Out");
      window.location.href = "../login.html";
      sessionStorage.clear();
    },
    function (error) {
      console.error("Sign Out Error", error);
    }
  );
});
