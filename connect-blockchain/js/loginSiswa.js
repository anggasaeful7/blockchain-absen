var jwt = localStorage.getItem("jwt_siswa")
if (jwt != null) {
    window.location.href = "/absenSiswa"
}

function loginsiswa() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const xhttp = new XMLHttpRequest()
    xhttp.open("POST", "http://127.0.0.1:5011/login_siswa")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhttp.send(
        JSON.stringify({
            username: username,
            password: password,
        })
    )
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText)
            console.log(objects)
            if (this.status == 200) {
                localStorage.setItem("jwt_siswa", objects["access_token"])
                Swal.fire({
                    text: "Berhasil login",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/Frontend/absenSiswa.html"
                    }
                })
            } else {
                Swal.fire({
                    text: "gagal login",
                    icon: "error",
                    confirmButtonText: "OK",
                })
            }
        }
    }
    return false
}
