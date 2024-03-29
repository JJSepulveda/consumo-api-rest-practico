/*
Logica de navegación
*/

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

searchFormBtn.addEventListener('click', () => {
	// obtener el valor de busqueda
	const serachValue = searchFormInput.value;
	// cambiar el hash
  	location.hash = '#search=' + serachValue;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
	// location.hash = '#home';
	// vamos a hacer que cuando se de a la flecha
	// regrese a la pagina anterior.
	// location.hash = window.history.back();
	history.back()
});


function navigator()
{
	console.log(location)

	if(location.hash.startsWith('#trends'))
	{
		trendsPage()
	}
	else if (location.hash.startsWith('#search='))
	{
		searchPage()
	}
	else if (location.hash.startsWith('#movie='))
	{
		movieDetailsPage()
	}
	else if (location.hash.startsWith('#category='))
	{
		categoriesPage()
	}
	else
	{
		homePage()
	}

	// cada vez que se "recarge" la pagina
	// quitamos el scroll para que la vista se vea
	// desde el inicio

	//window.scrollTo(0, 0);
	document.body.scrollTop = 10;
	document.documentElement.scrollTop = 10;

}

function homePage() {
	console.log('Home!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.add('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.remove('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.remove('inactive');
	categoriesPreviewSection.classList.remove('inactive');
	genericSection.classList.add('inactive');
	movieDetailSection.classList.add('inactive');

	getTrendingMoviesPreview();
	getCategegoriesPreview();
}

function categoriesPage() {
	console.log('categories!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	const [_, id_name] = location.hash.split('=') // ['#category', 'id-name']
	const [categoryId, categoryName] = id_name.split('-')

	headerCategoryTitle.innerHTML = categoryName

	getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
	console.log('Movie!!');

	headerSection.classList.add('header-container--long');
  // headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('=') // ['#movie', 'id-movie']
  getMovieById(movieId);
}

function searchPage() {
	console.log('Search!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	// logica para buscar la pelicula
	const [_, query] = location.hash.split('=') // ['#search', 'searchValue']
	
	getMoviesBySearch(query);
}

function trendsPage() {
	console.log('TRENDS!!');

	headerSection.classList.remove('header-container--long');
	headerSection.style.background = '';
	arrowBtn.classList.remove('inactive');
	arrowBtn.classList.remove('header-arrow--white');
	headerTitle.classList.add('inactive');
	headerCategoryTitle.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');

	headerCategoryTitle.innerHTML = 'Tendencias'

	// petición las pelituclas e ntendencias
	getMoviesTrendingMovies()
}