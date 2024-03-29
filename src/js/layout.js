// JavaScript Document
let savetimer;
function saveLayout() {
    let name = document.getElementById("layout_name").value;
    if (name.length > 0) {
        //name = name.replace(/ /g ,"_");
        clearTimeout(savetimer);
        chrome.extension.sendRequest({saveState: true, layout_name : name}, function(res) {
            document.getElementById("layouts").innerHTML = "<h3></h3>";
            init();
        });
        document.getElementById('saveButton').style.color = '#0000FF';
        savetimer = setTimeout(function () {
            document.getElementById('saveButton').style.color = '#777777';
        }, 200);
    }
    else {
        alert("Please type a name for the layout!");
    }
}

let loadtimer;
function loadLayout(txt) {
    clearTimeout(loadtimer);
    chrome.extension.sendRequest({loadState: true, layout_name: txt});
    loadtimer = setTimeout(function () {  }, 200);
}

let cleartimer;
function clearLayout(txt) {
    if (!confirm("This will remove layout '"+txt+"'!\n It will not be possible to recover it!\n Are you sure?")) {
        return;
    }
    clearTimeout(cleartimer);
    //document.getElementById('clearButton').style.color='#0000FF';
    chrome.extension.sendRequest({clearState:true, layout_name: txt}, function(){
        document.getElementById("layouts").innerHTML = "<h3></h3>";
        init();
    });
    cleartimer = setTimeout(function() {
       // document.getElementById('clearButton').style.color='#777777';
    }, 200);
}

function renderList(text) {
    let currentdate = new Date();
    let datetime = "" + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    let linkList = document.getElementById("layouts");
    let divTag = document.createElement("div");
    divTag.setAttribute("class","layout");
    let aTag = document.createElement("a");
    aTag.setAttribute("href","#"+text);
    aTag.innerHTML = text;

    let aImg = document.createElement("img");
    aImg.setAttribute("src","images/close.png");
    aImg.setAttribute("title", text);

    let sTag = document.createElement("span");
    sTag.innerHTML = datetime;

    divTag.appendChild(aTag);
    divTag.appendChild(aImg);
    divTag.appendChild(sTag);
    linkList.appendChild(divTag);
}

function init() {
    chrome.extension.sendRequest({listState: true}, function (res) {
        let r = JSON.parse(res);
        if (r !== undefined) {
            for (let i = 0; i < r.length; i++) {
                renderList(r[i]);
            }
            let links = document.getElementsByTagName("a");
            for(let i =0; i < links.length; i++) {
                links[i].addEventListener('click', function () {
                    loadLayout(this.innerHTML);
                });
            }
            let removelinks = document.getElementsByTagName("img");
            for(let i =0; i < removelinks.length; i++) {
                removelinks[i].addEventListener('click', function () {
                    clearLayout(this.getAttribute("title"));
                });
            }
        }
    });
}

window.addEventListener("load", function() {
    init();
});

window.addEventListener("load", function() {
    // document.getElementById("loadButton").addEventListener("click", loadLayout);
    document.getElementById("saveButton").addEventListener("click", saveLayout);
    //document.getElementById("clearButton").addEventListener("click", clearLayout);
});
