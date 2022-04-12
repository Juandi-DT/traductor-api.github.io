
// Objects
const traductor = new Traductor();
const vozTexto = new VozTexto();
const convertAnki = new ConvertAnki();
// de html
const txSpanish = <HTMLInputElement>document.querySelector('#text-spanish');
const txEnglish = <HTMLInputElement>document.querySelector('#text-english');
const botonAccion1 = document.querySelector('.idiom-content')
const botonMicrofon = document.querySelector('.microfone-container');

// traductor
botonAccion1!.addEventListener('click',  ()=>{
    let input = txEnglish.value;
    input.length > 0 ? traductor.traducir(input) : null;
});


// voz a texto
function iniciar(event:any){
    for (let i = event.resultIndex; i < event.results.length; i++){
        txEnglish!.value = event.results[i][0].transcript;
    }
}
botonMicrofon!.addEventListener('mousedown',()=>{
    vozTexto.empezar();
})

// copiar y convert a anki
function copy(contenido:string){
    navigator.clipboard.writeText(contenido)
    .then(() => {
        console.log("Text copied to clipboard...")
    })
    .catch(err => {
        console.log('Something went wrong', err);
    })
}
function copyToClick(elm:HTMLInputElement){
    let content = elm!.value;
    copy(content);
}

function copyAnki(){
    let es:string = txSpanish.value;
    let en:string = txEnglish.value;
    let txAnki:any = convertAnki.convert(es,en);
    copy(txAnki);
}
