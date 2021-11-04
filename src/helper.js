const fs = require('fs');
const { promisify } = require('util');
const error = require('./error');
const exec = promisify(require('child_process').exec);

async function isGitFolderPresent() {
  const dir = '.git';
  try {
    fs.accessSync(dir);
    return true;
  } catch (err) {
    if (err) {
      return false;
    }
  }
}

async function isStagingAreaEmpty() {
  const res = await exec(`git diff --cached --numstat | wc -l`);
  return Number(res.stdout.trim()) == 0;
}

async function isCommitPresent(commitId) {
  try {
    const res = await exec(`git cat-file -t ${commitId}`);
    if (res == 'commit') return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  isGitFolderPresent,
  isStagingAreaEmpty,
  isCommitPresent,
};
