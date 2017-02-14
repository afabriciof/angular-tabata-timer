+ Bienvenidos
	Bienvenidos a la demo de AngularJs Tabata timer. 
	Es una aplicación para demostrar el uso de AngularJS, y probar la arquitectura siguiendo los lineamientos de estilo sugeridos por John Papa. 
	(Ver https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
	
	La aplicación consume un servicio web Rest, hecho en Java, con Spring. 

+ Aplicación Funcionando
	Esta es la aplicación que he construído. (client/src)
	Como se ve es una SPA (Single Page Application), como es usual en AngularJS.
	Tiene un 
		x login
			login fallido
			login exitoso
				login con usuario y password iguales
		x tab de temporizador
			utiliza cookies para guardar las settings
		x tab de tabata
			Un tabata es 
				un ejercicio de entrenamiento físico basado en intervalos de trabajo de alta intensidad (work), con intervalos de descanso (rest).
				al inicio se contabiliza un tiempo de preparación.
			llamada al servicio Rest hecho en Java

+ Tecnologias Utilizadas Backend
	Maven, Java 8, Spring Boot, Spring MVC, Spring Rest Controller, JPA, Hibernate, postgresql data base.

+ Tecnologias Utilizadas Fron End
	Las tecnologías utilizadas para el front end son: AngularJs version 1 + plugins , Bootstrap, grunt + plugins, karma server, jasmine, bower, npm.

+ Muestra de la arquitectura
	x Sigue los lineamientos de la guía de estilos de John Papa
		En un archivo, una {unica responsabilidad
		Funciones pequeñas
		sintaxis vm de modelo y vista
		diferir a los servicios la lógica de control
		retornar un Promise para las llamadas de datos
		convencion de nombres para archivos y estructura de carpetas

	x Cuenta con un ruteo entre paginas internas de AngularJs (app.config.js)

	x Llamadas rest
	x Las cookies son: com.alex.tabata.<Nombre de Usuario>

+ Desarrollo con karma server prendido
	Mostrar Grunt en desarrollo
	Mostrar agregar un test y que reviente
	Despues fixearlo
	Despues borrarlo
	Mostrar como debuggeo

+ Deploy en produccion
	Descomprimir
	Levantar desde un server

+ Final
	Gracias por su tiempo, espero que les haya gustado, pueden dejarme un comentario.
	Esta es la direccion del git hub para bajarse el código (https://github.com/afabriciof/angular-tabata-timer)
	Nos vemos!