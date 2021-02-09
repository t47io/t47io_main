import { MANIFEST_JS } from './config.js';


export const CHUNK_MAIN_APP = 'mainApp';
export const CHUNK_MAIN_DAT = 'mainData';
export const CHUNK_MAIN_IMG = 'mainImage';
export const CHUNK_PROJ_APP = 'projectApp';
export const CHUNK_PROJ_DAT = 'projectData';
export const CHUNK_VENDOR = 'vendor';
export const CHUNK_MANIFEST = 'manifest';

export const CHUNKS = {
  [CHUNK_MAIN_APP]: 'm',
  [CHUNK_MAIN_DAT]: 'd',
  [CHUNK_MAIN_IMG]: 'i',
  [CHUNK_PROJ_APP]: 'p',
  [CHUNK_PROJ_DAT]: 'r',
  [CHUNK_VENDOR]: 'v',
  [CHUNK_MANIFEST]: 'f',
};
export const CHUNKS_CSS = [
  CHUNK_MAIN_APP,
  CHUNK_PROJ_APP,
  CHUNK_VENDOR,
];
export const CHUNKS_MAIN = [
  CHUNK_VENDOR,
  CHUNK_MAIN_DAT,
  CHUNK_MAIN_IMG,
  CHUNK_MAIN_APP,
];
export const CHUNKS_PROJECT = [
  CHUNK_VENDOR,
  CHUNK_PROJ_DAT,
  CHUNK_PROJ_APP,
];

export const getChunkName = (chunk, DEBUG = true) => (
  DEBUG ? chunk : CHUNKS[chunk]
);
export const getChunkFilename = (chunk, DEBUG = true, isCSS = false) => {
  if (!DEBUG && chunk === CHUNK_MANIFEST) {
    return MANIFEST_JS;
  }
  const chunkName = getChunkName(chunk, DEBUG);
  const ext = isCSS ? 'css' : 'js';
  const hash = isCSS ? 'content' : 'chunk';
  const dir = isCSS ? 'styles' : 'scripts';
  return DEBUG ? `${chunkName}.${ext}` : `${dir}/${chunkName}.[${hash}hash:6].min.${ext}`;
};

export const getChunkFilenameMap = (DEBUG = true, isCSS = false) => (
  Object.fromEntries(
    Object.keys(CHUNKS).map(key => ([
      key, getChunkFilename(key, DEBUG, isCSS),
    ]))
  )
);

export const getChunkArgs = (chunks, DEBUG = true) => ({
  debug: DEBUG,
  manifest: MANIFEST_JS,
  js: chunks.map(chunk => getChunkName(chunk, DEBUG)),
  css: chunks.filter(chunk => CHUNKS_CSS.includes(chunk)).map(chunk => getChunkName(chunk, DEBUG)),
});
