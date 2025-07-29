pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    try {
                        bat 'npx playwright test -g "@TikTokHashtag"'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Tests failed, proceeding to deploy the report"
                    }
                }
            }
        }

        stage('Deploy to Netlify') {
            steps {
                bat 'npx netlify deploy --prod --dir=playwright-report --message "Test Deploy"'
            }
            post {
                always {
                    echo '✅ Netlify deployment attempted, even if tests failed.'
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }

        success {
            emailext (
                subject: "✅ Taggbox Automation Deployment Successful",
                body: """Hi Team,

The latest automation tests were executed successfully and the Playwright report has been deployed.

📄 Report URL: https://taggboxautomation.netlify.app/

Best regards,  
Manish Somani
""",
                to: 'manish.s@taggbox.com',
                from: 'manish.s@taggbox.com',
                replyTo: 'manish.s@taggbox.com',
                mimeType: 'text/plain'
            )
        }

        failure {
            emailext (
                subject: "❌ Taggbox Automation Pipeline Failed",
                body: """Hi Team,

The Jenkins pipeline failed during execution.  
Please check the Jenkins logs or the report for more details.
📄 Report URL: https://taggboxautomation.netlify.app/

Best regards,  
Manish Somani
""",
                to: 'manish.s@taggbox.com',
                from: 'manish.s@taggbox.com',
                replyTo: 'manish.s@taggbox.com',
                mimeType: 'text/plain'
            )
        }
    }
}
