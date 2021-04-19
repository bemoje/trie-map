'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const readline = require('readline');

const extractComments = require('extract-comments');
const keywordExtractor = require('keyword-extractor');

const CWD = process.cwd();
const CONFIG = require(path.join(CWD, '.repo-manager.config.json'));

// all keywords to ignore to lower case.
CONFIG.keywords.ignore = CONFIG.keywords.ignore.map((keyword) =>
  keyword.toLowerCase(),
);

// Ensure scope starts with "@".
CONFIG.package.scope = CONFIG.package.scope
  ? CONFIG.package.scope.startsWith('@')
    ? CONFIG.package.scope
    : '@' + CONFIG.package.scope
  : '';

// generate full package name including scope if defined.
CONFIG.package.fullName =
  (CONFIG.package.scope ? CONFIG.package.scope + '/' : '') +
  CONFIG.package.name;

/**
 * Takes filepaths and reads the files' contents and returns an array of found block comments.
 */
const getSourceFileComments = (...filepaths) => {
  return filepaths.reduce((accum, filepath) => {
    const source = fs.readFileSync(filepath, 'utf8');
    accum.push(...extractComments(source).map((o) => o.value));
    return accum;
  }, []);
};

/**
 * Removes array elements that evaluate to false.
 */
const cleanStringArray = (arr) => {
  return arr.reduce((accum, elem) => {
    if (elem) accum.push(elem);
    return accum;
  }, []);
};

/**
 * Takes an array of block comments (wihout *'s at beginning of lines) and returns an array of only the description parts.
 */
const getSourceCommentDescriptions = (arrSourceComments) => {
  return cleanStringArray(
    arrSourceComments.map((comment) => {
      const match = comment.match(/^[^@]+/);
      if (!match) return '';
      return match[0].trim();
    }),
  );
};

/**
 * Takes a function that is invoked with the package.json as an object, makes desired changes to it and returns it.
 * The returned object is then stringified and then used to replace the original package.json.
 */
const updatePackageJson = (update) => {
  const PKG_PATH = path.join(CWD, 'package.json');
  const PKG = require(PKG_PATH);
  fs.writeFileSync(PKG_PATH, JSON.stringify(update(PKG), null, 2), 'utf8');
};

/**
 * Execute a command line in terminal.
 */
const exec = async (cmd) => {
  return new Promise((resolve, reject) => {
    try {
      childProcess.exec(cmd, (e, stdout, stderr) => {
        if (e) reject(e);
        const data = {
          cmd: cmd,
          stdout: stdout.split(/\r?\n/),
          stderr: stderr.split(/\r?\n/),
          print: () => {
            console.log(data.cmd);
            if (data.stdout) {
              for (let out of data.stdout) {
                console.log(out);
              }
            }
            if (data.stderr) {
              for (let err of data.stderr) {
                console.error(err);
              }
            }
          },
        };
        resolve(data);
      });
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Populate README.md file template.
 */
const README = `# ${CONFIG.readme.repoDisplayName}
${CONFIG.package.description}

![GitHub Top Language](https://img.shields.io/github/languages/top/${
  CONFIG.github.user
}/${CONFIG.github.repository})

##### Github
![GitHub Last Commit](https://img.shields.io/github/last-commit/${
  CONFIG.github.user
}/${CONFIG.github.repository}?color=red)
![GitHub Stars](https://img.shields.io/github/stars/${CONFIG.github.user}/${
  CONFIG.github.repository
})
![GitHub Forks](https://img.shields.io/github/forks/${CONFIG.github.user}/${
  CONFIG.github.repository
})
![GitHub Watchers](https://img.shields.io/github/watchers/${
  CONFIG.github.user
}/${CONFIG.github.repository})
![GitHub Repo Size](https://img.shields.io/github/repo-size/${
  CONFIG.github.user
}/${CONFIG.github.repository})

##### NPM
<span><a href="https://npmjs.org/${
  CONFIG.package.fullName
}" title="View this project on NPM"><img src="https://img.shields.io/npm/v/${
  CONFIG.package.fullName
}" alt="NPM Version" /></a></span>
<span><a href="https://npmjs.org/${
  CONFIG.package.fullName
}" title="NPM Downloads"><img src="https://img.shields.io/npm/dt/${
  CONFIG.package.fullName
}" alt="NPM Downloads" /></a></span>

##### Travis CI
<span><a href="https://npmjs.org/${
  CONFIG.package.fullName
}" title="View this project on NPM"><img src="https://travis-ci.org/${
  CONFIG.github.user
}/${
  CONFIG.github.repository
}.svg?branch=master" alt="dependencies" /></a></span>

##### Donate
<span><a href="${`https://www.patreon.com/user?u=${CONFIG.patreon.user}`}" title="Donate using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon Donation" /></a></span>

## Installation
This library is published in the NPM registry and can be installed using any compatible package manager.

#### NPM
\`\`\`sh
npm install ${CONFIG.package.fullName}
npm install --save ${CONFIG.package.fullName}
npm install --save-dev ${CONFIG.package.fullName}
\`\`\`

#### YARN
\`\`\`sh
yarn add ${CONFIG.package.fullName}
\`\`\`

#### CDN
Get minified ES6 UMD bundle from either of the popular CND's, UNPKG or JSDelivr.

\`\`\`html
<!-- For UNPKG use the code below. -->
<script src="https://unpkg.com/${CONFIG.package.fullName}"></script>

<!-- For JSDelivr use the code below. -->
<script src="https://cdn.jsdelivr.net/npm/${CONFIG.package.fullName}"></script>

<script>
  // UMD module is exposed through the "${
    CONFIG.bundler.exports.default
  }" global variable.
  console.log(${CONFIG.bundler.exports.default});
</script>
\`\`\`

## Usage
\`\`\`js
// default export
import ${CONFIG.bundler.exports.default} from '${CONFIG.package.fullName}'

// named exports
import {${CONFIG.bundler.exports.named.join(', ')}} from '${
  CONFIG.package.fullName
}'
\`\`\`

See also the **[usage examples](/docs/api/modules.md)**.

## Documentation
- [Public API Documentation](/docs/api/modules.md)
- [Full Documentation](/docs/doc/modules.md)

## Distribution
This library is written in **TypeScript** compiled to ES6 JavaScript.

#### ES6 Module Bundles
${(() => {
  const bundles = [];
  const CFG = CONFIG.bundler.output;
  if (CFG.commonjs) bundles.push('- [CommonJS](/dist/index.js)');
  if (CFG.esm) bundles.push('- [ESM](/dist/index.esm.js)');
  if (CFG.umd) bundles.push('- [UMD](/dist/index.umd.js)');
  if (CFG.umdMinified.enabled)
    bundles.push('- [UMD Minified](/dist/index.umd.min.js)');
  return bundles.join('\n');
})()}

#### Type Declarations
See the [declarations entry point](/types/index.d.ts).

## Tests
Tests are written with Jest. To run tests:

\`\`\`sh
npm run test
\`\`\`

## Issues
Please let me know of any bugs or [issues](${`https://github.com/${CONFIG.github.user}/${CONFIG.github.repository}/issues`}).

## Contribute
Contributors are welcome to open a [pull request](${`https://github.com/${CONFIG.github.user}/${CONFIG.github.repository}/pulls`}).

## License
Released under the [${CONFIG.package.license} License](./LICENSE).
`;

/**
 * Generator functions
 */
class RepoManager {
  /**
   * Update to the next patch version in the package.json file.
   */
  static versionPatch() {
    updatePackageJson((PKG) => {
      const [major, minor, patch] = PKG.version.split('.');
      PKG.version = [major, minor, Number(patch) + 1].join('.');
      return PKG;
    });
  }

  /**
   * Update to the next minor version in the package.json file.
   */
  static versionMinor() {
    updatePackageJson((PKG) => {
      const [major, minor] = PKG.version.split('.');
      PKG.version = [major, Number(minor) + 1, 0].join('.');
      return PKG;
    });
  }

  /**
   * Update to the next major version in the package.json file.
   */
  static versionMajor() {
    updatePackageJson((PKG) => {
      const [major] = PKG.version.split('.');
      PKG.version = [Number(major) + 1, 0, 0].join('.');
      return PKG;
    });
  }

  /**
   * Updates the package.json file
   */
  static generators() {
    updatePackageJson((PKG) => {
      // NAME
      PKG.name = CONFIG.package.fullName;

      // DESCRIPTION
      PKG.description = CONFIG.package.description;

      // LICENSE
      PKG.license = CONFIG.package.license;

      // REPOSITORY
      PKG.repository = {
        type: 'git',
        url: `git+https://github.com/${CONFIG.github.user}/${CONFIG.github.repository}.git`,
      };

      // AUTHOR
      PKG.author = {
        name: CONFIG.author.name,
        email: CONFIG.author.email,
        url: `https://github.com/${CONFIG.github.user}/`,
      };

      // FUNDING
      if (CONFIG.patreon.enabled) {
        PKG.funding = {
          type: 'patreon',
          url: `https://www.patreon.com/user?u=${CONFIG.patreon.user}`,
        };
      }

      // HOMEPAGE
      PKG.homepage = `https://github.com/${CONFIG.github.user}/${CONFIG.github.repository}`;

      // BUGS
      PKG.bugs = {
        url: `https://github.com/${CONFIG.github.user}/${CONFIG.github.repository}/issues`,
      };

      // KEYWORDS
      if (!CONFIG.keywords.generate) {
        PKG.keywords = [
          ...new Set(cleanStringArray(CONFIG.keywords.include)),
        ].sort();
      } else {
        // Parses the 'src' dir block comments for its descriptions from which keywords are generated and injected into the
        // package.json file.
        // Only files in the root of the 'src' directory are used.
        // Only files that have file names that end with .ts|.tsx|.js|.jsx are used.
        // Test files are skipped. Test files are files that have .test.|.spec. anywhere in the filename.
        PKG.keywords = [
          // remove duplicates
          ...new Set(
            cleanStringArray(
              keywordExtractor
                .extract(
                  getSourceCommentDescriptions(
                    getSourceFileComments(
                      ...fs
                        .readdirSync(path.join(CWD, 'src'))
                        .reduce((accum, filename) => {
                          if (
                            // skip test files
                            !/\.(test|spec)\./.test(filename) &&
                            // only use ts or js files
                            /\.(ts|tsx|js|jsx)$/.test(filename)
                          ) {
                            accum.push(path.join(CWD, 'src', filename));
                          }
                          return accum;
                        }, []),
                    ),
                  ).join('\n'),
                  {
                    language: 'english',
                    remove_duplicates: true,
                  },
                )
                .map((keyword) => {
                  // remove keywords to ignore (case-insensitive)
                  if (CONFIG.keywords.ignore.includes(keyword.toLowerCase()))
                    return;
                  // remove keywords with length <= 1
                  if (keyword.length <= 1) return;
                  // remove non WORD characters
                  return keyword.replace(/[^\w]+/g, '');
                })
                // add custom keywords to include
                .concat(...CONFIG.keywords.include),
            ),
          ),
        ].sort();
      }

      return PKG;
    });

    // README
    fs.writeFileSync(path.join(CWD, 'README.md'), README, 'utf8');
  }

  /**
   * Github commit to main.
   */
  static async npmPublish() {
    try {
      const cmd = 'npm publish --access public';
      console.log('Executing command: ' + cmd);
      const data = await exec(cmd);
      data.print();
    } catch (e) {
      console.error(e);
    }
  }
}

// Parse the process arguments and based on that, run the desired methods.
const args = process.argv
  .splice(2)
  .map((str) => str.replace('--', ''))
  .forEach((arg) => {
    RepoManager[arg]();
  });
