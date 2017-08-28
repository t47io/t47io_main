<div align="center">
  <img src="https://t47.io/t47_logo.png" alt="T47.IO Logo" width="208" />
  <h1>
    <a href="https://t47.io/" taregt="_blank">
      T47.IO
    </a>
    | Personal Website
  </h1>
  <p>
    <i>Code and Content</i>
    for the personal portfolio
  </p>
</div>


<h2 align="center">Installation</h2>

**t47io Main** requires the following [**`Node.js`**](https://nodejs.org/) packages as dependencies (see in `package.json`), all of which can be installed through [`yarn`](https://yarnpkg.com/).

Make sure you have `nodejs` and `babel-node` ready globally. Also for static compression of asset files, install `yarn`, `zopfli` and `brotli` globally (by [`brew`](https://brew.sh/) or `apt-get`):

```sh
# ubuntu/debian
sudo apt-get install yarn zopfli brotli
# osx
brew install yarn zopfli brotli
sudo ln -s /usr/local/bin/bro /usr/local/bin/brotli
```

Then, setup the repository:

```sh
git clone https://github.com/t47io/t47io_main.git
cd ./t47io_main/
# babel-node is used for running ES6 scripts
yarn global add babel-cli
# pm2 is used for production only
yarn global add pm2
yarn install
```

> PDF assets (publication, thesis and resume) should be maintained under `static/pubs/`, `static/thesis/` and `static/resume/` manually.

For **production only**, we use `pm2`, `nginx` and [`ngx_brotli`](https://github.com/google/ngx_brotli) module for hosting. A custom build of `nginx` is required to enable the `brotli` compression. For details, read posts [here](https://www.enovate.co.uk/blog/2017/02/28/how-to-brotli-compression-with-nginx) and [here](https://afasterweb.com/2016/03/15/serving-up-brotli-with-nginx-and-jekyll/). Briefly, run `yarn run update:nginx` with `sudo`.


<h2 align="center">Configuration</h2>

Config files are stored as `config/**/*.json`. Example configs are included in the repository, see `config/**/*.example.json`.

Server credentials are stored in `config/server.json`, including server `PORT`, email SMTP logins, _Google Analytics_ tracker ID and _GitHub_ access token. The `DEBUG` flag here determines the server environment; the `MAINTENANCE` flag toggles 503 status. Adapt from the `config/server.example.json` as a template and rename it.

> `nginx` reverse proxy and `pm2` startup configs are _not_ included in the repository.


<h2 align="center">Scripts</h2>

Use `yarn` scripts with `yarn run <cmd>`.

- Scripts for build and server:

| command | description |
| --- | --- |
| `dev` | Spawn dev server with `nodemon`. When `DEBUG=true`, hot-reloading is enabled and bundles are _not_ optimized or minimized. When `DEBUG=false`, the app only serves static assets from `public/`; thus you will need to run `build` first. |
| `prod` | Launch prod server with `pm2`. You should use this with `DEBUG=false` only. |
| `build` | Run `webpack` to build client-side bundles and server-side rendered index page into `public/`. It ignores `DEBUG` and always use `DEBUG=false`. Files are hash-versioned and gzipped. Assets from `static/` are copied to `public/`, manifest file and `sitemap.xml` are generated. `webpack` build information is saved to `config/stats.(json\|html)`. For production, a follow up of `yarn run cron:chmod` is required for `nginx` permissions. |

- Scripts for maintenance:

| command | description |
| --- | --- |
| `json` | Concatenate app JSON files: `config/(main\|project).json`. These files are code-split from app bundles. |
| `lint` | Check syntax standards with `eslint` and `stylelint`. |
| `cron` | Retrives _GitHub_ contribution statistics, _Google Scholar_ citations, _SSL Certificate_ expirations, and backup local `nginx` and JSON configs with admin email notice. |
| `stat` | Updates stats by `yarn run cron`, rebuilds the server by `yarn run build`, and fix file permissions by `yarn run cron:chmod`. |
| `update` | Check and update `yarn` dependency versions. |


<h2 align="center">Notes</h2>

- Template app HTML files `public/(main|project).html.(gz|br)` contains JS/CSS loading logic that do not hard-code any asset path. Thus they are allowed for long cache. Only `(manifest|f.012345.min).js` is variable with a short cache.
- Custom error pages are server-side rendered and stored as `public/e.(\d{3}).html.(gz|br)`.
- Server-side rendered home page is stored as `public/index.html.(gz|br)`, as a static version without animation or interactivity. It is served to _bots_ based on user-agent match.
- `webpack` generated JS/CSS/HTML assets under `public/` are pre-compressed by `gzip` and `brotli`.
- `yarn run stat` is scheduled weekly as a `crontab` job on production (by `root`).


<div align="center">
  <h2>License</h2>
  <p><b>Copyright &copy; 2014-2017: Siqi Tian. All Rights Reserved.</b></p>
  <p>
    Code and content are licensed under
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
      <b>CC-BY-NC-SA 4.0</b>
    </a>
    .
  </p>
  <hr/>
  <p>
    by
    <a href="https://t47.io/" target="_blank">
      t47
    </a>
    <i>July 2017</i>
    .
  </p>
  <img src="https://t47.io/t47_qr_code.png" alt="T47.IO QR Code" width="256" />
</div>

