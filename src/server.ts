import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { errorLogger, logger } from './app/utils/logger';
import { Server as SocketIOServer } from 'socket.io';
// import { initializeSocket } from './app/utils/socket';

process.on('uncaughtException', error => {
  // errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    server = app.listen(config.port, () => {
      // logger.info(`✅ App listening on port ${config.port}`);
      console.log(`✅ Application listening on port ${config.port}`);
    });

    // const io = require('socket.io')(server, {
    //   pingTimeout: 60000,
    //   cors: {
    //     origin: '*',
    //     credential: true,
    //     methods: ['GET', 'POST'],
    //   },
    // });
    // initializeSocket(io);

    await mongoose.connect(config.database_url as string);
    // logger.info(`✅ Database are connected`);
    console.log(`✅ Database are connected`);

    // io.on('connection', (soc: any) => {
    //   console.log('Socket.io server is running and connected');

    //   soc.on('jobAdded', (data: any) => {
    //     console.log(data);
    //   });
    // });
  } catch (error) {
    // errorLogger.error(`❌ Failed to connect database: ${error}`);
    console.log(`❌ Failed to connect database: ${error}`);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        // errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

process.on('SIGTERM', () => {
  // logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
