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
        
        // stage('Set up AWS') {
        //     steps {
        //         script {
        //             // Configure AWS and Git
        //             sh '''
        //                 aws configure set default.region $REGION
        //                 // git config --global credential.helper '!aws codecommit credential-helper $@'
        //                 // git config --global credential.UseHttpPath true
        //             '''
        //         }
        //     }
        // }
        
        stage('Scan repository for secrets') {
            steps {
                script {
                    // Clone repository and run gitleaks
                    sh '''
                        #git clone codecommit::$REGION://$Repository
                        #cd $Repository
                        sudo su
                        gitleaks detect --source . -v > $PWD/Git-Leaks_Scan_Result.json 
                        cat $PWD/Git-Leaks_Scan_Result.json
                        ls -l
                        aws s3 cp $PWD/Git-Leaks_Scan_Result.json s3://secops-results/Results/
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
