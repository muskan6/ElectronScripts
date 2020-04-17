# ElectronScripts
Some projects with electron
# How to install 
1. Create a folder for electron projects.
2. Open command line and run npm init to create a package.json file.
3. Run npm install electron --save-dev --verbose to install electron into your code. (--verbose is to check the status of installation)
4. Open package.json and modify scripts to add start :
"scripts": {
  "start": "electron .",
  "test": "echo \"Error: no test specified\" && exit 1"
}
