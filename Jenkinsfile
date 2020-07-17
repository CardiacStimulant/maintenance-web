pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
				script {
                    switch(params.deploy_env) {

						case "dev":
						    sh 'npm config get registry'
                            sh 'sed -i "s#testfs.yonyoutelecom.cn#iscdev.yonyoutelecom.cn#g" ./uba.config.js && npm install && cp -f tinper-bee.js node_modules/tinper-bee/build/tinper-bee.js && npm run build  &&  cd build/ && zip -r fe.zip fe'
							break
						case "test":
                            sh 'sed -i "s#testfs.yonyoutelecom.cn#yycti-daily.yyuap.com#g" ./uba.config.js && npm install && cp -f tinper-bee.js node_modules/tinper-bee/build/tinper-bee.js && npm run build  &&  cd build/ && zip -r fe.zip fe'
							break
                        default:
                            echo "############ wrong pipeline name ############"
                            break
                    }
                    
                } 
                
            }
        }
        stage('Test') {
            steps {
                echo  'test'
            }
        }
        stage('Deploy') {
            steps {
                script {

						sh "cp  build/fe.zip    ${ANSIBLE_HOME}/roles/ISC_front_web/files/"
						sh "ansible-playbook -i ${ANSIBLE_HOME}/env_${deploy_env} ${ANSIBLE_HOME}/update_ISC_front_web.yml"
							
                    
                } 
            }
        }
    }
    tools {
        nodejs 'nodejs12.11.1'
        jdk 'jdk1.8'
    }
    options {
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment { 
                ANSIBLE_HOME = '/var/lib/jenkins/ansible/ISC_deploy'
    }
    parameters {
        choice(choices: '''dev\ntest''', description: 'choose deploy environment', name: 'deploy_env')
    }
}