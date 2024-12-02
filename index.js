// ==UserScript==
// @name         AWS Account Alias in Page Title
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Display AWS account alias in the page title
// @author       tehnrd
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function updateTitleWithAccountAlias() {
    const userInfo = getCookieValue("aws-userInfo");

    if (userInfo) {
      const userInfoObj = JSON.parse(decodeURIComponent(userInfo));
      const accountAlias = userInfoObj.alias;

      if (accountAlias && !document.title.includes(accountAlias)) {
        document.title = `[${accountAlias}] ${document.title}`;
      }
    }
  }

  // Run on page load
  updateTitleWithAccountAlias();

  // Observe for changes in the page title or cookies if necessary
  const observer = new MutationObserver(updateTitleWithAccountAlias);
  observer.observe(document.head, { childList: true, subtree: true });

  // Optionally, refresh the account alias periodically
  // setInterval(updateTitleWithAccountAlias, 5000);
})();
