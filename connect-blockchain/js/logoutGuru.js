function logout() {
    localStorage.removeItem("jwt_guru")
    window.location.href = "/loginguru"
}
