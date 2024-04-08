<template xmlns="http://www.w3.org/1999/html">
  <div class="wrapper">
    <h2>Layout Manager Cloud</h2>
    <button v-if="!googleToken" @click="loginDrive" type="button" class="login-with-google-btn">
      Sign in with Google
    </button>
    <h3 v-if="googleAccount">{{ googleAccount }}</h3>
    <a href="#" @click="createDBFile">Create DB file</a><br>
    <a href="#" @click="getDbFileContent">Get DB file content</a><br>
    <a href="#" @click="processFiles">Upload db file</a><br>
    <button @click="exportLocalStorage">Export</button>
    <input type="file" style="display: none" ref="fileInput" @change="importLocalStorage">
    <button @click="openFileInput">Import</button>
    <input type="text"
           placeholder="Layout Name"
           maxlength="40"
           v-model="newLayout">
    <a class="myButton" href="#" @click="saveLayout">Save Layout</a><br>
    <div id="layouts">
      <h3>
        <div v-for="layout in layoutKeys">
          <div>
            <a href="#" @click="loadWindows(layout.name)">{{ layout.name }}</a>
            <span>{{ layout.createdAt }}</span>
          </div>
          <div class="action-btn">
            <img src="images/close.png" class="cursor-pointer" @click="clearLayout(layout)"/>
          </div>
        </div>
      </h3>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from "axios";

const layoutKeys = ref([{}])
const newLayout = ref()
const googleToken = ref("")
const googleAccount = ref("")
const dbFileId = ref("")
const dayjs = require('dayjs')

const fileInput = ref(null)
const dbFileName = "lmc-db.json"

async function processFiles() {
  const jsonContent = {
    "example": "dummy content"
  };
  const metadata = {
    name: dbFileName,
    mimeType: "application/json"
  };
  const jsonString = JSON.stringify(jsonContent);

  // Create a file object from JSON string
  const file = new Blob([jsonString], {type: 'application/json'});
  file.name = dbFileName;


  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
  formData.append("file", file);

  axios
      .post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", formData, {
        headers: {
          Authorization: `Bearer ${googleToken.value}`
        },
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
}

async function createDBFile() {
  let data = {
    name: dbFileName
  }

  fetch(
      'https://www.googleapis.com/drive/v3/files',
      {
        method: 'POST',
        async: true,
        headers: {
          Authorization: 'Bearer ' + googleToken.value,
          'Content-Type': 'application/json'
        },
        'contentType': 'json',
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data)
        localStorage.setItem('db_file_id', data.id)
        dbFileId.value = data.id
      });
}

async function isDBFileExist() {
  let data = {
    name: "lmc-db.json"
  }
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + googleToken.value,
      'Content-Type': 'application/json'
    },
    'contentType': 'json',
    body: JSON.stringify(data)
  };

  fetch(
      'https://www.googleapis.com/drive/v3/files',
      init)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data)

      });
}

// function loginDrive(){}

async function uploadDbFile() {
  let data = {
    name: dbFileName,
    mimeType: "application/json"
  }
  let init = {
    method: 'POST',
    async: true,
    headers: {
      Authorization: 'Bearer ' + googleToken.value,
      'Content-Type': 'application/json'
    },
    'contentType': 'json',
    body: JSON.stringify(data)
  };

  fetch(
      'https://www.googleapis.com//drive/v3/files?uploadType=media',
      init)
      .then((response) => response.json())
      .then(function (data) {
        console.log(data)
        localStorage.setItem('db_file_id', data.id)
        dbFileId.value = data.id
      });
}

async function getDbFileContent() {
  let fileId = localStorage.setItem('db_file_id') || undefined
  if (fileId) {
    let init = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: 'Bearer ' + googleToken.value,
        'Content-Type': 'application/json'
      },
      'contentType': 'json',
    };

    fetch(
        'https://www.googleapis.com//drive/v3/files/' + fileId,
        init)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data)
          localStorage.setItem('db_file_id', data.id)
          dbFileId.value = data.id
        });
  } else {
    console.log("File id is empty")
  }
}

function generateBlobData(){
  const localStorageData = {};
  const layoutKeys = JSON.parse(localStorage.getItem('layoutKeys'));
  localStorageData['layoutKeys'] = layoutKeys;

  // Loop through layoutKeys to get localStorage data for each layout
  layoutKeys.forEach(layoutKey => {
    const localStorageKey = `layout_${layoutKey.name}`;
    localStorageData[localStorageKey] = JSON.parse(localStorage.getItem(localStorageKey));
  });

  // Convert localStorage data to JSON and save it to a file
  const jsonContent = JSON.stringify(localStorageData, null, 2);
  return new Blob([jsonContent], {type: 'application/json'});
}

// Function to export localStorage data to a JSON file
function exportLocalStorage() {
  const blob = generateBlobData()
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `lmc-${dayjs().format("YYYYMMDD")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Function to open file input dialog
function openFileInput() {
  fileInput.value.click();
}

// Function to import localStorage data from a JSON file
function importLocalStorage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const jsonContent = reader.result;
    const localStorageData = JSON.parse(jsonContent);

    // Loop through localStorageData and set data to localStorage
    Object.keys(localStorageData).forEach(localStorageKey => {
      if (localStorageKey !== 'layoutKeys') {
        localStorage.setItem(localStorageKey, JSON.stringify(localStorageData[localStorageKey]));
      }
    });

    // Update the layoutKeys in localStorage with preserved createdAt values
    const layoutKeys = localStorageData['layoutKeys'];
    localStorage.setItem('layoutKeys', JSON.stringify(layoutKeys));

    console.log('LocalStorage data imported successfully.');
  };
  reader.readAsText(file);
}


async function saveLayout() {
  console.log("Save layout:", newLayout.value)
  if (newLayout.value.length > 0) {
    if (layoutKeys.value) {
      layoutKeys.value.push({name: newLayout.value, createdAt: dayjs().format("DD/MM/YYYY")});
    } else {
      layoutKeys.value = []
    }

    let windows = await chrome.windows.getAll({populate: true});
    let key = 'layout_' + newLayout.value
    // Sync layout to localstorage
    localStorage.setItem('layoutKeys', JSON.stringify(layoutKeys.value))
    localStorage.setItem(key, JSON.stringify(windows))
    newLayout.value = ''
  } else {
    alert("Please type a name for the layout!");
  }
}

async function clearLayout(layout) {
  if (!confirm("This will remove layout '" + layout.name + "'!\n It will not be possible to recover it!\n Are you sure?")) {
    return;
  }

  const index = layoutKeys.value.indexOf(layout);
  layoutKeys.value.splice(index, 1);
  localStorage.setItem('layoutKeys', JSON.stringify(layoutKeys.value))
  localStorage.removeItem('layout_' + layout.name)
}

async function init() {
  let layoutKeysData = localStorage.getItem('layoutKeys')
  let localGoogleToken = localStorage.getItem('google_token')
  let localAccount = localStorage.getItem('google_account')
  console.log("layoutKeys", layoutKeysData)

  if (localGoogleToken != null) {
    googleToken.value = localGoogleToken
  }

  if (localAccount != null) {
    googleAccount.value = localAccount
  }

  if (layoutKeysData == null) {
    layoutKeys.value = []
    localStorage.setItem('layoutKeys', JSON.stringify(layoutKeys.value))
  } else {
    layoutKeys.value = JSON.parse(layoutKeysData)
  }
}

async function loadWindows(key) {
  console.log("Load windows:", key)
  const currentWindow = await chrome.windows.getCurrent();
  let originalWindowId = currentWindow.id;
  let windows = await localStorage.getItem('layout_' + key)
  windows = JSON.parse(windows);
  if (windows === null)
    return;

  for (let index = 0; index < windows.length; index++) {
    let windowParams = {
      left: windows[index].left,
      top: windows[index].top,
      width: windows[index].width,
      height: windows[index].height,
      focused: windows[index].focused,
      incognito: windows[index].incognito,
      type: windows[index].type
    };

    chrome.windows.create(windowParams, function (index) {
      return function (window) {
        for (let tabIndex = 0; tabIndex < windows[index].tabs.length; tabIndex++) {
          let tabParams = {
            windowId: window.id,
            index: windows[index].tabs[tabIndex].index,
            url: windows[index].tabs[tabIndex].url,
            active: windows[index].tabs[tabIndex].active,
            pinned: windows[index].tabs[tabIndex].pinned
          };

          chrome.tabs.create(tabParams);
        }
        chrome.tabs.remove(window.tabs[0].id);
        if (originalWindowId !== null) {
          chrome.windows.remove(originalWindowId);
          originalWindowId = null;
        }
      };
    }(index));
  }
}

onMounted(async () => {
  console.log("On mounted")
  await init()
})
</script>