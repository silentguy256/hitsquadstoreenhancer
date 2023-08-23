// ==UserScript==
// @name         Steam Links for hitsquadgodfather store
// @namespace    http://tampermonkey.net/
// @version      0.2
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

var hidden = GM_SuperValue.get ("hit_hidden", []);

waitForKeyElements ("md-card", perGameFunction);
waitForKeyElements (".side-bar", sidebarFunction);

function sidebarFunction (jNode) {
// Create Buttons
    var c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="Clear";
    c.onclick = function(){GM_deleteValue("hit_hidden");location.reload()};
    jNode[0].appendChild(c);

    
    c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="Export";
    c.onclick = function(){prompt("Hidden games:",GM_getValue("hit_hidden"))};
    jNode[0].appendChild(c);

    
    c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="Import";
    c.onclick = function(){
        let x = prompt("Hidden games:",GM_getValue("hit_hidden"));
        if (x != null && x != "") {
            GM_setValue("hit_hidden",x);
            location.reload();
        }
    };
    jNode[0].appendChild(c);


}
function perGameFunction (jNode) {

    var x = jNode[0].childNodes[7].childNodes[1];

// Create Hide Button    
    var c = document.createElement("button");
    c.className = "md-raised md-primary public-store-buy-button md-button md-dark-theme md-ink-ripple";
    c.innerText="HIDE";
    c.onclick = function(){hideGame(x.innerText);actionFunction2 (jNode)};
    jNode[0].children[2].appendChild(c);

// Delete Tile if hidden
    if (hidden.includes(x.innerText)) jNode[0].remove();

// Modify title to be link    
    x.innerHTML="<a href='https://steamdb.info/search/?a=app&q="+x.innerText+"&type=1&category=0' target='_blank'>"+x.innerText+"</a>";
//    x.innerHTML="<a href='https://store.steampowered.com/search/?term="+x.innerText+"' target='_blank'>"+x.innerText+"</a>";
}

function hideGame(game){
    hidden.push(game);
    GM_SuperValue.set ("hit_hidden", hidden);
}
