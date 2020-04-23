// if main page said open an existing file
var openedFile = null;
if(localStorage.length != 0){
    openedFile = localStorage.getItem('existingfile');
    var text  = localStorage.getItem('text');
    document.querySelector('.text-div').innerHTML = text;
    localStorage.clear();
}

function openTab(e, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += " active";
}

document.querySelector('#bold').addEventListener('click', function() {
    document.execCommand('bold');
});
document.querySelector('#italic').addEventListener('click', function() {
    document.execCommand('italic');
});
document.querySelector('#underline').addEventListener('click', function() {
    document.execCommand('underline');
});
document.querySelector('#strike').addEventListener('click', function() {
    document.execCommand('strikeThrough');
});
document.querySelector('#sup').addEventListener('click', function() {
    document.execCommand('superscript');
});
document.querySelector('#sub').addEventListener('click', function() {
    document.execCommand('subscript', false, "");
});
document.querySelector('#left').addEventListener('click', function() {
    document.execCommand('justifyLeft');
});
document.querySelector('#right').addEventListener('click', function() {
    document.execCommand('justifyRight');
});
document.querySelector('#center').addEventListener('click', function() {
    document.execCommand('justifyCenter');
});
document.querySelector('#full').addEventListener('click', function() {
    document.execCommand('justifyFull');
});
document.querySelector('#fcolor').addEventListener('change', function(e) {
    document.execCommand('foreColor', false, e.target.value);
});
var highlighColor = false;
document.querySelector('#highlight').addEventListener('click', function() {
    highlighColor = !highlighColor;
    if(highlighColor){
        document.execCommand('backColor', false, 'yellow');
    }else{
        document.execCommand('backColor', false, 'white');
    }
});
document.querySelector('#addNumber').addEventListener('click', function(){
    document.execCommand('insertOrderedList', false, "newOL");
});
document.querySelector('#remove').addEventListener('click', function() {
    document.execCommand('removeFormat');
    document.execCommand('backColor', false, 'white');
});
document.querySelector('#font-size').style.display = "inline-block";
document.querySelector('#font-type').style.display = "inline-block";
document.querySelector('#addSym').style.display = "inline-block";
document.querySelector('#font-size').addEventListener('change', function(e){
    document.execCommand('fontSize', false, e.target.value);
})
document.querySelector('#font-type').addEventListener('change', function(e){
    document.execCommand('fontName', false, e.target.value);
})
document.querySelector('#file').addEventListener('click', function(){
    var content = document.querySelector('.text-div').innerHTML;
    localStorage.setItem('saveText', content);
    localStorage.setItem('existingfile', openedFile);
    window.location = "newPage.html";
})
// view
document.querySelector('#indent').addEventListener('click', function(e){
    document.execCommand('indent');
});
document.querySelector('#outdent').addEventListener('click', function(e){
    document.execCommand('outdent');
});
document.querySelector('#hrline').addEventListener('click', function(e){
    document.execCommand('insertHorizontalRule');
});
document.querySelector('#read-mode').addEventListener('click', function(){
    var content = document.querySelector('.text-div').innerHTML;
    localStorage.setItem('readText', content);
    window.location = "readPage.html";
});
document.querySelector('#addSym').addEventListener('change', function(e){
    document.querySelector('.text-div').innerHTML += "<b>" + e.target.value + "</b>";
})
