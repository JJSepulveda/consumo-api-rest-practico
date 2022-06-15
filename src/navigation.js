/*
Logica de navegación
*/

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator()
{
	console.log(location)

	if(location.hash.startsWith('#trends'))
	{
		trendsPage()
	}
	else if (location.hash.startsWith('#'))
	{
		searchPage()
	}
	else if (location.hash.startsWith('#movie='))
	{
		movieDetailPage()
	}
	else if (location.hash.startsWith('#category='))
	{
		categoryPage()
	}
	else
	{
		homePage()
	}
}

function homePage()
{
	console.log('Home!!')	
}

function categoryPage()
{
	console.log('categories!!')
}

function movieDetailPage()
{
	console.log('Movies!!')
}

function searchPage()
{
	console.log('Search!!')
}

function trendsPage()
{
	console.log('TRENDS!!')
}