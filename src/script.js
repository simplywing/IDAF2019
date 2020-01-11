let ch, cw;
let ctx;
let img1, img2, img3, img4;

function renderImageFullSize(imgObj, clearFirst){
  if(clearFirst)
  clearBackground();

  let iwidth = imgObj.width / imgObj.height * ch;
  let lborder = (cw - iwidth)/2;
  ctx.drawImage(imgObj, lborder, 0, iwidth, ch);
}

function clearBackground(){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cw, ch);
}

function main(){
  let mainCanvas = document.getElementById("mainCanvas");
  mainCanvas.width  = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  ctx = mainCanvas.getContext("2d");
  ch = mainCanvas.height;
  cw = mainCanvas.width;

  img1 = document.getElementById("1_Vulkan");
  img2 = document.getElementById("2_Tueren");
  img3 = document.getElementById("3_Vulkanlandschaft");
  img4 = document.getElementById("4_Vulkangeist");

  renderImageFullSize(img1, true);

  window.addEventListener("keydown", function(event){
    if(event.code === "Digit1"){
      renderImageFullSize(img1, true);
    }
    if (event.code === "Digit2") {
      renderImageFullSize(img2, true);
    }
    if (event.code === "Digit3") {
      renderImageFullSize(img3, true);      
      ctx.drawImage(img4, 700, 50, 230, 400);
    }
    // if (event.code === "ArrowLeft") {
    //     rotationX = rotationX + Math.PI * 0.01;
    // }
    // if (event.code === "ArrowRight") {
    //     rotationX = rotationX - Math.PI * 0.01;
    // }
  })
}

// let req = new Request('monologe.json');

// fetch(req)
// .then(function(response) {
//     if (!response.ok) {
//         throw new Error('HTTP error, status = ' + response.status);
//     }
//     return response.blob();
// })
// .then(function(response) {
//     let data = response.stream();
//     console.log(data);
// });

// const delay = ms => new Promise(res => setTimeout(res, ms));

// let jsonobj;
// let r = new XMLHttpRequest();
// r.open("GET", "monologe.json", true);
// r.onreadystatechange = function () {
//   if (r.readyState != 4 || r.status != 200) return;
//   jsonobj = JSON.parse(r.responseText); main();
// };
// r.send();

// const writeOutput = async (text, timeout) => {
//     await delay(timeout);
//     console.log(text);
// }

// function main(){
//     jsonobj.monologe[0].phrases.forEach(async (element) => {
//         writeOutput(element.phrase, element.duration);        
//     });

// }

/*

https://animejs.com/

https://www.mediaevent.de/tutorial/svg-animation-css-javascript.html

https://www.mediaevent.de/css/animation-play-state.html




const yourFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");

  await delay(5000);
  console.log("Waited an additional 5s");
};



*/