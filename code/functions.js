const isLower = /^[a-z\s]+$/g
const isEncripted = /(ai|enter|imes|ober|ufat)/g
const isntEncripted = /[aeiou]/g
function encriptar(e) {
    const keys = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(isLower)){
        word.match(isntEncripted).forEach(letter => {
            word = word.replace(letter, keys[letter]);
        });
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.length >= 1) alerta(e)
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
}

function desencriptar(e) {
    const keys = { ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u" };
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(isLower) && word.match(isEncripted)) {
        word.match(isEncripted).forEach(letter => {
            word = word.replace(letter, keys[letter]);
        });
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.length >= 1) alerta(e)
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
    else if (!(word.match(isEncripted))) document.querySelector("#copiar-area").value = word;
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
    let temp_ = document.querySelector("#copiar-area").value;
    document.querySelector('#input').value = temp_;
    if (temp_.match(isEncripted)) desencriptar(e)
    else encriptar(e)
}

document.querySelector('#limpiarb').addEventListener('click', e => limpiar())
document.querySelector('#encripb').addEventListener('click',e => encriptar(e))
document.querySelector('#desencripb').addEventListener('click',e => desencriptar(e))
document.querySelector('#copiarb').addEventListener('click', e => copiar(e))
document.querySelector('#intercamb').addEventListener('click', e => intercambiar(e))