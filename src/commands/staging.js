const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { isGitFolderPresent, isStagingAreaEmpty } = require('../helper');
const error = require('../error');

async function openStagedFiles() {
  const isFolderPresent = await isGitFolderPresent();
  if (isFolderPresent == false) {
    console.log(error(`>>> You haven't initialised git to this directory`));
    return;
  }

  const isEmpty = await isStagingAreaEmpty();
  if (isEmpty) {
    console.log(
      error(
        `>>> The staging area is empty. Add some files using "git add" command`
      )
    );
    return;
  }

  const res = await exec(`code . $(git diff --name-only --cached)`);
  if (res.stderr) {
    console.log(error(`Unable to open the project :-(`));
    console.log(error(`${res.stderr}`));
  }
  console.log('Woah! Files successfully opened');
}

module.exports = openStagedFiles;
