$(document).ready(function() {

  let xcero = 0.0, xultimo = 1.0, yinitial = 2.0, haltura = 0.1;

     
  
   //Esta función simplemente dibuja los ejes (es lo de menos)
    //  drawaxis();
    
  
   
  
   

  


// drawCoordinates(0,-200);
// drawCoordinates(50,-180);
// drawCoordinates(100,-160);

  $("#boton").click(function(){

    let valorcorrecto = 0;

      if($("#h-valor").val() <= 0 || $("#h-valor").val() > 1){
        alert("El valor de h, debe ser mayor a 0 y menor ó igual a 1. ");
      }else{
        valorcorrecto  = 1;
      haltura = $("#h-valor").val() * 1;
    }
  
  if(valorcorrecto){

  let xini = xcero;

    let n = parseInt((xultimo - xcero) / haltura, 10);

     for (let i = 0; i <= n; i++) {
      $("#tabla").append(`<div class='leyenda'><span>${xini.toFixed(2)}</span><span>${rungeKutta(xcero,yinitial,xini.toFixed(2),haltura)}</span><span>${exacto(xini)}</span><span>${Math.abs((rungeKutta(xcero,yinitial,xini.toFixed(2),haltura) - exacto(xini.toFixed(2))).toFixed(8))}</span></div>`);
      // console.log(rungeKutta(xcero,yinitial,(xini.toFixed(2)),haltura));
      console.log(xini.toFixed(2))

      xini = xini + (haltura * 1);
      // console.log(xini);
      // console.log(x0.toFixed(2));
     }

    $("#graficar").show();
    valorcorrecto = 0;
  } 
   
  });

  $("#graficar").click(function(){
    $("#visual").show();

    var windowWidth = window.innerWidth *0.8;
     var windowHeight = window.innerHeight *0.8;
  
       //Establezco una escala que posteriormente aplico
     var scale = 80;
  
     var cv = document.getElementById("fx");
     cv.height = windowHeight ;
     cv.width = windowWidth;
  
     var ctx = cv.getContext("2d");
  
      //Aquí traslado todo el contexto al centro de la pantalla
     ctx.translate((windowWidth / 2),(windowHeight / 2));

     function drawaxis() {
  
      var x_axis = {
        x: -windowWidth / 2,
        y: 0,
        xf: windowWidth / 2,
        yf: 0
      }
 
      var y_axis = {
        x: 0,
        y: -windowHeight / 2,
        xf: 0,
        yf: windowHeight /2
      }
 
      ctx.beginPath();
      ctx.moveTo(x_axis["x"],x_axis["y"]);
      ctx.lineTo(x_axis["xf"],x_axis["yf"]);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(x_axis["x"],x_axis["y"]);
      ctx.lineTo(x_axis["xf"],x_axis["yf"]);
      ctx.stroke();
      ctx.closePath();
 
      ctx.beginPath();
      ctx.moveTo(y_axis["x"],y_axis["y"]);
      ctx.lineTo(y_axis["xf"],y_axis["yf"]);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(y_axis["x"],y_axis["y"]);
      ctx.lineTo(y_axis["xf"],y_axis["yf"]);
      ctx.stroke();
      ctx.closePath();
 
    }

    function drawfx(x,interval) {
      var x0 = x,
          y0 = (-1)*(((-20/21)*Math.exp(-x)) + ((62/21)*Math.exp(-2/5*x))),
          x1 = x + interval,
          y1 =(-1)*(((-20/21)*Math.exp(-x)) + ((62/21)*Math.exp(-2/5*x)));
 
      x0 = x0*scale;
      y0 = y0*scale;
      x1 = x1*scale;
      y1 = y1*scale;

      ctx. strokeStyle = '#009999';
 
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.closePath();

  }


    var interval = 0.01;
    drawaxis();
  
    for (x = -windowWidth; x < windowWidth; x = x + interval) {
      drawfx(x, interval);
    }

    let n = parseInt((xultimo - xcero) / haltura, 10);
  let xini = xcero;

     for (let i = 0; i <= n; i++) {
      drawCoordinates(xini.toFixed(2) * 80,-(80*rungeKutta(0,2,xini.toFixed(2),haltura)));
      // console.log(rungeKutta(xcero,yinitial,(xini.toFixed(2)),haltura));
      console.log(xini.toFixed(2))

      xini = xini + (haltura * 1);
      // console.log(xini);
      // console.log(x0.toFixed(2));
     }

     function drawCoordinates(x,y){
      var pointSize = 2; // Cambia el tamaño del punto
      // var ctx = document.getElementById("fx").getContext("2d");
 
 
      ctx.fillStyle = "#ff0000"; // Color rojo
 
      ctx.beginPath(); // Iniciar trazo
      ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Dibujar un punto usando la funcion arc
      ctx.fill(); // Terminar trazo
  }
  });

  

  // drawCoordinates(0,-200);
// drawCoordinates(50,-180);
// drawCoordinates(100,-160);

  
  });


// // Finds value of y for a given x using step size h
// // and initial value y0 at x0.
 function rungeKutta(x0, y0, x, h)
 {
     
     // Count number of iterations using
     // step size or step height h
     let n = parseInt((x - x0) / h, 10);
    
 
     let k1, k2, k3, k4, k5;

     
     
 
     // Iterate for number of iterations
     let y = y0;
     for(let i = 1; i <= n; i++)
     {
         
         // Apply Runge Kutta Formulas to find
         // next value of y
         k1 = h * dydx(x0, y);
         k2 = h * dydx(x0 + 0.5 * h, y + 0.5 * k1);
         k3 = h * dydx(x0 + 0.5 * h, y + 0.5 * k2);
         k4 = h * dydx(x0 + h, y + k3);

        //  console.log(k1,k2,k3,k4);
 
         // Update next value of y
         y = y + (1 / 6) * (k1 + 2 * k2 +
                             2 * k3 + k4);;
 
         // Update next value of x
        
         x0 = x0 + h;
        
        
       
     }
    //  console.log(n, y);
     return y.toFixed(8);
 }

// // A sample differential equation "dy/dx = ((-2/5)*y)+((4/7)*Math.exp(-x))"
 function dydx(x, y)
 {
     return(((-2/5)*y)+((4/7)*Math.exp(-x)));
 }

 function exacto(x){

    return (((-20/21)*Math.exp(-x)) + ((62/21)*Math.exp(-2/5*x))).toFixed(8);

   }



 

//   drawfx(2,1);