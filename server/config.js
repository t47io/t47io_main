import emailer from 'nodemailer';
import glob from 'glob';
import path from 'path';


const conf_pub  = require('./config/pub.json');
const conf_dat  = require('./config/dat.json');
const conf_env  = require('./config/env.json');

const DEBUG = conf_env.DEBUG;
const PORT = conf_env.port;
const GA_ID = conf_env.ga_tracker;
const EMAIL_RECV = conf_env.email.login;

const SMTP = emailer.createTransport(`${conf_env.email.protocol}://${EMAIL_RECV.replace('@', '%40')}:${conf_env.email.password}@${conf_env.email.host}:${conf_env.email.port}`);
const rootPath = path.join(__dirname, '../public');


const projectList = [];
for (var key in conf_pub) {
    conf_dat.counters.publication += conf_pub[key].length;
    for (var i = 0; i < conf_pub[key].length; i++) {
        var item = conf_pub[key][i];
        item.author = item.author.replace('Tian, S.,', '<u class="text-main bg-light-gray">Tian, S.,</u>');
    }
}
for (var i = 0; i < conf_dat.projects.order.length; i++) {
    var key = conf_dat.projects.order[i];
    if (!('url' in conf_dat.projects[key])) { projectList.push(key); }
}


let resumeFile = '', gitContribFile = '';
glob(path.join(rootPath, 'pdf/Resume*.pdf'), {}, function (err, files) {
    if (err) {
        console.log(err);
        err = new Error();
        err.status = 500;
        next(err);
    }
    resumeFile = files[files.length - 1];
});
glob(path.join(rootPath, 'data/git_contrib_*.svg'), {}, function (err, files) {
    if (err) {
        console.log(err);
        err = new Error();
        err.status = 500;
        next(err);
    }
    gitContribFile = files[files.length - 1];
});
const ARGS = {projectList, resumeFile, gitContribFile};

export {DEBUG, PORT, GA_ID, EMAIL_RECV, SMTP, ARGS};
