var textMessage;
var en =
	"Dear customer, to enhance security, increase speed, and have a better experience, it is necessary to upgrade your device's browser. ({brow_name})";
var fa =
	"مشتری گرامی برای بهبود امنیت، افزایش سرعت، تجربه بهتر، جهت استفاده از این خدمت لازم است مرورگر دستگاه خود را ارتقا دهید. ({brow_name})";

function getQueryStringParams() {
	var queryString = window.location.search.substring(1);
	/**
	 * @type {Record<string, string>}
	 */
	var queryParams = {};
	var paramPairs = queryString.split("&");

	for (var i = 0; i < paramPairs.length; i++) {
		var pair = paramPairs[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = decodeURIComponent(pair[1] || "");

		queryParams[key] = value;
	}

	return queryParams;
}

var queryParams = getQueryStringParams();
var language = queryParams["Lang"];

if (language == "en") {
	textMessage = en;
} else if (language == "fa") {
	textMessage = fa;
} else {
	textMessage = fa;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var $buoop = {
	required: { e: 100, f: 95, o: 100, s: 13, c: 95 },
	insecure: true,
	api: 2024.02,
	no_permanent_hide: true,

	text: {
		msg: " ",
		insecure: " ",
		msgmore: textMessage
	},
	noclose: true
};
function $buo_f() {
	var e = document.createElement("script");
	e.src = "/browserUpdate.js";
	document.body.appendChild(e);
}
try {
	document.addEventListener("DOMContentLoaded", $buo_f, false);
} catch (_e) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	window.attachEvent("onload", $buo_f);
}
