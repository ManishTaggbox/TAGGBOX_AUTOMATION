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
                bat 'npx playwright test tests/content'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                bat 'npx netlify deploy --prod --dir=playwright-report --message "Test Deploy"'
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
                body: """Hi Manish,

The latest automation tests were executed successfully and the Playwright report has been deployed.

📄 Report URL: https://taggboxautomation.netlify.app/

Best regards,  
Jenkins
""",
                to: 'manish.s@taggbox.com'
            )
        }

        failure {
            emailext (
                subject: "❌ Taggbox Automation Pipeline Failed",
                body: """Hi Manish,

The Jenkins pipeline failed during execution.  
Please check the Jenkins logs or the report for more details.

Best regards,  
Jenkins
""",
                to: 'manish.s@taggbox.com'
            )
        }
    }
}
