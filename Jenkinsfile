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

        stage('Update GitOps Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                    sh """
                    # Clean up old gitops-repo folder if it exists from previous builds
                    rm -rf gitops-repo || true
                    
                    # Clone the GitOps repository
                    git clone https://\${GIT_USER}:\${GIT_PASS}@github.com/GMPWijegunawardana/fy-hotelbooking-gitops.git gitops-repo
                    cd gitops-repo
                    
                    # Update image tags in deployment YAMLs using sed
                    sed -i "s|image: manishapasandul/hotel-booking-frontend:.*|image: manishapasandul/hotel-booking-frontend:\${BUILD_NUMBER}|g" dev/frontend-deployment.yaml
                    sed -i "s|image: manishapasandul/hotel-booking-backend:.*|image: manishapasandul/hotel-booking-backend:\${BUILD_NUMBER}|g" dev/backend-deployment.yaml
                    
                    # Commit and push
                    git config user.email "jenkins@hotelbooking.com"
                    git config user.name "Jenkins CI"
                    git add dev/frontend-deployment.yaml dev/backend-deployment.yaml
                    git commit -m "chore: deploy images from build \${BUILD_NUMBER} [skip ci]" || echo "No changes to commit"
                    git push origin main
                    """
                }
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
