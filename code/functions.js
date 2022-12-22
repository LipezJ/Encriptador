function encriptar() {
    const keys = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };
    let word = document.querySelector("#input").value;
    document.querySelector("#copiar-area").innerHTML = word
        .split("")
        .map((letter) => {
            if (Object.keys(keys).indexOf(letter) >= 0) return keys[letter];
            return letter;
        })
        .join("");
}

function desencriptar() {
    const keys = { a: 2, e: 5, i: 4, o: 4, u: 4 };
    let i = 0;
    let result = "";
    let word = document.querySelector("#input").value;
    while (i < word.length) {
        result += word[i];
        if (Object.keys(keys).indexOf(word[i]) < 0) i++;
        else i += keys[word[i]];
    }
    document.querySelector("#copiar-area").innerHTML = result;
}

function copiar() {   
  navigator.clipboard.writeText(document.querySelector('#copiar-area').innerHTML)
}