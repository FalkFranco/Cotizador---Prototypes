// Variables
const formulario = document.querySelector('#cotizar-seguro');
// Constructores
function Seguro(marca, year, seguro){
    this.marca = marca;
    this.year = year;
    this.tipo = seguro;
}
// Realiaz ala cotizacion copn los datos
Seguro.prototype.cotizarSeguro = function(){
    /*
        1= Americano 1.15
        2= Asiatico 1.05
        3= Europeo 1.35
    */

        let cantidad;
        const base = 2000;
   console.log(this.marca);
    switch(this.marca){
        case '1': 
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.35
            break;
        default:
            break;
    }

    //cada years que la diferencia es mayor, el costo va a reducirse un 3% del valor del seguro
    let diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) / 100);


    //Si el seguro es basico *30%, si es completo *50%
    console.log(this.seguro)
    if(this.seguro === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    // console.log(cantidad);
    return cantidad;
    
}

function UI(){}

// Llena las opciones de los years
UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i >= min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        selectYear.appendChild(option);
    }
}
// Muestra alerta en pantalla
UI.prototype.mensaje = (mensaje, clase) =>{
   
    const div = document.createElement('DIV');
    div.classList.add('mensaje', 'mt-10', clase);
    div.textContent = mensaje;
    
    formulario.insertBefore(div, document.querySelector('#resultado'));

    // Eliminar despues de 5 seg
    setTimeout(()=>{
        div.remove();
    },3000);

}
UI.prototype.mostrarResultado = (seguro, total)=>{

    // Resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');
    const {marca, year, tipo} = seguro;
    let textoMarca = '';

    switch (marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break
        default:
            break;
    }

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Total: <span class="font-normal"> $${total} </span></p> 
        <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</span></p> 
        <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Seguro:<span class="font-normal capitalize"> ${tipo}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    // Mostar el Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(()=>{
        spinner.remove();
        resultadoDiv.appendChild(div);
    },3000);
}

//Instaciar UI
const ui = new UI();

//Event Listener

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); //Llena el select con los years
});

eventListeners();
function eventListeners(){
    
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();


    // Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    // console.log(marca);

    // Leer el year
    const year = document.querySelector('#year').value;
    // console.log(year);

    //Leer el tipo de covertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // console.log(tipo);

    if(marca === '' || year === '' || tipo === ''){
        ui.mensaje('Debes rellenar todos los campos', 'error');
        return;
    }
        ui.mensaje('Cotizando...', 'correcto');

        // Ocultar las cotizaciones previas
        const resultados = document.querySelector('#resultado div');
        if(resultados !== null){
            resultados.remove();
        }

        // Instanciar el seguro
        const seguro = new Seguro(marca, year, tipo);
        const total = seguro.cotizarSeguro();
        // Utilizar el prototype que para cotizar


        ui.mostrarResultado(seguro, total);
    
}


