// Application Config
export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;
}

// Amazon Web Services Config
export interface AWSConfig {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}


var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var port = process.env.NODE_PORT || 3000;
var env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'restifyAPI-ts',
  version: '1.0.0',
  port: port,
  env: env
};

export let AWSSettings: AWSConfig = {
    accessKeyId: "AKIAIIROORTWIPJSM35Q",
    secretAccessKey:"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",
    region: "sa-east-1"
};
