//Importar Modulo
import { Leon, Lobo, Oso, Serpiente, Aguila } from "./sonidos.js";
//Funcion async
(async () => {
  const Response = await fetch("animales.json");
  const { animales: Animales } = await Response.json();

  //Dom

  const nombreAnimalItem = document.getElementById("animal");
  const edadAnimalItem = document.getElementById("edad");
  const comentariosAnimalItem = document.getElementById("comentarios");
  const previewAnimalItem = document.getElementById("preview");
  const btnRegistrarItem = document.getElementById("btnRegistrar");
  const animalesContainerItem = document.getElementById("Animales");
  const playerItem = document.getElementById("player");

  // Arreglo botón registro
  const AnimalCards = [];

  function mostrar() {
    animalesContainerItem.innerHTML = "";
    AnimalCards.forEach((animal) => {
      const Container = document.createElement("div");
      const img = document.createElement("img");
      const botonSonido = document.createElement("button");

      Container.classList.add("card", "mx-2", "my-2");
      Container.style.width = "200px";
      //Agregando Clases
      img.setAttribute("src", `assets/imgs/${animal.Img}`);
      img.classList.add("img-fluid", "cursor");
      img.addEventListener("click", () => {
        $("#modal").modal("toggle");
        console.log(animal);
        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
        
          <img src="./assets/imgs/${animal.Img}" style="width: 400px" class="img-modal"/>
        
        <center><strong>Animal: </strong>${animal.Nombre}</center>
        <center><strong>Edad: </strong>${animal.Edad}</center>
        <center><strong>Comentarios: </strong>${animal.Comentarios}</center>`;
      });

      //Evento Sonidos

      botonSonido.classList.add("card-body", "card-boton", "p-0");
      botonSonido.innerHTML = `<img src="./assets/imgs/audio.svg" style="width: 30px"/>`;

      botonSonido.addEventListener("click", () => {
        if (animal.Nombre === "Leon") {
          animal.Rugir(playerItem);
        } else if (animal.Nombre === "Lobo") {
          animal.Aullar(playerItem);
        } else if (animal.Nombre === "Oso") {
          animal.Gruñir(playerItem);
        } else if (animal.Nombre === "Serpiente") {
          animal.Sisear(playerItem);
        } else if (animal.Nombre === "Aguila") {
          animal.Chillar(playerItem);
        }
      });

      Container.appendChild(img);
      Container.appendChild(botonSonido);

      animalesContainerItem.appendChild(Container);
    });
  }
  //Evento Boton
  nombreAnimalItem.addEventListener("change", () => {
    const animalElegido = nombreAnimalItem.value;
    const animalDevuelto = Animales.find(
      (animal) => animal.name === animalElegido
    );

    console.log(animalDevuelto);

    previewAnimalItem.setAttribute(
      "src",
      `./assets/imgs/${animalDevuelto.imagen}`
    );
  });

  btnRegistrarItem.addEventListener("click", () => {
    console.log(
      nombreAnimalItem.value,
      edadAnimalItem.value,
      comentariosAnimalItem.value
    );
    let nombreAnimal = nombreAnimalItem.value;
    let edadAnimal = edadAnimalItem.value;
    let comentariosAnimal = comentariosAnimalItem.value;
    console.log(comentariosAnimal);
    console.log(comentariosAnimal.length);

    //verificar Datos
    ((verificar) => {
      if (
        comentariosAnimal.length === 0 ||
        nombreAnimal == "Seleccione un animal" ||
        edadAnimal == "Seleccione un rango de años"
      ) {
        alert("Debes rellenar todos los campos.");
      } else {
        const animalDevuelto = Animales.find(
          (animal) => animal.name === nombreAnimal
        );

        const datos = [
          nombreAnimal,
          edadAnimal,
          animalDevuelto.imagen,
          comentariosAnimal,
          animalDevuelto.sonido,
        ];

        switch (nombreAnimal) {
          case "Leon":
            AnimalCards.push(new Leon(...datos));
            break;
          case "Lobo":
            AnimalCards.push(new Lobo(...datos));
            break;
          case "Oso":
            AnimalCards.push(new Oso(...datos));
            break;
          case "Aguila":
            AnimalCards.push(new Aguila(...datos));
            break;
          case "Serpiente":
            AnimalCards.push(new Serpiente(...datos));
            break;
        }

        //Devolver Formulario al Inicio

        let options = document.querySelectorAll("option");
        options.forEach((option) => (option.selected = option.defaultSelected));

        $("#comentarios").val("");
        previewAnimalItem.removeAttribute("src");

        mostrar();
      }
    })();
  });
})();
