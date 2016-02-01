# t47io Main Website

<img src="http://t47.io/img/t47/t47_logo_g.png" alt="T47 Logo" width="150px" align="right">

This is the _Code and Content_ repository for **t47io Main** Website. The online portfolio is freely accessible at http://t47.io/.

## Installation

**t47io Main** requires the following [**`Node.js`**](https://nodejs.org/) packages as dependencies (see in `package.json`), most of which can be installed through [`npm`](https://www.npmjs.com/).

```json
body-parser     >=  1.14.2
bower           >=  1.7.7
express         >=  4.13.4
glob            >=  6.0.4
grunt           >=  0.4.5
helmet          >=  1.1.0
jshint          >=  2.9.1
jshint-stylish  >=  2.1.0
moment          >=  2.11.1
nodemailer      >=  2.0.0
nunjucks        >=  2.3.0
pm2             >=  1.0.0
sanitizer       >=  0.1.3
striptags       >=  2.1.1
supervisor      >=  0.9.1
```

For `bower`, the following libraries are maintained (see in `bower.json`): 

```json
bootstrap    >=  3.3.6
font-awesome >=  4.5.0
gsap         >=  1.18.2
isotope      >=  2.2.2
jquery       >=  2.2.0
scollmagic   >=  2.0.5
```

Also for `grunt`, the following packages are used (see in `package.json`):

```json
grunt-contrib-clean  >= 0.7.0
grunt-contrib-concat >= 0.5.1
grunt-contrib-cssmin >= 0.14.0
grunt-contrib-jshint >= 0.12.0
grunt-contrib-uglify >= 0.11.0
grunt-contrib-watch  >= 0.6.1
```

**t47io Main** also requires proper setup of `nginx` reverse proxy, and `pm2` startup scripts.

Lastly, assets preparation is required for the 1st time through running `grunt prod`, `util_chmod.sh` and manually replacing `config/*.json`. 

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

