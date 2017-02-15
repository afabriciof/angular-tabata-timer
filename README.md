# AngularJS tabata timer demo

This is an application to show the usage of the AngularJs framework, and to test the architecture suggested by John Papa's Style guide.
(See [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md))
The application calls a Rest service implemented in Java using the Spring Framework.

This is a SPA (Single Page Application), as it is usual with AngularJS.

Main sections are:

### Login Module
To have a successfull login, user should exist and user and password should match.

A valid user which is created when application starts is: afernandez

### Timer tab
Uses cookies to store the settings. Cookies has the following name: com.alex.tabata.<User name>

### Tabata tab
A tabata is a gym exercise based on a strategy of alternating short periods of high intensity trainning (work) with less intense periods (rest)
At the start of the exercise we have a preparation period.

When the user clicks the Save settings button, the call to the java backend takes place.

## Server - Run the app
Install a posgre server. Add an epmty database named tabata. username = password = tabata

From the application.properties you can change the db engine driver if you prefer.

cd /server
mvnw spring-boot:run

The application will automatically start and create the schema + initial data.

## Client - Install
Install [https://nodejs.org/en/download/](nodejs)

## Client - Init
cd /client
npm install

## Client - Dev mode starts Karma Server
grunt dev

## Client - Run the app in Dev mode
cd /client/src
http-server -d=false

## Client - Run the app in Deploy mode
cd /client
grunt build
uncompress dist/AngularJS-Tabata-Demo-x.x.x.zip in a temp folder
from the temp folder run
http-server -d=false

