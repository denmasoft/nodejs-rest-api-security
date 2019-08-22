const SCWorker = require('socketcluster/scworker');
const app = require('./app');

class Worker extends SCWorker {
  run() {
    const { httpServer } = this;
    // eslint-disable-next-line no-console
    console.log('   >> Worker PID:', process.pid);
    httpServer.on('request', app);
  }
}
// eslint-disable-next-line no-new
new Worker();
