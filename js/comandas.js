import { productosDisponibles } from "./main.js";

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

document.addEventListener("DOMContentLoaded",() => {
    dibujarCarrito()
});

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

const listaCarrito = document.getElementById("items");
const footCarrito = document.getElementById("totales");
const btnCarrito = document.getElementById("btnCarrito");
const carritoTable = document.getElementById("carrito");


btnCarrito.addEventListener("click", () => {
    
    dibujarCarrito()    

    if(carritoTable.style.display === "table"){
        carritoTable.style.display = "none"
    
    }else{
        
        carritoTable.style.display = "table"
        dibujarCarrito()
    }
    
    })


export const comprarProducto = (idProducto) => {
    
    const producto = productosDisponibles.find((producto) => producto.id === idProducto);

    const { nombre, precio, imagen, id, categoria} = producto;

    const productoCarrito = carrito.find((producto) => producto.id ===idProducto);

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            categoria: categoria,
            cantidad: 1,
        }

        carrito.push(nuevoProductoCarrito)
        sessionStorage.setItem("carrito",JSON.stringify(carrito))
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto);
        carrito[indexProductoCarrito].cantidad++;
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;

        sessionStorage.setItem("carrito",JSON.stringify(carrito));
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))
    dibujarCarrito()
    alert(`Agregamos ${nombre} a la orden`);
};

function dibujarCarrito () {
      
        listaCarrito.innerHTML = '';
        
        carrito.forEach(producto => {

        const { imagen, nombre, cantidad, precio, id, categoria } = producto;

        let body = document.createElement("tr");
        
        body.className = "producto__carrito";

        body.innerHTML = `
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio / cantidad}</td>
        <td>${precio}</td>
        <td>
            <button id="+${id}" class="btn btn-success">+</button>
            <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `

        listaCarrito.append(body);

        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => aumentarCantidad(id))
        btnRestar.addEventListener("click",() => restarCantidad(id))

        dibujarFooter()
    });
}   

const dibujarFooter = () => {
    if(carrito.length >0) {
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Totales: </b></th>
        <td>${generarTotales().cantidadTotal}</td>
        <td>${generarTotales().costoTotal}</td>
        `

        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3>No hay platos pendientes de ordenar</h3>"
    
    }
}

const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()

}

const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad--
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    dibujarCarrito()
}
