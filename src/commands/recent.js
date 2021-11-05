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
  if (res.stderr) {
    console.log(error(`Could not open project :-(`));
    console.log(
      error(
        `Make sure that code command is installed properly in your machine.`
      )
    );
    console.log(error(`${res.stderr}`));
  } else console.log('Opening all files...');
}

module.exports = openRecentFiles;
