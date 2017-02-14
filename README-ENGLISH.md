+ Welcome
	Welcome to the AngularJs Tabata timer demo application. 

	This is an application to show the usage of the AngularJs framework, and to test the
	architecture suggested by John Papa's Style guide.

	(See https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
	
	The application calls a Rest service implemented in Java using the Spring Framework.

+ The UI
	This is the application I've created. (client/src)
	As you can see, this is a SPA (Single Page Application), as it is usual with AngularJS.

	It has
		x a Login
			login fail
			login success
				login with matching user and password
		x a Timer tab
			uses cookies to store the settings
		x Tabata tab
			A tabata is
				a gym exercise based on a strategy of alternating short periods of
				high intensity trainning (work) with less intense periods (rest)
				At the start of the exercise we have a preparation period.
			When the user clicks the Save settings button, the call to the java backend
			takes place.

+ Backend Technologies
	Maven, Java 8, Spring Boot, Spring MVC, Spring Rest Controller, JPA, Hibernate, postgresql
	data base.

+ Fron End Technologies
	AngularJs version 1 + plugins , Bootstrap, grunt + plugins, karma server, jasmine, bower,
	npm.

+ Architecture Overview
	x Follow John Papa Style guide
		Sinlge file Responsibility
		Small functions
		vm view model standard syntax
		defer control logic to services
		return Promise for data calls 
		folder structure and file naming convention

	x The application has a route provider to switch among tabs (app.config.js)

	x rest Calls
	x The cookies are: com.alex.tabata.<User name>

+ Development mode
	Show Grunt dev
	Show a failing test, it fails
	Fix the test
	Erase the test
	Show debug

+ Production Deploy
	Unzip
	startup a server

+ Final Words
	Thank you for your time, I hope you enjoyed this demo.
	This is the git hub URL to download the code (https://github.com/afabriciof/angular-tabata-timer)

	See you!