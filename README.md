# build-helpers

__Helpful utilities for speeding up the ‘build’ part of a zero-build developer experience.__

∅&nbsp; __Version:__ 0.0.1  
∅&nbsp; __Repo:__ <https://github.com/0bdx/build-helpers>  
∅&nbsp; __Homepage:__ <https://0bdx.com/build-helpers>

@TODO add an overview

---

## How to create a repo like this, from scratch

### __1. Create the initial repo__

1. At GitHub, click the ‘+’ icon, and ‘New repository’
2. Name it, describe it, tick ‘Add a README file’, choose MIT license
3. Click ‘Create repository’
4. Click the ‘Code’ button, ‘Local’ tab, ‘SSH’, and the copy icon
5. In your Terminal, `cd` to wherever you work
6. `git clone ` and paste something like ‘git@github.com:kim/my-app.git’
7. `cd` into the new directory, eg `cd my-app`

### __2. Add the .gitignore file__

```
.DS_Store
node_modules
node_modules.zip
```

### __3. Add placeholders for the type declarations and main files__

In stage 4. below, `npm init` will use the presence of these files to populate
the `"types"` and `"main"` fields of __package.json__.

```sh
touch build-helpers.d.ts build-helpers.js
```

### __4. Add the initial package.json file__

```sh
npm init --yes
sed -ix 's/: "1.0.0",/: "0.0.1",/' *e.json
sed -ix 's/eywords": \[/eywords": [ "build", "rollup" /' *e.json
sed -ix 's/: "ISC",/: "MIT",/' *e.json
A=(§{1..3},\\n·);sed -ix "s/\"main/${A[*]}·\"main/;s/·/ /g" *e.json
A=(§{a..f},\\n···);sed -ix "s/\"test/${A[*]}·\"test/;s/·/ /g" *e.json
sed -ix 's/§1/"type": "module"/' *e.json
sed -ix 's/§2/"files": [ "§0d.ts", "§0js" ]/' *e.json
sed -ix 's/§3/"engines": { "node": ">= 14.0.0" }/' *e.json
sed -ix 's/§a/"§Z:§A": "rollup -c"/' *e.json` 
sed -ix 's/§b/"§Z:§B": "tsc §0js §_"/' *e.json` 
sed -ix 's/§_/--allowJs --declaration --emitDeclarationOnly/' *e.json` 
sed -ix 's/§c/"§Z": "for s in {§A,§B};do npm run §Z:$s;done"/' *e.json
sed -ix 's/§A/prod/g;s/§B/types/g;s/§Z/build/g;' *e.json` 
sed -ix 's/§d/"§Z:§D": "echo \"🧬 test.js\" && node test.js"/' *e.json` 
sed -ix 's/§e/"§Z:§E": "tsc §0js §_"/' *e.json` 
sed -ix 's/§_/--allowJs --checkJs --noEmit/' *e.json` 
sed -ix 's/§f/"§Z": "for s in {§D,§E};do npm run §Z:$s;done"/' *e.json
sed -ix 's/§D/test/g;s/§E/types/g;s/§Z/preflight/g;' *e.json` 
sed -ix 's|Error: no test specified|🧪 src/test.js|' *e.json
sed -ix 's|exit 1|node src/test.js|' *e.json
sed -ix 's/§0/build-helpers./g' *e.json
sed -ix 's/author": "/author": "0bdx <0@0bdx.com> (0bdx.com)/' *e.json
rm package.jsonx
npm install rollup -D
```

1. Create a default __package.json__ file:  
   `npm init --yes`
2. Change the version to 0.0.1:  
   `sed -ix 's/: "1.0.0",/: "0.0.1",/' *e.json`
3. Add keywords, for better [npmjs.org](http://npmjs.org) searchability:  
   `sed -ix 's/eywords": \[/eywords": [ "build", "rollup" /' *e.json`
4. Change the license to MIT:  
   `sed -ix 's/: "ISC",/: "MIT",/' *e.json`
5. Insert three top-level placeholder properties before `"main"`, and then  
   insert six placeholder `"script"` properties before `"test"`:  
   `A=(§{1..3},\\n·);sed -ix "s/\"main/${A[*]}·\"main/;s/·/ /g" *e.json`  
   `A=(§{a..f},\\n···);sed -ix "s/\"test/${A[*]}·\"test/;s/·/ /g" *e.json`
6. Tell Node to use `import` not `require()` (avoids needing .mjs):  
   `sed -ix 's/§1/"type": "module"/' *e.json`
7. Tell NPM which files to include as part of the published package:  
   `sed -ix 's/§2/"files": [ "§0d.ts", "§0js" ]/' *e.json`
8. Specify the minimum supported Node.js version:  
   `sed -ix 's/§3/"engines": { "node": ">= 14.0.0" }/' *e.json`
9. The first script generates the main file, __build-helpers.js__, and then  
   the second script generates the type declarations, __build-helpers.d.ts__.  
   The third script is a shortcut to run both `"build:..."` scripts:  
   `sed -ix 's/§a/"§Z:§A": "rollup -c"/' *e.json`  
   `sed -ix 's/§b/"§Z:§B": "tsc §0js §_"/' *e.json`  
   `sed -ix 's/§_/--allowJs --declaration --emitDeclarationOnly/' *e.json`  
   `sed -ix 's/§c/"§Z": "for s in {§A,§B};do npm run §Z:$s;done"/' *e.json`  
   `sed -ix 's/§A/prod/g;s/§B/types/g;s/§Z/build/g;' *e.json`  
10. The fourth script runs unit tests on the main file, __build-helpers.js__,  
    and the fifth script checks it against the type declarations.  
    The sixth script is a shortcut to run both `"preflight:..."` scripts:  
    `sed -ix 's/§d/"§Z:§D": "echo \"🧬 test.js\" && "/' *e.json`  
    `sed -ix 's/§e/"§Z:§E": "tsc §0js §_"/' *e.json`  
    `sed -ix 's/§_/--allowJs --checkJs --noEmit/' *e.json`  
    `sed -ix 's/§f/"§Z": "for s in {§D,§E};do npm run §Z:$s;done"/' *e.json`  
    `sed -ix 's/§D/test/g;s/§E/types/g;s/§Z/preflight/g;' *e.json`  
11. The seventh script runs unit tests on the source code:  
    `sed -ix 's|Error: no test specified|🧪 src/test.js|' *e.json`  
    `sed -ix 's|exit 1|node src/test.js|' *e.json`
12. Replace `§0` with `build-helpers.`:  
    `sed -ix 's/§0/build-helpers./g' *e.json`
13. Insert the author’s name, email and domain:  
    `sed -ix 's/author": "/author": "0bdx <0@0bdx.com> (0bdx.com)/' *e.json`
14. Delete the temporary __package.jsonx__ file:  
    `rm package.jsonx`
15. Install one dev-dependency (3.14.0, 2 packages, 2.5 MB for 31 items):  
    `npm install rollup -D`
