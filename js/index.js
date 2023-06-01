const grid = document.querySelector('.grid')

const characters =  [
    'salada-fresh-de-manga',
    'salada-grao-de-bico',
    'pizza-de-frigideira',
    'panqueca-de-aveia',
    'macarrao-com-brocolis',
    'guaca-mole',
    'granola-caseira',
    'crepioca-de-queijo-com-tomate',
    'brownie-fit',
    'suco-verde-de-abacaxi',
];

const createElement = (tag, className) => {
    /*Função para criar uma div com classe <div class='classNamge'> </div> */
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');
    console.log(`Quantidade de acertos = ${disableCards.length}`)
    if(disableCards.length == 20) {
        alert('Parabéns, você conseguiu')
        
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)

    }

}

const revealCard = ({target}) => {

    /** Veriricar se o card ja foi clicado para não fazer nada, trocar por alguma função */
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }

}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const back = createElement('div', 'face back');
    const front = createElement('div', 'face front');

    /*Criar uma estrutura de divs com pais e filhos das divs, para ficar assim
            <div class="card">
            <div class="face front"></div>
            <div class="face back"></div>
        */

    card.appendChild(front);
    card.appendChild(back);

    /* Para concatenar variável com String, usa-se o ${variável} */
    front.style.backgroundImage = `url('../images/${character}.png')`

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character)
    return card;
}


const loadGame = () => {
    /** Como o jogo da memória precisa de dois arrays com cartas iguais, é duplicado o array de personasgens através do spratch ...characters */
    const duplicateCharacters = [...characters, ...characters];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card) 
    });

}


loadGame();
