pipeline {
    agent any
    
    stages {
        stage('Install gitleaks') {
            steps {
                script {
                    // Install Git and GitLeaks
                    sh '''
                        curl -sL https://github.com/gitleaks/gitleaks/releases/download/v8.18.2/gitleaks_8.18.2_linux_x64.tar.gz -o gitleaks.tar.gz
                        gzip -d gitleaks.tar.gz && tar xvf gitleaks.tar
                        chmod +x gitleaks
                        
                        sudo mv gitleaks /usr/local/bin/gitleaks
                        rm LICENSE README.md gitleaks.tar
                    '''
                }
            }
        }

        stage('Scan repository for secrets') {
            steps {
                script {
                    // run gitleaks
                    sh '''
                        echo $PWD
                        gitleaks detect --source . -v > $PWD/Git-Leaks_Scan_Result.json 2>&1
                        echo "after gitleaks"
                        cat $PWD/Git-Leaks_Scan_Result.json
                        echo "after cat"
                        aws s3 cp Git-Leaks_Scan_Result.json s3://secops-results/Results/
                        echo "after aws s3 cp"
                    '''
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Install dependencies
                    sh 'npm install -f'
                    
                    // Build and test
                    sh 'npm run build'
                }
            }
        }
        
    }
}
