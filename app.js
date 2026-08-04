function generarPDF(){

const { jsPDF } = window.jspdf;

const pdf = new jsPDF("p","mm","letter");


let margen = 10;
let y = 15;


// =============================
// ENCABEZADO
// =============================

pdf.setFontSize(16);

pdf.text(
"FICHA TECNICA DE REBOBINADO DE MOTOR",
105,
y,
{align:"center"}
);

y+=7;

pdf.setFontSize(10);

pdf.text(
"Registro tecnico de reparacion y mantenimiento",
105,
y,
{align:"center"}
);

y+=10;



function leer(id){

let campo=document.getElementById(id);

return campo ? campo.value : "";

}



// =============================
// TITULO DE SECCION
// =============================

function seccion(titulo){

pdf.setFillColor(0,51,102);

pdf.rect(
margen,
y,
190,
7,
"F"
);

pdf.setTextColor(255,255,255);

pdf.text(
titulo,
margen+3,
y+5
);

pdf.setTextColor(0,0,0);

y+=10;

}



// =============================
// TABLA
// =============================

function tabla(datos, columnas){

pdf.autoTable({

startY:y,

margin:{left:margen},

head: columnas ? [columnas] : null,

body: datos,

theme:"grid",

styles:{
fontSize:8
},

headStyles:{
fillColor:[0,51,102]
}

});


y = pdf.lastAutoTable.finalY + 7;

}




// =============================
// ORDEN
// =============================


seccion("1. ORDEN DE TRABAJO");


tabla([

[
"Orden",
leer("orden"),
"Fecha",
leer("fecha")
],

[
"Cliente",
leer("cliente"),
"Telefono",
leer("telefono")
],

[
"Tecnico",
leer("tecnico"),
"Entrega",
leer("entrega")
]

]);




// =============================
// MOTOR
// =============================


seccion("2. DATOS DEL MOTOR");


tabla([

[
"Marca",
leer("marca"),
"Modelo",
leer("modelo")
],

[
"Potencia HP",
leer("hp"),
"Voltaje",
leer("voltaje")
],

[
"Corriente",
leer("corriente"),
"RPM",
leer("rpm")
],

[
"Frecuencia",
leer("hz"),
"Tipo",
leer("tipo")
],

[
"Polos",
leer("polos"),
"Ranuras",
leer("ranuras")
]

]);




// =============================
// ESTATOR
// =============================


seccion("3. DATOS DEL ESTATOR");


tabla([

[
"Paso",
leer("paso"),
"Grupos",
leer("grupos")
],

[
"Bobinas",
leer("bobinas"),
"Conexion",
leer("conexion")
],

[
"Sentido",
leer("sentido"),
"",
""
]

]);





// =============================
// ROTOR
// =============================


seccion("4. DATOS DEL ROTOR");


tabla([

[
"Tipo rotor",
leer("rotor"),
"Diametro",
leer("diametroRotor")
],

[
"Longitud",
leer("longitudRotor"),
"Barras",
leer("barras")
],

[
"Eje",
leer("eje"),
"Entrehierro",
leer("entrehierro")
]

]);





// =============================
// BOBINADO
// =============================


seccion("5. DATOS DEL BOBINADO");


tabla([

[
"Principal",
leer("calibrePrincipal"),
leer("hilosPrincipal"),
leer("espirasPrincipal"),
leer("grupoPrincipal"),
leer("pasoPrincipal")
],

[
"Arranque",
leer("calibreArranque"),
leer("hilosArranque"),
leer("espirasArranque"),
leer("grupoArranque"),
leer("pasoArranque")
],

[
"Auxiliar",
leer("calibreAuxiliar"),
leer("hilosAuxiliar"),
leer("espirasAuxiliar"),
leer("grupoAuxiliar"),
leer("pasoAuxiliar")
]

],

[
"Bobinado",
"Calibre",
"Hilos",
"Espiras",
"Grupos",
"Paso"

]);





// =============================
// OBSERVACIONES
// =============================


seccion("6. OBSERVACIONES");


pdf.text(
leer("observaciones") || "Sin observaciones",
margen,
y
);


y+=25;




// =============================
// FIRMAS
// =============================


seccion("7. FIRMAS");


pdf.text(
"Tecnico: __________________________",
20,
y
);


pdf.text(
"Cliente: __________________________",
120,
y
);




// =============================
// NOMBRE PDF
// =============================


let nombre=

(leer("cliente") || "Cliente")
+
"_"
+
(leer("marca") || "Motor")
+
"_Ficha.pdf";


pdf.save(nombre);


}