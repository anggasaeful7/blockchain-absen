var jwt = localStorage.getItem("jwt_siswa");
if (jwt == null) {
  window.location.href = "/Frontend/loginsiswa.html";
}
