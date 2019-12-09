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

const delay = ms => new Promise(res => setTimeout(res, ms));

let jsonobj;
let r = new XMLHttpRequest();
r.open("GET", "monologe.json", true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  jsonobj = JSON.parse(r.responseText); main();
};
r.send();

const writeOutput = async (text, timeout) => {
    await delay(timeout);
    console.log(text);
}

function main(){
    jsonobj.monologe[0].phrases.forEach(async (element) => {
        writeOutput(element.phrase, element.duration);        
    });

}

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