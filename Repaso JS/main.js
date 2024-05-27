alert("Hola Mundo");

// Variables: espacio en memoria donde se almacena informacion de diferentes tipos
var edad = 27; // Su ámbito es más amplio y puede ser accesible fuera del bloque en el que se declara
let nombre = "Yorman"; // Su ámbito está limitado al bloque en el que se declara, lo que significa que solo está disponible dentro de las llaves {} donde se define.
const apellido = "Rojas"; // Al igual que let, su ámbito también está limitado al bloque en el que se declara. Además, no se puede reasignar a otro valor después de su inicialización.

// Mostrar por consola
console.log("Nombre: ", nombre + " " + apellido); // concatenación
console.log("Edad: ", edad);

// Imprimir datos en DOM
let datos = document.querySelector("#datos"); // variable que crea una instancia de un objeto del DOM mediante su id
datos.innerHTML = ` <h2>Datos</h2> <p>${nombre + " " + apellido} tiene ${edad} años de edad</p> `; // ${} se usa para interpolacion, esto significa que insertamos datos de nuesto js en etiquetas html

// Estructura de control condicional
if(edad >= 18){
    datos.innerHTML += "<p>Es una persona mayor de edad</p>"
} else {
    datos.innerHTML += "<p>Es una persona menor de edad</p>"
}

// Arreglos
const arregloAños = [2020, 2021, 2022]; // arreglo de objetos, en este caso numeros
let divAños = document.querySelector("#años");
divAños.innerHTML = "<h2>Años de la pandemia</h2>";
arregloAños.forEach(año => {
    divAños.innerHTML += `<p>Año de la pandemia ${año}</p>`
});

// Funciones
const miPrimerFuncion = (a, b) => {
    return a + b;
};
console.log("miPrimerFuncion desde un console.log independiente", miPrimerFuncion(5,55));
const imprimirFuncion = () => {
    console.log("miPrimerFuncion desde otra funcion", miPrimerFuncion(100,200));
};
imprimirFuncion();

// Objetos JSON
let auto = {
    modelo: 'Fusion',
    marca: 'Ford',
    tipo: 'SEDAN',
    transmision: 'CVT',
    año: '2018'
}
let divAuto = document.querySelector("#auto");
divAuto.innerHTML = `
    <h2>Auto Info</h2>
    <p>Modelo: ${auto.modelo}</p>
    <p>Marca: ${auto.marca}</p>
    <p>Tipo: ${auto.tipo}</p>
    <p>Transmision: ${auto.transmision}</p>
    <p>Año: ${auto.año}</p>
`;
console.log(auto);

// Promesas (Peticiones asincronas. Pueden existir peticiones http que tarden en entregarnos (o no) un resultado y no queremos que el flujo de nuestra aplicacion se detenga)
let saludar = new Promise((resolve, reject) => {
    setTimeout(() => { // Simulamos una peticion con un tiempo de retraso de 2 segundos
        let saludo = "Hola desde una promesa";
        if(saludo){
            resolve(saludo);
        } else {
            reject("No existe saludo");
        }
    }, 2000);
});
saludar.then(resultado => {
    alert(resultado); // Muestra el resultado de la promesa en caso de que sea resolve
}).catch(err => {
    alert(err); // Muestra el resultado de la promesa en caso de que falle
})

