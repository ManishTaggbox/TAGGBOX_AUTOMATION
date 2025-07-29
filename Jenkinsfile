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
                        bat 'npx playwright test -g "@TikTokHandle"'
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
                subject: "✅ SUCCESS | Taggbox Automation Report Deployed",
                body: """
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #28a745;">✅ Automation Test Execution Successful</h2>
    <p>Hello Team,</p>
    <p>The latest <strong>Taggbox Automation Tests</strong> were executed successfully. The detailed Playwright report has been deployed and is accessible below:</p>

    <p style="margin: 20px 0;">
      🔗 <a href="https://taggboxautomation.netlify.app/" style="font-size: 16px; color: #007bff;">View Test Report</a>
    </p>

    <p>Best regards,<br><strong>Manish Somani</strong></p>
  </body>
</html>
""",
                mimeType: 'text/html',
                to: 'manish.s@taggbox.com, manish.s+1@taggbox.com',
                from: 'manish.s@taggbox.com',
                replyTo: 'manish.s@taggbox.com'
            )
        }

        failure {
            emailext (
                subject: "❌ FAILURE | Taggbox Automation Pipeline",
                body: """
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #dc3545;">❌ Jenkins Pipeline Failed</h2>
    <p>Hello Team,</p>
    <p>The <strong>Taggbox Automation Pipeline</strong> encountered an error during execution.</p>

    <p>Please review the Jenkins logs or the test report to identify the root cause:</p>

    <p style="margin: 20px 0;">
      🔗 <a href="https://taggboxautomation.netlify.app/" style="font-size: 16px; color: #007bff;">View Test Report</a>
    </p>

    <p>If needed, refer to <a href="https://jenkins.yourcompany.com/job/TaggboxAutomation/">Jenkins Job</a> for logs.</p>

    <p>Best regards,<br><strong>Manish Somani</strong></p>
  </body>
</html>
""",
                mimeType: 'text/html',
                to: 'manish.s@taggbox.com, manish.s+1@taggbox.com',
                from: 'manish.s@taggbox.com',
                replyTo: 'manish.s@taggbox.com'
            )
        }
    }
}
