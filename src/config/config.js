import Env from './env';

let config = {
	env: Env,
	env_filename_suffix: {
		'test': '_dev',
		'beta': '',
		'production': ''
	},
	topicAPI: {
		'test': "http://172.31.0.55:2015",
		'beta': "http://appbeta.jollychic.com/Jollychic2.0",
		'production': "http://app.jollychic.com"
	}
};
export default config;