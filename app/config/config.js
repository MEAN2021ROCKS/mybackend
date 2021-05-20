const config = {
    local: {
        port: 10010,
        db: {
            url: 'mongodb://localhost:27017/Gadgets',
        },
        baseUrl: 'http://localhost:4200/',
        backendBaseUrl: 'http://localhost:10010/',
        imageBaseUrl: 'http://localhost:10010',
        env: 'local',
        smtp: {
            service: '',
            username: '',
            password: '',
            mailUsername: '',
            host: '',
            mailUsername: '',
            verificationMail: ''
        },
        aws_ses: {
            accessKeyId: '',
            secretAccessKey: '',
            region: '',
            fromName: ''
        },
    }
};

module.exports.get = function get(env) {
    return config[env] || config.default;
};
