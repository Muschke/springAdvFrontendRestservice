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
    hyperlink.href= "detail.html";
    hyperlink.target = "_blank";
    hyperlink.innerText = naam;
    hyperlink.onclick = function () {
        localStorage.setItem("gekozenId", id);
    };
    li.appendChild(hyperlink);
    return li;
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