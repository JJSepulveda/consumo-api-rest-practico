/*
API_KEY viene de secrets.js
*/


const API_URL = "https://api.themoviedb.org/3"
const IMAGE_URL_W300 = "https://image.tmdb.org/t/p/w300"

const ENDPOINT_TRENDING = (media_type, time_window) => `/trending/${media_type}/${time_window}`
const ENDPOINT_CATEGORIES = "/genre/movie/list"
const ENDPOINT_DISCOVER = "/discover/movie"

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
		'api_key': API_KEY,
	},
});


// Utils
function createMovies(movies, container)
{
	container.innerHTML = ""

	movies.forEach(movie => {
		
		const movieContainer = document.createElement('div');
		movieContainer.classList.add('movie-container');

		const movieImg = document.createElement('img');
		movieImg.classList.add('movie-img');
		movieImg.setAttribute('alt', movie.title);
		movieImg.setAttribute(
			'src',
			'https://image.tmdb.org/t/p/w300' + movie.poster_path,
			);

		movieContainer.appendChild(movieImg);
		container.appendChild(movieContainer);
	});
}

function createCategories(categories, container)
{
	container.innerHTML = ""
	categories.forEach(category => {
		
		const categoryContainer = document.createElement('div');
		categoryContainer.classList.add('category-container');

		const categoryTitle = document.createElement('h3');
		categoryTitle.classList.add('category-title');
		categoryTitle.setAttribute('id', 'id' + category.id);
		categoryTitle.addEventListener('click', () => {
			// El category.name es para que le sea mas facil al usuario
			// entender la ruta.
			location.hash = `#category=${category.id}-${category.name}`
		})
		const categoryTitleText = document.createTextNode(category.name);

		categoryTitle.appendChild(categoryTitleText);
		categoryContainer.appendChild(categoryTitle);
		container.appendChild(categoryContainer);
	});	
}


// API Requests
async function getTrendingMoviesPreview() {
	const { data } = await api(ENDPOINT_TRENDING('movie', 'day'));
	const movies = data.results;

	createMovies(movies, trendingMoviesPreviewList);
}

async function getCategegoriesPreview() {
	const { data } = await api(ENDPOINT_CATEGORIES);
	const categories = data.genres;

	createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
	const { data } = await api(ENDPOINT_DISCOVER, {
		params: {
			with_genres: id
		}
	});
	const movies = data.results;

	createMovies(movies, genericSection);
}
