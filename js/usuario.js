//Importar HTML
const formLogin = document.getElementById("user__login");
const btnIngreso = document.getElementById("btn_ingreso");
const formRegistro = document.getElementById("user__registro");
const btnRegistro = document.getElementById("btn_registro");

//Creacion de nuevo usuario en array de Usuarios dentro de Local Storage

let usuarios = JSON.parse(localStorage.getItem("usuarios"));

class newUser {
  constructor(user, pass) {
    this.id = usuarios.length + 1;
    this.user = user;
    this.pass = pass;
    this.admin = false;
  }
}

//Comportamiento del sitio cuando un usuario existente quiera ingresar a su cuenta

btnIngreso.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formLogin.children[0].children[1].value;
  const pass = formLogin.children[1].children[1].value;

  validarEingresar(user, pass);
});

const validarEingresar = (user, pass) => {
  const userExiste = usuarios.find((usuario) => usuario?.user === user);

  if (userExiste === undefined || userExiste.pass !== pass) {
    alert("Error en usuario o contraseña");
  } else {
    alert(`Que placer verte de nuevo, ${user}!`);

    let usuario = {
      user: userExiste.user,
      pass: userExiste.pass,
      admin: userExiste.admin,
    };
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    location.href = "../index.html";
  }
};

// Comportamiento cuando un nuevo usuario se quiera registrar por primera vez

btnRegistro.addEventListener("click", (e) => {
  e.preventDefault();

  const user = formRegistro.children[0].children[1].value;
  const pass = formRegistro.children[1].children[1].value;
  const nuevoUsuario = new newUser(user, pass);

  validarYregistrar(nuevoUsuario); //registro de nuevo user
});

const validarYregistrar = (nuevoUsuario) => {
  const userNuevo = usuarios.find(
    (usuario) => usuario?.user === nuevoUsuario.user
  ); // El usuario?.user para validar contra la BD en el storage

  if (userNuevo === undefined) {
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); //actualizacion de usuarios en base de datos
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario)); //para mantener la sesion iniciada
    swal.fire({
      position: "top-end",
      icon: 'success',
      title: 'Registro exitoso. Ya puedes iniciar sesión!',
      timer: 1500,
    })
;
  } else {
    swal.fire({
      position: "top-end",
      icon: 'warning',
      title: 'El usuario ya existe',
      timer: 1500,
    });
  }
  sessionStorage.setItem("usuario", JSON.stringify(usuario));
  location.href = "../index.html";
};
