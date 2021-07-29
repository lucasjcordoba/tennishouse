# grupo_2_tennishouse

E-commerce/Tienda online de articulos de tenis.

Posee accesos y navegabilidad segun el tipo de usuario:

Invitado: 
	Navlinks: Home, Productos e Iniciar sesion.
	Navegabilidad: Al intentar agregar un producto al carrito es redirigido a Iniciar Sesion.
	
Usuario: 
	Navlinks: Home, Productos, Mis Compras, Carrito y Cerrar sesion.
	Navegabilidad: Agregar productos al carrito (Desde Home, Productos, o Detalle de Producto). Eliminar productos del carrito (desde Carrito). Visualizar     todas las compras del usuario (Mis Compras).

Administrador:
	Navlinks: Home, Productos, Crear Producto, Mis Compras, Carrito y Cerrar sesion
	Navegabilidad: Acceso a crear productos. Dentro del Detalle de producto se suma un PANEL ADMINISTRADOR con las funciones Editar y Eliminar producto.

Participantes:
Facundo Canis
Lucas Cordoba
Gonzalo Gallastegui

Tech Stack:
    • NPM
    • NodeJS
    • Express
    • Axios
    • React
    • Redux
    • Redux-Thunk
    • Bootstrap
    • FontAwesome

Inicializar proyecto:
git clone https://github.com/ggallas/grupo_2_tennishouse.git

Server-side:
    1. Inicializar,configurar XAMPP y MySQL Workbench (crear BD)
    2. npm install
    3. npx sequelize-cli db:migrate
    4. npx sequelize-cli db:seed:all
    5. npm start (http://localhost:3000/)
		
Client-side:
    1. npm install
    2. npm start (http://localhost:3001/)





