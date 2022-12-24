const isLower = /^[a-z\s]+$/g
const isEncripted = /(ai|enter|imes|ober|ufat)/g
const isntEncripted = /[aeiou]/g
const alertReg = /(animate__animated\sanimate__headShake)/g
const interReg = /(fa-solid)/g

function encriptar(e) {
    const keys = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(isLower) && word.match(isntEncripted)){
        word.match(isntEncripted).forEach(letter => word = word.replace(letter, keys[letter]));
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.length > 0) alerta(e, 'Solo usa minusculas!')
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
    else if (!(word.match(isntEncripted))) document.querySelector("#copiar-area").value = word;
}

function desencriptar(e) {
    const keys = { a: /ai/g, e: /enter/g, i: /imes/g, o: /ober/g, u: /ufat/g };
    let word = document.querySelector("#input").value;
    if (word.length >= 1 && word.match(isLower)) {
        Object.keys(keys).forEach((letter) => word = word.replace(keys[letter], letter))
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.length > 0) alerta(e, 'Solo usa minusculas!')
    else if (word.length == 0 ) alerta(e, 'El campo esta vacio!')
}

function copiar(e) {
    let word = document.querySelector("#copiar-area").value
    if (word.length > 0) {
        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") navigator.clipboard.writeText(word).then(() => {
                alerta(e, 'Texto copiado', '#eaddcf')
            })
        });
    } else alerta(e, 'El campo esta vacio!')
    alerta(e, 'Texto copiado!')
}

function limpiar() {
    document.querySelector("#input").value = "";
    document.querySelector("#copiar-area").value = "";
}

function alerta(e, ms) {
    let alert_ = document.querySelector('#alert')
    let temp = e.target.className
    const anim = ' animate__animated animate__headShake'
    if (!(temp.match(alertReg))) {
        document.querySelector('#alert').innerHTML = ms
        if (ms.match(/(copiado)/g)) document.querySelector('#alert').setAttribute('tema', 'good')
        document.querySelector('#input').value = ''
        alert_.style.display = 'block'
        alert_.className = anim
        if (!temp.match(interReg)) e.target.className += anim
        else document.querySelector('#intercamb').className += anim
        setTimeout(() => {
            if (temp.match(interReg)) document.querySelector('#intercamb').className = ''
            else e.target.className = temp
            alert_.className = ''
            alert_.style.display = 'none'
            document.querySelector('#alert').setAttribute('tema', 'bad')
        }, 2000)
    }
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