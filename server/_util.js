import glob from 'glob-promise';
import path from 'path';


const getResume = (rootPath) => {
  const resumeFiles = glob.sync(path.join(rootPath, 'pdf/Resume*.pdf'));
  return path.basename(resumeFiles[resumeFiles.length - 1]);
};


export {getResume};
