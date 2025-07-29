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
                bat 'npx playwright test -g "@TikTokHashtag"'
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