<template xmlns="http://www.w3.org/1999/html">
  <div
      class="flex flex-col gap-2 w-full max-w-md p-4 sm:p-8">
    <div class="flex flex-col gap-4">
      <div>
        <h5 class="text-2xl font-bold leading-none text-gray-900 dark:text-white mb-2">Layout Manager Cloud</h5>
        <span
            class="w-fit bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">1.1.0</span>
      </div>
      <button :disabled="loggingIn" v-if="!googleAccount" @click="loginGoogle"
              class="px-2 py-1 border flex gap-1 items-center border-emerald-200 dark:border-emerald-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img class="w-6 h-6" src="/assets/google-color.svg" loading="lazy"
             alt="google logo">
        <span class="text-base">Login with Google</span>
        <svg v-if="loggingIn" aria-hidden="true" role="status"
             class="ml-auto inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"/>
        </svg>
      </button>
      <div v-if="googleAccount"
           class="px-2 py-1 border flex gap-1 border-emerald-200 dark:border-emerald-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img class="w-6 h-6" src="/assets/google-color.svg" loading="lazy"
             alt="google logo">
        <span class="text-base truncate w-7/12">{{ googleAccount }}</span>
        <button v-if="(!syncingFromDrive && !syncingToDrive)" @click="logOutGoogle" type="button"
                class="ml-auto px-2 py-1 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-500">
          Sign out
        </button>
        <svg v-if="syncingFromDrive || syncingToDrive" aria-hidden="true" role="status"
             class="ml-auto inline w-4 me-3 text-gray-200 animate-spin dark:text-gray-600 h-full" viewBox="0 0 100 101"
             fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"/>
          <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"/>
        </svg>
      </div>
      <div v-if="syncingToDrive" class="flex items-center text-sm text-orange-500 rounded-lg dark:text-orange-500" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div>
          <span class="font-medium">Synchronizing to google drive!</span>
        </div>
      </div>
      <div class="flex">
        <button @click="exportLocalStorage" type="button"
                class="py-0 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 h-full">
          Export
        </button>
        <button @click="openFileInput" type="button"
                class="py-0 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 h-full">
          Import
        </button>
        <a target="_blank" href="https://www.buymeacoffee.com/xuanlinh91" class="h-9 ml-auto py-0.5">
          <img
              src="https://img.buymeacoffee.com/button-api/?text=Donate&emoji=&slug=xuanlinh91&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              alt="Buy Me a Coffee" class="h-full">
        </a>
        <input type="file" style="display: none" ref="fileInput" @change="importLocalStorage">
      </div>
      <form @submit.prevent="saveLayout" class="flex gap-2">
        <input autofocus v-model="newLayout" type="text"
               class="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-emerald-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 outline-none dark:focus:ring-0 dark:focus:outline-none dark:focus:border-emerald-500"
               placeholder="Layout Name" required/>
        <button type="submit"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Save
        </button>
      </form>
    </div>
    <div class="flow-root border-t-red-700">
      <ul role="list">
        <li v-if="developerMode && !layoutKeys.length"
            class="border border-transparent py-3 sm:py-4 hover:shadow-md hover:border hover:border-emerald-500 box-border rounded-md p-2">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-2 min-w-0 cursor-pointer">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                Sample layout
              </p>
              <div class="flex">
                <span
                    class="text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:text-gray-400 border border-gray-500 ">
                2024/12/12
                </span>
                <span
                    class="text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:text-gray-400 border border-gray-500 ">
                12 tabs
                </span>
              </div>
            </div>
            <div class="action-btn">
              <button type="button"
                      class="text-white bg-orange-600 hover:bg-orange-800 font-medium rounded-full text-sm p-1 text-center inline-flex items-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 transform transition-transform duration-200 hover:scale-125">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Menu / Close_SM">
                      <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </li>
        <li v-if="syncingFromDrive"
            class="border border-transparent py-3 sm:py-4 animate-pulse hover:shadow-md hover:border hover:border-emerald-500 box-border rounded-md p-2">
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-2 min-w-0 cursor-pointer">
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5"></div>
              <div class="flex">
                <div class="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div class="w-16 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div class="action-btn">
              <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          </div>
        </li>
        <li class="border border-transparent py-3 sm:py-4 hover:shadow-md hover:border hover:border-emerald-500 rounded-md p-2"
            v-for="layout in layoutKeys">
          <div class="flex items-center justify-between">
            <div @click="loadWindows(layout.name)" class="flex flex-col min-w-0 cursor-pointer gap-2">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {{ layout.name }}
              </p>
              <div class="flex">
              <span
                  class="text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:text-gray-400 border border-gray-500 ">
              {{ layout.createdAt }}
              </span>
                <span
                    class="text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 dark:text-gray-400 border border-gray-500 ">
              {{ layout.numberOfTab + ' tabs' }}
              </span>
              </div>
            </div>
            <div class="action-btn">
              <button type="button" @click="clearLayout(layout)"
                      class="text-white bg-orange-600 hover:bg-orange-800 font-medium rounded-full text-sm p-1 text-center inline-flex items-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 transform transition-transform duration-200 hover:scale-125">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Menu / Close_SM">
                      <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from "axios";
import dayjs from "dayjs";
import {generateTimestamp,countTabs} from "../helper/helper.js";

const layoutKeys = ref([{}])
const newLayout = ref()
const googleToken = ref("")
const googleAccount = ref("")
const dbFileId = ref("")
const loggingIn = ref(false)
const syncingFromDrive = ref(false)
const syncingToDrive = ref(false)
const developerMode = ref(false)
const fileInput = ref(null)
const dbFileName = "lmc-db.json"

// TODO allow rename layout
// TODO khong cho thao tac khi dang sync


async function logOutGoogle() {
  if (!confirm("Signing out of your Google account will stop syncing data with Google Drive. Are you sure you want to proceed?")) {
    return;
  }
  await chrome.identity.removeCachedAuthToken({token: googleToken.value});
  fetch(
      'https://accounts.google.com/o/oauth2/revoke?token=' + googleToken.value)
      .then((response) => response.json())
      .then(function (res) {
        console.log(res)
        localStorage.removeItem('google_token')
        localStorage.removeItem('google_account')
        localStorage.removeItem('db_file_id')
        localStorage.setItem('is_login', "false")
        googleToken.value = null
        googleAccount.value = null
        dbFileId.value = null
      });
}

async function loginGoogle() {
  console.log("Login Google")
  loggingIn.value = true
  let token = await chrome.identity.getAuthToken({interactive: true});
  console.log(token);
  localStorage.setItem('google_token', token.token)
  googleToken.value = token.token

  // Set username
  let init = {
    method: 'GET',
    async: true,
    headers: {
      Authorization: 'Bearer ' + googleToken.value,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  };

  fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      init)
      .then((response) => response.json())
      .then(async function (accountInfo) {
        console.log(accountInfo)
        // TODO Show permission error for scope
        localStorage.setItem('google_account', accountInfo.email)
        googleAccount.value = accountInfo.email
        loggingIn.value = false
        if (googleToken.value) {
          await syncDataFromDrive(googleToken.value);
        }
        localStorage.setItem('is_login', "true")
      });
}

const syncDataFromDrive = async (authToken) => {
  try {
    console.log("syncDataFromDrive")
    syncingFromDrive.value = true
    // Make API request to fetch lmc-db.json using the authToken
    const response = await fetch('https://www.googleapis.com/drive/v3/files?q=name%3D%27lmc-db.json%27&fields=files(id)', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    const data = await response.json();
    if (data.files && data.files.length > 0) {
      const fileId = data.files[0].id;

      // Save file id to local storage
      localStorage.setItem('db_file_id', fileId)
      dbFileId.value = fileId

      const fileContentResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const fileContent = await fileContentResponse.json();
      const fileContentJson = JSON.parse(fileContent);

      let mergeFlag = false
      if (fileContentJson['layout_keys']) {
        const isLogin = localStorage.getItem('is_login')
        if ((!isLogin || isLogin === 'false') && layoutKeys.value.length && !confirm("Existing layout data is found. Do you want to" +
            " replace it with data from Google Drive?\nOK: Replace\nCancel: Merge")) {

          // Merge fileContentJson['layout_keys'] with layoutKeys.value
          fileContentJson.layoutKeys.forEach(layout => {
            // Check if the layout's name exists in layoutKeys.value
            const existInLocalLayout = layoutKeys.value.find(localLayout => localLayout.name === layout.name);
            if (existInLocalLayout) {
              // Rename the layout's name by adding a timestamp
              const newName = layout.name + '_' + generateTimestamp();
              // Rename the key in fileContentJson
              fileContentJson["layout_" + newName] = fileContentJson["layout_" + layout.name];
              delete fileContentJson["layout_" + layout.name];
              layout.name = newName
            }
          });

          layoutKeys.value.unshift(...fileContentJson['layout_keys']);
          fileContentJson['layout_keys'] = layoutKeys.value;
          mergeFlag = true
        } else {
          // Replace local layoutKeys with fileContentJson['layout_keys']
          layoutKeys.value = fileContentJson['layout_keys'];
        }

        // Update your Vue.js app state with fetched data
        Object.keys(fileContentJson).forEach(localStorageKey => {
          localStorage.setItem(localStorageKey, JSON.stringify(fileContentJson[localStorageKey]));
        });
        console.log("complete sync from drive");

        if (mergeFlag) {
          syncDataToDrive(dbFileId.value);
        }
      }
    } else {
      console.error("lmc-db.json not found in the Google Drive");
      syncDataToDrive()
    }
  } catch (error) {
    console.error("Error syncing data from Google Drive:", error);
  } finally {
    syncingFromDrive.value = false
  }
};

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

function generateUserData() {
  const localStorageData = {};
  const layoutKeys = JSON.parse(localStorage.getItem('layout_keys'));
  localStorageData['layout_keys'] = layoutKeys;

  // Loop through layoutKeys to get localStorage data for each layout
  layoutKeys.forEach(layoutKey => {
    const localStorageKey = `layout_${layoutKey.name}`;
    localStorageData[localStorageKey] = JSON.parse(localStorage.getItem(localStorageKey));
  });

  // Convert localStorage data to JSON and save it to a file
  return JSON.stringify(localStorageData, null, 2);
}

// Function to export localStorage data to a JSON file
function exportLocalStorage() {
  const userData = generateUserData()
  const blob = new Blob([userData], {type: 'application/json'});
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

function syncDataToDrive(fileId) {
  console.log("syncDataToDrive")
  syncingToDrive.value = true
  const jsonContent = generateUserData()
  const metadata = {
    name: dbFileName,
    mimeType: "application/json"
  };

  // Create a file object from JSON string
  const file = new Blob([jsonContent], {type: 'application/json'});
  file.name = dbFileName;
  const formData = new FormData();
  formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
  formData.append("file", file);

  if (fileId) {
    // Replace file
    axios
        .patch("https://www.googleapis.com/upload/drive/v3/files/" + fileId + '?uploadType=multipart', formData, {
          headers: {
            Authorization: `Bearer ${googleToken.value}`
          },
        })
        .then((response) => {
          localStorage.setItem('db_file_id', response.data.id)
          dbFileId.value = response.data.id
          syncingToDrive.value = false
        })
        .catch((error) => {
          console.log(error)
        })
  } else {
    // Create new file
    axios
        .post("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", formData, {
          headers: {
            Authorization: `Bearer ${googleToken.value}`
          },
        })
        .then((response) => {
          localStorage.setItem('db_file_id', response.data.id)
          dbFileId.value = response.data.id
          syncingToDrive.value = false
        })
        .catch((error) => {
          console.log(error)
        })
  }
}

// Function to import localStorage data from a JSON file
function importLocalStorage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const jsonContent = reader.result;
    const localStorageData = JSON.parse(jsonContent);
    layoutKeys.value = localStorageData["layoutKeys"]

    // Loop through localStorageData and set data to localStorage
    Object.keys(localStorageData).forEach(localStorageKey => {
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageData[localStorageKey]));
    });

    if (googleToken.value && dbFileId.value) {
      syncDataToDrive(dbFileId.value);
    }

    console.log('LocalStorage data imported successfully.');
  };
  reader.readAsText(file);
}


async function saveLayout() {
  console.log("Save layout:", newLayout.value)
  if (newLayout.value.length > 0) {
    const existInLocalLayout = layoutKeys.value.find(layout => layout.name === newLayout.value);
    if (existInLocalLayout) {
      alert("The layout name '" + newLayout.value + "' already exists. Please specify a different layout name.");
      return;
    }

    let windows = await chrome.windows.getAll({populate: true});
    const numberOfTab = countTabs(windows)

    if (layoutKeys.value) {
      layoutKeys.value.push({name: newLayout.value, createdAt: dayjs().format("DD/MM/YYYY"), numberOfTab: numberOfTab});
    } else {
      layoutKeys.value = []
    }
    let key = 'layout_' + newLayout.value
    // Persist layout to localstorage
    localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
    localStorage.setItem(key, JSON.stringify(windows))
    newLayout.value = ''
    if (googleToken.value && dbFileId.value) {
      syncDataToDrive(dbFileId.value);
    }
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
  localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
  localStorage.removeItem('layout_' + layout.name)
  if (googleToken.value && dbFileId.value) {
    syncDataToDrive(dbFileId.value);
  }
}

function init() {
  let layoutKeysData = localStorage.getItem('layout_keys')
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
    localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
  } else {
    layoutKeys.value = JSON.parse(layoutKeysData)
  }
}

async function loadWindows(key) {
  console.log("Load windows:", key)
  const currentWindow = await chrome.windows.getCurrent();
  let originalWindowId = currentWindow.id;
  let windows = localStorage.getItem('layout_' + key)
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

onMounted(() => {
  console.log("On mounted")
  developerMode.value = import.meta.env.DEV
  if (localStorage.getItem('google_token')) {
    loginGoogle()
  }
  init()
})
</script>