let ch, cw;
let ctx;
let mainCanvas
let mjson;
let speechBubble, questionBubble, questionBar, goBack;
let activeMonologId = 0;
let talking = false;
let talktoggler = false;
let talkerIntervalId = false;

let imgArr = [];

let activeScene = 0;
let scenes = [
  {
    "name": "Vulkan",
    "backgroundImage": 0,
    "characterImages": false,
    "characterPos": false,
    "monologId": false,
    "controls": {"goBack": "none", "questionBar": "none", "speechBubble": "none"}
  },
  {
    "name": "Türen",
    "backgroundImage": 6,
    "characterImages": false,
    "characterPos": false,
    "monologId": false,
    "controls": {"goBack": "block", "questionBar": "none", "speechBubble": "none"}
  },
  {
    "name": "Schweizer Bauer",
    "backgroundImage": 13,
    "characterImages": [15, 14],
    "characterPos": {"x": 200, "y": 180, "h": 250},
    "monologId": 0,
    "controls": {"goBack": "block", "questionBar": "block", "speechBubble": "block"}
  },
  {
    "name": "Wohlhabender Schweizer",
    "backgroundImage": 16,
    "characterImages": [2, 1],
    "characterPos": {"x": 200, "y": 180, "h": 250},
    "monologId": 1,
    "controls": {"goBack": "block", "questionBar": "block", "speechBubble": "block"}
  },
  {
    "name": "Vulkangeist",
    "backgroundImage": 7,
    "characterImages": [9, 8],
    "characterPos": {"x": 200, "y": 50, "h": 250},
    "monologId": 2,
    "controls": {"goBack": "block", "questionBar": "block", "speechBubble": "block"}
  },
  {
    "name": "Geist von Tambora",
    "backgroundImage": 10,
    "characterImages": [12, 11],
    "characterPos": {"x": 200, "y": 160, "h": 250},
    "monologId": 3,
    "controls": {"goBack": "block", "questionBar": "block", "speechBubble": "block"}
  },
  {
    "name": "Back to the Future",
    "backgroundImage": 3,
    "characterImages": [5, 4],
    "characterPos": {"x": 150, "y": 150, "h": 250},
    "monologId": 4,
    "controls": {"goBack": "block", "questionBar": "block", "speechBubble": "block"}
  }
];

//+-500
function convertToXPixel(virtualX){
  let vSide = cw/2;
  let zero = vSide;
  if(virtualX >= 0){
    return zero + (virtualX * vSide)/500
  }
  if(virtualX < 0){
    return zero - (virtualX * vSide)/500
  }
}
//500
function convertToYPixel(virtualY){ 
  return (virtualY * ch)/500;
}
//500
function convertToRelativeHeight(virtualHeight){
  return (virtualHeight * ch)/500;
}

function renderImageFullSize(imgObj, clearFirst){
  if(clearFirst)
  clearBackground();

  let iwidth = imgObj.width / imgObj.height * ch;
  let lborder = (cw - iwidth)/2;
  ctx.drawImage(imgObj, lborder, 0, iwidth, ch);
}

function renderImageSpecific(imgObj, posx, posy, height){
  height = convertToRelativeHeight(height);
  let iwidth = imgObj.width / imgObj.height * height
  ctx.drawImage(imgObj, convertToXPixel(posx), convertToYPixel(posy), iwidth, height);
}

function clearBackground(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cw, ch);
}

function showQuestion(elem){
  let qid = elem.dataset.qid;
  let question = mjson.monologe[activeMonologId].questions[qid].question;
  questionBubble.innerHTML = question;
  questionBubble.style.display = "block";
}

function hideQuestion(){
  questionBubble.style.display = "none";
}

function hideSpeechBubble(){
  speechBubble.style.display = "none";
}

function displayPhrase(aid, phraseCounter){
  if(phraseCounter >= mjson.monologe[activeMonologId].answers[aid].answer.length){
    hideSpeechBubble();
    window.clearInterval(talkerIntervalId);
    goBack.style.display = "block";
    talking = false;
    return;
  }
  
  let text = mjson.monologe[activeMonologId].answers[aid].answer[phraseCounter].phrase;
  let delay = mjson.monologe[activeMonologId].answers[aid].answer[phraseCounter].duration;
  console.log(phraseCounter, delay, text);

  speechBubble.innerHTML = text;
  phraseCounter++;
  if(phraseCounter < (mjson.monologe[activeMonologId].answers[aid].answer.length + 1)){
    window.setTimeout(function(){displayPhrase(aid, phraseCounter)}, delay);
  }
}

function playQuestion(elem){
  if(talking) return;
  talking = true;
  phraseCounter = 0;
  let aid = elem.dataset.qid;
  goBack.style.display = "none";
  speechBubble.style.display = "block";
  displayPhrase(aid, phraseCounter);
  talkerIntervalId = window.setInterval(function(){talker();}, 250);
}

function talker(){
  let frame1 = imgArr[scenes[activeScene].characterImages[0]];
  let frame2 = imgArr[scenes[activeScene].characterImages[1]];
  let posx = scenes[activeScene].characterPos.x;
  let posy = scenes[activeScene].characterPos.y;
  let height = scenes[activeScene].characterPos.h;
  if(talktoggler){
    talktoggler = false;
    renderImageSpecific(frame1, posx, posy, height);
  }
  else{
    talktoggler = true;
    renderImageSpecific(frame2, posx, posy, height);
  }
  //let intervalId = window.setInterval(...);
  //window.clearInterval(intervalId);
}

function linkGoBack(){
  if(talking) return;
  if(activeScene === 1){
    welcomeOverlay.style.display = "block";
    doorBar.style.display = "none";
    goAbout.style.display = "none";
    aboutOverlay.style.display = "none";
    activeScene = 0;
    showScene();
  }
  else{
    doorBar.style.display = "block";
    goAbout.style.display = "block";
    aboutOverlay.style.display = "none";
    activeScene = 1;
    showScene();
  }
}

function linkGoDoors(){
  welcomeOverlay.style.display = "none";
  doorBar.style.display = "block";
  goAbout.style.display = "block";
  activeScene = 1;
  showScene();
}

function linkGoAbout(){
  aboutOverlay.style.display = "block";
}

function linkCloseAbout(){
  aboutOverlay.style.display = "none";
}

function openDoor(elem){
  let sce = elem.dataset.sce;
  console.log(sce);
  activeScene = sce;
  doorBar.style.display = "none";
  goAbout.style.display = "none";
  aboutOverlay.style.display = "none";
  showScene();
}

function showScene(){
  let actScn = scenes[activeScene];
  renderImageFullSize(imgArr[actScn.backgroundImage], true);
  if(!(actScn.characterImages === false)){
    renderImageSpecific(imgArr[actScn.characterImages[0]], actScn.characterPos.x, actScn.characterPos.y, actScn.characterPos.h);
  }

  if(!(actScn.monologId === false)){
    activeMonologId = actScn.monologId;
    speechBubble.innerHTML = mjson.monologe[activeMonologId].welcome[0].phrase;
  }

  speechBubble.style.display = actScn.controls.speechBubble;
  questionBar.style.display = actScn.controls.questionBar;
  goBack.style.display = actScn.controls.goBack;
}

function main(){
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      mjson = JSON.parse(this.responseText);
    }
  };
  xmlhttp.open("GET", "monologe.json", true);
  xmlhttp.send();

  speechBubble = document.getElementById("speechBubble");
  questionBubble = document.getElementById("questionBubble");
  questionBar = document.getElementById("questionBar");
  goBack = document.getElementById("goBack");
  goAbout = document.getElementById("goAbout");
  doorBar = document.getElementById("doorBar");
  welcomeOverlay = document.getElementById("welcomeOverlay");
  aboutOverlay = document.getElementById("aboutOverlay");
  mainCanvas = document.getElementById("mainCanvas");
  mainCanvas.width  = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  ctx = mainCanvas.getContext("2d");
  ch = mainCanvas.height;
  cw = mainCanvas.width;

  imgArr = document.getElementsByClassName("imgsrc");

  /*
  
  0: img#1_Vulkan.imgsrc
  1: img#10_reicher_Bauer_mo.imgsrc
  2: img#10_reicher_Bauer.imgsrc
  3: img#11_Whiteboard.imgsrc
  4: img#12_Dr_Emmett_Brown_mo.imgsrc
  5: img#12_Dr_Emmett_Brown.imgsrc
  6: img#2_Tueren.imgsrc
  7: img#3_Vulkanlandschaft.imgsrc
  8: img#4_Vulkangeist_mo.imgsrc
  9: img#4_Vulkangeist.imgsrc
  10: img#5_Tambora.imgsrc
  11: img#6_Geist_Tambora_mo.imgsrc
  12: img#6_Geist_Tambora.imgsrc
  13: img#7_Haus_armer_Bauer.imgsrc
  14: img#8_armer_Bauer_mo.imgsrc
  15: img#8_armer_Bauer.imgsrc
  16: img#9_Haus_reicher_Bauer.imgsrc

  */

  activeScene = 0;
  showScene();

  window.addEventListener("keydown", function(event){
    if(event.code === "Digit1"){
      activeScene = 0;
      showScene();
    }
    if (event.code === "Digit2") {
      activeScene = 1;
      showScene();
    }
    if (event.code === "Digit3") {
      activeScene = 2;
      showScene();
    }
    if (event.code === "Digit4") {
      activeScene = 3;
      showScene();
    }
    if (event.code === "Digit5") {
      activeScene = 4;
      showScene();
    }
    if (event.code === "Digit6") {
      activeScene = 5;
      showScene();
    }
    if (event.code === "Digit7") {
      activeScene = 6;
      showScene();
    }
  })
}