const fs = require('fs');
const {dialog} = require('electron').remote;

// save the text as soon as you come on this page.
localStorage.setItem('text', localStorage.getItem('saveText'));

document.getElementById('home').addEventListener('click', function(){
    window.location = "../Home/home.html";
})

document.getElementById('new').addEventListener('click', function(){
    localStorage.setItem('text', "");
    window.location = "./mainEditor.html";
});

document.getElementById('open').addEventListener('click', function(){
    dialog.showOpenDialog().then((fileNames) => {
        if(fileNames.filePaths.length == 0){
            console.log("No file selected");
            return;
        }
        var file = (fileNames.filePaths[0]);
        fs.readFile(file, "utf-8", (err, data) => {
            if(err){
                console.log("Cannot read file");
                return;
            }
            localStorage.setItem('existingfile', file);
            localStorage.setItem('text', data);
            window.location = "../Editor/mainEditor.html";
        });
    }, false);
});

document.getElementById('save').addEventListener('click', function(){
    var newContent = localStorage.getItem('saveText');
    var fileName = localStorage.getItem('existingfile');
    // now the text in the div will be the file text
    localStorage.setItem('text', newContent);
    if(newContent != null && fileName != null){
        fs.writeFile(fileName, newContent, (err) => {
            if(err){
                console.log("Cannot read file");
                return;
            }
        });
    }
});

document.getElementById('saveas').addEventListener('click', function(){
    dialog.showSaveDialog().then((fileName) => {
        var content = localStorage.getItem('saveText');
        if(fileName.filePath.length == 0){
            console.log("No file selected");
            return;
        }
        var file = fileName.filePath;
        fs.writeFile(file, content, (err) => {
            if(err){
                console.log("Cannot read file");
                return;
            }
        });
    }, false);
});

// load json data
