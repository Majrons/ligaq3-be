module.exports = {
    apps: [
        {
            name: 'liga-q3-backend',
            script: 'app.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '500M',
            env: {
                NODE_ENV: 'production',
                PORT: 5000,
            },
        },
    ],
};