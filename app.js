/* ==========================================
   FICHA DE REBOBINADO MOTOR MONOFÁSICO
   Archivo JavaScript
   ========================================== */


/* ===============================
   DATOS PREDEFINIDOS DE BOBINADO
   =============================== */


const devanadoAuxiliar = [
    ["40", "6-19", "7-18"],
    ["35", "5-20", "8-17"],
    ["20", "4-21", "9-16"],
    ["8",  "3-22", "10-15"]
];


const devanadoPrincipal = [
    ["35", "1-12", "13-24"],
    ["35", "2-11", "14-23"],
    ["25", "3-10", "15-22"],
    ["17", "4-9",  "16-21"],
    ["5",  "5-8",  "17-20"]
];



/* ===============================
   CARGAR TABLAS
   =============================== */


function cargarTabla(id, datos) {

    const tabla = document.getElementById(id);

    datos.forEach(fila => {

        let tr = document.createElement("tr");


        fila.forEach(valor => {

            let td = document.createElement("td");

            let input = document.createElement("input");

            input.value = valor;

            td.appendChild(input);

            tr.appendChild(td);

        });


        tabla.appendChild(tr);

    });

}



cargarTabla("auxiliar", devanadoAuxiliar);

cargarTabla("principal", devanadoPrincipal);




/* ===============================
   GUARDADO AUTOMÁTICO
   =============================== */


const formulario = document.getElementById("motorForm");


function guardarDatos() {

    let datos = {};

    let elementos = formulario.elements;


    for (let elemento of elementos) {

        if (elemento.name) {

            datos[elemento.name] = elemento.value;

        }

    }


    localStorage.setItem(
        "fichaMotor",
        JSON.stringify(datos)
    );

}



formulario.addEventListener(
    "input",
    guardarDatos
);




/* ===============================
   RECUPERAR DATOS
   =============================== */


function cargarDatos() {


    let datosGuardados =
        localStorage.getItem("fichaMotor");


    if (!datosGuardados) {
        return;
    }


    let datos = JSON.parse(datosGuardados);


    for (let nombre in datos) {


        let campo =
            formulario.elements[nombre];


        if (campo) {

            campo.value = datos[nombre];

        }

    }

}


window.addEventListener(
    "load",
    cargarDatos
);




/* ===============================
   GENERAR PDF
   =============================== */


document
.getElementById("btnPDF")
.addEventListener(
    "click",
    function () {


        guardarDatos();


        let nombre =
            formulario.elements["tipo"].value;


        document.title =
            nombre.replaceAll(" ", "_")
            + "_Ficha_Rebobinado";


        window.print();


    }
);

/* ===============================
   CAMBIO DE TIPO DE MOTOR
   =============================== */


const selectorMotor =
document.getElementById("tipoMotor");


selectorMotor.addEventListener(
    "change",
    function(){

        let tipo = this.value;


        localStorage.setItem(
            "tipoMotor",
            tipo
        );


        adaptarFicha(tipo);

    }
);



function adaptarFicha(tipo){


    const capacitor =
    document.querySelector(
        "h3:nth-of-type(3)"
    );


    if(tipo.includes("trifásico")){


        document.title =
        "Ficha motor trifásico";


        console.log(
            "Motor trifásico seleccionado"
        );

        /*
        Aquí posteriormente se pueden:
        - ocultar capacitores
        - cambiar bornes
        - cambiar tabla de bobinas
        */


    }


    else if(tipo.includes("Universal")){


        console.log(
            "Motor universal seleccionado"
        );


    }


    else {


        console.log(
            "Motor monofásico seleccionado"
        );

    }

}