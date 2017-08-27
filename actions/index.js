export const addToFav = id => ({
	type: 'ADD_TO_FAV',
	id,
});

export const setFavs = favs => ({
	type: 'SET_FAVS',
	favs,
});
