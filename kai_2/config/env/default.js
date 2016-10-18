'use strict';


module.exports = {
	app: {
		title: 'materialDemo',
		description: 'Demo of Angular Material Design',
		keywords: 'MongoDB, Express, AngularJS, Node.js',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions'
};
