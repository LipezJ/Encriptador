const isLower = /^[a-z\s]+$/g
const regSign = /^[a-z\s¡!,.;¿?]+$/g
const alertReg = /(animate__animated\sanimate__headShake)/g
const interReg = /(fa-solid)/g
const regAlert = /(copiado|agregada|eliminada)/g
const regSpace = /[^\s]/g
keys = [ 'ai', 'enter', 'imes', 'ober', 'ufat' ]

function encriptar(e) {
    let word = document.querySelector("#input").value;
    if ((word.match(isLower) || word.match(regSign)) && word.match(regSpace)){
        keys.forEach((k, i) => {word = word.replace(RegExp(k[0], 'g'), i)})
        keys.forEach((k, i) => {word = word.replace(RegExp(i, 'g'), k)})
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.match(regSpace)) alerta(e, 'Solo usa minusculas!')
    else if (!word.match(regSpace)) alerta(e, 'El campo esta vacio!')
}

function desencriptar(e) {
    let word = document.querySelector("#input").value;
    if ((word.match(isLower) || word.match(regSign)) && word.match(regSpace)) {
        keys.forEach((key) => {word = word.replace(RegExp(key, 'g'), key[0])})
        document.querySelector("#copiar-area").value = word;
    } else if (!word.match(isLower) && word.match(regSpace)) alerta(e, 'Solo usa minusculas!')
    else if (!word.match(regSpace)) alerta(e, 'El campo esta vacio!')
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
        if (ms.match(regAlert)) document.querySelector('#alert').setAttribute('tema', 'good')
        document.querySelector('#input').value = ''
        alert_.style.display = 'block'
        alert_.className = anim
        if (!temp.match(interReg)) e.target.className += anim
        else e.target.parentElement.className += anim
        setTimeout(() => {
            if (temp.match(interReg)) e.target.parentElement.className = ''
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
    if (temp_.match(RegExp('('+keys.join('|')+')'))) desencriptar(e)
    else encriptar(e)
}

function modo() {
    let tipo
    document.querySelectorAll('link').forEach((link) => {if (link.href.match(/(light|dark)/g)) tipo = link})
    if (tipo.href.match(/(light)/g)) tipo.href = tipo.href.replace(/light/g, 'dark')
    else tipo.href = tipo.href.replace(/dark/g, 'light')
}

function configp() {
    let panel = document.querySelector('#configp').style.display
    if (panel == 'flex') document.querySelector('#configp').style.display = 'none'
    else document.querySelector('#configp').style.display = 'flex'
}

function agregar(e) {
    let clave = document.getElementById('cclave').value
    let valor = document.getElementById('cvalor').value
    if (!keys[keys.indexOf(valor)] && clave.match(isLower) && valor.match(isLower) 
        && clave.match(regSpace) && valor.match(regSpace) && valor.match(RegExp('^'+clave))) {
        keys.push(valor)
        alerta(e, 'Clave agregada!')
    } else if (!(clave.match(regSpace) && valor.match(regSpace))) alerta(e, 'Campo vacio!')
    else if (!(clave.match(regSpace) && valor.match(regSpace))) alerta(e, 'Solo usa minusculas!')
    else if (!valor.match(RegExp('^'+clave))) alerta(e, 'Clave/valor no valido!')
    else if (keys[keys.indexOf(valor)]) alerta(e, 'Este clave ya existe!')
    document.getElementById('cclave').value = ''
    document.getElementById('cvalor').value = ''
}

function eliminar(e) {
    let clave = document.getElementById('cclave').value
    let valor = document.getElementById('cvalor').value
    if (clave.match(regSpace) && clave.match(isLower) && keys[keys.indexOf(valor)] && valor.match(RegExp('^'+clave))) {
        keys.splice(keys[keys.indexOf(valor)], 1)
        alerta(e, 'Clave eliminada!')
    } else if (!clave.match(regSpace)) alerta(e, 'Campo vacio!')
    else if (!clave.match(isLower)) alerta(e, 'Solo usa minusculas!')
    else if (!keys[keys.indexOf(valor)]) alerta(e, 'Este clave no existe!')
    else if (!valor.match(RegExp('^'+clave))) alerta(e, 'Clave/valor no valido!')
    document.getElementById('cclave').value = ''
    document.getElementById('cvalor').value = ''
}

document.querySelector('#limpiarb').addEventListener('click', e => limpiar())
document.querySelector('#encripb').addEventListener('click',e => encriptar(e))
document.querySelector('#desencripb').addEventListener('click',e => desencriptar(e))
document.querySelector('#copiarb').addEventListener('click', e => copiar(e))
document.querySelector('#intercamb').addEventListener('click', e => intercambiar(e))
document.querySelector('#modob').addEventListener('click', e => modo())
document.querySelector('#configb').addEventListener('click', e => configp())
document.querySelector('#salirb').addEventListener('click', e => configp())
document.querySelector('#agb').addEventListener('click', e => agregar(e))
document.querySelector('#elimb').addEventListener('click', e => eliminar(e))