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
        ul.appendChild(maakLiMet(filiaal.naam, filiaal.id));
    }
}

function maakLiMet(naam, id) {
    const li = document.createElement("li");
    const hyperlink = document.createElement("a");
    hyperlink.href= "#";
    hyperlink.innerText = naam;
    hyperlink.dataset.url = "http://localhost:8080/filialen/" + id;
    hyperlink.onclick = function () {
        leesFiliaalMetUrl(this.dataset.url);
    };
    li.appendChild(hyperlink);
    return li;
}

/*om de aangeklikte filialen te laden*/
async function leesFiliaalMetUrl(url) {
    const response = await fetch(url);
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
}
/* OEF: veld in detail aangeklikte filiaal om omzet up te daten:*/
document.getElementById("omzetWijzigen").onclick = wijzigen;
async function wijzigen() {
    const Filaal = {
        naam:,
        gemeente:,
        omzet: document.getElementById("gewijzigdeOmzet").value,
    };
    try{
        const response = await fetch(filialenUrl,
            {method: "POST", headers: {"content-type": "application/json"},
                body: JSON.stringify(omzetFiliaal)});
        if(response.ok) {
            document.getElementById("technischeFout").hidden = true;
        } else {
            technischeFout();
        }
    } catch {
        technischeFout();
    }
}

/*om filiaal te kunnen toevoegen*/
document.getElementById("toevoegen").onclick = toevoegen;
async function toevoegen() {
    const verkeerdeElementen = document.querySelectorAll("input:invalid");
    for (const element of verkeerdeElementen) {
        document.getElementById(`${element.id}Fout`).hidden = false;
    }
    const correcteElementen = document.querySelectorAll("input:valid");
    for (const element of correcteElementen) {
        document.getElementById(`${element.id}Fout`).hidden = true;
    }
    if (verkeerdeElementen.length === 0) {
        const filiaal = {
            naam: document.getElementById("nieuweNaam").value,
            gemeente: document.getElementById("nieuweGemeente").value,
            omzet: document.getElementById("nieuweOmzet").value
        };
        try {
            const response = await fetch(filialenUrl,
                {method: "POST", headers: {"content-type": "application/json"},
                    body: JSON.stringify(filiaal)});
            if (response.ok) {
                const ul = document.getElementById("filialen");
                const li = maakLiMet(filiaal.naam, response.headers.get("Location"));
                ul.appendChild(li);
                document.getElementById("technischeFout").hidden = true;
            } else {
                technischeFout();
            }
        } catch {
            technischeFout();
        }
    }
}


/*weergeven/verbergen technische fout*/
function technischeFout() {
    document.getElementById("technischeFout").hidden = false;
}