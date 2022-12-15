const anim = document.querySelectorAll('.input');

function defFocus(){
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

function defUnfocus(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
        parent.classList.remove('focus');
    }
}

anim.forEach(input => {
    input.addEventListener('focus', defFocus);
    input.addEventListener('blur', defUnfocus);
});