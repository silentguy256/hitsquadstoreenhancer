// ==UserScript==
// @name         Steam Links for hitsquadgodfather store
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @SilentGuy
// @match        https://streamelements.com/hitsquadgodfather/store
// @icon         https://www.google.com/s2/favicons?sz=64&domain=streamelements.com
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      http://userscripts-mirror.org/scripts/source/107941.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==

/*waitForKeyElements (".item-title", actionFunction);

function actionFunction (jNode) {
    jNode[0].innerHTML="<a href='https://steamdb.info/search/?a=app&q="+jNode[0].innerText+"&type=1&category=0' target='_blank'>"+jNode[0].innerText+"</a>";
//    jNode[0].innerHTML="<a href='https://store.steampowered.com/search/?term="+jNode[0].innerText+"' target='_blank'>"+jNode[0].innerText+"</a>";
}
*/

var hidden = GM_SuperValue.get ("hit_hidden", []);

waitForKeyElements ("md-card", actionFunction2);
waitForKeyElements (".side-bar", actionFunction1);

function actionFunction1 (jNode) {
    var c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="Clear";
    c.onclick = function(){GM_deleteValue("hit_hidden");location.reload()};
    jNode[0].appendChild(c);


}
function actionFunction2 (jNode) {
    var x = jNode[0].childNodes[7].childNodes[1];
    var c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="HIDE";
    c.onclick = function(){hideGame(x.innerText);actionFunction2 (jNode)};
//    console.log(c);
    jNode[0].children[2].appendChild(c);
    if (hidden.includes(x.innerText)) jNode[0].remove();
    x.innerHTML="<a href='https://steamdb.info/search/?a=app&q="+x.innerText+"&type=1&category=0' target='_blank'>"+x.innerText+"</a>";
//    jNode[0].innerHTML="<a href='https://store.steampowered.com/search/?term="+jNode[0].innerText+"' target='_blank'>"+jNode[0].innerText+"</a>";
}

function hideGame(game){
    hidden.push(game);
    GM_SuperValue.set ("hit_hidden", hidden);



}
