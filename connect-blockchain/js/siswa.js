function loadTableSiswa() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:5011/get_data_siswa");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);

      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["nis"] + "</td>";
        trHTML += "<td>" + object["nama"] + "</td>";
        trHTML += "<td>" + object["tempat_lahir"] + "</td>";
        trHTML += "<td>" + object["tanggal_lahir"] + "</td>";
        trHTML += "<td>" + object["alamat"] + "</td>";
        trHTML += "<td>" + object["jk"] + "</td>";
        trHTML += "<td>" + object["agama"] + "</td>";
        trHTML += "<td>" + object["email"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBoxSiswa(' +
          object["nis"] +
          ')">Edit</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="siswaDelete(' +
          object["nis"] +
          ')">Del</button></td>';
        trHTML += "</tr>";
      }

      document.getElementById("tableSiswa").innerHTML = trHTML;
    }
  };
}

loadTableSiswa();

function showUserCreateBoxSiswa() {
  Swal.fire({
    title: "Add Siswa",
    html:
      '<input id="nis" class="input-data-2" placeholder="NIS">' +
      '<input id="nama" class="input-data-2" placeholder="Nama">' +
      '<input id="tempat" class="input-data-2" placeholder="Tempat">' +
      '<input id="tanggal" class="input-data-2" placeholder="Tanggal">' +
      '<input id="alamat" class="input-data-2" placeholder="Alamat">' +
      '<input id="jk" class="input-data-2" placeholder="JK">' +
      '<input id="agama" class="input-data-2" placeholder="Agama">' +
      '<input id="kelas" class="input-data-2" placeholder="Kelas">' +
      '<input id="email" class="input-data-2" placeholder="Email">' +
      '<input id="username" class="input-data-2" placeholder="Username">' +
      '<input id="password" class="input-data-2" placeholder="Password">',
    focusConfirm: false,
    preConfirm: () => {
      siswaCreate();
    },
  });
}

function siswaCreate() {
  const nis = document.getElementById("nis").value;
  const nama = document.getElementById("nama").value;
  const tempat = document.getElementById("tempat").value;
  const tanggal = document.getElementById("tanggal").value;
  const alamat = document.getElementById("alamat").value;
  const jk = document.getElementById("jk").value;
  const agama = document.getElementById("agama").value;
  const kelas = document.getElementById("kelas").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5011/insert_data_siswa");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      nis: nis,
      nama: nama,
      tempat: tempat,
      tanggal: tanggal,
      alamat: alamat,
      jk: jk,
      agama: agama,
      kelas: kelas,
      email: email,
      username: username,
      password: password,
    })
  );

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["status"]);
      loadTableSiswa();
    }
  };
}

function showUserEditBoxSiswa(nis) {
  console.log(nis);

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:5011/get_data_siswa?nis=" + nis);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      // const siswa = objects["siswa"];
      console.log(objects);
      for (let object of objects) {
        Swal.fire({
          title: "Edit Siswa",
          html:
            '<input id="nis" class="input-data-2" type="hidden" value="' +
            object["nis"] +
            '">' +
            '<input id="nama" class="input-data-2" value="' +
            object["nama"] +
            '">' +
            '<input id="tempat" class="input-data-2" value="' +
            object["tempat_lahir"] +
            '">' +
            '<input id="tanggal" class="input-data-2" value="' +
            object["tanggal_lahir"] +
            '">' +
            '<input id="alamat" class="input-data-2" value="' +
            object["alamat"] +
            '">' +
            '<input id="jk" class="input-data-2" value="' +
            object["jk"] +
            '">' +
            '<input id="agama" class="input-data-2" value="' +
            object["agama"] +
            '">' +
            '<input id="kelas" class="input-data-2" value="' +
            object["kelas"] +
            '">' +
            '<input id="email" class="input-data-2" value="' +
            object["email"] +
            '">' +
            '<input id="username" class="input-data-2" value="' +
            object["username"] +
            '">' +
            '<input id="password" class="input-data-2" value="' +
            object["password"] +
            '">',
          focusConfirm: false,
          preConfirm: () => {
            siswaEdit();
          },
        });
      } 
      
    }
  };
}

function siswaEdit(params) {
  const nis = document.getElementById("nis").value;
  const nama = document.getElementById("nama").value;
  const tempat = document.getElementById("tempat").value;
  const tanggal = document.getElementById("tanggal").value;
  const alamat = document.getElementById("alamat").value;
  const jk = document.getElementById("jk").value;
  const agama = document.getElementById("agama").value;
  const kelas = document.getElementById("kelas").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://127.0.0.1:5011/update_data_siswa/" + nis);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
      nis: nis,
      nama: nama,
      tempat: tempat,
      tanggal: tanggal,
      alamat: alamat,
      jk: jk,
      agama: agama,
      kelas: kelas,
      email: email,
      username: username,
      password: password,
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['status']);
      loadTableSiswa();
    }
  };
}

function siswaDelete(nis){
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://127.0.0.1:5011/delete_data_siswa/" + nis);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "nis": nis
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['status']);
      loadTableSiswa();
    } 
  };
}