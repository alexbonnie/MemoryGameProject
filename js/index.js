window.addEventListener("load", checkHash);
window.addEventListener("hashchange", updateWindowView);
function checkHash() {
    if (window.location.hash.slice(1)) {
        updateWindowView();
    }
    else {
        window.location.hash = "#start";
    }
}

function updateWindowView() {
    document.getElementById("main").innerHTML = router[window.location.hash.slice(1)].render();
}

const Start = {
    render: () => {
        removeLevelMenuFromView();
        removeUserInfoFromView();
        removeCardGridFromView();
        removeHistoryFromView();
        getUserInfo();
        return `
        <h1>Memory Game</h1>
        <div class="btn">
             <a href="#level"><button id="mainBtn" disabled>Play!</button></a>
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
        removeLevelMenuFromView();
        removeUserInfoFromView();
        removeCardGridFromView();
        removeHistoryFromView();

        let gameScore = JSON.parse(window.localStorage.getItem('userScore'));
        let userName = gameScore[gameScore.length - 1].userName;
        let userGameScore = gameScore[gameScore.length - 1].score;

        return `
        <div class="congrats">
            <h2>Congratulations, ${userName}!</h2>
            <p>You have won <br/> with ${userGameScore} clicks!</p>
            <p>Come back and try to beat your score!</p>
            <div class="btns">
                <a href="#start"><button>Exit</button></a>
                <a href="#history"><button>Scores</button></a>
                <a href="#level"><button>Play again</button></a>
            </div>
        </div>`;
    }

};

const History = {
    render: () => {
        removeLevelMenuFromView();
        removeHistoryFromView();
        removeCardGridFromView();
        removeUserInfoFromView();

        let story = JSON.parse(window.localStorage.getItem('userScore'));
        let historyWrapper = document.createElement('div');
        historyWrapper.setAttribute('id', 'historyWrapper');
        let historyTable = document.createElement('ol');

        // если в локалсторидж больше пяти игроков, то выводим последние пять
        if (story.length > 5) {
            for (let i = 0; i < 5; i++) {
                let user = story.pop();
                historyTable.innerHTML += `<li><b>Player:</b> <i>${user.userName}</i> <b>Score:</b> <i>${user.score}</i></li>`;
            }
        } else {
            story.forEach((element) => {
                historyTable.innerHTML += `<li><b>Player:</b> <i>${element['userName']}</i> <b>Score:</b> <i>${element['score']}</i></li>`;
            })
        }

        main.after(historyWrapper);
        historyWrapper.appendChild(historyTable);
        return `            
            <div class="scoresLastBtn">
                <a href="#end"><button>Back</button></a>
            </div>`;
    }
}
const Game = {
    render: () => {
        removeCardGridFromView();
        removeHistoryFromView();
        removeLevelMenuFromView();
        startCardGame();
        return ''; // чтобы не возвращалось undefined
    }
};

const ChooseLevel = {
    render: () => {
        removeLevelMenuFromView();
        removeHistoryFromView();
        removeUserInfoFromView();
        removeCardGridFromView();
        drawLevelChoice();
        lvlMenuStart();
        return '';
    }
};

const router = {
    start: Start,
    level: ChooseLevel,
    game: Game,
    end: End,
    history: History
}
