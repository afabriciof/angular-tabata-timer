pipeline {
    agent { docker 'node:4.5.0' }

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
		sh 'scripts.sh build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}