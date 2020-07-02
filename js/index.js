
window.addEventListener("load", checkHash);
window.addEventListener("hashchange", updateWindowView);
function checkHash() {
    if (window.location.hash.slice(1)) {
        updateWindowView();
    } else {
        window.location.hash = "#start";
        // userName.style.cssText = 'display: block';
    }
}
function updateWindowView() {
    document.getElementById("main").innerHTML = router[window.location.hash.slice(1)].render();
    try {
        startCardGame();
    } catch (e) {
        console.log("test")
    }
}


const Start = {
    render: () => {
        return `
        <h1>Memory Game</h1>
        <div class="btn">
             <a href="#game"><button id="mainBtn" disabled>Play!</button></a>
        </div>
        <div class="instruction">
               <p>
                  You have to guess the pair of cards using your memory. <br/>
                  Good luck!
               </p>
        </div>`;

    }
};

const End = {
    render: () => {
        return `
        <div class="congrats">
            <h2>Congratulations, ${JSON.parse(window.localStorage.getItem('userScore'))['userName']}!</h2>
            <p>You have won <br/> with ${JSON.parse(window.localStorage.getItem('userScore'))['score']} clicks!</p>
            <p>Come back and try to beat your score!</p>
            <div class="btns">
                <a href=""><button>Exit</button></a>
                <a href="#game"><button>Play again</button></a>
            </div>
        </div>`;
    }
}

const Game = {
    render: () => {
        return `<div id="game"></div>`;
    },
}

const router = {
    start: Start,
    game: Game,
    end: End
}

