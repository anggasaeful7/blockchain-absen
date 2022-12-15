var jwt = localStorage.getItem("jwt_admin");
if (jwt != null) {
  window.location.href = "/Frontend/dashboard.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5010/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      username: username,
      password: password,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (this.status == 200) {
        localStorage.setItem("jwt_admin", "jwt " + objects["access_token"]);
        Swal.fire({
          text: "Berhasil login",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/Frontend/dashboard.html";
          }
        });
      } else {
        Swal.fire({
          text: "gagal login",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return false;
}

function logout() {
  localStorage.removeItem("jwt_admin");
  window.location.href = "/Frontend/index.html";
}
