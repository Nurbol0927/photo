const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

const API_KEY = 'szlg-tX7CWSV_rdkZB1WBkppP2z56E0jPzNRZtDBRVg';

let keyword = '';
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.forEach(result => {
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = result.urls.small;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container');
        imgContainer.appendChild(img);

        const imgLink = document.createElement('a');
        imgLink.href = result.links.html;
        imgLink.target = '_blank';
        imgLink.append(imgContainer);

        searchResult.append(imgLink);
    });

    showMoreBtn.style.display = 'block';
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    clearSearchResults();
    searchImages();
});

showMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    page++;
    searchImages();
});

function clearSearchResults() {
    searchResult.innerHTML = '';
}
