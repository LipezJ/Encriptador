## [🎈Link](https://lipezj.github.io/Encriptador/)

## About

This is a project proposed by Alura and Oracle for the ONE (Oracle Next Education) program in which we are asked to build a page to encrypt text.  
So I present my version of the project in which I use HTML, CSS and JavaScript.

## Requirements

- It should work only with lowercase letters.  
- Letters with accents or special characters must not be used.  
- It must be possible to convert a word to the encrypted version as well as return an encrypted word to its original version.  
**For example:**  
  + "gato" -> "gaitober"  
  + "gaitober" -> "gato"
- The page must have fields for insertion of the text that will be encrypted or decrypted, and the user must be able to choose between the two options.  
- The result should be displayed on the screen.

## Encrypt and Decrypt

### Encryption keys

> The letter "e" is converted to "enter"  
> The letter "i" is converted to "imes"  
> The letter "a" is converted to "ai"  
> The letter "o" is converted to "ober"  
> The letter "u" is converted to "ufat" 

In addition to these encryption keys, I added a button to allow the user to add, delete, or restore encryption keys for more freedom when encrypting their texts. It must be emphasized that to add a new password, it must follow the same pattern as the default keys, the same to delete you have to put the key/value values correctly. 
  
To further improve this functionality, I implemented "windows.localStorage" so that the user can have their keys saved even after closing or updating the page.

### How does encryption and decryption works?

example with code:  

````Javascript
// Definition of variables
const keys = [ 'ai', 'enter', 'imes', 'ober', 'ufat' ]
let word = 'hola mundo'

// Encrypt -> 'hola mundo'

// Replaces the first character of the key in the string *word* variable by the iterator in the *keys* array
keys.forEach((key, iter) => {word = word.replace(RegExp(key[0], 'g'), iter)}) 
//    'h3l0 m4nd3'

// Replaces the numbers of the iterators in the string *word* with their respective value in the array *keys*
keys.forEach((key, iter) => {word = word.replace(RegExp(iter, 'g'), key)})
//    'hoberlai mufatndober'

// Decrypt -> 'hoberlai mufatndober'

// Replaces each *key* in the string *word* (array element *keys*) by the first character of that *key*
keys.forEach((key) => {word = word.replace(RegExp(key, 'g'), key[0])})
//    'hola mundo'
//                                                               The complete code is in ./code/functions.js
````
Using these three lines of code I can do both functions, encrypt and decrypt, I mainly use these lines of code because I wanted to find the best way to do the main functionality of the page, so after many changes I came to this code.  
Generally, to measure the efficiency of a code, the BigO notation is used. So I can say that the Encrypt and Decrypt functions are level 1, in BigO notation it would be **O(N)** since they both depend on the size of the keys array.  
In addition to this, it should also be noted that **N** in the two functions does not depend on the number of keys that are in the string to be encrypted or decrypted, only on the number of keys that the user has entered or, failing that, the number of keys by default (5). Then we could see the functions as:  
- **Encrypt:** O(N) = 2N  
- **Decrypt:** O(N) = N  

In other words, linear functions ([graphic](https://www.geogebra.org/graphing/ejenphpf)), as indicated two paragraphs back, level 1 functions.
