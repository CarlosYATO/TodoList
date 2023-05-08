
let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('grabacion_perro2.wav');
let undone = new Audio('grabacion_uaq.wav');

function init(){

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js').then(function(registration){
            //si es exitoso
            console.log('SW registrado correctamente');
        },function(err){
            //si falla
            console.log('SW fallo',err);
        });
    }else{
        console.log('ERROR');
    }

    let fecha = new Date();
    let mesNumero = fecha.getMonth();
    let mes = "";

    switch(mesNumero){
        case 0:
            mes="Enero";
            break;
        case 1:
            mes="Febrero";
            break;
        case 2:
            mes="Marzo";
            break;
        case 3:
            mes="Abril";
            break;
        case 4:
            mes="Mayo";
            break;
        case 5:
            mes="Junio";
            break;
        case 6:
            mes="Julio";
            break;
        case 7:
            mes="Agosto";
            break;
        case 8:
            mes="Septiembre";
            break;
        case 9:
            mes="Octubre";
            break;
        case 10:
            mes="Noviembre";
            break;
        case 11:
            mes="Diciembre";
            break;
    }
    document.getElementById('fecha').innerHTML=fecha.getDate()+" de "+mes;

    //Si ya existen tareas guardadas, emtonces las obtengo en la interfaz 

    if(localStorage.getItem('tareas')){
        alert("Si hay tareas");
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i=0; i<tareas.length; i++){
            arregloTareas.push(tareas[i]);
        }
       loadTareas(); 
    }else{
        alert("No hay tareas");
        jsonTarea={};
        //creamos la variable tareas en el LS y guardamos un objeto vacio (que en realidad ya es texto plano)
        localStorage.setItem('tareas',JSON.stringify(jsonTarea));
    }
}

//Funcion para aggregar pendientes
function agregar(){
    //capturar el elemento de entrada de texto
    tareaTexto = document.getElementById('nuevaTarea');
    //Objeto JS
    jsonTarea = {
        'valor':tareaTexto.value,
        'estatus':'pendiente'
    };
    //Creamos el elemento nuevo en la interfaz 
    elemento =  "<div class='tarea' id='"+elementosGuardados+"' onclick=cambiarEstado(this.id)>"+
                "<input type='checkbox' id='tarea1'>"+
                "<label for='tarea1'>"+jsonTarea.valor+"</label>"+
                "</div>";
    document.querySelector('.porhacer').innerHTML += elemento;
    
    //Agregar al arreglo de Json la nueva tarea 
    arregloTareas.push(jsonTarea);
    //Agregar al LS el arreglo de JSON en formato de texto
    localStorage.setItem('tareas',JSON.stringify(arregloTareas));
    //Limpiar el cuadro de texto
    tareaTexto.value="";
    //Incrementamos el contador de los elementos guardados
    elementosGuardados++;
}
//Esta funcion va a cargar las tareas cuando se acutalice la pagina 
function loadTareas(){
   document.querySelector(".porhacer").innerHTML=''
   document.querySelector(".terminado").innerHTML=''

   //cargar las tareas del localstorage LS
    for(i=0; i<tareas.length; i++){
        elemento =  "<div class='tarea' id='"+i+"' onclick=cambiarEstado(this.id) >"+
        "<input type='checkbox' id='tarea1'>"+
        "<label for='tarea1'>"+tareas[i].valor+"</label>"+
        "</div>";

        if(tareas[i].estatus=="pendiente"){
            document.querySelector('.porhacer').innerHTML+=elemento;
        }else if(tareas[i].estatus=="terminado"){
            document.querySelector('.terminado').innerHTML+=elemento;
        }
    }
    elementosGuardados = tareas.length;
}

//Este id nos lo camos a traer del onclick
function cambiarEstado(id){
   tareas = JSON.parse(localStorage.getItem('tareas'));
   if(tareas[id].estatus=='terminado'){
       tareas[id].estatus='pendiente';
       undone.play();
   }else{
       tareas[id].estatus='terminado'
       done.play();
   }

   localStorage.setItem('tareas',JSON.stringify(tareas));
   loadTareas();        
}