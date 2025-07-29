pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test tests/content tests/feeds tests/productcatalog tests/profile'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                sh 'npx netlify deploy --prod --dir=playwright-report --message "Test Deploy"'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
        failure {
            echo "Tests failed. Check the report."
        }
    }
}
