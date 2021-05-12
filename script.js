var prviPotez = 2;                                  // potez prvog igrača u newGame()
var igracNaPotezu ;                                // igrač koji je na potezu 

var scoreIgrac1 = 0;                                // score igrača 1
var scoreIgrac2 = 0;                               // score igrača 2


// funkcija za generiranje karti
function stvaranjeKarti() {
    
    const arr = [];
    const brojRedova = 5;            //matrica (i i j)



    for (i = 1; i <= brojRedova; i++) {
        for (j = 1; j <= brojRedova; j++) {                                  //MATRICA
            arr.push({                                                       //funkcija push() implementirana pomoću w3schools
                value: Math.floor(Math.random() * (10) + 1),
                count: i + j,
            })
        }
    } 

    var arrSmjesko = []; 
    for (var i = 0; i < 4; i++) {                                                               //SMJEŠKO
        var randomBr = Math.floor(Math.random() * (24 - 1) + 1)
        if (!arrSmjesko.includes(randomBr)) {
            arrSmjesko.push(randomBr)
        } else {
            i - 1
        }
    }

    var arrLjutko = [];
    for (var i = 0; i < 4; i++) {
        var randomBr1 = Math.floor(Math.random() * (24 - 1) + 1)                                     //LJUTKO
        if (!arrSmjesko.includes(randomBr1) && !arrLjutko.includes(randomBr1)) {
            arrLjutko.push(randomBr1)
        } else {
            i - 1
        }
    }

    arr.forEach((item, i) => {
        if (arrSmjesko.includes(i)) {                                          // u ovom dijelu funkcije smješka predstavlja broj 1000
            arr[i] = {
                ...item,
                value: 1000,
            }
        } else if (arrLjutko.includes(i)) {                                   // ljutka predstavlja broj 0
            arr[i] = {
                ...item,
                value: 0,

            }
        } else {
            arr[i]
        }

    })

    var CurrentDiv = document.getElementById("wrapper")

    CurrentDiv.innerHTML = arr.map(function (a, i) {                 // prevrtanje karti urađeno pomoću: https://www.101computing.net/flip-cards-in-html-css-javascript/
        return `<div id="${i}" class="flip-card" onclick="cardClick(${i}, ${a.value})">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="rhcp.png" alt="Avatar">
                        </div>
                        <div class="flip-card-back">
                            <h1 id="broj">${a.value}</h1>
                        </div>
                    </div>
                </div>`
    }).join("")
}

function novaIgra(prviPotez) {
    // defaultni parametri //
    scoreIgrac1 = 0;
    scoreIgrac2 = 0;
    if (prviPotez == 1) {
        prviPotez = 2
    }
    if (prviPotez == 2) {
        prviPotez = 1
    }
    if (prviPotez == 1) {
        igracNaPotezu = true;
    }
    else if (prviPotez == 2) {
        igracNaPotezu = false;
    }
    stvaranjeKarti();
}

function cardClick(id, value) {
    var card = document.getElementById(id);
    if (igracNaPotezu) {
        switch (value) {
            case 1000: {
                scoreIgrac1 = scoreIgrac1 * 2;                                 // sabiranje rezultata , smješko ili ljutko
                break;
            }
            case 0: {
                scoreIgrac1 = scoreIgrac1 * 0;
                break;
            }

            default: {
                scoreIgrac1 = scoreIgrac1 + value;
            }


        }
    }
    else {
        switch (value) {
            case 1000: {
                scoreIgrac2 = scoreIgrac2 * 2;
                break;
            }
            case 0: {
                scoreIgrac2 = scoreIgrac2 * 0;
                break;
            }

            default: scoreIgrac2 = scoreIgrac2 + value;

        }
    }

    document.getElementById("p1").innerHTML = scoreIgrac1;
    document.getElementById("p2").innerHTML = scoreIgrac2;

    if (scoreIgrac1 > 49) {
        gameOver("Player 1")
    }
    if (scoreIgrac2 > 49){
        gameOver("Player 2")
    }

    igracNaPotezu = !igracNaPotezu

    card.setAttribute("class", "flip-card-click flip-card");
    setTimeout(() => {
        card.setAttribute("class", "flip-card");
    }, 700)

    setTimeout(() => {
        stvaranjeKarti();
    }, 1300)
}
                                                                                                           
function gameOver(winner) {

    document.getElementById("winner_txt").innerHTML = winner;
    document.getElementById("game_over").style.display = "block";
    document.getElementById("wrapper").style.display = "none";    
}
function hideGO() {
    document.getElementById("wrapper").style.display = "flex";
    document.getElementById("game_over").style.display = "none";
    document.getElementById("p1").innerHTML = "0";
    document.getElementById("p2").innerHTML = "0";
}