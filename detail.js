"use strict";
const filiaalUrl = "http://localhost:8080/filialen/";
const gekozenId = localStorage.getItem("gekozenId");
leesFiliaalUrl();

/*om de aangeklikte filialen te laden*/
async function leesFiliaalUrl() {
    const response = await fetch(filiaalUrl + gekozenId);
    if (response.ok) {
        toonDetailVan(await response.json());
    } else {
        technischeFout();
    }
}

function toonDetailVan(filiaal) {
    document.getElementById("id").innerText = filiaal.id;
    document.getElementById("naam").innerText = filiaal.naam;
    document.getElementById("gemeente").innerText = filiaal.gemeente;
    document.getElementById("omzet").innerText = filiaal.omzet;
    /* OEF: veld in detail aangeklikte filiaal om omzet up te daten:*/
    document.getElementById("vakMetOmzet").hidden = false;
    var omzetWijzigenButton = document.getElementById("omzetWijzigen");
    omzetWijzigenButton.onclick = function () {
        wijzigen(filiaal);
    }
    //document.getElementById("omzetWijzigen").onclick = wijzigen(filiaal);
    //document.getElementById("omzetWijzigen").dataset.url = "http://localhost:8080/filialen/" + filiaal.id;
}

async function wijzigen(filiaal) {
    //want ja ik moet request doen naar http://localhost:8080/filialen/{{id}}
    //var test = document.getElementById("omzetWijzigen");
    var urlWijzigenButton = "http://localhost:8080/filialen/" + filiaal.id;
    //console.log(urlWijzigenButton);

    //hoe en welke record moet worden gewijzigd
    const filiaalUpdate = {
        id: filiaal.id,
        naam: filiaal.naam,
        gemeente: filiaal.gemeente,
        omzet: document.getElementById("gewijzigdeOmzet").value,
    };
    try{
        const response = await fetch(urlWijzigenButton,
            {method: "PUT", headers: {"content-type": "application/json"},
                body: JSON.stringify(filiaalUpdate)});
        if(response.ok) {
            document.getElementById("technischeFout").hidden = true;
            document.getElementById("omzet").innerText = document.getElementById("gewijzigdeOmzet").value;
            document.getElementById("gewijzigdeOmzet").value = "";
        } else {
            technischeFout();
        }
    } catch {
        technischeFout();
    }

}

function technischeFout() {
    document.getElementById("technischeFout").hidden = false;
}