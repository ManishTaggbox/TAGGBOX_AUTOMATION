pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH_TOKEN')  // Store this in Jenkins credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/ManishTaggbox/TAGGBOX_AUTOMATION.git', branch: 'master'
            }
        }

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
                withEnv(["PATH+NETLIFY=${WORKSPACE}/node_modules/.bin"]) {
                    sh '''
                        # Install Netlify CLI if not present
                        if ! [ -x "$(command -v netlify)" ]; then
                          npm install -g netlify-cli
                        fi

                        # Deploy report
                        netlify deploy --auth $NETLIFY_AUTH_TOKEN --prod --dir=playwright-report --message "Automated Test Report"
                    '''
                }
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
