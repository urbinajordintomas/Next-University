/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}



var ArrCiudad=[];
var ArrTipo=[];


$(document).ready(function(){
  MostrarCombos();
  inicializarSlider();
playVideoOnScroll();
  $("#formulario").submit(function(event){
      event.preventDefault();
        MostrarTodo(1);
  });
$("#mostrarTodos").click(function(){
  MostrarTodo(0);
   
})
});

function MostrarCombos(){
  
        $.ajax({                
                url:   'buscador.php',
                type:  'GET',
                success:  function (response) {

                  var data=JSON.parse(response);
                      

                          var contenidoCiudad=""; 
                          var contenidoTipo="";
                     var cont=0;
                    $.each(data, function (index, optiondata) {
                          var existeciudad=0;
                          var existeTipo=0;
                          cont++;
                          for (var i = 0; i < ArrCiudad.length; i++) {
                            if (ArrCiudad[i]==optiondata.Ciudad) {
                              existeciudad++;
                            }
                          }
                           for (var e = 0; e < ArrTipo.length; e++) {
                            if (ArrTipo[e]==optiondata.Tipo) {
                              existeTipo++;
                            }
                          }
                         if (existeciudad==0) {
                          contenidoCiudad+='<option value="'+optiondata.Ciudad+'" >'+optiondata.Ciudad+'</option>';
                        ArrCiudad.push(optiondata.Ciudad);
                        }

                        if (existeTipo==0) {
                          contenidoTipo+='<option value="'+optiondata.Tipo+'" >'+optiondata.Tipo+'</option>';
                        ArrTipo.push(optiondata.Tipo);
                        }
              
                    });
                   
                    $("#selectCiudad").append(contenidoCiudad);
                    $("#selectTipo").append(contenidoTipo);                   
                     $('select').material_select();
                }
        });
}

function MostrarTodo(valor){
  

        $.ajax({                
                url:   'buscador.php',
                type:  'GET',
                success:  function (response) {

                  var data=JSON.parse(response);                      
                    var contenidoHTML="";
                         
           $.each(data, function (index, optiondata) {
                      if (valor==0) {
             contenidoHTML+=LlenarContenidoHTML(optiondata);
           }else{
            //Filtro 
                var pre=optiondata.Precio.replace("$","");
                pre=pre.replace(",","");
                        
                var  precio=parseFloat(pre);

                var slider = $("#rangoPrecio").data("ionRangeSlider");


                var from = slider.result.from;
                var to = slider.result.to;
                var cd = document.getElementById("selectCiudad");
                var ciudad = cd.options[cd.selectedIndex].value;
                var tip = document.getElementById("selectTipo");
                var tipo = tip.options[tip.selectedIndex].value;

                //console.log("PRE: "+precio+ " from "+from+" to "+to)
                if (precio>=from&&precio<=to) {
                  
                 if (ciudad==""&&tipo=="") {
                  contenidoHTML+=LlenarContenidoHTML(optiondata);
                 }else{
                  if (ciudad!=""&&tipo!="") {
                    if (ciudad==optiondata.Ciudad&&tipo==optiondata.Tipo) {
                      contenidoHTML+=LlenarContenidoHTML(optiondata);
                    }
                  }else{
                    if (ciudad==optiondata.Ciudad) {
                      contenidoHTML+=LlenarContenidoHTML(optiondata);
                    }else if(tipo==optiondata.Tipo){
                      contenidoHTML+=LlenarContenidoHTML(optiondata);
                    }
                  }
                 }
               }
           }
              
                    });
                   
                    $("#contenido").empty();
                    $("#contenido").append(contenidoHTML);
           }
                
        });
}

function LlenarContenidoHTML(optiondata){
  var contenidoHTML="";
             contenidoHTML+='<div class="tituloContenido card" >';
             contenidoHTML+='<div style="float: left;">';
             contenidoHTML+='<img src="img/home.jpg" style="width: 250px;height: 250px;">';
             contenidoHTML+='</div>';
             contenidoHTML+='<div style="float: left;padding: 10px; width: 500px;">';
             contenidoHTML+='<b>Direccion : </b><span>'+optiondata.Direccion+'</span>';
             contenidoHTML+='<br>';
             contenidoHTML+='<b>Ciudad : </b><span>'+optiondata.Ciudad+'</span>';
             contenidoHTML+='<br>';
             contenidoHTML+='<b>Telefono : </b><span>'+optiondata.Telefono+'</span>';
             contenidoHTML+='<br>';
             contenidoHTML+='<b>Codigo Postal : </b><span>'+optiondata.Codigo_Postal+'</span>';
             contenidoHTML+='<br>';
             contenidoHTML+='<b>Tipo : </b><span>'+optiondata.Tipo+'</span>';
             contenidoHTML+='<br>';
             contenidoHTML+='<b>Precio : </b><span>'+optiondata.Precio+'</span>';
             contenidoHTML+='</div>';
            contenidoHTML+='</div>';
           return contenidoHTML;
}

