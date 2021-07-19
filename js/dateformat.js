//API吐回來統一為DateTime形式
//Format日期 格式錯誤吐回原本的
function formatDateTime_Date(date) {
	var d = date.split("T");
	var ds = date.split(" ");
	if (d.length > 1) return d[0].replace(/\-/g, "/");
	else if (ds.length > 1) return ds[0].replace(/\-/g, "/");
	else return date;
}
//Format日期+時間 格式錯誤吐回原本的
function formatDateTime_Time(date) {
	var d = date.split("T");
	var ds = date.split(" ");
	if (d.length > 1) {
		var t = d[1].split(".");
		return d[0].replace(/\-/g, "/") + " " + t[0];
	}
	else if (ds.length > 1) {
		var t = ds[1].split(".");
		return ds[0].replace(/\-/g, "/") + " " + t[0];
	}
	else
		return date;
}
//Format日期+時間 格式錯誤吐回原本的
function formatDateTime_Time_NonSecond(date) {
	var d = date.split("T");
	var ds = date.split(" ");
	if (d.length > 1) {
		var t = d[1].split(".");
		var dt = t[0].split(":");
		return d[0].replace(/\-/g, "/") + " " + dt[0] + ":" + dt[1];
	}
	else if (ds.length > 1) {
		var t = ds[1].split(".");
		var dt = t[0].split(":");
		return ds[0].replace(/\-/g, "/") + " " + dt[0] + ":" + dt[1];
	}
	else
		return date;
}
//前端取得時間
function GetDateNow()
{
	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();

	var output = d.getFullYear() + "/" +
		(month < 10 ? "0" : "") + month + "/" +
		(day < 10 ? "0" : "") + day + " " + 
		(hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute;
		
	return output;
}