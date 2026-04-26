pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        IMAGE_TAG = "${BUILD_NUMBER}"

        BACKEND_IMAGE = "manishapasandul/hotel-backend"
        FRONTEND_IMAGE = "manishapasandul/hotel-frontend"

        GITOPS_REPO = "https://github.com/GMPWijegunawardana/fy-hotelbooking-gitops.git"

        SONAR_URL = "http://<JENKINS-IP>:9000"
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {

       stage('Checkout Code') {
            steps {
                git branch: 'main',
                credentialsId: 'github-token',
                url: 'https://github.com/GMPWijegunawardana/fy-hotelbooking.git'
    }
}

        stage('Set Image Tag') {
            steps {
                script {
                    echo "Using image tag: ${IMAGE_TAG}"
                }
            }
        }

        // ================= SONARQUBE =================
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh """
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=hotelbooking \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_URL \
                    -Dsonar.login=$SONAR_TOKEN
                    """
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

        // ================= OWASP =================
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''
                    --scan ./ 
                    --format XML 
                    --out dependency-report
                ''',
                odcInstallation: 'OWASP-DC'

                dependencyCheckPublisher pattern: 'dependency-report/dependency-check-report.xml'
            }
        }

        // ================= DOCKER BUILD =================
        stage('Build Backend Image') {
            steps {
                sh """
                docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./server
                """
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh """
                docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./client
                """
            }
        }

        // ================= TRIVY SCAN =================
        stage('Trivy Scan Backend') {
            steps {
                sh """
                trivy image --exit-code 1 --severity HIGH,CRITICAL $BACKEND_IMAGE:$IMAGE_TAG
                """
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh """
                trivy image --exit-code 1 --severity HIGH,CRITICAL $FRONTEND_IMAGE:$IMAGE_TAG
                """
            }
        }

        // ================= PUSH DOCKER =================
        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh """
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $BACKEND_IMAGE:$IMAGE_TAG
                    docker push $FRONTEND_IMAGE:$IMAGE_TAG
                    """
                }
            }
        }

        // ================= UPDATE GITOPS =================
        stage('Update GitOps Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitops-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh """
                    rm -rf gitops-repo
                    git clone https://$USER:$PASS@github.com/GMPWijegunawardana/fy-hotelbooking-gitops.git gitops-repo

                    cd gitops-repo/dev

                    sed -i "s|image: $BACKEND_IMAGE:.*|image: $BACKEND_IMAGE:$IMAGE_TAG|g" backend-deployment.yaml
                    sed -i "s|image: $FRONTEND_IMAGE:.*|image: $FRONTEND_IMAGE:$IMAGE_TAG|g" frontend-deployment.yaml

                    git config user.email "jenkins@ci-cd.com"
                    git config user.name "Jenkins CI"

                    git add .
                    git commit -m "CI Update: backend & frontend images -> $IMAGE_TAG" || echo "No changes to commit"
                    git push origin main
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI Pipeline completed successfully"
        }
        failure {
            echo "❌ CI Pipeline failed — check logs"
        }
    }
}