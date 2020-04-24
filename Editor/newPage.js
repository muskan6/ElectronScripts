const fs = require('fs');
const {dialog} = require('electron').remote;

// save the text as soon as you come on this page.
localStorage.setItem('text', localStorage.getItem('saveText'));

document.getElementById('home').addEventListener('click', function(){
    window.location.assign("../Home/home.html");
})

document.getElementById('new').addEventListener('click', function(){
    localStorage.setItem('text', "");
    window.location.assign("./mainEditor.html");
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
        });
        //update your json file
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        var fileObj = {
            "name": file,
            "day": today
        };
        var fileData = fs.readFileSync("data.json");
        var jsonData = JSON.parse(fileData);
        var found = false;
        for (var i = 0; i < jsonData.files.length; i++) {
            if(jsonData.files[i]["name"] == fileObj["name"]){
                found = true;
                jsonData.files[i]["day"] = fileObj["day"];
                var obj = jsonData.files.splice(i, 1);
                jsonData.files.unshift(obj[0]);
                break;
            }
        }
        if(found == false){
            jsonData.files.unshift(fileObj);
        }
        fs.writeFile("data.json", JSON.stringify(jsonData), function(err) {
            if(err){ 
                console.log('error', err);
            }
            window.location.assign("../Editor/mainEditor.html");
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
