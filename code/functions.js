const re = /^[a-z\s]+$/;
function encriptar() {
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
    else if (!word.match(re)) {
        alert("solo se permiten minusculas");
    }
}

function desencriptar() {
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
    } else if (!word.match(re)) {
        alert("solo se permiten minusculas");
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