import colors from 'colors';
import log from 'loglevel';
import logPrefix from 'loglevel-plugin-prefix';


const LOG_LEVELS = {
  debug: '',
  info: colors.green(' SUCCESS'),
  warn: colors.yellow(' WARNING'),
  error: colors.red(' ERROR'),
};

const logger = (prefix = 'root') => {
  logPrefix.reg(log);
  logPrefix.apply(log, {
    template: '%t%n%l',
    timestampFormatter: ts => colors.gray(ts.toISOString()),
    nameFormatter: () => colors.magenta(` [${prefix}]`),
    levelFormatter: level => LOG_LEVELS[level],
  });
  log.setDefaultLevel('debug');
  return log;
};


export default logger;
