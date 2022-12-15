function profileSiswa() {
  let token = localStorage.getItem("jwt_siswa");
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:5011/profile_siswa");
  xhttp.setRequestHeader("Authorization", token);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      // const siswa = objects[ siswa"];
      console.log(objects);
      for (let object of objects) {
        document.getElementById("nama").innerHTML = object.nama;
        document.getElementById("nis").innerHTML = object.nis;
      }
    }
  };
}

profileSiswa();
