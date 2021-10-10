// ==UserScript==
// @name        Github No Merge Button
// @namespace   github.com
// @description Github merge button remover for SPR based projects
// @include     *://github.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

function doStuff() {
    // PR Merge button
    checkElementThenRun('.merge-message'); 

    // New PR button
    checkElementThenRun("#repo-content-pjax-container > div > div.d-flex.flex-justify-between.mb-md-3.flex-column-reverse.flex-md-row.flex-items-end > div.ml-3.d-flex.flex-justify-between.width-full.width-md-auto");
}

const work = function(selector) {
    let el = document.querySelector(selector);
    if (typeof el !== 'undefined') {
        el.remove();
    }

    if (typeof ran === 'undefined') {
        window.ran = true;
        if (MutationObserver != undefined) {
            const searchEl = document.querySelectorAll(selector);
            if (searchEl.length > 0) {
                new MutationObserver(work).observe(searchEl, {childList: true, subtree: true});
            }
        }
    }
};

const checkElementThenRun = function(selector) {
    if (document.querySelector(selector) == null && window.requestAnimationFrame != undefined) {
        window.requestAnimationFrame(function(){ checkElementThenRun(selector, function() { work(selector); }); });
    } else {
        work(selector);
    }
}

// Hook mouse clicks instead of looping
document.body.addEventListener('click', doStuff, true);

doStuff();