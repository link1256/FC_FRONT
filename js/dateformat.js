//API吐回來統一為DateTime形式
//Format日期 格式錯誤吐回原本的
function formatDateTime_Date(date) {
	var d = date.split("T");
	if (d.length > 1) return d[0].replace(/\-/g, "/");
	else return date;
}
//Format日期+時間 格式錯誤吐回原本的
function formatDateTime_Time(date) {
	var d = date.split("T");
	if (d.length > 1) {
		var t = d[1].split(".");
		return d[0].replace(/\-/g, "/") + " " + t[0];
	}
	else
		return date;
}