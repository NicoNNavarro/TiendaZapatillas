let iteraciones = 10;
let a = 0;
let b = 1;

console.log("Secuencia Fibonacci:");
for (let i = 0; i < iteraciones; i++) {
  console.log(a);
  let siguienteNumero = a + b;
  a = b;
  b = siguienteNumero;
}

function buscarFibonacci(numeroBuscado) {
  if (numeroBuscado <= 0) {
    console.error("Error: El número debe ser mayor que 0.");
    return;
  }

  let a = 0;
  let b = 1;
  let iteraciones = 1;

  while (b < numeroBuscado) {
    let temp = a + b;
    a = b;
    b = temp;
    iteraciones++;
  }

  if (b === numeroBuscado) {
    console.log(`Se hicieron ${iteraciones} iteraciones y el número ${numeroBuscado} SÍ existe en la secuencia.`);
  } else {
    console.log(`Se hicieron ${iteraciones} iteraciones y el número más cercano es ${a}.`);
  }
}


buscarFibonacci(100); 
buscarFibonacci(144);
buscarFibonacci(-5);  