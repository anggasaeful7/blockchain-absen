var jwt = localStorage.getItem("jwt_guru");
if (jwt == null) {
  window.location.href = "/Frontend/loginguru.html";
}
