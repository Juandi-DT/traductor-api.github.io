"use strict";
class Traductor {
    traducir(input) {
        const API_URL = 'https://api.mymemory.translated.net';
        fetch(`${API_URL}/get?q=${input}&langpair=en|es&mt=1`)
            .then(response => response.json())
            .then((texto) => {
            const textoTraducido = texto.responseData.translatedText;
            // console.log(texto)
            // console.log(textoTraducido)
            // return `traducido`;
            txSpanish.value = textoTraducido;
        })
            .catch((err) => console.log(err));
    }
}
class VozTexto {
    configuracion() {
        let rec;
        if (!("webkitSpeechRecognition" in window)) {
            alert("disculpas, no puedes usar la API");
        }
        else {
            const { webkitSpeechRecognition } = window;
            rec = new webkitSpeechRecognition();
            rec.lang = "en-AR";
            rec.continuous = true;
            rec.interim = true;
            rec.addEventListener("result", iniciar);
        }
        return rec;
    }
    empezar() {
        let rec = this.configuracion();
        rec.start();
        botonMicrofon.addEventListener("mouseup", () => {
            rec.stop();
        });
    }
}
let i = 1;
class ConvertAnki {
    cache(linea) {
        sessionStorage.setItem(`linea${i}`, linea);
        let todo = sessionStorage.getItem(`linea1`);
        for (let b = 2; b <= i; b++) {
            todo += `\n${sessionStorage.getItem(`linea${b}`)}`;
        }
        i++;
        return todo;
    }
    convert(es, en) {
        let convertido = `${en};${es}`;
        let cache = this.cache(convertido);
        return cache;
    }
}
