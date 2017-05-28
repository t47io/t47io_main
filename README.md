# t47io Main Website

<img src="https://t47.io/t47_logo.png" alt="T47 Logo" width="150px" align="right">

This is the _Code and Content_ repository for **t47io Main** Website. The online portfolio is freely accessible at https://t47.io/.


## Installation

**t47io Main** requires the following [**`Node.js`**](https://nodejs.org/) packages as dependencies (see in `package.json`), all of which can be installed through [`npm`](https://www.npmjs.com/). A couple of them are required globally.

Make sure you have `nodejs >= 7` and `npm` ready.

To install:

```sh
git clone https://github.com/t47io/t47io_main.git
cd ./t47io_main/
# babel-node is used for running ES6 scripts
npm install -g babel-cli
# pm2 is used for production only
# npm install -g pm2
npm install
```

> PDF assets (publication and resume) should be maintained under `public/pdf/` manually.


## Configuration

Config files are stored as `config/**/*.json`. Example configs are included in the repository, see `config/**/*.example.json`. Rename/remove the `.example` from filenames.

Server credentials are stored in `config/server.json`, including server `PORT`, email SMTP logins, _Google Analytics_ tracker ID and _GitHub_ access token. The `debug` flag here determines the server environment.

> `nginx` reverse proxy and `pm2` startup configs are _not_ included in the repository.


## Scripts

Use `npm` scripts with `npm run <cmd>`.

- Scripts for build and server:

| command | description |
| --- | --- |
| `dev` | Spawn dev server with `nodemon`. When `debug=true`, hot-reloading is enabled and bundles are _not_ optimized or minimized. When `debug=false`, the app only serves static assets from `public/`; thus you will need to run `build` first. |
| `prod` | Launch prod server with `pm2`. You should use this with `debug=false` only. |
| `build` | Run `webpack` to build client-side bundles and server-side rendered index page into `public/`. It ignores `debug` and always use `debug=false`. Files are hash-versioned and gzipped. |

- Scripts for maintenance:

| command | description |
| --- | --- |
| `json` | Concatenate app JSON files: `config/(main\|project).json`. These files are code-split from app bundles. |
| `lint` | Check syntax standards with `eslint`. |
| `update` | Check and update `npm` dependency versions. |
| `cron` | Retrives _GitHub_ contribution statistics, _Google Scholar_ citations, _SSL Certificate_ expirations, and backup local `nginx` and JSON configs with admin email notice. |


## License

**Copyright &copy; 2014-2017: Siqi Tian. All Rights Reserved.**

Code and content are licensed under [**CC-BY-NC-SA 4.0**](https://creativecommons.org/licenses/by-nc-sa/4.0/).


by [**t47**](https://t47.io/), *May 2017*.

