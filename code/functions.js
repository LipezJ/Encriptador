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
    else if (!word.match(re) && word.length >= 1) {
        soloMinus(e)
    }
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
    } else if (!word.match(re) && word.length >= 1) {
        soloMinus(e)
    }
}

function copiar() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(
                document.querySelector("#copiar-area").value
            );
        }
    });
}

function limpiar() {
    document.querySelector("#input").value = "";
    document.querySelector("#copiar-area").value = "";
}

function soloMinus(e) {
    let alert_ = document.querySelector('#alert')
    document.querySelector('#input').value = ''
    e.target.className = 'animate__animated animate__headShake'
    alert_.style.display = 'block'
    alert_.className = 'animate__animated animate__headShake'
    setTimeout(() => e.target.className = '', 1000)
    setTimeout(() => {
        alert_.className = ''
        alert_.style.display = 'none'
    }, 1800)
}

function intercambiar() {
    let temp = document.querySelector('#input').value
    document.querySelector('#input').value = document.querySelector("#copiar-area").value;
    document.querySelector("#copiar-area").value = temp
}

document.querySelector('#limpiarb').addEventListener('click', e => limpiar())
document.querySelector('#encripb').addEventListener('click',e => encriptar(e))
document.querySelector('#desencripb').addEventListener('click',e => desencriptar(e))
document.querySelector('#copiarb').addEventListener('click', e => copiar())
document.querySelector('#intercamb').addEventListener('click', e => intercambiar())