let cardStorage = [
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
]
// отрисовка выбора уровня
function drawLevelChoice() {
    let main = document.getElementById('main');
    let chooseLevel = document.createElement('div');
    chooseLevel.setAttribute("class", "chooseLevel");
    chooseLevel.setAttribute('id','lvl-menu')
    let easyBtn = '<a href="#game"><button id="easyBtn">Easy</button></a>';
    let mediumBtn = '<a href="#game"><button id="mediumBtn">Medium</button></a>';
    let hardBtn = '<a href="#game"><button id="hardBtn">Hard</button></a>';
    chooseLevel.innerHTML = easyBtn;
    chooseLevel.innerHTML += mediumBtn;
    chooseLevel.innerHTML += hardBtn;
    main.after(chooseLevel)
}

// записываем в зависимости от выбранного уровня нужное количество карт в локалсторидж
function lvlMenuStart() {
    let levelMenu = document.getElementById('lvl-menu');

    levelMenu.addEventListener('click', function(){
        let target = event.target;

        if (target.id === 'easyBtn') {
            low();
        } else if (target.id === 'mediumBtn'){
            medium();
        } else if (target.id === 'hardBtn') {
            hard();
        }
    });

    function low () {
        let result = cardStorage.slice(0, 8);
        window.localStorage.setItem("targetCards", JSON.stringify(result));
    }

    function medium () {
        let result = cardStorage.slice(0, 12);
        window.localStorage.setItem("targetCards", JSON.stringify(result));

    }

    function hard () {
        window.localStorage.setItem("targetCards", JSON.stringify(cardStorage));
    }
}
