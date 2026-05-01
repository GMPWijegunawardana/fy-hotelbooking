pipeline {
    agent any

    environment {
        // SonarQube config (Configured globally in Jenkins, NO HARDCODED IP)
        SONAR_SERVER = "sonar-server"
        SCANNER_HOME = tool "sonar-scanner"

        // Docker Configuration
        DOCKER_IMAGE_BASE = "manishapasandul/hotel-booking"
    }

    stages {
        stage('Cleanup Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/GMPWijegunawardana/fy-hotelbooking.git'
            }
        }

        // Install dependencies needed for Sonar and OWASP
        stage('Install Dependencies') {
            steps {
                dir('client') { sh 'npm install' }
                dir('server') { sh 'npm install' }
            }
        }

        stage('SonarQube Scan') {
            steps {
                // DO NOT HARDCODE IP. Configure 'sonar-server' in Jenkins -> Manage Jenkins -> System
                withSonarQubeEnv("${SONAR_SERVER}") {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_AUTH_TOKEN')]) {
                        sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=hotel-booking \
                        -Dsonar.sources=. \
                        -Dsonar.login=${SONAR_AUTH_TOKEN}
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                script {
                    sh "mkdir -p dependency-check-report || true"

                    withCredentials([string(credentialsId: 'NVD_API_KEY', variable: 'NVD_KEY')]) {
                        // Scan root directory (.) to include both frontend and backend
                        sh """
                        /opt/dependency-check/bin/dependency-check.sh \
                        --project hotel-booking \
                        --scan . \
                        --format HTML \
                        --out dependency-check-report \
                        --nvdApiKey ${NVD_KEY} \
                        --data /var/lib/jenkins/.dependency-check || true
                        """
                    }
                }
            }
        }

        stage('Docker Build Images') {
            steps {
                sh """
                docker build -t ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER} ./client
                docker build -t ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER} ./server
                """
            }
        }

        stage('Trivy Security Scans') {
            steps {
                sh "mkdir -p trivy-report"
                // FS Scan to text report
                sh "trivy fs --output trivy-report/fs-report.txt . || true"
                
                // Image Scans to text report
                sh "trivy image --output trivy-report/frontend-report.txt ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER} || true"
                sh "trivy image --output trivy-report/backend-report.txt ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER} || true"
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                    echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin

                    docker push ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER}
                    docker push ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER}
                    
                    # Push latest tags as well
                    docker tag ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER} ${DOCKER_IMAGE_BASE}-frontend:latest
                    docker tag ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER} ${DOCKER_IMAGE_BASE}-backend:latest
                    
                    docker push ${DOCKER_IMAGE_BASE}-frontend:latest
                    docker push ${DOCKER_IMAGE_BASE}-backend:latest
                    """
                }
            }
        }

        stage('Deploy Containers Locally') {
            steps {
                sh """
                # Clean up old containers
                docker rm -f hotel-frontend hotel-backend || true

                # Create network if not exists
                docker network create hotel-network || true

                # Run Backend
                docker run -d \
                    --name hotel-backend \
                    --network hotel-network \
                    -p 5000:5000 \
                    ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER}

                # Run Frontend
                docker run -d \
                    --name hotel-frontend \
                    --network hotel-network \
                    -p 80:80 \
                    -e BACKEND_URL=http://hotel-backend:5000 \
                    ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER}
                """
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'dependency-check-report/**, trivy-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            // Clean up old docker images from Jenkins to save space
            sh """
            docker rmi ${DOCKER_IMAGE_BASE}-frontend:${BUILD_NUMBER} || true
            docker rmi ${DOCKER_IMAGE_BASE}-backend:${BUILD_NUMBER} || true
            docker rmi ${DOCKER_IMAGE_BASE}-frontend:latest || true
            docker rmi ${DOCKER_IMAGE_BASE}-backend:latest || true
            """
        }
        success { echo "CI/CD SUCCESS 🚀" }
        failure { echo "Pipeline Failed ❌" }
    }
}
