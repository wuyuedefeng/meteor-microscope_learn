if ( Posts.find().count() === 0) {
	Posts.insert({
		title: 'Introducing Telescope',
		url: 'http://sachagreif.com/introducing-telescope'
	});

	Posts.insert({
		title: 'meteor',
		url: 'http://meteor.com'
	});

	Posts.insert({
		title: 'The meteor Book',
		url: 'http://themeteorbook.com'
	});

};