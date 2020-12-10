## Create your package file

### 1. Now open the terminal and navigate to your project
```
$ cd folder/to/your project
```
And type
```
$ npm init
```
- Package name: remember to use kebab-case as this is the convention in the npm community.

- Version: you will be advised to start your project in version 1.0.0, however if you are just starting your project you’re probably better off starting with something like 0.0.1 and switching to 1.0.0 when the code has been tested further. Also, other developers using your library will appreciate that your versioning reflects the state of your code.

- Description: straight to the point and easy to understand.

- Entry point: this is the entry file for your library. It is the file that other developers using your library will have to write when including it with reguire('your-package'). If you are using only one file, index.js is enough. However, if your project is about to have more files, it is better that you use src/index.js


If you don’t want to fill the rest of the fields now, you can skip them and come back later to add them in the package.json file.

### 2. Publish on npm
Sign up to npm
If you don’t have a npm account, it’s time to sign up.

npm is a command line tool. Open the console and write:
```
$ npm login # you will be prompted your mail and password 
```
You can check that you are correctly logged in with
```
$ npm whoami
```

Now that you’ve created the library and you tested it locally, it’s time to share it with the world.
```
$ cd ./route-to-your-library/
$ npm publish
```

### 3. Updating your library
We’re arriving at the end of the article, but it’s only the beginning of your library.

If you start using it and other users adopt it, you will also need to maintain it. From time to time you will have to introduce new features or update deprecated code. Whenever you do that, remember to use Semantic Versioning (major.minor.patch).

npm eases the process of maintaining your code with the npm versioning tools:

```
$ npm version patch # From 0.0.1 to 0.0.2
$ npm version minor # From 0.1.0 to 0.2.0
$ npm version major # From 1.0.0 to 2.0.0
```
Be aware that npm version updates the package.json, creates a commit and adds a TAG to git.