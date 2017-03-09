pipeline {
    agent { docker 'node:6.10.0' }

    stages {
        stage('Install') {
            steps {
                echo 'Install..'
		sh 'cd client'
		sh 'npm install'
            }
        }
	stage('Build') {
            steps {
                echo 'Building..'
		sh 'cd client'
		sh 'grunt jenkins-build'
            }
        }
	stage('Check Style') {
            steps {
                echo 'Building..'
		sh 'cd client'
		sh 'grunt jenkins-style'
            }
        }
        stage('Test') {
            steps {
                echo 'Unit Test..'
		sh 'cd client'
		sh 'grunt jenkins-test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
		sh 'cd client'
		sh 'grunt jenkins-deploy'
            }
        }
    }
}