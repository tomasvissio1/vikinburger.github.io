$(()=>{

  
    
    let lista=[]
    let indice2
    let carro=[]
    let total=0
    let precionarBotonObjeto=false
    
    

    //traer info de la lista
    fetch('menu.json')
    .then(response => response.json())
    .then(data=> lista=data)
    setTimeout(() => {
        mostrar()
        carrusel()
    }, 2000);


    //muestro la lista en pantalla
    function mostrar(){
        
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].categoria==1) {
                $("#hamburguesas").append(`<div ><img src="${lista[i].img}" id="${lista[i].id}" class="botonesSeleccion" ><h4 class="marcadores contenedor">${lista[i].nombre}</h4>
                <h4 class="textos">$${lista[i].precio}</h4></div>`)
            }
            if (lista[i].categoria==2) {
                $("#bebidas").append(`<div ><img src="${lista[i].img}" id="${lista[i].id}" class="botonesSeleccion"><h4 class="marcadores contenedor">${lista[i].nombre}</h4><h4 class="textos">$${lista[i].precio}</h4></div>`)
            }
            if (lista[i].categoria==3) {
                $("#guarnicion").append(`<div ><img src="${lista[i].img}" id="${lista[i].id}" class="botonesSeleccion"><h4 class="marcadores contenedor">${lista[i].nombre}</h4><h4 class="textos">$${lista[i].precio}</h4></div>`)
            }
        }
        $('.botonesSeleccion').on('click',function(){
            indice2 = (parseInt(this.id))
            console.log(indice2)
            abrirPopup()
        })
    }


    function abrirPopup(){
        $('.oscuridad').show()
        $('#popup').append(`<div class="card" style="width: 18rem; border-radius:24px">
        <img src="${lista[indice2].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title textos">${lista[indice2].nombre}</h5>
          <p class="card-text textos">${lista[indice2].descripcion}</p>
          <div style="display: flex; justify-content: space-around;">
            <a href="#" class="btn btn-primary comprar textos ">Comprar!</a>
            <a href="#" class="btn btn-danger volver textos">Volver!</a>
          </div>
        </div>
      </div>`)

      $('.volver').on('click',function(e){
        e.preventDefault();
        $('.card').remove()
        $('.oscuridad').hide()
      })

      $('.comprar').on('click',function(e){
        e.preventDefault();
        $('.card').remove()
        $('.oscuridad').hide()
        $('#carro').show()
        total=0
        precionarBotonObjeto=true
        objetosCarro()
      })
    }

    /* llevo informacion a la lista de objetos para el carro */
    function objetosCarro(){
      let booleana=false
      if (carro.length!=0) {
        for (let i = 0; i < carro.length; i++) {
          if (carro[i].nombre == lista[indice2].nombre) {
            let contador = carro[i].cantidad
            contador++
            carro[i].cantidad=contador
            console.log("contador "+contador)
            contador=0
            booleana=true
          }
        }
      }
      if (booleana==false || carro.length==0) {
        carro.push({nombre:lista[indice2].nombre,precio:lista[indice2].precio,cantidad:1})
      }
      
      
      console.log(carro)
    }

    /* muestro la info del carro mediante una card */
    $('#carro').on('click',function(e){
      e.preventDefault()
      /* precionarBotonObjeto=true */
      $('#infoDelCarro').empty()
      crearCarrito()

      /* funcion del carro en general */
      function crearCarrito(){
        $('.oscuridad').show()
        $('#infoCarro').show()
        $('#infoDelCarro').show()
        $('#carro').hide()


        /* SI EL CARRO ESTA VACIO, NO MUESTRA MAS NADA */
        if (carro.length==0) {
          $('.oscuridad').hide()
          $('#infoCarro').hide()
          $('#infoDelCarro').hide()
          $('#carro').hide()
        }
      

        /* CREA LOS ELEMENTOS LI SEGUN EL CONTENIDO DEL CARRO JUNTO CON BOTONES DE ELIMINAR */
      for (let i = 0; i < carro.length; i++) {
        let li = document.createElement('li')
        li.innerHTML=carro[i].nombre+ " - $" + carro[i].precio+ " x "+carro[i].cantidad
        document.getElementById('infoDelCarro').appendChild(li)

        /* UNA BOOLEANA DETERMINA SI PRECIONE EL BOTON DE COMPRAR UN ELEMENTO O SI APRETE EL BOTON DE ELIMINAR OBJETO */
        console.log(precionarBotonObjeto)
        if (precionarBotonObjeto==true) {
          total = total + (carro[i].precio*carro[i].cantidad)
        }
        
        /* CREO BOTONES PARA CADA LI CON UN ID PARA CADA UNO DE ELLOS */
        $('#infoDelCarro').append(`<button id="${i}" type="button" class="btn btn-dark botonesEliminar" style="display:block!important;margin:auto">Eliminar</button>`)

        /* CREO UN HR PARA SEPARAR CADA UNO DE LOS ELEMENTOS DEL CARRO */
        let hr = document.createElement('hr')
        document.getElementById('infoDelCarro').appendChild(hr)
      }

      /* ESCRIBO EL TOTAL DEL PRECIO PARA EL CARRO */
      $('#infoDelCarro').append(`<br><h5>Total: $${total}</h5>`)

      /* CREO BOTONES DE SEGUIR COMPRANDO O CONFIRMAR */
      $('#infoDelCarro').append(`
      <div style="display:flex;justify-content: space-around;text-align: center;">
      <button  type="button" id="seguir" class="btn btn-danger" style="display:block!important;margin:auto">Seguir Comprando</button>
      <button  type="button" class="btn btn-primary" style="display:block!important;margin:auto">Confirmar</button>
      </div>
      `)

      //BOTON DE SEGUIR COMPRANDO
      $('#seguir').on('click',function(e){
        precionarBotonObjeto=false
        console.log(precionarBotonObjeto)
        
        e.preventDefault()
        ocultar()
        //VER SI TIENE ALGO EL CARRO PARA QUE APAREZCA EL LOGO
        if (carro.length!=0) {
          $('#carro').show()
        }
      })


      /* Eliminar objetos del carro */
      $('.botonesEliminar').on('click',function(e){
        e.preventDefault()
        precionarBotonObjeto=false
        $('#infoDelCarro').empty()
        indice3 = parseInt(this.id)

        /* SI EL CARRO AUN TIENE ALGUN OBJETO, ME LO ELIMINA */
        if (carro.length!=0) {
          total = total - (carro[indice3].precio*carro[indice3].cantidad)
          console.log(total)
        }
        
        /* ME ELIMINA EL OBJETO SELECCIONADO */
        carro.splice((indice3),1)
        
        /* VUELVE  A CREARME TODO */
        crearCarrito()
      })
      }
      
    })

    function ocultar(){
      $('#infoDelCarro').hide()
      $('#infoCarro').hide()
      $('.oscuridad').hide()
    }
    
    
    function carrusel(){

  
        $('.responsive').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    })
}
})