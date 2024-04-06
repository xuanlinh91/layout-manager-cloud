<template>
  <div class="wrapper">
    <h2>Layout Manager Cloud</h2>
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

const layoutKeys = ref([{}])
const newLayout = ref()
const dayjs = require('dayjs')

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
  console.log("layoutKeys", layoutKeysData)

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