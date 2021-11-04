const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const error = require('../error');
const { isCommitPresent, isGitFolderPresent } = require('../helper');

async function openCommittedFiles(commitId) {
  const isFolderPresent = await isGitFolderPresent();
  if (isFolderPresent == false) {
    console.log(error(`>>> You haven't initialised git to this directory`));
    return;
  }

  const isPresent = await isCommitPresent(commitId);
  if (isPresent == false) {
    console.log(
      error(
        `>>> The particular commit Id is not present in this particular branch.`
      )
    );
    console.log(error(`>>> Try changing the commit Id or branch`));
    return;
  }

  const res = await exec(
    `code . $(git diff-tree --root --no-commit-id --name-only -r ${commitId})`
  );
  if (res.stderr) {
    console.log(error(`${res.stderr}`));
  }
  console.log(`Woah! Files successfully opened`);
}

module.exports = openCommittedFiles;
