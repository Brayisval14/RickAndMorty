
const url = 'https://rickandmortyapi.com/api/character/';
const container = document.querySelector('.container');
const details = document.querySelector('.details');
const content = document.querySelector('.content');
const backBtn = document.getElementById('back');
const title = document.getElementById('title');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let lastCharacters = [];


const createCard = (character) => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
        <img src="${character.image}">
        <h2>${character.name}</h2>
        <button class="btn" data-id="${character.id}">ID</button>
    `;
    return div;
};


const renderCharacters = (characters) => {
    container.innerHTML = '';
    characters.forEach(c => container.appendChild(createCard(c)));
};


const loadCharacters = () => {
    const page = Math.ceil(Math.random() * 42);

    fetch(url + '?page=' + page)
        .then(res => res.json())
        .then(data => {
            lastCharacters = data.results;
            renderCharacters(lastCharacters);
        });
};


const searchCharacter = () => {
    const value = searchInput.value.trim().toLowerCase();
    if (!value) return renderCharacters(lastCharacters);

    const filtered = lastCharacters.filter(c =>
        c.name.toLowerCase().includes(value)
    );

    renderCharacters(filtered);
};


const showDetails = (id) => {
    fetch(url + id)
        .then(res => res.json())
        .then(character => {
            content.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}">
                <p>Status: ${character.status}</p>
                <p>Species: ${character.species}</p>
                <p>Gender: ${character.gender}</p>
            `;

            container.style.display = 'none';
            details.style.display = 'block';
            title.textContent = 'Detalle';

            history.pushState({ id }, '', #character-${id});
        });
};


container.addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
        showDetails(e.target.dataset.id);
    }
});

searchBtn.addEventListener('click', searchCharacter);

searchInput.addEventListener('keyup', e => {
    if (e.key === 'Enter') searchCharacter();
});

backBtn.addEventListener('click', () => history.back());

window.addEventListener('popstate', () => {
    details.style.display = 'none';
    container.style.display = 'grid';
    title.textContent = 'Personajes';
});


loadCharacters();