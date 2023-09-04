// Importar stock para poder manejarlo como admin
import { generarCardsProductos, productosDisponibles } from "./main.js";

//Importar elementos del HTML
const btnAgregar = document.getElementById("nuevo__producto");
const agregarProductos = document.getElementById("form__agregar");
const btnModificar = document.getElementById("btn__modificar");
const divProductos = document.getElementById("productos");

//Chequeo de usuarios online
const usuarioIngresado = JSON.parse(sessionStorage.getItem("usuario"));

//Para eliminar productos del array de productos dentro del modulo admin
export const eliminarProducto = (id) => {
    const productoEliminar = productosDisponibles.findIndex((producto) => producto.id === id)
    productosDisponibles.splice(productoEliminar,1)
    localStorage.setItem("productos", JSON.stringify(productosDisponibles))
    generarCardsProductos(JSON.parse(localStorage.getItem("productos")))
};

//Para agregar productos nuevos a la carta siendo admin
class Productos {
    constructor(nombre,precio,imagen,categoria){
        this.id = generarId()
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.categoria = categoria
    }
};

//genero un id unico e irrepetible
const generarId = () => {
    const id = productosDisponibles.map((producto) =>{
        return producto.id 
    })
    const max = Math.max(...id) +1
    return max
}

//Chequeo de permisos para visualizar botones en pantalla "eliminar" y "modificar"
usuarioIngresado?.admin ===true ?(btnAgregar.style.display = "block") : (btnAgregar.style.display = "none");
usuarioIngresado?.admin ===true ?(btnModificar.style.display = "block") : (btnModificar.style.display = "none");

//Configuracion del form a visualizar cuando se quiera agregar un nuevo producto al stock
btnAgregar.addEventListener("click" , () => generarFormAgregar())

const generarFormAgregar = () => {
    agregarProductos.innerHTML = "";
    
    agregarProductos.style.display = "block"
    const form = document.createElement("form")

    form.innerHTML = `
    <div>
        <label for="nombre">Nombre: </label>
        <input type="text name="" id="nombre" />
    </div>
    <div>
        <label for="precio">Precio: </label>
        <input type="text name="" id="precio" />
    </div>
    <div>
        <label for="imagen">Imagen: </label>
        <input type="text name="" id="imagen" />
    </div>
    <div>
        <label for="categoria">Categoria</label>
        <select name="categoria">
            <option value="Entradas">Entradas</option>
            <option value="Platos Principales">Platos Principales</option>
            <option value="Guarniciones">Guarniciones</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Postres">Postres</option>
        </select>
    </div>

    <button id="cargar" class="btn btn-primary" type="button">Cargar Plato</button>
    <button id="cerrar" class="btn btn-secondary" type="button">Cancelar</button>
    `
    agregarProductos.appendChild(form)

    const btnCargar = document.getElementById("cargar")
    btnCargar.addEventListener("click", (e) => {
        e.preventDefault()
        guardarProducto()
    })
    const btnCerrar = document.getElementById("cerrar")
    btnCerrar.addEventListener("click", (e) =>{
        agregarProductos.style.display = "none"
    })
};

const guardarProducto = () => {
    const nombre = agregarProductos.children[0][0].value;
    const precio = agregarProductos.children[0][1].value;
    const imagen = agregarProductos.children[0][2].value;
    const categoria = agregarProductos.children[0][3].value;

    if(nombre !== "" && precio !=="" && imagen !== "" && categoria !== ""){
        const nuevoProducto = new Productos(nombre,precio,imagen,categoria)
        productosDisponibles.push(nuevoProducto)
        localStorage.setItem("productos",JSON.stringify(productosDisponibles))
        agregarProductos.style.display = "none"

        generarCardsProductos(productosDisponibles)
    } else {
        alert ("Por favor, completar todos los campos")
    }
};


//Para modificar los productos existentes en el menu
btnModificar.addEventListener("click", () => {modificarProductosCard()})

const modificarProductosCard = () => {
    //Vacio el div para darle ingreso a los nuevos datos

    divProductos.innerHTML = "";

    //Con un foreach voy creando nuevas cards para los productos
    productosDisponibles.forEach((producto) => {
        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
        <div class="card h-100" style="width: 18rem; ">
            <img class="card-img-top" src="${producto.imagen}" alt="card image cap">
            <p>Imagen: <input type= "text" value="${producto.imagen}"></p>
            <p>Nombre: <input type= "text" value="${producto.nombre}"></p>
            <p>Precio: <input type= "text" value="${producto.precio}"></p>
            <p>Categoria: <input type= "text" value="${producto.categoria}"></p>
            <div class="card-body">
                <button id="boton${producto.id}" class="btn btn-success">Modificar</button>
                <button id="cancelar${producto.id}" class="btn btn-danger">Cancelar</button>
            </div>
        </div>
            `;

        divProductos.appendChild(card);
        const btnAceptar = document.getElementById(`boton${producto.id}`)
        const btnCancelar = document.getElementById(`cancelar${producto.id}`)
        
        btnAceptar.addEventListener("click", (e) => modificarProductos(e,producto.id))
        btnCancelar.addEventListener("click", () => generarCardsProductos (productosDisponibles))
    })
};

const modificarProductos = (e,id) => {
    const productoIndice = productosDisponibles.findIndex((producto) => producto.id === id)
    const imagen = e.target.parentElement.parentElement.children[1].children[0].value;
    const nombre = e.target.parentElement.parentElement.children[2].children[0].value;
    const precio = e.target.parentElement.parentElement.children[3].children[0].value;
    const categoria = e.target.ParentElement.ParentElement.children[4].children[0].value;

    productosDisponibles[productoIndice].nombre = nombre
    productosDisponibles[productoIndice].precio = precio
    productosDisponibles[productoIndice].imagen = imagen
    productosDisponibles[productoIndice].categoria = categoria

    localStorage.setItem("productos", JSON.stringify(productosDisponibles))
    generarCardsProductos(productosDisponibles)

};
