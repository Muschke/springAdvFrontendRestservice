"use strict";
const filialenUrl = "http://localhost:8080/filialen";
leesFilialen();

async function leesFilialen() {
    const response = await fetch(filialenUrl);
    if (response.ok) {
        maakHyperlinksMet(await response.json());
    } else {
        technischeFout();
    }
}

function maakHyperlinksMet(filialen) {
    const ul = document.getElementById("filialen");
    for(var filiaal of filialen) {
        ul.appendChild(maakLiMet(filiaal.naam));
    }
}

function maakLiMet(naam) {
    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.href= "#";
    //hyperlink.dataset.url = url;
    //hyperlink.onclick = function () {
    //    leesFiliaalMetUrl(this.dataset.url);
    //};
    li.appendChild(hyperlink);
    return li;
}


/*function maakHyperlinksMet(filialen) {
    const ul = document.getElementById("filialen");
    for (const filiaal of filialen._embedded.filiaalIdNaamList) {
        ul.appendChild(maakLiMet(filiaal.naam, filiaal._links.self.href));
    }
}

function maakLiMet(naam, url) {
    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.innerText = naam;
    hyperlink.href = "#";
    hyperlink.dataset.url = url;
    hyperlink.onclick = function () {
        leesFiliaalMetUrl(this.dataset.url);
    };
    li.appendChild(hyperlink);
    return li;
}*/
function technischeFout() {
    document.getElementById("technischeFout").hidden = false;
}