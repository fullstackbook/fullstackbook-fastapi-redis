module.exports = {
  apps: [{
    script: 'uvicorn main:app'
  }],

  deploy: {
    production: {
      key: 'key.pem',
      user: 'ubuntu',
      host: '35.90.174.83',
      ref: 'origin/main',
      repo: 'git@github.com:travisluong/fullstackbook-fastapi-redis.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.profile && source ~/.nvm/nvm.sh && python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
