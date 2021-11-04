const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const error = require('../error');
const { isGitFolderPresent } = require('../helper');

async function openRecentFiles() {
  const isFolderPresent = await isGitFolderPresent();
  if (isFolderPresent == false) {
    console.log(error(`>>> You haven't initialised git to this directory`));
    return;
  }

  const res = await exec(
    `code . $(git diff-tree --root --no-commit-id --name-only -r HEAD)`
  );
  console.log('Woah! Files successfully opened');
}

module.exports = openRecentFiles;
