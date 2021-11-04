// Main export file for the src folder
const openStagedFiles = require('./commands/staging');
const openCommittedFiles = require('./commands/commit');
const openRecentFiles = require('./commands/recent');

module.exports = {
  openStagedFiles,
  openCommittedFiles,
  openRecentFiles,
};
