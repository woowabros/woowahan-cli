module.exports = {
	views: {
		default: {
			IndexJs: require('./views/default/index-js-template.js'),
			IndexHbs: require('./views/default/index-hbs-template.js')
		},
		collection: {
			IndexJs: require('./views/collection/index-js-template.js'),
			IndexHbs: require('./views/collection/index-hbs-template.js'),
			RowItemIndexJs: require('./views/collection/row-item-index-js-template.js'),
			RowItemIndexHbs: require('./views/collection/row-item-index-hbs-template.js')
		},
		export: {
			IndexJs: require('./views/export-js-template.js')	
		}
	},
	reducers: {
		default: { 
			IndexJs: require('./reducers/index-js-template.js')
		},
		export: {
			IndexJs: require('./reducers/export-js-template.js')
		}
	},
	actions: {
		export: {
			IndexJs: require('./actions/export-js-template.js')
		}
	}
};
