pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
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
                url: 'https://github.com/GMPWijegunawardana/fy-hotelbooking.git'
            }
        }

        stage('Create Image Tag') {
            steps {
                script {
                    IMAGE_TAG = "${BUILD_NUMBER}"
                }
            }
        }

        // ---------- SONARQUBE ----------
        stage('SonarQube Scan') {
            steps {
                sh """
                $SCANNER_HOME/bin/sonar-scanner \
                -Dsonar.projectKey=luxehotel \
                -Dsonar.sources=. \
                -Dsonar.host.url=$SONAR_URL \
                -Dsonar.login=$SONAR_TOKEN
                """
            }
        }

        // ---------- OWASP DEP CHECK ----------
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./',
                odcInstallation: 'Default'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        // ---------- BUILD DOCKER ----------
        stage('Build Backend Image') {
            steps {
                sh "docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./server"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./client"
            }
        }

        // ---------- TRIVY SCAN ----------
        stage('Trivy Scan Backend') {
            steps {
                sh "trivy image $BACKEND_IMAGE:$IMAGE_TAG"
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh "trivy image $FRONTEND_IMAGE:$IMAGE_TAG"
            }
        }

        // ---------- PUSH DOCKER ----------
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                    sh "docker push $BACKEND_IMAGE:$IMAGE_TAG"
                    sh "docker push $FRONTEND_IMAGE:$IMAGE_TAG"
                }
            }
        }

        // ---------- UPDATE GITOPS ----------
        stage('Update GitOps Repo') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'gitops-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh """
                    git clone https://$USER:$PASS@github.com/GMPWijegunawardana/fy-hotelbooking-gitops.git
                    cd fy-hotelbooking-gitops/dev

                    sed -i "s|hotel-backend:.*|hotel-backend:$IMAGE_TAG|" backend-deploymen.yaml
                    sed -i "s|hotel-frontend:.*|hotel-frontend:$IMAGE_TAG|" frontend-deployment.yaml

                    git config user.email "jenkins@luxehotel.com"
                    git config user.name "Jenkins"
                    git commit -am "CI: Update images to $IMAGE_TAG"
                    git push
                    """
                }
            }
        }
    }
}