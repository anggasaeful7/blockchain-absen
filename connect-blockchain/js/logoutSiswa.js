function logout() {
    localStorage.removeItem("jwt_siswa")
    window.location.href = "/loginsiswa"
}
