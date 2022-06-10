pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    parameters {
        choice(name:'VERSION', choices:['1.0', '1.1', '1.2'], description:'Choose the version of the project')

        booleanParam(name :'executeTests', description:'Execute the tests', defaultValue:false)
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install --legacy-peer-deps'
              
                // sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                // sh 'npm run test'
                echo 'Test'
            }
        }
        stage('Build Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'docker build -t jennykibiri/sovtech-api .'
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh 'docker push  jennykibiri/sovtech-api'
                }
            }
        }
        stage ('Deploy') {
            steps {
                script {
                    def dockerCmd = 'docker run  -p 5000:5000 -d jennykibiri/sovtech-api:latest'
                    sshagent(['ec2-server-key']) {
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@3.92.144.96 ${dockerCmd}"
                    }
                }
            }
        }
    }
}
