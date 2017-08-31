import express from 'express';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import winston from 'winston';
import http from 'http';
import SocketIo from 'socket.io';
import cookieParser from 'cookie-parser';
import resources from './resources';
import { authExpress } from './auth';
import busboy from 'connect-busboy';

const config = {
  apiHost: 'localhost',
  apiPort: 3003
};

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');


winston.handleExceptions(new winston.transports.Console());

app.use(bodyParser.json());
app.use(cookieParser());
app.use(busboy());

authExpress(app);
resources(app);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
