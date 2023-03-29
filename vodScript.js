// ==UserScript==
// @name         VOD Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip ads on vod pages
// @author       You
// @include       /^https://(vod|cyfrowa|sport)\.tvp\.pl/*//
// @include       /^https://pilot.wp.pl/*
// @include       /^https://polsatgo.pl/wideo/programy/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvp.pl
// @grant        none
// ==/UserScript==

(async function () {
   "use strict";

   //Functions
   let watcher = null;

   let url = "";

   const startInterval = (fn) =>
      setInterval(() => {
         fn();
      }, 1000);

   const skipAds = () => {
      const ads = document.querySelector('video[title="Advertisement"]');
      if (ads && ads.src) {
         clearInterval(watcher);
         if (!ads.paused && ads.duration) {
            ads.currentTime = ads.duration;
         }
         watcher = startInterval(skipAds);
      }
   };

   const checkURL = () => {
      if (url !== document.URL) {
         url = document.URL;
         console.log(`New url: ${url}`);
         clearInterval(watcher);
         watcher = null;
         watcher = startInterval(skipAds);
      }
   };

   startInterval(checkURL);
})();
