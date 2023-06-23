$("#txtIndicador").on("keydown", function(event) {
  if (event.keyCode === 13) { // Código de tecla 13 es la tecla "Enter"
    event.preventDefault(); // Evita el comportamiento predeterminado de presionar "Enter" en un formulario
    $("#btnInformacion").click(); // Simula el clic en el botón "Cargar Informacion"
  }
});

$("#btnInformacion").click(function (event) {
  event.preventDefault();
  var name = $("#txtIndicador").val();
  console.log(name);
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/"+ name,
    data: {
      format: "json",
    },
    error: function () {
      $("#info").html("<p>El pokemon no se ha encontrado!!!!</p>");
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
      var $nombre_indicador = data.name;
      var $id = data.id;
      var $foto = $("<img>", {src: data.sprites.front_default});
      var $habilidades = $("<ul>");
      $.each(data.abilities, function (index, value) {
        var $habilidad = $("<li>").text(value.ability.name);
        $habilidades.append($habilidad);
      });
      var $moves = $("<ul>");
      $.each(data.moves, function (index, value) {
        var $move = $("<li>").text(value.move.name);
        $moves.append($move);
      });

      // Vaciar contenido existente antes de agregar nuevos elementos
      $("#acordeon").remove(); // Eliminar el acordeón
      $("#info").empty();
      $("#spinner").remove();
      // Agregar nuevos elementos al contenedor
      $("#info").append("<h3>" + $nombre_indicador + "</h3>");
      $("#info").append($foto);
      $("#info").append("<p>ID: " + $id + "</p>");
      $("#info").append("<div id='acordeon'></div>"); // Agregar el contenedor del acordeón
      // Agregar nuevos elementos al acordeón
      $("#acordeon").append("<h3>Habilidades</h3>");
      $("#acordeon").append("<div></div>");
      $("#acordeon div:last-child").append($habilidades);
      $("#acordeon").append("<h3>Movimientos</h3>");
      $("#acordeon").append("<div></div>");
      $("#acordeon div:last-child").append($moves);
      // Crear el acordeón
      $("#acordeon").accordion({heightStyle: "content", collapsible: true, active: false});
    },
    type: "GET",
  });
});