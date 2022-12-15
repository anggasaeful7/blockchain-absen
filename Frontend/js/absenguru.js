function absenMasukGuru() {
  const id = 12;
  const nama = document.getElementById("nama").innerHTML;
  const nip = document.getElementById("nip").innerHTML;
  const lat = document.getElementById("lat").innerHTML;
  const long = document.getElementById("long").innerHTML;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5012/absen_guru");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      id_absen_guru: id,
      nip: nip,
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
