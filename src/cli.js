'use strict';

import program from 'commander';
import chalk from 'chalk';
import {slackHistoryExport} from './index.js';
import fs from 'fs';
var pkg = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));

program
  .version(pkg.version)
  .usage('[options]')
  .option('-t, --token <value>', '[REQUIRED] Enter your slack token API, you can generate it from here https://api.slack.com/web')
  .option('-u, --username [value]', 'Enter username of the person whose chat history with you you will like to download')
  .option('-c, --channel [value]', "Enter the name of the public channel you will like to download")
  .option('-g, --group [value]', "Enter the name of the private group you will like to download")
  .option('-d, --directory [value]', 'Directory to save generated file')
  .option('-f, --filename [value]', 'Name of generated file. Default is "<current timestamp><username || channel || group>-slack-history" e.g \'1443378584156-abimbola-slack-history.json\'')
  .option('-F, --format [value]', 'Format you want to download the data, supported format is [csv, json], default is \'json\'')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}

if (!program.token) {
  throw new Error('Slack Token must be present type "slack-history-export --help to view options"');
}

slackHistoryExport(program);
