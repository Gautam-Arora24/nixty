#!/usr/bin/env node
const program = require('commander');
const {
  openStagedFiles,
  openCommittedFiles,
  openRecentFiles,
} = require('../src/index');

program
  .command('recent')
  .description('Open files that were changed in the recent commit')
  .action(openRecentFiles);

program
  .command('stage')
  .description('Open files that are present in the staging area')
  .action(openStagedFiles);

program
  .command('commit')
  .description('Open files that were committed in a particular commit hash')
  .argument('<commitId>', 'Provide the commit hash')
  .action((commitId, recent) => {
    openCommittedFiles(commitId, recent);
  });

// Parse command line arguments
program.parse(process.argv);

// Some additional information about the CLI
program.version(
  require('../package.json').version,
  '-v, --version',
  'output the current version'
);
program.name('iris');
program.usage('<command>');
program.addHelpCommand(false);
