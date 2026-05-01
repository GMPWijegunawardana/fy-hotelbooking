pipeline {
    agent any

    environment {
        SONAR_SCANNER = tool 'sonar-scanner'
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
                    sh """
                    ${SONAR_SCANNER}/bin/sonar-scanner \
                    -Dsonar.projectKey=hotelbooking \
                    -Dsonar.sources=. \
                    -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            echo "⚠️ Quality Gate failed: ${qg.status}"
                            // For learning pipeline, we don't stop deployment
                        }
                    }
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                sh '''
                cd server
                /usr/local/bin/dependency-check.sh \
                --project hotelbooking \
                --scan . \
                --format HTML \
                --out .
                '''
            }
        }

        stage('Trivy FS Scan') {
            steps {
                sh '''
                trivy fs .
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker build -t hotelbooking-server ./server
                docker build -t hotelbooking-client ./client
                '''
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh '''
                trivy image hotelbooking-server
                trivy image hotelbooking-client
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker tag hotelbooking-server $USER/hotelbooking-server:latest
                    docker push $USER/hotelbooking-server:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ PIPELINE SUCCESS"
        }

        failure {
            echo "❌ PIPELINE FAILED"
        }
    }
}