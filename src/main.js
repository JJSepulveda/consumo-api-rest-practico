/*
	API_KEY viene de secrets.js
*/


const API_URL = "https://api.themoviedb.org/3"
const IMAGE_URL_W300 = "https://image.tmdb.org/t/p/w300"

const ENDPOINT_TRENDING = (media_type, time_window) => `/trending/${media_type}/${time_window}`
const ENDPOINT_CATEGORIES = "/genre/movie/list"

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'content-type': 'application/json;charset=utf-8'
	},
	params: {
		'api_key': API_KEY
	}
})

const getTrendingMoviesPreview = async () => {
	const { data } = await api(ENDPOINT_TRENDING('movie', 'day'));
	const movies = data.results;

	console.log({data, movies})
	movies.forEach(movie => {
		// crear los elementos html e incertarlos
		const trendingPreviewMoviesContainer = document.querySelector(
			'#trendingPreview .trendingPreview-MovieList'
		)		

		const movieContainer = document.createElement('div');
		movieContainer.classList.add('movie-container');

		const movieImg = document.createElement('img');
		movieImg.classList.add('movie-img');
		movieImg.setAttribute('alt', movie.title);
		movieImg.setAttribute(
			'src', 
			`${IMAGE_URL_W300}${movie.poster_path}`
		);

		movieContainer.appendChild(movieImg)
		trendingPreviewMoviesContainer.appendChild(movieContainer)
	});
}

const getCategoriesPreview = async () => {
	const { data } = await api(ENDPOINT_CATEGORIES);
	const categories = data.genres;

	console.log({data, categories})
	categories.forEach(category => {
		// crear los elementos html e incertarlos
		const categoriesPreviewContainer = document.querySelector(
			'#categoriesPreview .categoriesPreview-list'
		)

		const categoryContainer = document.createElement('div');
		categoryContainer.classList.add('category-container');

		const cateogryTitle = document.createElement('h3');
		cateogryTitle.classList.add('category-title');
		cateogryTitle.setAttribute('id', category.id);
		const categoryTitleText = document.createTextNode(category.name)

		cateogryTitle.appendChild(categoryTitleText)
		categoryContainer.appendChild(cateogryTitle)
		categoriesPreviewContainer.appendChild(categoryContainer)
	});
}



getTrendingMoviesPreview()
getCategoriesPreview()