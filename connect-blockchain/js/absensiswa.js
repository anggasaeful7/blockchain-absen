function absenMasukGuru() {
  const id = 12;
  const nama = document.getElementById("nama").innerHTML;
  const nis = document.getElementById("nis").innerHTML;
  const lat = document.getElementById("lat").innerHTML;
  const long = document.getElementById("long").innerHTML;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5013/absen_siswa");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      id_absen_siswa: id,
      nis: nis,
      nama: nama,
      lat: lat,
      long: long,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["status"]);
    }
  };
}
