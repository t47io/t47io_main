import fs from 'fs-extra';
import glob from 'glob-promise';
import path from 'path';


const getResume = (rootPath) => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return resumeFiles[resumeFiles.length - 1];
};
const getResumeName = (rootPath) => path.basename(getResume(rootPath));

const getGitContrib = (rootPath) => {
  const gitFiles = glob.sync(path.join(rootPath, 'data/git_contrib_*.svg'));
  return gitFiles[gitFiles.length - 1];
};
const getGitContribName = (rootPath) => {
  const latestGitFile = getGitContrib(rootPath);
  fs.removeSync(path.join(rootPath, 'data/git_contrib.svg'));
  fs.copySync(latestGitFile, path.join(rootPath, 'data/git_contrib.svg'))
  return path.basename(latestGitFile);
}


export {
  getResume, getResumeName,
  getGitContrib, getGitContribName
};
