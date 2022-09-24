// File Upload
//
import common from './common.json' assert { type: 'json' };
// var objj; 
// getdata();
// async function getdata() {

//   const res = await fetch('./static/mainpage/js/common.json')
//   objj = await res.json();
//   return objj;

// }
const randomtoken=generate_token(10);
 function getrandomword(){
   var lenwor=common["commonWords"].length;
   var ranwordindex=Math.floor(Math.random()*1000 % lenwor);
   var ranword=common["commonWords"][ranwordindex];
   return ranword;

}

 async function scatterword(id){
    // c=document.body.getBoundingClientRect();
    // screenreswid=c['right'];
    // screenreslen=c['bottom'];
    var screenreswid=window.innerWidth;
    var screenreslen=window.innerHeight;
    var ranposwid=50+((Math.random()*100000) % (screenreswid-200));
    var ranposlen=50+((Math.random()*100000) % (screenreslen-200));
    var cls='onscreenword';
    var ranfont=20+((Math.random()*Math.random())*60) % 80;
    var word=getrandomword();
    // console.log(word);
    var con="<h4 id=\""+id+ "\"class=\""+cls+"\">"+getrandomword()+"</h4>";
    document.body.innerHTML+=con;
    var dott=document.getElementById(id);
    dott.style.position = "absolute";
    dott.style['font-size']=String(ranfont)+'px';
    dott.style.left=String(ranposwid)+'px';
    dott.style.top=String(ranposlen)+'px';

    // anime({targets:'#'+String(id),
    // scale: 2,


    // })
    // console.log(ranposwid,ranposlen);


}
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
var animcom=0;
async function scatterwords(num){
  for (let i = 0; i < num; i++) {
    scatterword("word"+String(i))
  }
  for (let i = 0; i < num; i++) {
    var d=Math.floor(Math.random()*10)*200;
    anime({
      targets: '#'+"word"+String(i),
      scale: [
        { value: 2, duration: 5000,easing:"easeOutCubic"},
        { value: 2.3, duration: 10000,easing:"easeOutCubic"},

      ],
      opacity: [
        { value: 0, duration: 0,easing:"linear"},
        { value: 0.1, duration: 400,easing:"linear"},
        { value: 1, duration: 5000,easing:"linear"},
        { value: 0, duration: 5000},
      ],
      delay: d*i,
      complete:function(anim){
         animcom=animcom+1;
      

      }
    });

  }

}
async function removeElement(id) {
  var elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}
async function removeAllElemnts(num){
  for(let i=0;i<num;i++){
    removeElement("word"+String(i))
  }

}
async function scatterloop(){
  var num=40;
  var round=0
  while(true){
    await scatterwords(num);
    while(animcom!=num){
        await delay(400)
      }
    await removeAllElemnts(num);
    console.log(round);
    round=round+1;
    animcom=0;
    }
  }

  

scatterloop();

function ekUpload(){
    function Init() {
  
      console.log("Upload Initialised");
  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag'),
          submitButton  = document.getElementById('submit-button');
  
      fileSelect.addEventListener('change', fileSelectHandler, false);
  
      // Is XHR2 available?
      var xhr = new XMLHttpRequest();
      if (xhr.upload) {
        // File Drop
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
      }
    }
  
    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }
  
    function fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;
  
      // Cancel event and hover styling
      fileDragHover(e);
  
      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        parseFile(f);
        uploadFile(f);
      }
    }
  
    // Output
    function output(msg) {
      // Response
      var m = document.getElementById('messages');
      m.innerHTML = msg;
    }
  
    function parseFile(file) {
  
      console.log(file.name);
      output(
        '<strong>' + encodeURI(file.name) + '</strong>'
      );
      
      // var fileType = file.type;
      // console.log(fileType);
      var imageName = file.name;
      console.log(imageName);
      const myArray = imageName.split(".");
      console.log(myArray);
      var isGood = myArray[myArray.length-1];
      console.log("isGood");
      console.log(isGood);
      if (isGood=='txt') {
        document.getElementById('start').classList.add("hidden");
        document.getElementById('response').classList.remove("hidden");
        document.getElementById('notimage').classList.add("hidden");
        // Thumbnail Preview
        // document.getElementById('file-image').classList.remove("hidden");
        document.getElementById('file-image').src = URL.createObjectURL(file);
      }
      else {
        document.getElementById('file-image').classList.add("hidden");
        document.getElementById('notimage').classList.remove("hidden");
        document.getElementById('start').classList.remove("hidden");
        document.getElementById('response').classList.add("hidden");
        // document.getElementById("file-upload-form").reset();
      }
    }
  
    function setProgressMaxValue(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.max = e.total;
      }
    }
  
    function updateFileProgress(e) {
      var pBar = document.getElementById('file-progress');
  
      if (e.lengthComputable) {
        pBar.value = e.loaded;
      }
    }
  
    function uploadFile(file) {
  
      var xhr = new XMLHttpRequest(),
        fileInput = document.getElementById('class-roster-file'),
        pBar = document.getElementById('file-progress'),
        fileSizeLimit = 50; // In MB
        console.log("uploadsec2");

      
      if (xhr.upload) {
        var ran;

        // Check if file is less than x MB
        if (file.size <= fileSizeLimit * 1024 * 1024) {

          // Progress bar
          pBar.style.display = 'inline';
          xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
          xhr.upload.addEventListener('progress', updateFileProgress, false);
  
          // File received / failed
          xhr.onreadystatechange = function(e) {

            if (xhr.readyState == 4) {
              console.log("Done uploadinggg")
              var urll='/redirect-success/'+ran
              window.location.href =urll; 
              // Everything is good!
              // const csrf=document.querySelector('[name=csrfmiddlewaretoken]').value
              // const request = new XMLHttpRequest()
              // request.open('POST', '/redirect-success', true)
              // request.setRequestHeader('X-CSRFToken', csrf)
              // request.setRequestHeader('Content-Type', 'application/json');
              // request.setRequestHeader('Random-token', 'application/json');

              // // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

              // request.send(JSON.stringify({
              //     "request_name":"change-extra-fields",
              //     "type":"increase",
              
              // }))

  
              // progress.className = (xhr.status == 200 ? "success" : "failure");
              // document.location.reload(true);
            }
          };

  
          // Start upload
          // xhr.open('POST', document.getElementById('file-upload-form').action, true);
          // xhr.setRequestHeader('X-File-Name', file.name);
          // xhr.setRequestHeader('X-File-Size', file.size);
          // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
          // xhr.send("file");
          // var fd = new FormData();
          /* Add the file */ 
          // fd.append("upload", file);
          // xhr.open("post",document.getElementById('file-upload-form').action, true);
          // xhr.setRequestHeader("Content-Type", "multipart/form-data");
          // xhr.send(fd);  /* Send to server */ 
          const csrf=document.querySelector('[name=csrfmiddlewaretoken]').value
          var filename=randomtoken+'.txt';
          ran=randomtoken;
          xhr.open('post', '', true);
          xhr.setRequestHeader("X-CSRFToken", csrf);
          xhr.setRequestHeader('X-File-Name', filename);
          xhr.setRequestHeader('X-File-Size', file.size);
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          console.log(file.size)
          var fd = new FormData();
          fd.append("filename", filename);
          fd.append("drive_file", file);
          xhr.send(fd);
          console.log("before")

        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }
  
    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  ekUpload();

  function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

