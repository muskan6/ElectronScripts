const fs = require('fs');
const {dialog} = require('electron').remote;
localStorage.clear();
document.getElementById('open').addEventListener('click', function(){
    dialog.showOpenDialog().then((fileNames) => {
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
                window.location.replace("../Editor/mainEditor.html");
            });
        });
    }, false); 
});

