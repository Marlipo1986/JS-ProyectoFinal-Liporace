//Importa el carrito de comandas desde el respectivo JS
import { comprarProducto } from "./comandas.js";

//Importa elementos del HTML
const userLogin = document.getElementById("userLogin");
const divProductos = document.getElementById("productos");
const filterInput = document.getElementById("filtro__input");
const filterHeader = document.getElementById("filter__header");

export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));
let usuarioIngresado = JSON.parse(sessionStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", () => {
  // Creacion de Elementos HTML para que reflejen a los usuarios ingresados (Login y Cerrar Sesion)
  if (usuarioIngresado === null) {
    const a = document.createElement("a");

    a.href = "./html/users.html";
    a.innerHTML = "Ingresar";
    userLogin.appendChild(a);
  } else {
    const p = document.createElement("p");
    const close = document.createElement("button");

    p.innerHTML = `Hola, ${usuarioIngresado.user}!`;
    close.id = "Cerrar sesión";
    close.innerHTML = "Cerrar Sesión";
    close.addEventListener("click", () => {
      alert(
        `Gracias por confiar en nosotros, ${usuarioIngresado.user}. Has sido desloggeado correctamente`
      );

      sessionStorage.removeItem("usuario");
      location.reload();
    });
    userLogin.appendChild(p);
    userLogin.appendChild(close);
  }

  //Exhibicion de comidas disponibles para ordenar por la aplicacion

  generarCardsProductos(productosDisponibles);
});

// Codigo para obtener comidas disponibles a ser reflejadas en la pagina - cards de platos

export const generarCardsProductos = (productos) => {
  divProductos.innerHTML = "";
  productos.forEach((producto) => {
    const { imagen, nombre, categoria, precio, id } = producto;

    let card = document.createElement("div");
    card.className = "producto";

    card.innerHTML = `
        <div class="card h-100" style="width: 18rem; ">
            <img class="card-img-top" src="${imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${categoria}</p>
                <p class="card-text">$${precio}</p>
                <button id="boton${id}" class="btn btn-primary">Comprar</button>

                ${
                  usuarioIngresado?.admin === true
                    ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`
                    : ""
                }
            </div>
        </div>`;

    divProductos.appendChild(card);

    const btnComprar = document.getElementById(`boton${id}`);
    btnComprar.addEventListener("click", () => comprarProducto(id));

    if (usuarioIngresado?.admin === true) {
      const btnEliminar = document.getElementById(`eliminar${id}`);
      btnComprar.addEventListener("click", () => eliminarProducto(id));
    }
  });
};

//Filtros por barra de busqueda

filterInput.addEventListener("keyup", (e) => {
  const productosFilter = productosDisponibles.filter((producto) =>
    producto.nombre.toLowerCase().includes(e.target.value)
  );

  productosDisponibles = productosFilter;

  if (e.target.value !== "") {
    generarCardsProductos(productosFilter);
  } else {
    productosDisponibles = JSON.parse(localStorage.getItem("productos"));
    generarCardsProductos(productosDisponibles);
  }
});

//Filtros por categorias en el header - siempre hay que volver a todos para rellenar el storage

filterHeader.addEventListener("click", (e) => {
  const productosFilter = productosDisponibles.filter((producto) =>
    producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase())
  );

  productosDisponibles = productosFilter;

  if (e.target.innerHTML !== "Todos") {
    generarCardsProductos(productosFilter);
  } else {
    productosDisponibles = JSON.parse(localStorage.getItem("productos"));
    generarCardsProductos(productosDisponibles);
  }
});
