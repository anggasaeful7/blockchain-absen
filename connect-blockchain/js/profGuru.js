function profileGuru() {
  let token = localStorage.getItem("jwt_guru");
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:5010/profile_guru");
  xhttp.setRequestHeader("Authorization", token);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      // const guru = objects[ guru"];
      console.log(objects);
      for (let object of objects) {
        document.getElementById("namaGuru").innerHTML = object.nama;
        document.getElementById("nama").value = "      " + object.nama;
        document.getElementById("email").value = "      " + object.email;
        document.getElementById("alamat").value = "      " + object.alamat;
        document.getElementById("tempat").value =
          "      " + object.tempat_lahir;
        document.getElementById("jk").value = "      " + object.jk;
        document.getElementById("agama").value = "      " + object.agama;
      }
    }
  };
}

profileGuru();
