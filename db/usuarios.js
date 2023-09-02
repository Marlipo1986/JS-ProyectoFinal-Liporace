export let dBusuarios = [
  //usuario generado por defecto cuando se carga la pagina
  {
    id: 1,
    user: "Martin",
    Pass: "123qwe",
    admin: true,
  },
];

JSON.parse(localStorage.getItem("usuarios")) ||
  localStorage.setItem("usuarios", JSON.stringify(dBusuarios));
