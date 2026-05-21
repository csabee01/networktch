var parsed_map = new Map();

// Pull and parse xml from html, store in map
function get_xml(filename) {
	if(parsed_map.get(filename)) {
		return parsed_map.get(filename);
	}
	var source = "#" + filename.replace('/', '-').replace('.', '-');
	xml = $(source).html();
	parsed = $.parseXML(xml);
	parsed_map.set(filename, parsed);
    return parsed;
}

$(document).ready(function () {
	$("#cam_res").change(function () {
		$("#cover_cam_res").val($("#cam_res").val());
	});

	$("#micro_symbol").val(decodeURI('%C2%B5') + "m");

	/*when camera resolusion changed setting the pixel and pitch*/

	$("select#cam_res").change(function () {
		var selectedRes = $(this).val();
		var xml = get_xml("xml/camera.xml");
		var hPixel = $(xml).find('camera[display="' + selectedRes + '"]').attr("hpixels");
		$("input#hor_pix").val(hPixel);
		window.localStorage.setItem("hp", hPixel);

		var vPixel = $(xml).find('camera[display="' + selectedRes + '"]').attr("vpixels");
		$("input#ver_pix").val(vPixel);
		window.localStorage.setItem("vp", vPixel);

		var pixPitch = $(xml).find('camera[display="' + selectedRes + '"]').attr("pitch");

		var pixPitchVal = (pixPitch / 1).toFixed(2);
		$("input#pix_pitch").val(pixPitchVal);
		window.localStorage.setItem("pp", pixPitch);

		var nomSize = $(xml).find('camera[display="' + selectedRes + '"]').attr("nomSize");
		$("select#sensor").val(nomSize);

		//calculate the sensor info and setting
		var hp = hPixel;
		var vp = vPixel;
		var pp = pixPitch;
		var sw = (hp * pp) / 1000;
		var sh = (vp * pp) / 1000;
		var sd = Math.sqrt(sw * sw + sh * sh);

		window.localStorage.setItem("sw", sw);
		window.localStorage.setItem("sh", sh);
		window.localStorage.setItem("sd", sd);

		var swDisplay = ((hp * pp) / 1000).toFixed(2);
		var shDisplay = ((vp * pp) / 1000).toFixed(2);
		var sdDisplay = Math.sqrt(sw * sw + sh * sh).toFixed(2);

		$("input#sen_dia").val(sdDisplay);
		$("input#sen_width").val(swDisplay);
		$("input#sen_height").val(shDisplay);
	});

	/*when sensor size changed setting pixel pitch, sensor diagonal, sensor*/
	$("select#sensor").change(function () {
		var sensor = $(this).val();
		setSensorInfoSensorChange(sensor);
	});

	$("input#hor_pix").keyup(function () {
		$("select#cam_res").val("0");
		var hp = $(this).val();
		setAllInfoHpChange(hp);
	});

	$("input#ver_pix").keyup(function () {
		$("select#cam_res").val("0");
		var vp = $(this).val();
		setAllInfoVpChange(vp);
	});

	$("input#pix_pitch").keyup(function () {
		$("select#cam_res").val("0");
		var pp = $(this).val();
		setAllInfoPpChange(pp);
	});

	$("input#sen_dia").keyup(function () {
		$("select#cam_res").val("0");
		var sd = $(this).val();
		setAllInfoSdChange(sd);
	});

	$("input#sen_width").keyup(function () {
		$("select#cam_res").val("0");
		var sw = $(this).val();
		setAllInfoSwChange(sw);
	});

	$("input#sen_height").keyup(function () {
		$("select#cam_res").val("0");
		var sh = $(this).val();
		setAllInfoShChange(sh);
	});
});

function initialCameraSetting() {
	/*setting camera options*/
	settingDefaultCameraRes(get_xml("xml/factory_default.xml"));
	settingDefaultCameraSensorSize(get_xml("xml/camera.xml"));
}

function settingDefaultCameraRes(default_xml) {
	/*get camera default resolution*/
	var defaultCameraRes = $(default_xml).find("camera").attr("value");
	var currentCameraResObj = $("*").find("p#current_camera_res");
	currentCameraResObj.html(defaultCameraRes);
	window.localStorage.setItem("defaultCameraRes", defaultCameraRes);

	/*dialog camera resolution setting*/
	$("select#cam_res").val(defaultCameraRes);

	/*setting cover camera resolution*/
	$("#cover_cam_res").val($("#cam_res").val());
	var camera_xml = get_xml("xml/camera.xml");
	var hp = $(camera_xml).find('camera[display="' + defaultCameraRes + '"]').attr("hpixels");
	$("input#hor_pix").val(hp);

	var vp = $(camera_xml).find('camera[display="' + defaultCameraRes + '"]').attr("vpixels");
	$("input#ver_pix").val(vp);

	var pp = $(camera_xml).find('camera[display="' + defaultCameraRes + '"]').attr("pitch");
	var pixPitchVal = (pp / 1).toFixed(2);
	$("input#pix_pitch").val(pixPitchVal);

	var sw = ((hp * pp) / 1000).toFixed(2);
	var sh = ((vp * pp) / 1000).toFixed(2);
	var sd = Math.sqrt(sw * sw + sh * sh).toFixed(2);

	$("input#sen_dia").val(sd);
	$("input#sen_width").val(sw);
	$("input#sen_height").val(sh);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

	var resolution = $("input#cover_cam_res").val();

	window.localStorage.setItem("current_resolution", resolution);
	window.localStorage.setItem("current_hp", hp);
	window.localStorage.setItem("current_vp", vp);
	window.localStorage.setItem("current_pp", pp);
	window.localStorage.setItem("current_sd", sd);
	window.localStorage.setItem("current_sw", sw);
	window.localStorage.setItem("current_sh", sh);

	/*get default lens focal length*/
	var defaultLensFocalLength = $(default_xml).find("lensFL").attr("value");
	var currentLensFocalLengthObj = $("*").find("p#current_lens_focal_length");
	currentLensFocalLengthObj.html(defaultLensFocalLength);

}

function settingDefaultCameraSensorSize(xml) {

	var currentCameraRes = window.localStorage.getItem("defaultCameraRes");
	var currentSensorSizeVal = $(xml).find('camera[display="' + currentCameraRes + '"]').attr("nomSize");
	var defaultCameraSensorSizeHtml = "1/" + currentSensorSizeVal + '"';
	var currentSensorSize = $("*").find("p#current_camera_sensor");
	currentSensorSize.html(defaultCameraSensorSizeHtml);

	/*set sensor size select box value*/
	var sensorSelectObj = $("*").find("select#sensor");
	sensorSelectObj.val(currentSensorSizeVal);

	window.localStorage.setItem("current_sensorSize", currentSensorSizeVal);
}

function setSensorInfoSensorChange(data) {
	var xml = get_xml("xml/camera.xml");
	var nomDia = $(xml).find('sensor[value="' + data + '"]').attr("nomDiagonal");
	window.localStorage.setItem("nomDia", nomDia);
	var nomDia = window.localStorage.getItem("nomDia");
	var hp = window.localStorage.getItem("hp");
	var vp = window.localStorage.getItem("vp");
	var pp = window.localStorage.getItem("pp");
	var ratio = hp / vp;
	var sh = (nomDia / Math.sqrt(1 + ratio * ratio)).toFixed(2);
	var sw = (nomDia / Math.sqrt(1 + (1 / (ratio * ratio)))).toFixed(2);
	var sd = (nomDia / 1).toFixed(2);
	var pp = ((sw / hp) * 1000).toFixed(2);

	$("input#sen_dia").val(sd);
	$("input#sen_width").val(sw);
	$("input#sen_height").val(sh);
	var pixPitchVal = pp;
	$("input#pix_pitch").val(pixPitchVal);
	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function setAllInfoHpChange(data) {
	var hp = data;
	var vp = window.localStorage.getItem("vp");
	var pp = window.localStorage.getItem("pp");
	var sh = window.localStorage.getItem("sh");
	var sw = (pp * hp / 1000).toFixed(2);
	var sd = (Math.sqrt(sw * sw + sh * sh)).toFixed(2);
	var resolution = (hp * vp / 1000000).toFixed(1);

	$("input#sen_width").val(sw);
	$("input#sen_dia").val(sd);
	$("#cover_cam_res").val(resolution + "MP");

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function setAllInfoVpChange(data) {
	var vp = data;
	var hp = window.localStorage.getItem("hp");
	var pp = window.localStorage.getItem("pp");
	var sw = window.localStorage.getItem("sw");
	var sh = (pp * vp / 1000).toFixed(2);
	var sd = (Math.sqrt(sw * sw + sh * sh)).toFixed(2);
	var resolution = (hp * vp / 1000000).toFixed(1);

	$("input#sen_height").val(sh);
	$("input#sen_dia").val(sd);
	$("#cover_cam_res").val(resolution + "MP");

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}


function setAllInfoPpChange(data) {
	var pp = data;
	var hp = window.localStorage.getItem("hp");
	var vp = window.localStorage.getItem("vp");
	var sw = (pp * hp / 1000).toFixed(2);
	var sh = (pp * vp / 1000).toFixed(2);
	var sd = (Math.sqrt(sw * sw + sh * sh)).toFixed(2);
	/*var resolution = ( hp * vp / 1000000 ).toFixed(1);*/

	$("input#sen_width").val(sw);
	$("input#sen_height").val(sh);
	$("input#sen_dia").val(sd);
	/*$("#cover_cam_res").val( resolution + "MP" );*/

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function setAllInfoSdChange(data) {
	var sd = data;
	var vp = window.localStorage.getItem("vp");
	var hp = window.localStorage.getItem("hp");
	var sw = window.localStorage.getItem("sw");
	var r = hp / vp;
	var sh = (sd / Math.sqrt(1 + r * r)).toFixed(2);
	var sw = (sd / Math.sqrt(1 + (1 / r) * (1 / r))).toFixed(2);
	var pp = ((sw / hp) * 1000).toFixed(2);
	/*var resolution = ( hp * vp / 1000000 ).toFixed(1);*/

	$("input#sen_height").val(sh);
	$("input#sen_width").val(sw);
	$("input#pix_pitch").val(pp);
	/*$("#cover_cam_res").val( resolution + "MP" );*/

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function setAllInfoSwChange(data) {
	var sw = data;
	var vp = window.localStorage.getItem("vp");
	var hp = window.localStorage.getItem("hp");
	var pp = (sw / hp * 1000).toFixed(2);
	var sh = (pp * vp / 1000).toFixed(2);
	var sd = (Math.sqrt(sw * sw + sh * sh)).toFixed(2);
	/*var resolution = ( hp * vp / 1000000 ).toFixed(1);*/

	$("input#sen_height").val(sh);
	$("input#sen_dia").val(sd);
	$("input#pix_pitch").val(pp);
	/*$("#cover_cam_res").val( resolution + "MP" );*/

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function setAllInfoShChange(data) {
	var sh = data;
	var vp = window.localStorage.getItem("vp");
	var hp = window.localStorage.getItem("hp");
	var pp = (sh / vp * 1000).toFixed(2);
	var sw = (pp * hp / 1000).toFixed(2);
	var sd = (Math.sqrt(sw * sw + sh * sh)).toFixed(2);
	/*var resolution = ( hp * vp / 1000000 ).toFixed(1);*/

	$("input#sen_dia").val(sd);
	$("input#sen_width").val(sw);
	$("input#pix_pitch").val(pp);
	/*$("#cover_cam_res").val( resolution + "MP" );*/

	setSensorSize(sd);

	storageCameraSensorInfo(hp, vp, pp, sd, sw, sh);

}

function storageCameraSensorInfo(hp, vp, pp, sd, sw, sh) {
	window.localStorage.setItem("hp", hp);
	window.localStorage.setItem("vp", vp);
	window.localStorage.setItem("pp", pp);
	window.localStorage.setItem("sd", sd);
	window.localStorage.setItem("sw", sw);
	window.localStorage.setItem("sh", sh);
}

function setSensorSize(data) {
	var xml = get_xml("xml/camera.xml");
	var obj = $(xml).find("sensor");
	for (var i = 0; i < obj.length; i++) {
		var minVal = $(obj[i]).attr("minDiagonal");
		var maxVal = $(obj[i]).attr("maxDiagonal");
		if (minVal <= data && data <= maxVal) {
			var sensorSize = $(obj[i]).attr("value");
			$("select#sensor").val(sensorSize);
			return;
		}
	}
	$("select#sensor").val("custom");

}
