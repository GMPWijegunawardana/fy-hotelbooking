pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    tools {
        nodejs 'node18'
        jdk 'java21'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/GMPWijegunawardana/fy-hotelbooking.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    cd server
                    npm install

                    cd ../client
                    npm install
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    cd client
                    npm run build
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                        /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=hotelbooking \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://13.201.73.177:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                sh '''
                    cd server
                    dependency-check.sh --project hotelbooking --scan . --format HTML
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'server/dependency-check-report.html'
                }
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh '''
                    trivy fs --exit-code 0 --severity HIGH,CRITICAL .
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t manishapasandul/hotel-backend:2 ./server
                    docker build -t manishapasandul/hotel-frontend:2 ./client
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                        echo $PASS | docker login -u $USER --password-stdin

                        docker push manishapasandul/hotel-backend:2
                        docker push manishapasandul/hotel-frontend:2
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✔ CI/CD + Security Pipeline SUCCESSFUL"
        }

        failure {
            echo "❌ Pipeline Failed - check logs"
        }
    }
}