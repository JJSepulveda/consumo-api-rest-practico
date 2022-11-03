/*
API_KEY viene de secrets.js
*/


const API_URL = "https://api.themoviedb.org/3"
const IMAGE_URL_W300 = "https://image.tmdb.org/t/p/w300"
const IMAGE_URL_W500 = "https://image.tmdb.org/t/p/w500"

const ENDPOINT_TRENDING = (media_type, time_window) => `/trending/${media_type}/${time_window}`
const ENDPOINT_CATEGORIES = "/genre/movie/list"
const ENDPOINT_DISCOVER = "/discover/movie"
const ENDPOINT_SEARCH = "/search/movie"
const ENPOINT_MOVIE_DETAIL = (movie_id) => `/movie/${movie_id}`
const ENDPOINT_RECOMENDATION = (movie_id) => `/movie/${movie_id}/recommendations`


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
		// agregar un evento de click para que cada pelicula tenga su 
		// hipervinculo al apartado de detalle.
		movieContainer.addEventListener('click', () => {
			location.hash = "#movie=" + movie.id
		})

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
	try
	{
		const { data } = await api(ENDPOINT_TRENDING('movie', 'day'));
		const movies = data.results;
		createMovies(movies, trendingMoviesPreviewList);
	}
	catch(err)
	{
		console.error(err)
	}
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


async function getMoviesBySearch(query) {
	const { data } = await api(ENDPOINT_SEARCH, {
		params: {
			// como nuestro parametor se llama igual que la llave 
			// con poner solo el nombre es mas que suficiente
			query,
		}
	});
	const movies = data.results;

	createMovies(movies, genericSection);
}

async function getMoviesTrendingMovies(query) {
	const { data } = await api(ENDPOINT_TRENDING('movie', 'day'));
	const movies = data.results;

	createMovies(movies, genericSection);
}


async function getMovieById(id) {
	// para cambiarle el nombre a data en la misma linea
	const { data: movie } = await api(ENPOINT_MOVIE_DETAIL(id));

	const movieImgUrl = IMAGE_URL_W500 + movie.poster_path
	console.log(movieImgUrl)
	headerSection.style.background = `
		linear-gradient(
			180deg, 
			rgba(0, 0, 0, 0.35) 19.27%, 
			rgba(0, 0, 0, 0) 29.17%
		),
		url(${movieImgUrl})
	`;
	// createMovies(movies, genericSection);
	movieDetailTitle.textContent = movie.title;
	movieDetailDescription.textContent = movie.overview;
	movieDetailScore.textContent = movie.vote_average;

	createCategories(movie.genres, movieDetailCategoriesList);
	getRelatedMovieById(movie.id);
}


async function getRelatedMovieById(id) {
	const { data } = await api(ENDPOINT_RECOMENDATION(id));
	const relatedMovies = data.results;
	
	console.log(ENDPOINT_RECOMENDATION(id))
	console.log(data)
	createMovies(relatedMovies, relatedMoviesContainer);
}