var image_res_1000;
var image_res_400;
var image_res_120;
var image_res_40;
var image_res_12;
var images;
var background_img;
var mask_img;

$(document).ready(function () {
	var objLi = $("*").find("ul.nav.nav-tabs").find("li");

	for (var i = 0; i < objLi.length; i++) {
		objLi[i].onclick = addClass;
	}

	var objResultView = $("*").find("ul#result_view").find("li");

	for (var i = 0; i < objResultView.length; i++) {
		objResultView[i].onclick = addClassResult;
	}

	var objCameraSetting = document.getElementById("camera_setting");
	objCameraSetting.onclick = settingCameraParam;

	var objLensSetting = document.getElementById("lens_setting");
	objLensSetting.onclick = settingLensParam;

	$("#help_button").click(function(e) {
		e.preventDefault();
		helpBox();
	});

	$('.close_help').click(function(e) {
		e.preventDefault();
		closeHelp();
	})

	$("p#sub_menu_show").click(function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$("div#setting_cover").fadeOut("fast");
			hideCover();

		} else {
			$(this).addClass("active");
			$("div#setting_cover").fadeIn("fast");
			showCover();
		}
	});

	$("select#unit_change").change(function () {
		var symbol = this.options[this.options.selectedIndex].getAttribute("sign");
		$("p#symbol").html(symbol);
		$("p#value").html($(this).val());
	});

	//get all images from xml and setting left menu
	var image_xml = get_xml("xml/appPictures.xml");
	var selected_index;
	var image_names = new Array();
	images = $(image_xml).find("application");
	for (var i = 0; i < images.length; i++) {
		if ($(images[i]).attr("selected") == "1") {
			selected_index = i;
		}

		image_names.push($(images[i]).attr("display"));
	}

	//append left image menu setting
	for (var i = 0; i < image_names.length; i++) {
		var append_obj = "<option value='" + i + "'>" + image_names[i] + "</option>";
		$("#image_change").append(append_obj);
	}

	$("#image_change").val(selected_index);

	image_res_1000 = $(images[selected_index]).find("resolution_images").find("resImage").eq(0).attr("file");
	image_res_400 = $(images[selected_index]).find("resolution_images").find("resImage").eq(1).attr("file");
	image_res_120 = $(images[selected_index]).find("resolution_images").find("resImage").eq(2).attr("file");
	image_res_40 = $(images[selected_index]).find("resolution_images").find("resImage").eq(3).attr("file");
	image_res_12 = $(images[selected_index]).find("resolution_images").find("resImage").eq(4).attr("file");

	window.localStorage.setItem("srcResolution", image_res_40);

	window.localStorage.setItem("applicationName", image_names[selected_index]);

	background_img = $(images[selected_index]).find("background_image").find("bkgImage").attr("file");
	mask_img = $(images[selected_index]).find("FOV_image").find("FOVImage").attr("file");

	src_background = "img/" + background_img;
	src_mask = "img/" + mask_img;
	$("#background").attr("src", src_background);
	$("#mask").attr("src", src_mask);
	$("#img_preview").attr("src", src_mask);
	/*initial image resolution draw*/
	getInitialImageSrcAndDraw();
	/*menu image preview setting*/
	changePreviewImg();

	//camera resolution dropbox initial setting
	var camera_xml = get_xml("xml/camera.xml");
	var resolutions = $(camera_xml).find("camera").find("camera");
	for (var i = 0; i < resolutions.length; i++) {
		var append_obj = "<option value='" + $(resolutions[i]).attr("display") + "'>" + $(resolutions[i]).attr("display") + "</option>";
		$("select#cam_res").append(append_obj);

		/*xml parsing section*/
		initialCameraSetting();
	}

	//camera sensor dropbox initial setting
	var sensors = $(camera_xml).find("sensor").find("sensor");
	for (var i = 0; i < sensors.length; i++) {
		var append_obj;
		if (i == sensors.length - 1) {
			append_obj = "<option value='" + $(sensors[i]).attr("value") + "'>" + $(sensors[i]).attr("display") + "</option>";
		} else {
			append_obj = "<option value='" + $(sensors[i]).attr("value") + "'>" + $(sensors[i]).attr("display") + '"' + "</option>";
		}

		$("select#sensor").append(append_obj);

		/*xml parsing section*/
		initialCameraSetting();
	}

	//lenses dropbox initial setting
	var lens_xml = get_xml("xml/lenses.xml");
	var lenses = $(lens_xml).find("lens");
	for (var i = 0; i < lenses.length; i++) {
		var append_obj = "<option value='" + $(lenses[i]).attr("value") + "'>" + $(lenses[i]).attr("display") + "</option>";

		$("select#lens_type").append(append_obj);

		/*xml parsing section*/
		settingDefaultLens();
	}


	//unit dropbox initial setting
	var unit_xml = get_xml("xml/units.xml");
	var units = $(unit_xml).find("units");
	for (var i = 0; i < units.length; i++) {
		var append_obj = "<option value='" + $(units[i]).attr("conversion") + "'" + ($(units[i]).attr("symbol") == 'ft' ? 'selected' : '') + " sign='" + $(units[i]).attr("symbol") + "'>" + $(units[i]).attr("name") + "</option>";

		$("select#unit_change").append(append_obj);
	}
});


function closeSettingDia() {
	changeImage();
	changeUnit();
	translate();
	$("div#setting_cover").fadeOut("fast");
	$("p#sub_menu_show").removeClass("active");
	hideCover();
}

function addClass(e) {
	$("*").find("ul.nav.nav-tabs").find("li").each(function () {
		$(this).removeClass("active");
	});
	$(this).addClass("active");
	$("*").find("div#tab-content").find("div.tab-pane").each(function () {
		$(this).removeClass("active");
	});
	var toDisplay = $(this).find("a.display_div").get(0).getAttribute("data-tab");
	var toDisplayDiv = document.getElementById(toDisplay);
	$(toDisplayDiv).addClass("active");
}

function addClassResult(e) {
	$("*").find("ul#result_view").find("li").each(function () {
		$(this).removeClass("active");
	});
	$(this).addClass("active");
	$("*").find("div#tab-content1").find("div.tab-pane").each(function () {
		$(this).removeClass("active");
	});
	var toDisplay = $(this).find("a.display_div").get(0).getAttribute("data-tab");
	var toDisplayDiv = document.getElementById(toDisplay);
	$(toDisplayDiv).addClass("active");
}

function settingCameraParam() {
	initialCameraDialogSettings();
	showCover();
	$("#camera_setting_dialog").fadeIn("fast");
}

function settingLensParam() {
	showCover();
	$("#lens_setting_dialog").fadeIn("fast");
	saveLensParams();

	var imageFov = window.localStorage.getItem("imageFov");
}

function helpBox() {
	showCover();
	$("#help_dialog").fadeIn("fast");
}

function closeHelp() {
	hideCover();
	$("#help_dialog").fadeOut("fast");
}

function showCover() {
	$("#cover").fadeIn("fast");
}

function hideCover() {
	$("#cover").fadeOut("fast");
}

function saveCameraParam() {
	$("p#current_camera_res").html($("input#cover_cam_res").val());
	var sensor = document.getElementById("sensor");
	var sensorHtml = sensor.options[sensor.options.selectedIndex].text;
	$("p#current_camera_sensor").html(sensorHtml);

	currentValSave();

	var unit = window.localStorage.getItem("unit");

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	updateCameraConfiguration();

	var objDistance = window.localStorage.getItem("objDistance");
	var imageResolution = window.localStorage.getItem("imageResolution");
	var imageFov = window.localStorage.getItem("imageFov");

	var objDistanceDisplay = (objDistance * unit).toFixed(0);
	var imageResolutionDisplay = (imageResolution / unit).toFixed(0);
	var imageFovDisplay = (imageFov * unit).toFixed(0);

	$("input#distance").val(objDistanceDisplay);

	$("input#img_res").val(imageResolutionDisplay);
	/*$("input#txtImageRes").val(imageResolutionDisplay + " pix/ft");*/
	$("input#txtImageRes").val(imageResolutionDisplay);
	$("input#field_view").val(imageFovDisplay);
	/*$("input#img1_FoV").val( imageFovDisplay + " ft" );
	$("input#img2_FoV").val(imageFovDisplay + " ft");*/


	/*draw image*/
	getCurrentImageSrcAndDraw();

	/*draw fov image*/
	drawFovImageMask();

	/*elelvation view*/
	var canvas = document.getElementById("canvas_elevation");
	var ctx = canvas.getContext("2d");

	drawCamera(canvas, ctx, 20);

	hideCover();
	$("#camera_setting_dialog").fadeOut("fast");
}

function closeCameraDia() {
	hideCover();
	$("#camera_setting_dialog").fadeOut("fast");
}

function saveLensParam() {
	$("p#current_lens_focal_length").html($("input#focal_length").val());
	var lens = document.getElementById("lens_type");
	var lensHtml = lens.options[lens.options.selectedIndex].text;
	$("p#current_lens_name").html(lensHtml);
	$("span#start_scope_front").html($("span#start_scope").html());
	$("span#end_scope_front").html($("span#end_scope").html());
	$("input#range_scope").attr("min", $("input#range").attr("min"));
	$("input#range_scope").attr("max", $("input#range").attr("max"));
	$("input#range_scope").val($("input#range").val());

	if ($("div#focal_scope").css("display") == "none") {
		$("div#focal_scope_front").css("display", "none");
	} else {
		$("div#focal_scope_front").css("display", "inline-block");
	}

	var unit = window.localStorage.getItem("unit");

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	updateCameraConfiguration();

	var objDistance = window.localStorage.getItem("objDistance");
	var imageResolution = window.localStorage.getItem("imageResolution");
	var imageFov = window.localStorage.getItem("imageFov");

	var objDistanceDisplay = (objDistance * unit).toFixed(0);
	var imageResolutionDisplay = (imageResolution / unit).toFixed(0);
	var imageFovDisplay = (imageFov * unit).toFixed(0);

	$("input#distance").val(objDistanceDisplay);
	$("input#img_res").val(imageResolutionDisplay);
	/*$("input#txtImageRes").val(imageResolutionDisplay + " pix/ft");*/
	$("input#txtImageRes").val(imageResolutionDisplay);
	$("input#field_view").val(imageFovDisplay);
	/*$("input#img1_FoV").val( imageFovDisplay + " ft" );
	$("input#img2_FoV").val(imageFovDisplay + " ft");*/


	/*draw resolution image*/
	getCurrentImageSrcAndDraw();

	/*draw fov image*/
	drawFovImageMask();

	/*elelvation view*/
	var canvas = document.getElementById("canvas_elevation");
	var ctx = canvas.getContext("2d");

	drawCamera(canvas, ctx, 20);

	hideCover();
	$("#lens_setting_dialog").fadeOut("fast");

	if (vlast == "distance") {

		$("input#field_view").val("");
		$("input#img_res").val("");

		setFixedImageResolution(false);
		setFixedImageFov(false);
		console.log("lens type: " + vlast);
	}

	else if (vlast == "img_res") {

		$("input#distance").val("");
		$("input#field_view").val("");


		setFixedObjectDistance(false);
		setFixedImageFov(false);
		console.log("lens type: " + vlast);
	}
	else if (vlast == "field_view") {

		$("input#distance").val("");

		$("input#img_res").val("");

		setFixedObjectDistance(false);
		setFixedImageResolution(true);
		console.log("lens type: " + vlast);
	}

}

function closeLensDia() {
	hideCover();
	$("#lens_setting_dialog").fadeOut("fast");
	backLensParam();
}

function currentValSave() {
	var resolution = $("input#cover_cam_res").val();
	var sensorSize = $("select#sensor").val();
	var hp = $("input#hor_pix").val();
	var vp = $("input#ver_pix").val();
	var pp = $("input#pix_pitch").val();
	var sd = $("input#sen_dia").val();
	var sw = $("input#sen_width").val();
	var sh = $("input#sen_height").val();
	storageCameraCurrentInfo(resolution, sensorSize, hp, vp, pp, sd, sw, sh);
}

function storageCameraCurrentInfo(resolution, sensorSize, hp, vp, pp, sd, sw, sh) {
	window.localStorage.setItem("current_resolution", resolution);
	window.localStorage.setItem("current_sensorSize", sensorSize);
	window.localStorage.setItem("current_hp", hp);
	window.localStorage.setItem("current_vp", vp);
	window.localStorage.setItem("current_pp", pp);
	window.localStorage.setItem("current_sd", sd);
	window.localStorage.setItem("current_sw", sw);
	window.localStorage.setItem("current_sh", sh);
}

function initialCameraDialogSettings() {
	var resolution = window.localStorage.getItem("current_resolution");
	var sensorSize = window.localStorage.getItem("current_sensorSize");
	var hp = window.localStorage.getItem("current_hp");
	var vp = window.localStorage.getItem("current_vp");
	var pp = window.localStorage.getItem("current_pp");
	var sd = window.localStorage.getItem("current_sd");
	var sw = window.localStorage.getItem("current_sw");
	var sh = window.localStorage.getItem("current_sh");

	$("input#cover_cam_res").val(resolution);
	$("select#cam_res").val(0);
	$("select#sensor").val(sensorSize);
	$("input#hor_pix").val(hp);
	$("input#ver_pix").val(vp);
	$("input#pix_pitch").val(pp);
	$("input#sen_dia").val(sd);
	$("input#sen_width").val(sw);
	$("input#sen_height").val(sh);
}

function saveLensParams() {
	var lensHFov = window.localStorage.getItem("lensHFov");
	var lensVFov = window.localStorage.getItem("lensVFov");
	var imageFov = window.localStorage.getItem("imageFov");
	var imageResolution = window.localStorage.getItem("imageResolution");
	var maxD = window.localStorage.getItem("maxD");
	var hd = window.localStorage.getItem("hd");
	var lensFocalLength = window.localStorage.getItem("lensFocalLength");
	var objDistance = window.localStorage.getItem("objDistance");
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var paramFixed = window.localStorage.getItem("paramFixed");
	var param1 = window.localStorage.getItem("param1");
	var cameraAngle = window.localStorage.getItem("cameraAngle");
	var floatFlag = window.localStorage.getItem("floatFlag");

	var inputDistanceVal = $("input#distance").val();
	var inputResolutionVal = $("input#img_res").val();
	var inputFovVal = $("input#field_view").val();
	var selectLensVal = $("select#lens_type").val();
	var inputFocalLengthVal = $("input#focal_length").val();
	var inputHFov = $("input#hor_ang").val();
	var inputVFov = $("input#ver_ang").val();
	var sliderFocalLengthVal = $("input#range").val();
	var focalLengthInputVisible = $("div#focal_scope").is(":visible") ? true : false;
	var theiaValidationCheckVisible = $("div#theia_validation_note").is(":visible") ? true : false;

	if (focalLengthInputVisible) {
		var startScope = $("span#start_scope").html();
		var endScope = $("span#end_scope").html();
		var inputRange = $("input#range").val();
		var inputRangeMax = $("input#range").attr("max");
		var inputRangeMin = $("input#range").attr("min");

		window.localStorage.setItem("current_startScope", startScope);
		window.localStorage.setItem("current_endScope", endScope);
		window.localStorage.setItem("current_inputRange", inputRange);
		window.localStorage.setItem("current_inputRangeMax", inputRangeMax);
		window.localStorage.setItem("current_inputRangeMin", inputRangeMin);
	}

	window.localStorage.setItem("current_lensHFov", lensHFov);
	window.localStorage.setItem("current_lensVFov", lensVFov);
	window.localStorage.setItem("current_imageFov", imageFov);
	window.localStorage.setItem("current_imageResolution", imageResolution);
	window.localStorage.setItem("current_maxD", maxD);
	window.localStorage.setItem("current_hd", hd);
	window.localStorage.setItem("current_lensFocalLength", lensFocalLength);
	window.localStorage.setItem("current_objDistance", objDistance);
	window.localStorage.setItem("current_cameraHeight", cameraHeight);
	window.localStorage.setItem("current_personHeight", personHeight);
	window.localStorage.setItem("current_paramFixed", paramFixed);
	window.localStorage.setItem("current_param1", param1);
	window.localStorage.setItem("current_cameraAngle", cameraAngle);
	window.localStorage.setItem("current_floatFlag", floatFlag);

	window.localStorage.setItem("current_inputDistanceVal", inputDistanceVal);
	window.localStorage.setItem("current_inputResolutionVal", inputResolutionVal);
	window.localStorage.setItem("current_inputFovVal", inputFovVal);
	window.localStorage.setItem("current_selectLensVal", selectLensVal);
	window.localStorage.setItem("current_inputFocalLengthVal", inputFocalLengthVal);
	window.localStorage.setItem("current_inputHFov", inputHFov);
	window.localStorage.setItem("current_inputVFov", inputVFov);
	window.localStorage.setItem("current_sliderFocalLengthVal", sliderFocalLengthVal);
	window.localStorage.setItem("current_focalLengthInputVisible", focalLengthInputVisible);
	window.localStorage.setItem("current_theiaValidationCheckVisible", theiaValidationCheckVisible);
}

function backLensParam() {
	var lensHFov = window.localStorage.getItem("current_lensHFov");
	var lensVFov = window.localStorage.getItem("current_lensVFov");
	var imageFov = window.localStorage.getItem("current_imageFov");
	var imageResolution = window.localStorage.getItem("current_imageResolution");
	var maxD = window.localStorage.getItem("current_maxD");
	var hd = window.localStorage.getItem("current_hd");
	var lensFocalLength = window.localStorage.getItem("current_lensFocalLength");
	var objDistance = window.localStorage.getItem("current_objDistance");
	var cameraHeight = window.localStorage.getItem("current_cameraHeight");
	var personHeight = window.localStorage.getItem("current_personHeight");
	var paramFixed = window.localStorage.getItem("current_paramFixed");
	var param1 = window.localStorage.getItem("current_param1");
	var cameraAngle = window.localStorage.getItem("current_cameraAngle");
	var floatFlag = window.localStorage.getItem("current_floatFlag");

	var inputDistanceVal = window.localStorage.getItem("current_inputDistanceVal");
	var inputResolutionVal = window.localStorage.getItem("current_inputResolutionVal");
	var inputFovVal = window.localStorage.getItem("current_inputFovVal");
	var selectLensVal = window.localStorage.getItem("current_selectLensVal");
	var inputFocalLengthVal = window.localStorage.getItem("current_inputFocalLengthVal");
	var inputHFov = window.localStorage.getItem("current_inputHFov");
	var inputVFov = window.localStorage.getItem("current_inputVFov");
	var sliderFocalLengthVal = window.localStorage.getItem("current_sliderFocalLengthVal");
	var focalLengthInputVisible = window.localStorage.getItem("current_focalLengthInputVisible");
	var theiaValidationCheckVisible = window.localStorage.getItem("current_theiaValidationCheckVisible");

	window.localStorage.setItem("lensHFov", lensHFov);
	window.localStorage.setItem("lensVFov", lensVFov);
	window.localStorage.setItem("imageFov", imageFov);
	window.localStorage.setItem("imageResolution", imageResolution);
	window.localStorage.setItem("maxD", maxD);
	window.localStorage.setItem("hd", hd);
	window.localStorage.setItem("lensFocalLength", lensFocalLength);
	window.localStorage.setItem("objDistance", objDistance);
	window.localStorage.setItem("cameraHeight", cameraHeight);
	window.localStorage.setItem("personHeight", personHeight);
	window.localStorage.setItem("paramFixed", paramFixed);
	window.localStorage.setItem("param1", param1);
	window.localStorage.setItem("cameraAngle", cameraAngle);
	window.localStorage.setItem("floatFlag", floatFlag);

	$("input#distance").val(inputDistanceVal);
	$("input#img_res").val(inputResolutionVal);
	/*$("input#txtImageRes").val(inputResolutionVal + " pix/ft");*/
	$("input#txtImageRes").val(imageResolutionDisplay);
	$("input#field_view").val(inputFovVal);
	/*$("input#img1_FoV").val( inputFovVal + " ft" );
	$("input#img2_FoV").val(inputFovVal + " ft");*/


	$("select#lens_type").val(selectLensVal);
	$("input#focal_length").val(inputFocalLengthVal);
	$("input#hor_ang").val(inputHFov);
	$("input#ver_ang").val(inputVFov);
	$("input#range").val(sliderFocalLengthVal);

	if (focalLengthInputVisible == "true") {
		var startScope = window.localStorage.getItem("current_startScope");
		var endScope = window.localStorage.getItem("current_endScope");
		var inputRange = window.localStorage.getItem("current_inputRange");
		var inputRangeMax = window.localStorage.getItem("current_inputRangeMax");
		var inputRangeMin = window.localStorage.getItem("current_inputRangeMin");

		$("span#start_scope").html(startScope);
		$("span#end_scope").html(endScope);

		$("input#range").attr("max", inputRangeMax);
		$("input#range").attr("min", inputRangeMin);

		if (floatFlag == "float") {
			$("input#range").val(($("input#focal_length").val() * 10).toFixed(1));
		} else {
			$("input#range").val(($("input#focal_length").val() * 10).toFixed(0));
		}

		$("div#focal_scope").css("display", "inline-block");
	} else {
		$("div#focal_scope").css("display", "none");
	}

	if (theiaValidationCheckVisible == "true") {
		$("div#theia_validation_note").css("display", "block");
	} else {
		$("div#theia_validation_note").css("display", "none");
	}
}

function changeUnit() {
	var unitSelect = document.getElementById("unit_change");
	var unit = $("#unit_change").val();

	window.localStorage.setItem("unit", parseFloat(unit));

	var unitSymbol = $(unitSelect.options[unitSelect.options.selectedIndex]).attr("sign");

	window.localStorage.setItem("unitSymbol", unitSymbol);

	$("*").find("#distance_symbol").each(function () {
		$(this).val(unitSymbol);
	});

	/*change distance resolution field of view*/
	var unit = window.localStorage.getItem("unit");

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	updateCameraConfiguration();

	var objDistance = window.localStorage.getItem("objDistance");
	var imageResolution = window.localStorage.getItem("imageResolution");
	var imageFov = window.localStorage.getItem("imageFov");

	var objDistanceDisplay = (objDistance * unit).toFixed(0);
	var imageResolutionDisplay = (imageResolution / unit).toFixed(0);
	var imageFovDisplay = (imageFov * unit).toFixed(0);

	$("input#distance").val(objDistanceDisplay);
	$("input#img_res").val(imageResolutionDisplay);
	/*$("input#txtImageRes").val(imageResolutionDisplay + " pix/ft");*/
	$("input#txtImageRes").val(imageResolutionDisplay);
	$("input#field_view").val(imageFovDisplay);
	/*$("input#img1_FoV").val( imageFovDisplay + " ft" );
	$("input#img2_FoV").val(imageFovDisplay + " ft");*/


	/*elelvation view*/
	var canvas = document.getElementById("canvas_elevation");
	var ctx = canvas.getContext("2d");

	drawCamera(canvas, ctx, 20);

	/*change the camera height value*/
	var cameraHeightTemp = window.localStorage.getItem("cameraHeight");
	var cameraHeight = lengthToMetric(cameraHeightTemp).toFixed(1);

	$("input#camera_height").val(cameraHeight);
}

function changeImage() {
	var selected_index = $("#image_change").val();
	image_res_1000 = $(images[selected_index]).find("resolution_images").find("resImage").eq(0).attr("file");
	image_res_400 = $(images[selected_index]).find("resolution_images").find("resImage").eq(1).attr("file");
	image_res_120 = $(images[selected_index]).find("resolution_images").find("resImage").eq(2).attr("file");
	image_res_40 = $(images[selected_index]).find("resolution_images").find("resImage").eq(3).attr("file");
	image_res_12 = $(images[selected_index]).find("resolution_images").find("resImage").eq(4).attr("file");

	window.localStorage.setItem("srcResolution", image_res_40);
	window.localStorage.setItem("applicationName", $(images[selected_index]).attr("display"));

	background_img = $(images[selected_index]).find("background_image").find("bkgImage").attr("file");
	mask_img = $(images[selected_index]).find("FOV_image").find("FOVImage").attr("file");
	src_background = "img/" + background_img;
	src_mask = "img/" + mask_img;
	$("#background").attr("src", src_background);
	$("#mask").attr("src", src_mask);

	drawFovImageMask();
	getCurrentImageSrcAndDraw();
}

function translate() {
	var xml = $("select#language_change").val();
	var xmlUrl = "language/" + xml;
	var xml = get_xml(xmlUrl);
	var lensCalculator = $(xml).find("string[name='Lens Calculator']").html();
	var currentValue = $(xml).find("string[name='Current Value']").html();
	var camera = $(xml).find("string[name='Camera']").html();
	var lens = $(xml).find("string[name='Lens']").html();
	var tellmeWhatLensToUse = $(xml).find("string[name='Tell me what lens to use']").html();
	var inputIns = $(xml).find("string[name='Input instructions']").html();
	var focalLength = $(xml).find("string[name='Focal Length']").html();
	var distance = $(xml).find("string[name='Distance']").html();
	var distanceRes = $(xml).find("string[name='Distance result']").html();
	var resolution = $(xml).find("string[name='Resolution']").html();
	var fieldOfView = $(xml).find("string[name='Field of View']").html();
	var resultView = $(xml).find("string[name='Result View']").html();
	var imageResolution = $(xml).find("string[name='Image Resolution']").html();
	var elevationView = $(xml).find("string[name='Elevation View']").html();
	var digitalZoom = $(xml).find("string[name='Digital Zoom']").html();
	var horAngle = $(xml).find("string[name='Hor.Angle']").html();
	var verAngle = $(xml).find("string[name='Ver.Angle']").html();
	var cameraHeight = $(xml).find("string[name='Camera Height']").html();
	var cameraAngle = $(xml).find("string[name='Camera Angle']").html();
	var errorMsg = $(xml).find("string[name='Error msg']").html();

	var cameraSetting = $(xml).find("string[name='Camera Setting']").html();
	var sensorRes = $(xml).find("string[name='Sensor resolution']").html();
	var sensorSize = $(xml).find("string[name='Sensor Size']").html();
	var sensorInfo = $(xml).find("string[name='Sensor info']").html();
	var sensorDiagonal = $(xml).find("string[name='Sensor Diagonal']").html();
	var pixels = $(xml).find("string[name='Pixels']").html();
	var pixelPitch = $(xml).find("string[name='Pixel Pitch']").html();
	var cancel = $(xml).find("string[name='Cancel']").html();
	var done = $(xml).find("string[name='Done']").html();

	var lensSetting = $(xml).find("string[name='Lens Setting']").html();
	/*var focalLength = $(xml).find("string[name='Focal Length']").html();*/

	var settings = $(xml).find("string[name='Settings']").html();
	var unitSelect = $(xml).find("string[name='Unit Select']").html();
	var imageSelect = $(xml).find("string[name='Image select']").html();
	var languageSelect = $(xml).find("string[name='Language Select']").html();
	var FOVHeader = $(xml).find("string[name='FOVHeader']").html();
	var ResHeader = $(xml).find("string[name='ResHeader']").html();
	var distNote = $(xml).find("string[name='Distance note']").html();

	$("span#lens_calculator").html(lensCalculator);
	$("span#current_value").html(currentValue);
	$("span#camera").html(camera);
	$("span#lens").html(lens);
	$("h4#custom_lens_check").html(tellmeWhatLensToUse);
	$("span#input_ins").html(inputIns);
	$("span#focal_length").html(focalLength);
	$("label#distance").html(distance);
	$("label#distResult").html(distanceRes);
	$("label#resolution").html(resolution);
	$("label#field_of_view").html(fieldOfView);
	$("span#result_view").html(resultView);
	$("label#imageRes").html(imageResolution);
	$("label#digital_zoom_lbl").html(digitalZoom);
	$("label#hor_angle").html(horAngle);
	$("label#ver_angle").html(verAngle);
	$("label#camera_height").html(cameraHeight);
	$("label#camera_angle").html(cameraAngle);
	$("span#error_msg").html(errorMsg);

	$("span#camera_setting_span").html(cameraSetting);
	$("label#sensor_res").html(sensorRes);
	$("label#sensor_size").html(sensorSize);
	$("label#pixels").html(sensorSize);
	$("span#sensor_info").html(sensorInfo);
	$("label#pixel_pitch").html(pixelPitch);
	$("label#sensor_diagonal").html(sensorDiagonal);
	$("label#sensor_size").html(sensorSize);
	$("button#cancel").html(cancel);
	$("button#done").html(done);

	$("span#lens_setting_span").html(lensSetting);
	$("label#focal_length_label").html(focalLength);

	$("span#settings").html(settings);
	$("span#unit_setting").html(unitSelect);
	$("span#image_select").html(imageSelect);
	$("span#language_select").html(languageSelect);
	$("label#FOVHeaderLabel").html(FOVHeader);
	$("label#ResHeaderLabel").html(ResHeader);
	$("span#distance_note").html(distNote);

}

function changePreviewImg() {
	$("#image_change").change(function () {
		var selected_index = $(this).val();
		preview_img = "img/" + $(images[selected_index]).find("FOV_image").find("FOVImage").attr("file");
		$("#img_preview").attr("src", preview_img);
	});
}

function refreshImageResolutionDraw() {

	/*draw image*/
	getCurrentImageSrcAndDraw();

	/*setting digital zoom value as initial*/
	$("input#digital_zoom").val(1);
}