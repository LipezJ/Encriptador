function encriptar() {
    const keys = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };
    let word = document.querySelector("#input").value;
    if (word.length >= 1)
    document.querySelector("#copiar-area").value = word
        .split("")
        .map((letter) => {
            if (Object.keys(keys).indexOf(letter) >= 0) return keys[letter];
            return letter;
        })
        .join("");
}

function desencriptar() {
    const keys = {'ai' : 'a', 'enter': 'e', 'imes': 'i', 'ober': 'o', 'ufat': 'u' };
    let i = true;
    let word = document.querySelector("#input").value;
    if (word.length >= 1){
        while(i){
            i = false
            Object.keys(keys).forEach((letter) => {
                if (word.indexOf(letter) >= 0) {
                    word = word.replace(letter, keys[letter])
                    i = true
                }
            })
        }
        document.querySelector("#copiar-area").value = word
    }
}

function copiar() {   
    navigator.clipboard.writeText(document.querySelector('#copiar-area').innerHTML)
}

function limpiar() {
    document.querySelector('#input').value = ''
    document.querySelector('#copiar-area').value = ''
}