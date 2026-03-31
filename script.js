const cria = document.getElementById("b");
const btn = document.getElementById("btn");

const estados = {
    normal:  "NORMAL.png",
    puto: "PUTO.png",
    morto: "MORTO.png",
    comendo: "COMENDO.png",
    alimentado: "ALIMENTADO.png",
}

let contador = 0; 
let intervalo = null;
let time_click = null;
let time_out = null;

function controlador (){
    if(intervalo) clearInterval(intervalo)
        
        intervalo = setInterval(() => {
            contador++;

            console.log("tempo:",contador);
            
            if (contador == 7){
                cria.src = estados.puto;
            }

            if(contador == 9){
                cria.src = estados.morto;
            }
        }, 1300);
}


function alimentar(){
    cria.src = estados.comendo;
    contador = 0;
    console.log("comendo");

    if(time_click) clearInterval(time_click)
     
    time_click = setTimeout(() =>{
        cria.src=estados.alimentado;
   
    time_out = setTimeout(() => {
        cria.src = estados.normal;
    }, 1300);
    }, 1000);
}
controlador();