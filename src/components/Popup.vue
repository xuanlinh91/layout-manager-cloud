<template xmlns="http://www.w3.org/1999/html">
  <div
      class="flex flex-col gap-2 w-full max-w-md p-4 sm:p-8">
    <div class="flex flex-col gap-4">
      <div>
        <h5 class="text-2xl font-bold leading-none text-gray-900 dark:text-white mb-2">Layout Manager Cloud</h5>
        <span
            class="w-fit bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">1.4.0</span>
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
        <button v-if="(!syncingFromDrive && !syncingToDrive && !loggingIn)" @click="logOutGoogle(googleToken)"
                type="button"
                class="ml-auto px-2 py-1 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-500">
          Sign out
        </button>
        <svg v-if="syncingFromDrive || syncingToDrive || loggingIn" aria-hidden="true" role="status"
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
      <div v-if="syncingToDrive || syncingFromDrive"
           class="flex items-center text-sm text-orange-500 rounded-lg dark:text-orange-500"
           role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 20 20">
          <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div>
          <span class="font-medium">Synchronizing with google drive!</span>
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
        <button :disabled="syncingFromDrive || syncingToDrive" v-if="!isEncrypt"
                @click="showPassKey = !showPassKey"
                class="transform transition-transform duration-200 hover:scale-125">
          <svg fill="#9ca3af" width="30px" height="30px" viewBox="0 0 35 35" data-name="Layer 2" id="Layer_2"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.5,34.44A3.07,3.07,0,0,1,15.89,34L9.82,30.45A14.79,14.79,0,0,1,2.25,17.7V8A3.2,3.2,0,0,1,4.34,5L16.4.57a3.2,3.2,0,0,1,2.2,0L30.66,5a3.2,3.2,0,0,1,2.09,3V17.7a14.79,14.79,0,0,1-7.57,12.75L19.11,34A3.07,3.07,0,0,1,17.5,34.44Zm0-31.56a.67.67,0,0,0-.24,0L5.2,7.33A.69.69,0,0,0,4.75,8V17.7a12.3,12.3,0,0,0,6.33,10.59l6.07,3.56a.73.73,0,0,0,.7,0l6.07-3.56h0A12.3,12.3,0,0,0,30.25,17.7V8a.69.69,0,0,0-.45-.65L17.74,2.92A.67.67,0,0,0,17.5,2.88Z"/>
            <path
                d="M16.4,22.35a1.3,1.3,0,0,1-.81-.29l-4.27-3.6a1.25,1.25,0,0,1,1.61-1.92l3.35,2.82L22,13.06a1.25,1.25,0,0,1,1.86,1.68l-6.48,7.2A1.27,1.27,0,0,1,16.4,22.35Z"/>
          </svg>
        </button>
        <!--        <button :disabled="syncingFromDrive || syncingToDrive" v-if="isEncrypt"-->
        <!--                @click="showPassKey = !showPassKey"-->
        <!--                class="transform transition-transform duration-200 hover:scale-125">-->
        <!--          <svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">-->
        <!--            <path fill="#9ca3af" stroke="#000000" stroke-width="2"-->
        <!--                  d="M7,11 L7,6 C7,3 9,1 12,1 C15,1 17,3 17,6 L17,11 M12,23 C15.8659932,23 19,19.8659932 19,16 C19,12.1340068 15.8659932,9 12,9 C8.13400675,9 5,12.1340068 5,16 C5,19.8659932 8.13400675,23 12,23 Z M12,15 L12,19 M12,16 C12.5522847,16 13,15.5522847 13,15 C13,14.4477153 12.5522847,14 12,14 C11.4477153,14 11,14.4477153 11,15 C11,15.5522847 11.4477153,16 12,16 Z"/>-->
        <!--          </svg>-->
        <!--        </button>-->
        <button :disabled="syncingFromDrive || syncingToDrive" v-if="isEncrypt"
                @click="unEncryptLayout"
                class="transform transition-transform duration-200 hover:scale-125">
          <svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#9ca3af" stroke="#000000" stroke-width="2"
                  d="M7,11 L7,6 C7,3 9,1 12,1 C15,1 17,3 17,6 L17,11 M12,23 C15.8659932,23 19,19.8659932 19,16 C19,12.1340068 15.8659932,9 12,9 C8.13400675,9 5,12.1340068 5,16 C5,19.8659932 8.13400675,23 12,23 Z M12,15 L12,19 M12,16 C12.5522847,16 13,15.5522847 13,15 C13,14.4477153 12.5522847,14 12,14 C11.4477153,14 11,14.4477153 11,15 C11,15.5522847 11.4477153,16 12,16 Z"/>
          </svg>
        </button>
        <a target="_blank" href="https://www.buymeacoffee.com/xuanlinh91" class="h-9 ml-auto py-0.5">
          <img
              src="https://img.buymeacoffee.com/button-api/?text=Donate&emoji=&slug=xuanlinh91&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000"
              alt="Buy Me a Coffee" class="h-full">
        </a>
        <input type="file" style="display: none" ref="fileInput" @change="importLocalStorage">
      </div>
      <form @submit.prevent="onSubmitPasskey" v-if="showPassKey" class="flex gap-2 items-center mb-1 animate-pulse">
        <input required v-model="passKey1" maxlength="1" ref="input1"
               @keyup="autoTab($event, null, 1)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <input required v-model="passKey2" maxlength="1" ref="input2"
               @keyup="autoTab($event, 0, 2)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <input required v-model="passKey3" maxlength="1" ref="input3"
               @keyup="autoTab($event, 1, 3)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <input required v-model="passKey4" maxlength="1" ref="input4"
               @keyup="autoTab($event, 2, 4)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <input required v-model="passKey5" maxlength="1" ref="input5"
               @keyup="autoTab($event, 3, 5)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <input required v-model="passKey6" maxlength="1" ref="input6"
               @keyup="autoTab($event, 4, null)"
               class="pass-key-digit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button :disabled="syncingFromDrive || syncingToDrive" type="submit"
                class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
          OK
        </button>
      </form>
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
            v-for="layout in layoutKeys" v-if="layoutKeys.length">
          <div class="flex items-center justify-between">
            <div @click="loadWindows(layout.name)" class="flex flex-col min-w-0 cursor-pointer gap-2">
              <p v-if="layout.name" class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {{ layout.name.replace('layout_', '') }}
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
                      class="text-white font-medium rounded-full text-sm p-1 text-center inline-flex items-center me-2 transform transition-transform duration-200 hover:scale-125">
                <svg v-if="deletable" class="w-8 h-8 dark:text-orange-800 hover:text-orange-600" viewBox="0 0 24 24"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Menu / Close_SM">
                      <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </g>
                </svg>
                <svg v-if="!deletable" aria-hidden="true"
                     class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"/>
                  <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"/>
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
import {nextTick, onMounted, ref} from 'vue'
import dayjs from "dayjs";
import {countTabs, hashString, localStorageDataToBlob} from "../helper/helper.js";
import {
  checkFileExist,
  checkFolderExist,
  createFolder,
  deleteFile,
  getDriveFileContent,
  listFolderJsonFiles,
  persist
} from "../service/drive.js";
import {decryptData, encryptData} from "../helper/encrypt.js";

// Create refs for each input field
const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);
const input4 = ref(null);
const input5 = ref(null);
const input6 = ref(null);
const passKey1 = ref("");
const passKey2 = ref("");
const passKey3 = ref("");
const passKey4 = ref("");
const passKey5 = ref("");
const passKey6 = ref("");
const passKey = ref("");
const inputs = [input1, input2, input3, input4, input5, input6];
const passKeys = [passKey1, passKey2, passKey3, passKey4, passKey5, passKey6];

const layoutKeys = ref([{}])
const newLayout = ref()
const googleToken = ref("")
const dbFileIds = ref({})
const dbFolderId = ref("")
const googleAccount = ref("")
const dbFileId = ref("")
const loggingIn = ref(false)
const syncingFromDrive = ref(false)
const syncingToDrive = ref(false)
const developerMode = ref(false)
const fileInput = ref(null)
const cloudLayoutKeys = ref([])
const showPassKey = ref(false)
const isEncrypt = ref(false)
const deletable = ref(false)
const dbFolderName = "lmc-database"

// TODO allow rename layout
// TODO compared encrypted layout and unencrypted layout

const autoTab = async (el, prevId, nextId) => {
  await nextTick();

  let inputElement = el.target;
  let inputValue = inputElement.value;
  if (el.key === "Backspace" || el.key === "Delete" || el.key === "ArrowLeft" || el.key === "ArrowUp") {
    if (prevId !== null) {
      inputs[prevId].value.focus();
    }
  } else if (inputValue.length >= inputElement.maxLength && nextId !== null) {
    inputs[nextId].value.focus();
  }
};

async function onSubmitPasskey() {
  console.log("encryptLayout on submit")
  await encryptLayout()
  isEncrypt.value = true
  showPassKey.value = false
  localStorage.setItem("is_encrypt", isEncrypt.value.toString())
  // clear all passkey input
  for (let i = 0; i < passKeys.length; i++) {
    passKeys[i].value = ""
  }
  if (googleAccount.value && googleToken.value !== "" && layoutKeys.value.length > 0) {
    await syncDataToDrive(dbFolderId.value, googleToken.value);
  }
}

async function encryptLayout() {
  const joinedPassKey = passKeys.map(passKey => passKey.value).join("")
  localStorage.setItem("pass_key", joinedPassKey)
  passKey.value = joinedPassKey

  // loop through layouts and encrypt them, save to localStorage, update hash of the layout content to layoutKeys
  for (let i = 0; i < layoutKeys.value.length; i++) {
    const layoutData = localStorage.getItem(layoutKeys.value[i].name)
    const encryptedData = await encryptData(layoutData, passKey.value)
    localStorage.setItem(layoutKeys.value[i].name, JSON.stringify(encryptedData))
    layoutKeys.value[i].hash = await hashString(JSON.stringify(encryptedData) + layoutKeys.value[i].name)
    layoutKeys.value[i].encrypted = true
    layoutKeys.value[i].encryptedName = btoa(JSON.stringify(await encryptData(layoutKeys.value[i].name, passKey.value)))
  }

  localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
}

async function decryptLayout() {
  console.log("Decrypting layout")
  for (let i = 0; i < layoutKeys.value.length; i++) {
    const layoutData = localStorage.getItem(layoutKeys.value[i].name)
    const decryptedData = await decryptData(JSON.parse(layoutData), passKey.value)
    localStorage.setItem(layoutKeys.value[i].name, decryptedData.data)
    layoutKeys.value[i].hash = await hashString(decryptedData.data + layoutKeys.value[i].name)
    delete layoutKeys.value[i].encrypted
    delete layoutKeys.value[i].encryptedName
  }

  localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
}

async function doUnEncrypt() {
  await decryptLayout()
  isEncrypt.value = false
  localStorage.removeItem("pass_key")
  localStorage.setItem("is_encrypt", isEncrypt.value.toString())
  // clear all passkey input
  for (let i = 0; i < passKeys.length; i++) {
    passKeys[i].value = ""
  }
  if (googleAccount.value && googleToken.value !== ""  && layoutKeys.value.length > 0) {
    await syncDataToDrive(dbFolderId.value, googleToken.value);
  }
}

async function unEncryptLayout() {
  if (!confirm("Do you want to un-encrypt all layout data??")) {
    return;
  }
  await doUnEncrypt()
}

async function syncDataToDrive(folderId, authToken) {
  syncingToDrive.value = true
  let syncFlag = false
  if (layoutKeys.value.length === 0) {
    return
  }

  console.log("syncDataToDrive with folderId: ", folderId);
  if (!folderId) {
    // Folder not exist, create new db folder on drive
    folderId = await createFolder(dbFolderName, authToken);
    if (!folderId) {
      console.error("Error creating folder on Google Drive")
      syncingToDrive.value = false
      return;
    }

    dbFolderId.value = folderId;
    dbFileIds.value = {};

    // Persist layout files
    for (const layoutKey of layoutKeys.value) {
      const file = await localStorageDataToBlob(layoutKey.name, isEncrypt.value, passKey.value)
      dbFileIds.value[layoutKey.name] = await persist(null, folderId, file, authToken)
    }
    syncFlag = true
  } else {
    // Folder exist
    console.log("Folder exist: ", folderId)
    let layoutKeyCloudExist = await checkFileExist("layout_keys.json", authToken);
    cloudLayoutKeys.value = await getDriveFileContent(layoutKeyCloudExist, authToken)
    dbFileIds.value["layout_keys"] = layoutKeyCloudExist

    if (cloudLayoutKeys.value.length === 0) {
      console.log("cloudLayoutKeys is empty")
      if (!layoutKeyCloudExist || cloudLayoutKeys.value.length === 0) {
        syncFlag = true
        for (const layoutKey of layoutKeys.value) {
          let layoutData = localStorage.getItem(layoutKey.name)
          const file = new Blob([layoutData], {type: 'application/json'});
          file.name = layoutKey.name + ".json"
          dbFileIds.value[layoutKey.name] = await persist(null, folderId, file, authToken)
        }
      } else {
      }
    } else {
      for (const layoutKey of layoutKeys.value) {
        const existingOnCloud = cloudLayoutKeys.value.some(layout => layout.hash === layoutKey.hash);
        if (!existingOnCloud) {
          let layoutData = localStorage.getItem(layoutKey.name)
          const file = new Blob([layoutData], {type: 'application/json'});
          file.name = layoutKey.name + ".json"
          if (dbFileIds.value[layoutKey.name]) {
            console.log("Changed layout: ", layoutKey.name)
            await persist(dbFileIds.value[layoutKey.name], folderId, file, authToken)
          } else {
            console.log("Not exist on cloud: ", layoutKey.name)
            dbFileIds.value[layoutKey.name] = await persist(null, folderId, file, authToken)
          }

          syncFlag = true
        }
      }
    }

    localStorage.setItem('db_folder_id', folderId)
    localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value))
  }

  // persist layoutKeys if not exist, update if exist
  if (syncFlag) {
    console.log("syncFlag: ", syncFlag)
    const layoutKeyFile = await localStorageDataToBlob("layout_keys");
    if (!dbFileIds.value["layout_keys"]) {
      console.log("Persist layout_keys")
      dbFileIds.value["layout_keys"] = await persist(null, dbFolderId.value, layoutKeyFile, authToken);
      localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value));
    } else {
      console.log("Update layout_keys: ", dbFileIds.value["layout_keys"])
      await persist(dbFileIds.value["layout_keys"], dbFolderId.value, layoutKeyFile, authToken);
    }
  }

  syncingToDrive.value = false;
}

async function doLogout(authToken) {
  await chrome.identity.removeCachedAuthToken({token: authToken});
  fetch(
      'https://accounts.google.com/o/oauth2/revoke?token=' + authToken)
      .then((response) => response.json())
      .then(function (res) {
        localStorage.removeItem('google_token')
        localStorage.removeItem('google_account')
        localStorage.removeItem('db_file_ids')
        localStorage.removeItem('db_folder_id')
        localStorage.setItem('is_synced', "false")
        googleToken.value = null
        googleAccount.value = null
        dbFileId.value = null
        showPassKey.value = false

        // loop through layout keys, set the encrypted flag to false and delete encrypted name
        for (let i = 0; i < layoutKeys.value.length; i++) {
          delete layoutKeys.value[i].encrypted
          delete layoutKeys.value[i].encryptedName
        }
        localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
      });
}

async function logOutGoogle(authToken) {
  if (!confirm("Signing out of your Google account will stop syncing data with Google Drive. Are you sure you want to proceed?")) {
    return;
  }

  await doLogout(authToken)
}

async function loginGoogle() {
  console.log("Login Google")
  loggingIn.value = true
  const is_synced = localStorage.getItem('is_synced')
  let token = await chrome.identity.getAuthToken({interactive: true});
  console.log(token);
  localStorage.setItem('google_token', token.token)
  googleToken.value = token.token

  const res = await fetch('https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: 'Bearer ' + googleToken.value,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      })

  const accountInfo = await res.json()
  console.log(accountInfo)
  // TODO Show permission error for scope
  localStorage.setItem('google_account', accountInfo.email)
  googleAccount.value = accountInfo.email
  loggingIn.value = false
  let folderId = await checkFolderExist(dbFolderName, googleToken.value);
  // if folder is not exist then createFolder
  if (!folderId) {
    folderId = await createFolder(dbFolderName, googleToken.value);
  }

  if (folderId && !(is_synced === "true")) {
    dbFolderId.value = folderId
    localStorage.setItem('db_folder_id', folderId)
  }

  let layoutKeyCloudExist = await checkFileExist("layout_keys.json", googleToken.value);
  console.log("layoutKeyCloudExist: ", layoutKeyCloudExist)
  if (layoutKeyCloudExist) {
    console.log("layoutKeyCloudExist")
    cloudLayoutKeys.value = await getDriveFileContent(layoutKeyCloudExist, googleToken.value)
    dbFileIds.value["layout_keys"] = layoutKeyCloudExist
    localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value))

    if (!is_synced || is_synced === "false") {
      await syncDataFromDrive(googleToken.value);
    }
  }

  if (layoutKeys.value.length > 0 && !(is_synced === "true")) {
    await syncDataToDrive(folderId, googleToken.value)
  }
}


const syncDataFromDrive = async (authToken) => {
  try {
    console.log("syncDataFromDrive")
    syncingFromDrive.value = true

    // Make API request to fetch database data using the authToken
    if (dbFolderId.value) {
      if (cloudLayoutKeys.value.length === 0) {
        console.log("getDriveFileContent")
        let layoutKeyCloudExist = await checkFileExist("layout_keys.json", authToken);
        cloudLayoutKeys.value = await getDriveFileContent(layoutKeyCloudExist, authToken)
        dbFileIds.value["layout_keys"] = layoutKeyCloudExist
        localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value))
        if (cloudLayoutKeys.value.length === 0) return
      }

      // If cloud layout data is not encrypted, local layout data is not encrypted
      // Compare cloudLayoutKeys with layoutKeys base on hash
      const notMatchingElements = cloudLayoutKeys.value.filter(content => {
        const matchingKey = layoutKeys.value.find(key => key.hash === content.hash);
        return !matchingKey; // Return true if no match is found
      });

      // get fileId of matching elements and save to dbFileIds
      for (const matchingElement of cloudLayoutKeys.value) {
        const matchingKey = layoutKeys.value.find(key => key.hash === matchingElement.hash);
        if (matchingKey) {
          console.log("matchingKey: ", matchingKey.name)
          dbFileIds.value[matchingKey.name] = await checkFileExist(matchingElement.name + ".json", authToken)
          console.log("matchingKey fileId: ", dbFileIds.value[matchingKey.name])
        }
      }

      if (notMatchingElements.length > 0) {
        const cloudLayoutFiles = await listFolderJsonFiles(dbFolderId.value, authToken);
        console.log("cloudLayoutFiles", cloudLayoutFiles)
        if (cloudLayoutFiles.length > 0) {
          for (const layoutFile of cloudLayoutFiles) {
            // Check if layoutFile.name is in notMatchingElements
            const layoutFileName = layoutFile.name.replace(".json", "");
            let existOnCloudNotOnLocal = notMatchingElements.find(element => element.name === layoutFileName);
            if (existOnCloudNotOnLocal) {
              // create a clone of existOnCloudNotOnLocal
              existOnCloudNotOnLocal = JSON.parse(JSON.stringify(existOnCloudNotOnLocal));
              console.log(`The layout file ${layoutFileName} is in cloud but not in local. Add it to local storage.`);
              // Check if the layoutFileName is not in local storage
              const nameDuplicate = layoutKeys.value.find(layout => layout.name === layoutFileName);
              // If name is duplicated then change the name of layoutFile
              if (nameDuplicate) {
                existOnCloudNotOnLocal.name += "_cloud";
              }

              let layoutContent = await getDriveFileContent(layoutFile.id, authToken);
              if (!isEncrypt.value) {
                if (existOnCloudNotOnLocal.encrypted === true) {
                  let cloudPasskey = prompt("Enter passkey to decrypt cloud layout data.");
                  console.log("cloudPasskey", cloudPasskey)
                  if (cloudPasskey != null && cloudPasskey !== "") {
                    // let layoutContent = await getDriveFileContent(layoutFile.id, authToken);
                    const decryptResult = await decryptData(layoutContent, cloudPasskey)
                    if (decryptResult.success) {
                      layoutContent = JSON.parse(decryptResult.data);
                      delete existOnCloudNotOnLocal.encrypted
                      delete existOnCloudNotOnLocal.encryptedName
                    } else {
                      alert("Error decrypting layout content, passkey is not correct. Logout now!");
                      console.log(decryptResult)
                      await doLogout(authToken)
                      return
                    }
                  }
                }
              } else {
                if (existOnCloudNotOnLocal.encrypted === true) {
                  // Try to use local passkey to decrypt
                  let decryptResult = await decryptData(layoutContent, passKey.value)
                  if (decryptResult.success) {
                    layoutContent = JSON.parse(decryptResult.data);
                  } else {
                    let cloudPasskey = prompt("Enter passkey to decrypt cloud layout data.");
                    console.log("cloudPasskey", cloudPasskey)
                    if (cloudPasskey != null && cloudPasskey !== "") {
                      console.log(layoutContent)
                      decryptResult = await decryptData(layoutContent, cloudPasskey)
                      console.log(decryptResult)
                      if (decryptResult.success) {
                        layoutContent = JSON.parse(decryptResult.data);
                        console.log("Encrypting layout content")
                        layoutContent = await encryptData(JSON.stringify(layoutContent), passKey.value)
                        existOnCloudNotOnLocal.encrypted = true
                        existOnCloudNotOnLocal.encryptedName = btoa(JSON.stringify(await encryptData(existOnCloudNotOnLocal.name, passKey.value)))
                      } else {
                        alert("Error decrypting layout content, passkey is not correct. Logout now!");
                        console.log(decryptResult)
                        await doLogout(authToken)
                        return
                      }
                    }
                  }
                }
              }

              //Update the hash of existOnCloudNotOnLocal layout with name and layoutContent
              existOnCloudNotOnLocal.hash = await hashString(JSON.stringify(layoutContent) + existOnCloudNotOnLocal.name);
              // Add new layout to the beginning of layout_keys array
              layoutKeys.value.unshift(existOnCloudNotOnLocal);

              localStorage.setItem(existOnCloudNotOnLocal.name, JSON.stringify(layoutContent));
              dbFileIds.value[existOnCloudNotOnLocal.name] = layoutFile.id
            }
          }
        }
      }

      localStorage.setItem("layout_keys", JSON.stringify(layoutKeys.value));
      localStorage.setItem("db_file_ids", JSON.stringify(dbFileIds.value));

      console.log("complete sync from drive");
    }
  } catch (error) {
    console.error("Error syncing data from Google Drive:", error);
  } finally {
    syncingFromDrive.value = false
    localStorage.setItem('is_synced', "true");
  }
};

function generateUserData() {
  const localStorageData = {};
  const layoutKeys = JSON.parse(localStorage.getItem('layout_keys'));
  localStorageData['layout_keys'] = layoutKeys;

  // Loop through layoutKeys to get localStorage data for each layout
  layoutKeys.forEach(layoutKey => {
    localStorageData[layoutKey.name] = JSON.parse(localStorage.getItem(layoutKey.name));
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

// Function to import localStorage data from a JSON file
function importLocalStorage(event) {
  const file = event.target.files[0];
  let importPasskey = passKey.value;
  const reader = new FileReader();
  reader.onload = async () => {
    const localStorageData = JSON.parse(reader.result + "");
    console.log("localStorageData")
    console.log(localStorageData)
    console.log(localStorageData['layout_1'])
    const importLayoutKeys = localStorageData["layout_keys"]

    // Check if import layout data is encrypted and isEncrypt value is false then ask user for passcode to decrypt
    const importLayoutEncrypted = importLayoutKeys.some(layout => layout.encrypted === true);
    if (importLayoutEncrypted) {
      // Try to the first layout encryptedName in layoutKey with passkey
      const firstLayout = importLayoutKeys.find(layout => layout.encrypted === true);
      const decryptedName = await decryptData(JSON.parse(atob(firstLayout.encryptedName)), importPasskey)
      if (!decryptedName.success) {
        const passkey = prompt("Enter passkey to decrypt imported layout data.");
        if (passkey != null && passkey !== "") {
          const decryptedName = await decryptData(JSON.parse(atob(firstLayout.encryptedName)), passkey)
          if (!decryptedName.success) {
            alert("Error decrypting layout content, passkey is not correct. Please try again.");
            return;
          } else importPasskey = passkey
        } else {
          alert("Passkey is required to decrypt imported layout data.");
          return;
        }
      }
    }

    // Loop through localStorageData and set data to localStorage
    for (let localStorageKey of Object.keys(localStorageData)) {
      if (localStorageKey !== 'layout_keys') {
        let layoutContent = localStorageData[localStorageKey];
        if (importLayoutEncrypted) {
          const rs = await decryptData(layoutContent, importPasskey)
          if (!rs.success) {
            alert("Error decrypting layout content, passkey is not correct. Please try again.");
            return;
          }
          layoutContent = rs.data;
        }

        if (isEncrypt.value && passKey.value !== "") {
          // Encrypt layout content with local passkey
          layoutContent = JSON.stringify(await encryptData(JSON.stringify(layoutContent), passKey.value))
        }

        localStorage.setItem(localStorageKey, layoutContent);
      }
    }

    if (!isEncrypt.value) {
      importLayoutKeys.forEach(layout => {
        delete layout.encrypted
        delete layout.encryptedName
      })
    }
    layoutKeys.value = importLayoutKeys;
    localStorage.setItem('layout_keys', JSON.stringify(importLayoutKeys))

    if (googleToken.value && dbFolderId.value) {
      await syncDataToDrive(dbFolderId.value, googleToken.value)
    }

    console.log('LocalStorage data imported successfully.');
  };
  reader.readAsText(file);
}


async function saveLayout() {
  console.log("Save layout:", newLayout.value)
  if (newLayout.value.length > 0) {
    const newLayoutName = "layout_" + newLayout.value
    newLayout.value = ""
    const existInLocalLayout = layoutKeys.value.find(layout => layout.name === newLayoutName);
    if (existInLocalLayout) {
      alert("The layout name '" + newLayoutName + "' already exists. Please specify a different layout name.");
      return;
    }

    let windows = await chrome.windows.getAll({populate: true});
    const numberOfTab = countTabs(windows)

    // Add new layout key
    if (!layoutKeys.value) {
      layoutKeys.value = []
    }

    // Create a hash of the layout content
    const layoutHash = await hashString(JSON.stringify(windows) + newLayoutName);
    let layoutObject = {
      name: newLayoutName,
      createdAt: dayjs().format("DD/MM/YYYY"),
      numberOfTab: numberOfTab,
      hash: layoutHash,
    }

    // if local isEncrypt value is true, encrypt the layout name and set the encrypted flag to true
    if (isEncrypt.value) {
      layoutObject.encrypted = true
      layoutObject.encryptedName = btoa(JSON.stringify(await encryptData(newLayoutName, passKey.value))
      )
      windows = await encryptData(JSON.stringify(windows), passKey.value)
    }

    layoutKeys.value.push(layoutObject);
    localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
    if (googleToken.value && dbFolderId.value) {
      syncingToDrive.value = true
      const file = await localStorageDataToBlob("layout_keys")
      dbFileIds.value["layout_keys"] = await persist(dbFileIds.value["layout_keys"], dbFolderId.value, file, googleToken.value)
    }

    // Add new layout_
    localStorage.setItem(newLayoutName, JSON.stringify(windows))
    if (googleToken.value && dbFolderId.value) {
      // Persist and Save layout file id
      const file = await localStorageDataToBlob(newLayoutName, isEncrypt.value, passKey.value)
      dbFileIds.value[newLayoutName] = await persist(null, dbFolderId.value, file, googleToken.value)
      syncingToDrive.value = false
    }

    localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value))
  } else {
    alert("Please type a name for the layout!");
  }
}

async function clearLayout(layout) {
  const layoutName = layout.name.replace("layout_", "")
  if (!confirm("This will remove layout '" + layoutName + "'!\n It will not be possible to recover it!\n Are you sure?")) {
    return;
  }

  // remove layout key
  const index = layoutKeys.value.indexOf(layout);
  layoutKeys.value.splice(index, 1);
  localStorage.setItem('layout_keys', JSON.stringify(layoutKeys.value))
  if (googleToken.value && dbFolderId.value) {
    syncingToDrive.value = true
    const file = await localStorageDataToBlob("layout_keys")
    dbFileIds.value["layout_keys"] = await persist(dbFileIds.value["layout_keys"], dbFolderId.value, file, googleToken.value)
  }

  // remove layout_
  localStorage.removeItem(layout.name);

  // remove layout id
  const fileId = dbFileIds.value[layout.name]
  if (googleToken.value && fileId) {
    delete dbFileIds.value[layout.name]
    await deleteFile(fileId, googleToken.value)
    localStorage.setItem('db_file_ids', JSON.stringify(dbFileIds.value))
  }
  syncingToDrive.value = false
}

function init() {
  console.log("Init")
  let layoutKeysData = localStorage.getItem('layout_keys')
  let localDbFolderId = localStorage.getItem('db_folder_id')
  let localDbFileIds = localStorage.getItem('db_file_ids')
  let localGoogleToken = localStorage.getItem('google_token')
  let localAccount = localStorage.getItem('google_account')
  let localIsEncrypt = localStorage.getItem('is_encrypt')
  let localPassKey = localStorage.getItem('pass_key')
  if (localIsEncrypt && localIsEncrypt === "true") {
    isEncrypt.value = true
  }
  if (localPassKey && localPassKey !== "") {
    passKey.value = localPassKey
  }

  if (localDbFolderId != null) {
    dbFolderId.value = localDbFolderId;
  }
  if (localDbFileIds != null) {
    dbFileIds.value = JSON.parse(localDbFileIds)
  }
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
  let windows = localStorage.getItem(key)
  windows = JSON.parse(windows);
  if (windows === null)
    return;
  if (isEncrypt.value) {
    const layoutData = await decryptData(windows, passKey.value)
    if (layoutData.success) {
      windows = JSON.parse(layoutData.data)
    } else {
      alert("Error decrypting layout data.")
      return;
    }
  }

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
  developerMode.value = import.meta.env.DEV
  init()
  if (localStorage.getItem('google_token')) {
    await loginGoogle()
  }
  deletable.value = true
})
</script>