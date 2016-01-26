# t47io Main Website

<img src="http://t47.io/img/t47/t47_logo_g.png" alt="T47 Logo" width="150px" align="right">

This is the _Code and Content_ repository for **t47io Main** Website. The online portfolio is freely accessible at http://t47.io/.

## Installation

**t47io Main** requires the following [**`Node.js`**](https://nodejs.org/) packages as dependencies, most of which can be installed through [`npm`](https://www.npmjs.com/).

```json
body-parser  >=  1.14.2
express      >=  4.13.4
glob         >=  6.0.4
helmet       >=  1.1.0
moment       >=  2.11.1
nodemailer   >=  2.0.0
nunjucks     >=  2.3.0
pm2          >=  1.0.0
sanitizer    >=  0.1.3
supervisor   >=  0.9.1
```

**t47io Main** also requires proper setup of `nginx` reverse proxy, and `pm2` startup scripts.

Lastly, assets preparation is required for the 1st time through running `util_minify.sh`, `util_chmod.sh` and manually replacing `config/*.json`. 

## Usage

To run the test/dev server, use:

```bash
cd path/to/server_main/repo
supervisor app.js
```

## License

**Copyright &copy; 2014-2016: Siqi Tian. All Rights Reserved.**

Code and content are licensed under [**CC-BY-NC-SA 4.0**](https://creativecommons.org/licenses/by-nc-sa/4.0/).


by [**t47**](http://t47.io/), *January 2016*.
