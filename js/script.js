// описываем функцию запуска игры
function startCardGame() {
    // создаём массив с данными для карт
    let cardsData = JSON.parse(window.localStorage.getItem('targetCards'));
    let gameGrid = cardsData.concat(cardsData);

    //перемешиваем карты
    gameGrid.sort(() => 0.5 - Math.random());

    let game = document.querySelector('#main');
    let grid = document.createElement('section');
    grid.setAttribute('class', 'grid');

    // задаём порядок отображения гридам
    if (gameGrid.length == 24) {
        grid.style.cssText = 'grid-template-columns: repeat(6, 1fr); width: 1000px;';
    } else if (gameGrid.length == 32) {
        grid.style.cssText = 'grid-template-columns: repeat(8, 1fr); width: 1200px;';
    }

    game.before(grid);

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
    });

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
            });
            // если карты совпали, убираем их из вью
            if (document.querySelectorAll('.match').length === (cardsData.length * 2)) {
                // записываем клики в локалсторидж
                let users = JSON.parse(window.localStorage.getItem('userScore'));
                users[users.length - 1].score = model.clicks;
                window.localStorage.setItem('userScore', JSON.stringify(users));
                document.querySelector('section').remove();
                window.location.hash = "#end";
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
        // не даёт выбрать уже открытую карту или исчезнувшую
        if (
            clicked.nodeName === 'SECTION' ||
            clicked === model.previousTarget ||
            clicked.parentNode.classList.contains('selected') ||
            clicked.parentNode.classList.contains('match')
        ) {
            return;
        }
        // открыть только две карты
        if (model.count < 2) {
            model.count++;
            // если количество выбранных карт равно 1, переворачиваем вторую, иначе возвращаем исходное положение
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
