"use strict";
// Objects
const traductor = new Traductor();
const vozTexto = new VozTexto();
const convertAnki = new ConvertAnki();
// de html
const txSpanish = document.querySelector('#text-spanish');
const txEnglish = document.querySelector('#text-english');
const botonAccion1 = document.querySelector('.idiom-content');
const botonMicrofon = document.querySelector('.microfone-container');
// traductor
const traducir = ()=>{
    let input = txEnglish.value;
    input.length > 0 ? traductor.traducir(input) : null;
}
botonAccion1.addEventListener('click', traducir());
botonAccion1.addEventListener('touchstart', traducir());
// voz a texto
function iniciar(event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        txEnglish.value = event.results[i][0].transcript;
    }
}
botonMicrofon.addEventListener('mousedown', () => {
    vozTexto.empezar();
});
// copiar y convert a anki
function copy(contenido) {
    navigator.clipboard.writeText(contenido)
        .then(() => {
        console.log("Text copied to clipboard...");
    })
        .catch(err => {
        console.log('Something went wrong', err);
    });
}
function copyToClick(elm) {
    let content = elm.value;
    copy(content);
}
function copyAnki() {
    let es = txSpanish.value;
    let en = txEnglish.value;
    let txAnki = convertAnki.convert(es, en);
    copy(txAnki);
}
