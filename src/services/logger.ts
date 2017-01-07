import bunyan = require('bunyan');
import {settings} from '../config/config';

export let logger = bunyan.createLogger({
  name: 'restifyAPI-ts',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: `error.log`
    }
  ]
});