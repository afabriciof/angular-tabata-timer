# AngularJS tabata timer demo

This is an application to show the usage of the AngularJs framework, and to test the architecture suggested by John Papa's Style guide.
(See [https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)).
The application calls a Rest service implemented in Java using the Spring Framework.

This is a SPA (Single Page Application), as it is usual with AngularJS.

Check this [introductory video](https://www.youtube.com/watch?v=DHezsfR8l-k)

Main sections are:

### Login Module
To have a successfull login, user should exist and user and password should match.

A valid user which is created when application starts is: afernandez

### Timer tab
This is a classic countdown timer.
Uses cookies to store the settings. Cookies has the following name: com.alex.tabata.UserName

### Tabata tab
A tabata is a gym exercise based on a strategy of alternating short periods of high intensity trainning (work) with less intense periods (rest)
At the start of the exercise we have a preparation period.

When the user clicks the Save settings button, the call to the java backend takes place.


## Server - Install
Install Java 8 ([https://java.com/download/](https://java.com/download/))
Install Maven ([https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi))
Install a posgre server ([https://www.postgresql.org/download/](https://www.postgresql.org/download/))

Add an empty database named tabata. username = password = tabata
From the application.properties (server\src\main\resources\) you can change the db engine driver if you prefer.

## Server - Run the app

cd /server
mvnw spring-boot:run

The application will automatically start and create the schema + initial data.

## Client - Install
Install [https://nodejs.org/en/download/](nodejs)

cd /client

npm install

## Client - Dev mode 

Start Karma Server for continuous Unit Test Run:

grunt dev

Run the app in Dev mode:

cd /client/src

http-server -d=false

open 127.0.0.1 in your browser

## Client - Run the app in Deploy mode

cd /client

grunt build

uncompress dist/AngularJS-Tabata-Demo-x.x.x.zip in a temp folder

from the temp folder run

http-server -d=false
