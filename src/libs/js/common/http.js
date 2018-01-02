
import {loadingData} from '../../../store/data';
import prompt from './prompt';

export default function (type, url, params, succ, async = true, jsonp = false, error) {
	if (jsonp) {
		$.ajax({
			type: type,
			url: url,
			dataType: "jsonp",
			jsonp: 'callback',
			beforeSend: function () {
				loadingData.show = true;
			},
			cache: false,
			data: params,
			success: function (data) {
				succ && succ(data);
				loadingData.show = false;
			},
			error: function () {
				prompt('Server busy! Please refresh again!');
				loadingData.show = false;
				error && error();
			},
			timeout: 30000
		});
	} else {
		$.ajax({
			type: type,
			url: url,
			dataType: "json",
			beforeSend: function () {
				loadingData.show = true;
			},
			data: params,
			async: async,
			success: function (data) {
				succ && succ(data);
				loadingData.show = false;
			},
			error: function () {
				prompt('Server busy! Please refresh again!');
				loadingData.show = false;
				error && error();
			},
			timeout: 30000
		});
	}

};
