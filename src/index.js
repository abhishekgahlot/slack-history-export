#! /usr/bin/env node
'use strict';

import {processIM, processChannel, processGroup, saveData} from './commons.js';
import PleasantProgress from 'pleasant-progress';

export function slackHistoryExport(args) {
  const progress = new PleasantProgress();
  progress.start('working');
  if(args.type === 'dm' || args.username) {
    processIM(args.token, args.username).then(history => {
      saveData(history,args,progress,args.username);
    }).catch(error => {
      console.log(error.stack);
      progress.stop();
      process.exit(1);
    });
  } else if (args.type === 'channel' || args.channel) {
    processChannel(args.token, args.channel).then(history => {
      saveData(history,args, progress,args.channel);
    }).catch((error) => {
      progress.stop();
      console.log(error);
      console.log(error.stack);
    });
  } else if (args.type === 'group' || args.group) {
    processGroup(args.token, args.group).then(history => {
      saveData(history,args, progress,args.group);
    }).catch((error) => {
      progress.stop();
      console.log(error);
      console.log(error.stack);
    });
  }
}
