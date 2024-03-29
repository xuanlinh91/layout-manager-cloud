<template>
  <div class="wrapper">
    <h2>Layout Manager Cloud</h2>
    <input type="text"
           id="layout_name"
           placeholder="Layout Name"
           maxlength="40"
           style="font-family: 'Open Sans', sans-serif">
    <a id="saveButton" class="myButton" href="#">Save Layout</a><br>
    <div id="layouts" style="font-size:20px"><h3></h3></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loadTimer = ref()
const clearTimer = ref()

// function saveLayout() {
//   let saveTimer;
//   let name = document.getElementById("layout_name").value;
//   if (name.length > 0) {
//     //name = name.replace(/ /g ,"_");
//     clearTimeout(saveTimer);
//     chrome.runtime.sendMessage({saveState: true, layout_name : name}, function(res) {
//       document.getElementById("layouts").innerHTML = "<h3></h3>";
//       // init();
//     });
//     document.getElementById('saveButton').style.color = '#0000FF';
//     saveTimer = setTimeout(function () {
//       document.getElementById('saveButton').style.color = '#777777';
//     }, 200);
//   }
//   else {
//     alert("Please type a name for the layout!");
//   }
// }
//
// function loadLayout(txt) {
//   clearTimeout(loadTimer.value);
//   chrome.runtime.sendMessage({loadState: true, layout_name: txt});
//   loadTimer.value = setTimeout(function () {  }, 200);
// }
//
// function clearLayout(txt) {
//   if (!confirm("This will remove layout '"+txt+"'!\n It will not be possible to recover it!\n Are you sure?")) {
//     return;
//   }
//   clearTimeout(clearTimer.value);
//   //document.getElementById('clearButton').style.color='#0000FF';
//   chrome.runtime.sendMessage({clearState:true, layout_name: txt}, function(){
//     document.getElementById("layouts").innerHTML = "<h3></h3>";
//     init();
//   });
//   clearTimer.value = setTimeout(function() {
//     // document.getElementById('clearButton').style.color='#777777';
//   }, 200);
// }
//
// function renderList(text) {
//   let currentdate = new Date();
//   let datetime = "" + currentdate.getDate() + "/"
//       + (currentdate.getMonth()+1)  + "/"
//       + currentdate.getFullYear() + " @ "
//       + currentdate.getHours() + ":"
//       + currentdate.getMinutes() + ":"
//       + currentdate.getSeconds();
//
//   let linkList = document.getElementById("layouts");
//   let divTag = document.createElement("div");
//   divTag.setAttribute("class","layout");
//   let aTag = document.createElement("a");
//   aTag.setAttribute("href","#"+text);
//   aTag.innerHTML = text;
//
//   let aImg = document.createElement("img");
//   aImg.setAttribute("src","images/close.png");
//   aImg.setAttribute("title", text);
//
//   let sTag = document.createElement("span");
//   sTag.innerHTML = datetime;
//
//   divTag.appendChild(aTag);
//   divTag.appendChild(aImg);
//   divTag.appendChild(sTag);
//   linkList.appendChild(divTag);
// }
//
// function init() {
//   chrome.runtime.sendMessage({listState: true}, function (res) {
//     let r = JSON.parse(res);
//     if (r !== undefined) {
//       for (let i = 0; i < r.length; i++) {
//         renderList(r[i]);
//       }
//       let links = document.getElementsByTagName("a");
//       for(let i =0; i < links.length; i++) {
//         links[i].addEventListener('click', function () {
//           loadLayout(this.innerHTML);
//         });
//       }
//       let removelinks = document.getElementsByTagName("img");
//       for(let i =0; i < removelinks.length; i++) {
//         removelinks[i].addEventListener('click', function () {
//           clearLayout(this.getAttribute("title"));
//         });
//       }
//     }
//   });
// }
//
// onMounted(() => {
//   console.log("On mounted")
//   // init()
// })

</script>