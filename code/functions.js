const re = /^[a-z\s]+$/;
function encriptar(e) {
    const keys = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(re))
        document.querySelector("#copiar-area").value = word
            .split("")
            .map((letter) => {
                if (Object.keys(keys).indexOf(letter) >= 0) return keys[letter];
                return letter;
            })
            .join("");
    else if (!word.match(re) && word.length >= 1) alerta(e)
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
}

function desencriptar(e) {
    const keys = { ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u" };
    let i = true;
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(re)) {
        while (i) {
            i = false;
            Object.keys(keys).forEach((letter) => {
                if (word.indexOf(letter) >= 0) {
                    word = word.replace(letter, keys[letter]);
                    i = true;
                }
            });
        }
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(re) && word.length >= 1) alerta(e)
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
}

function copiar(e) {
    let word = document.querySelector("#copiar-area").value
    if (word.length > 0) {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(word);
            }
        });
    } else alerta(e, 'El campo esta vacio!')
}

function limpiar() {
    document.querySelector("#input").value = "";
    document.querySelector("#copiar-area").value = "";
}

function alerta(e, ms) {
    let alert_ = document.querySelector('#alert')
    let temp = e.target.className
    if (ms != undefined) alert_.innerHTML = ms
    else alert_.innerHTML = 'Solo usa minusculas!'
    document.querySelector('#input').value = ''
    alert_.style.display = 'block'
    e.target.className = 'animate__animated animate__headShake'
    alert_.className = 'animate__animated animate__headShake'
    setTimeout(() => e.target.className = temp, 1000)
    setTimeout(() => {
        alert_.className = ''
        alert_.style.display = 'none'
    }, 2000)
}

function intercambiar(e) {
    let temp = document.querySelector('#input').value
    let temp_ = document.querySelector("#copiar-area").value;
    if (temp.match(re) && temp_.match(re) || (temp_.length > 0 && temp_.match(re) && temp.match(re)) || (temp.length == 0 && temp_.length > 0)){
        document.querySelector('#input').value = temp_;
        document.querySelector("#copiar-area").value = temp
    } else if (temp.length == 0 && temp_.length == 0) alerta(e, 'Los campos esta vacios!')
    else if (temp.length > 0 && temp_.length == 0) alerta(e, 'Un campo vacio!')
    else  alerta(e)
    document.querySelector('#interb').className = 'fa-solid fa-arrow-right-arrow-left'
}

document.querySelector('#limpiarb').addEventListener('click', e => limpiar())
document.querySelector('#encripb').addEventListener('click',e => encriptar(e))
document.querySelector('#desencripb').addEventListener('click',e => desencriptar(e))
document.querySelector('#copiarb').addEventListener('click', e => copiar(e))
document.querySelector('#intercamb').addEventListener('click', e => intercambiar(e))