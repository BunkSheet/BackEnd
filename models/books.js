var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//Todo is the model
var Books  = mongoose.model('Books',{
	kind: {
		type: 'String'
	},
	id: {
		type: 'String'
	},
	etag: {
		type: 'String'
	},
	selfLink: {
		type: 'String'
	},
	volumeInfo: {
		title: {
			type: 'String'
		},
		authors: {
			type: [
				'String'
			]
		},
		publisher: {
			type: 'String'
		},
		publishedDate: {
			type: 'Date'
		},
		description: {
			type: 'String'
		},
		industryIdentifiers: {
			type: [
				'Mixed'
			]
		},
		readingModes: {
			text: {
				type: 'Boolean'
			},
			image: {
				type: 'Boolean'
			}
		},
		pageCount: {
			type: 'Number'
		},
		printType: {
			type: 'String'
		},
		categories: {
			type: [
				'String'
			]
		},
		averageRating: {
			type: 'Number'
		},
		ratingsCount: {
			type: 'Number'
		},
		maturityRating: {
			type: 'String'
		},
		allowAnonLogging: {
			type: 'Boolean'
		},
		contentVersion: {
			type: 'String'
		},
		imageLinks: {
			smallThumbnail: {
				type: 'String'
			},
			thumbnail: {
				type: 'String'
			}
		},
		language: {
			type: 'String'
		},
		previewLink: {
			type: 'String'
		},
		infoLink: {
			type: 'String'
		},
		canonicalVolumeLink: {
			type: 'String'
		}
	},
	saleInfo: {
		country: {
			type: 'String'
		},
		saleability: {
			type: 'String'
		},
		isEbook: {
			type: 'Boolean'
		}
	},
	accessInfo: {
		country: {
			type: 'String'
		},
		viewability: {
			type: 'String'
		},
		embeddable: {
			type: 'Boolean'
		},
		publicDomain: {
			type: 'Boolean'
		},
		textToSpeechPermission: {
			type: 'String'
		},
		epub: {
			isAvailable: {
				type: 'Boolean'
			}
		},
		pdf: {
			isAvailable: {
				type: 'Boolean'
			}
		},
		webReaderLink: {
			type: 'String'
		},
		accessViewStatus: {
			type: 'String'
		},
		quoteSharingAllowed: {
			type: 'Boolean'
		}
	},
	searchInfo: {
		textSnippet: {
			type: 'String'
		}
	}
});

module.exports = {
 Books
};
