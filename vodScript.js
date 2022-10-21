// ==UserScript==
// @name         VOD Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Skip ads on vod pages
// @author       You
// @include       /^https://(vod|cyfrowa)\.tvp\.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tvp.pl
// @grant        none
// ==/UserScript==

(async function () {
   'use strict';

   //Functions
   const waitForLoad = new Promise((resolve) => {
      const waitInterval = setInterval(() => {
         const startButton = document.querySelector(
            '#app .page-detail__header > .buttons.buttons__group button'
         );
         if (startButton !== null) {
            clearInterval(waitInterval);
            startButton.click();
            resolve();
         }
      }, 500);
   });

   let watcher = null;

   const startInterval = (fn) =>
      setInterval(() => {
         fn();
      }, 200);

   const skipAds = () => {
      const ads = document.querySelectorAll('video')[1];
      if (ads) {
         clearInterval(watcher);
         if (!ads.paused && ads.duration) {
            ads.currentTime = ads.duration;
         }
         watcher = startInterval(skipAds);
      }
   };

   //Execute
   await waitForLoad;
   watcher = startInterval(skipAds);
})();
