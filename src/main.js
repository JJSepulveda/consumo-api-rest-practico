/*

*/

console.log("Comenzamos...")

const API_URL = "https://api.themoviedb.org/3"
const IMAGE_URL_W300 = "https://image.tmdb.org/t/p/w300"
const API_URL_TRENDING = (media_type, time_window) => `https://api.themoviedb.org/3/trending/${media_type}/${time_window}`
const API_CATEGORIES_URL = API_URL + "/genre/movie/list"

const getTrendingMoviesPreview = async () => {
	console.log(API_URL_TRENDING('movie', 'day') + "?api_key=" + API_KEY)
	const response = await fetch(API_URL_TRENDING('movie', 'day') + "?api_key=" + API_KEY);
	const data = await response.json();
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
	console.log(API_CATEGORIES_URL)
	const response = await fetch(API_CATEGORIES_URL + "?api_key=" + API_KEY);
	const data = await response.json();
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