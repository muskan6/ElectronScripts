const fs = require('fs');
const {dialog} = require('electron').remote;
localStorage.clear();
document.getElementById('open').addEventListener('click', function(){
    dialog.showOpenDialog().then((fileNames) => {
        console.log(fileNames.filePaths[0]);
        if(fileNames.filePaths.length == 0){
            console.log("No file selected");
            return;
        }
        var file = (fileNames.filePaths[0]);
        localStorage.setItem('existingfile', file);
        fs.readFile(file, "utf-8", (err, data) => {
            if(err){
                console.log("Cannot read file");
                return;
            }
            localStorage.setItem('text', data);
            
            //update your json file
            var fileObj = {
                "name": file,
                "content": data
            };
            var jsonStr = JSON.stringify(fileObj);
            window.location.replace("../Editor/mainEditor.html");
        });
    }, false); 
});

