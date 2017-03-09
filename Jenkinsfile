pipeline {
    agent { docker 'node:6.10.0' }

    stages {
        stage('Install') {
            steps {
                echo 'Install..'
		whoami
		sh 'npm install client'
            }
        }
	stage('Build') {
            steps {
                echo 'Building..'
		sh 'cd client; grunt jenkins-build'
            }
        }
	stage('Check Style') {
            steps {
                echo 'Building..'
		sh 'cd client; grunt jenkins-style'
            }
        }
        stage('Test') {
            steps {
                echo 'Unit Test..'
		sh 'cd client; grunt jenkins-test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
		sh 'cd client; grunt jenkins-deploy'
            }
        }
    }
}