# Prueba Diego Bastidas 🤓👨‍💻

A continuación te pongo el manual de instalación, por favor seguir los pasos aquí especificados si tienes algun problema puedes contactarme.

Debes descargar e instalar  los siguientes programas en este orden:

XAMPP: [Descargar](httphttps://www.apachefriends.org/es/download.html:// "Descargar")
COMPOSER: [Descargar](https://getcomposer.org/ "Descargar")
SYMFONY: [DESCARGAR](https://symfony.com/download "DESCARGAR")
NODEJS: [DESCARGAR](https://nodejs.org/es/ "DESCARGAR")

(Esto para tener php, composer, symfony y node en la maquina, si ya tiene todo esto no hay problema)


Posteriormente, debes clonar el proyecto

- git clone https://github.com/Diiego1500/sigmatest.git test_diego_bastidas
- cd test_diego_bastidas
- composer install
- npm install
- php bin/console fos:js-routing:dump --format=json --target=public/js/fos_js_routes.json
- yarn watch
- symfony server:start

El último comando ejecuta el proyecto en el servidor Local en el puerto 8000 (localhost:8000)

### Valor Agregado:

El proyecto tiene como valor agregado el sweet alert, una vez agregado el contacto se muestra una ventana modal la cual te da la opción de ver los contactos registrados en la tabla de la base de datos proporcionada en el correo electrónico. Adicionalmente hay instalado un Paginador para mostrar dichos contactos el cual será visible cada 5 registros.
