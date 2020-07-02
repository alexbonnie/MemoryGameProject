// создаём массив с данными для карт

const cardsData = [
    {
        name: 'one',
        img: 'img/1.png',
    },
    {
        name: 'two',
        img: 'img/2.png',
    },
    {
        name: 'three',
        img: 'img/3.png',
    },
    {
        name: 'four',
        img: 'img/4.png',
    },
    {
        name: 'five',
        img: 'img/5.png',
    },
    {
        name: 'six',
        img: 'img/6.png',
    },
    {
        name: 'seven',
        img: 'img/7.png',
    },
    {
        name: 'eight',
        img: 'img/8.png',
    },
    {
        name: 'nine',
        img: 'img/9.png',
    },
    {
        name: 'ten',
        img: 'img/10.png',
    },
    {
        name: 'eleven',
        img: 'img/11.png',
    },
    {
        name: 'twelve',
        img: 'img/12.png',
    },
    {
        name: 'thirteen',
        img: 'img/13.png',
    },
    {
        name: 'fourteen',
        img: 'img/14.png',
    },
    {
        name: 'fifteen',
        img: 'img/15.png',
    },
    {
        name: 'sixteen',
        img: 'img/16.png',
    }
];








// описываем функцию запуска игры
function startCardGame() {
    // view
    let gameGrid = cardsData.concat(cardsData);

    //перемешиваем карты
    gameGrid.sort(() => 0.5 - Math.random());

    const game = document.getElementById('game');
    const grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    // создаём карты
    gameGrid.forEach(item => {

        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.img})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    })


    // модель данных
    const model = {
        firstGuess: '',
        secondGuess: '',
        count: 0,
        delay: 500,
        clicks: 0,
        previousTarget: null,

         // проверка совпадения
        match () {
            let selected = document.querySelectorAll('.selected');
            selected.forEach(card => {
                card.classList.add('match');
            })
            if (document.querySelectorAll('.match').length === (cardsData.length * 2)) {

                let finalScore = JSON.parse(window.localStorage.getItem('userScore'));
                finalScore['score'] = model.clicks;
                window.localStorage.setItem('userScore', JSON.stringify(finalScore))
                window.location.hash = "#end";
                updateWindowView();
                //location.reload();
            }
        }
    }

    //переворачиваем карты, если они не совпали
    const view = {
        resetGuesses () {
            let selected = document.querySelectorAll('.selected');
            selected.forEach(card => {
                card.classList.remove('selected');
            });
        }
    }

    //controller
    grid.addEventListener('click', event => {

        let music = new Audio();
        game.append(music);
        music.src = './sounds/sound.mp3';
        music.play();

        let clicked = event.target;

        if (
            clicked.nodeName === 'SECTION' ||
            clicked === model.previousTarget ||
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }

        if (model.count < 2) {
            model.count++;
            if (model.count === 1) {
                model.firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                model.secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }

            ++model.clicks;

            if (model.firstGuess && model.secondGuess) {
                if (model.firstGuess === model.secondGuess) {
                    setTimeout(model.match, model.delay);
                }
                setTimeout(view.resetGuesses, model.delay);
                model.count = 0;
                model.firstGuess = '';
                model.secondGuess = '';
            }
            model.previousTarget = clicked;
        }
    });
}