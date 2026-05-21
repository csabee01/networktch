function displayFormat(number) {
	if(number > 10) {
		return number.toFixed(0);
	}
	if(number > 2) {
		return number.toFixed(1);
	}
	if(number == 0) {
		return 0;
	}
	return number.toFixed(2);
}

$(document).ready(function () {
	/*initial parameter settings*/
	settingDefaultLens();
	/*initial xml data form setting*/
	var lens_xml = get_xml("xml/lenses.xml");
	var formObj = $(lens_xml).find("lens");
	var targetObj = $("div#xml_data_container");

	for (var i = 0; i < formObj.length; i++) {
		var name = $(formObj[i]).attr("value");
		var formAppendObj = "<form name='" + $(formObj[i]).attr("value") + "' display='" + $(formObj[i]).attr("display") + "' Theia='" + $(formObj[i]).attr("Theia") + "' flMin='" + $(formObj[i]).attr("flMin") + "' flMax='" + $(formObj[i]).attr("flMax") + "'></form>";

		targetObj.append(formAppendObj);

		var desc = "<input type='hidden' name='desc' value='" + $(formObj[i]).find("desc").html() + "'>";
		var q1a = "<input type='hidden' name='q1a' value='" + $(formObj[i]).find("q1a").html() + "'>";
		var q1b = "<input type='hidden' name='q1b' value='" + $(formObj[i]).find("q1b").html() + "'>";
		var q2a = "<input type='hidden' name='q2a' value='" + $(formObj[i]).find("q2a").html() + "'>";
		var q2b = "<input type='hidden' name='q2b' value='" + $(formObj[i]).find("q2b").html() + "'>";
		var q3a = "<input type='hidden' name='q3a' value='" + $(formObj[i]).find("q3a").html() + "'>";
		var q3b = "<input type='hidden' name='q3b' value='" + $(formObj[i]).find("q3b").html() + "'>";
		var q4a = "<input type='hidden' name='q4a' value='" + $(formObj[i]).find("q4a").html() + "'>";
		var q4b = "<input type='hidden' name='q4b' value='" + $(formObj[i]).find("q4b").html() + "'>";
		var d1 = "<input type='hidden' name='d1' value='" + $(formObj[i]).find("d1").html() + "'>";
		var d2 = "<input type='hidden' name='d2' value='" + $(formObj[i]).find("d2").html() + "'>";
		var d3 = "<input type='hidden' name='d3' value='" + $(formObj[i]).find("d3").html() + "'>";
		var i1a = "<input type='hidden' name='i1a' value='" + $(formObj[i]).find("i1a").html() + "'>";
		var i1b = "<input type='hidden' name='i1b' value='" + $(formObj[i]).find("i1b").html() + "'>";
		var i2a = "<input type='hidden' name='i2a' value='" + $(formObj[i]).find("i2a").html() + "'>";
		var i2b = "<input type='hidden' name='i2b' value='" + $(formObj[i]).find("i2b").html() + "'>";
		var i3a = "<input type='hidden' name='i3a' value='" + $(formObj[i]).find("i3a").html() + "'>";
		var i3b = "<input type='hidden' name='i3b' value='" + $(formObj[i]).find("i3b").html() + "'>";
		var i4a = "<input type='hidden' name='i4a' value='" + $(formObj[i]).find("i4a").html() + "'>";
		var i4b = "<input type='hidden' name='i4b' value='" + $(formObj[i]).find("i4b").html() + "'>";

		var formTargetObj = $("form[name='" + name + "']");

		formTargetObj.append(desc);
		formTargetObj.append(q1a);
		formTargetObj.append(q1b);
		formTargetObj.append(q2a);
		formTargetObj.append(q2b);
		formTargetObj.append(q3a);
		formTargetObj.append(q3b);
		formTargetObj.append(q4a);
		formTargetObj.append(q4b);
		formTargetObj.append(d1);
		formTargetObj.append(d2);
		formTargetObj.append(d3);
		formTargetObj.append(i1a);
		formTargetObj.append(i1b);
		formTargetObj.append(i2a);
		formTargetObj.append(i2b);
		formTargetObj.append(i3a);
		formTargetObj.append(i3b);
		formTargetObj.append(i4a);
		formTargetObj.append(i4b);
	}

	/*constants setting*/
	var factory_xml = get_xml("xml/factory_default.xml");
	var objDistance = $(factory_xml).find("paramValue1").attr("value");
	var cameraHeight = $(factory_xml).find("cameraHt").attr("value");
	var personHeight = $(factory_xml).find("personHt").html();
	var paramFixed = $(factory_xml).find("paramFixed").attr("value");

	window.localStorage.setItem("objDistance", objDistance);
	window.localStorage.setItem("cameraHeight", cameraHeight);
	window.localStorage.setItem("personHeight", personHeight);
	window.localStorage.setItem("paramFixed", paramFixed);

	/*initial unit setting*/
	window.localStorage.setItem("unit", 3.280);
	window.localStorage.setItem("unitSymbol", "ft");

	/*initial distance, resolution, fov validation setting*/

	$("select#lens_type").change(function () {
		var currentLensType = $(this).val();
		changeLensDesc(currentLensType);
		changeFocalLength(currentLensType);
		updateLensFovs();

		setFixedLens(true);
		setFixedObjectDistance(true);
		setFixedImageResolution(false);
		setFixedImageFov(false);

		if ($('input#img_res').val().length) {
			setFixedObjectDistance(false);
			setFixedImageFov(false);
		}
		else if ($('input#field_view').val().length) {
			setFixedObjectDistance(false);
			setFixedImageResolution(true);
		}

		updateLensFovs();
		updateLens();
		updateCameraConfiguration();

		checkAvailableTheiaLens();
		vflag = true;
	});

	$("input#range").get(0).addEventListener("input", function () {

		var flag = window.localStorage.getItem("floatFlag");

		if (flag == "float") {
			$("input#focal_length").val(($(this).val() / 10).toFixed(1));
		} else {
			$("input#focal_length").val(($(this).val() / 10).toFixed(0));
		}

		window.localStorage.setItem("lensFocalLength", $("input#focal_length").val());

		setFixedLens(true);
		setFixedObjectDistance(true);
		setFixedImageResolution(false);
		setFixedImageFov(false);

		if ($('input#distance').val().length && vlast == "distance") {

			$("input#field_view").val("");
			$("input#img_res").val("");

			setFixedImageResolution(false);
			setFixedImageFov(false);

		}

		else if ($('input#img_res').val().length && vlast == "img_res") {

			$("input#distance").val("");
			$("input#field_view").val("");


			setFixedObjectDistance(false);
			setFixedImageFov(false);
		}
		else if ($('input#field_view').val().length && vlast == "field_view") {

			$("input#distance").val("");

			$("input#img_res").val("");

			setFixedObjectDistance(false);
			setFixedImageResolution(true);
		}

		updateLensFovs();
		updateLens();
		updateCameraConfiguration();

		checkAvailableTheiaLens();
	})

	$("input#range_scope").get(0).addEventListener("input", function () {
		//console.log('this is called');

		/*if(vflag){
			$("input#field_view").val("");
			$("input#img_res").val("");
		}*/


		$("input#range").val($(this).val());

		var flag = window.localStorage.getItem("floatFlag");

		if (flag == "float") {
			$("input#focal_length").val(($(this).val() / 10).toFixed(1));
		} else {
			$("input#focal_length").val(($(this).val() / 10).toFixed(0));
		}

		if (flag == "float") {
			$("p#current_lens_focal_length").html(($(this).val() / 10).toFixed(1));
		} else {
			$("p#current_lens_focal_length").html(($(this).val() / 10).toFixed(0));
		}

		window.localStorage.setItem("lensFocalLength", $("input#focal_length").val());

		setFixedLens(true);
		setFixedObjectDistance(true);
		setFixedImageResolution(false);
		setFixedImageFov(false);

		if ($('input#distance').val().length && vlast == "distance") {

			$("input#field_view").val("");
			$("input#img_res").val("");

			setFixedImageResolution(false);
			setFixedImageFov(false);

		}

		else if ($('input#img_res').val().length && vlast == "img_res") {

			$("input#distance").val("");
			$("input#field_view").val("");


			setFixedObjectDistance(false);
			setFixedImageFov(false);
		}
		else if ($('input#field_view').val().length && vlast == "field_view") {

			$("input#distance").val("");

			$("input#img_res").val("");

			setFixedObjectDistance(false);
			setFixedImageResolution(true);
		}

		updateLensFovs();
		updateLens();
		updateCameraConfiguration();

		/*draw image*/
		getCurrentImageSrcAndDraw();

		/*draw fov image*/
		drawFovImageMask();

		/*elelvation view*/
		var canvas = document.getElementById("canvas_elevation");
		var ctx = canvas.getContext("2d");

		drawCamera(canvas, ctx, 20);
		vflag = false;
	});

	/*initial HFov and VFov setting*/
	updateLensFovs();

	/*when fl change */
	$("input#focal_length").keyup(function () {
		//if($(this).val().length && $.isNumeric($(this).val()))
		{
			window.localStorage.setItem("lensFocalLength", $(this).val());

			var value = $(this).val();

			if (((value) * 1) > 2000) {
				alert("Please enter focal length value less than 2000mm!");
				$(this).val(0);
			}

			if (((value) * 1) > 60) {
				$("div#focal_length_slider").css("display", "none");
			} else {
				$("div#focal_length_slider").css("display", "inline-block");
			}

			var flag = window.localStorage.getItem("floatFlag");

			if (flag == "float") {
				$("input#range").val(($(this).val() * 10).toFixed(1));
			} else {
				$("input#range").val(($(this).val() * 10).toFixed(0));
			}

			setFixedLens(true);
			setFixedObjectDistance(true);
			setFixedImageResolution(false);
			setFixedImageFov(false);

			updateLensFovs();
			updateLens();
			updateCameraConfiguration();

			checkAvailableTheiaLens();
		}
	});
	$("input:text").focus(function () { $(this).select(); });
	$("input#distance").keyup(function (e) {

		if ($(this).val().length && $.isNumeric($(this).val())) {//e.keyCode!=8 &&

			var od = $(this).val();

			var x = lengthToMetric(od);

			window.localStorage.setItem("objDistance", x);

			$("input#distanceResult").val(od);
			$("input#field_view").val("");
			$("input#img_res").val("");

			setObjectDistance(x);

			/*draw image*/
			getCurrentImageSrcAndDraw();

			/*draw fov image*/
			drawFovImageMask();

			/*elelvation view*/
			var canvas = document.getElementById("canvas_elevation");
			var ctx = canvas.getContext("2d");

			drawCamera(canvas, ctx, 20);
		}
		vflag = false;
		vlast = "distance";
	});

	/*when resolution change*/
	$("input#img_res").keyup(function (e) {
		if ($(this).val().length && $.isNumeric($(this).val())) {//e.keyCode!=8 &&

			var ir = $(this).val();
			var x = inverseLengthToMetric(ir);

			$("input#distance").val("");
			$("input#field_view").val("");
			$("input#img_res").val(ir);

			setImageResolution(x);

			/*draw image*/
			getCurrentImageSrcAndDraw();

			/*draw fov image*/
			drawFovImageMask();

			/*elelvation view*/
			var canvas = document.getElementById("canvas_elevation");
			var ctx = canvas.getContext("2d");

			drawCamera(canvas, ctx, 20);

			/*var irWithUnit  = ir + " pix/ft"
			$("input#txtImageRes").val(irWithUnit);*/
			$("input#txtImageRes").val(ir);
		}
		vflag = false;
		vlast = "img_res";
	});

	/*when feld of view change*/
	$("input#field_view").keyup(function (e) {

		if ($(this).val().length && $.isNumeric($(this).val())) {//e.keyCode!=8 &&

			var fv = $(this).val();
			var x = lengthToMetric(fv);

			$("input#distance").val("");
			$("input#txtHFOV").val(fv);
			$("input#txtVFOV").val("");
			$("input#img_res").val("");

			setImageFov(x);

			/*draw image*/
			getCurrentImageSrcAndDraw();

			/*draw fov image*/
			drawFovImageMask();

			/*elelvation view*/
			var canvas = document.getElementById("canvas_elevation");
			var ctx = canvas.getContext("2d");

			drawCamera(canvas, ctx, 20);

			/*$("input#img1_FoV").val( fv + " ft" );
			$("input#img2_FoV").val(fv+ " ft");*/
		}
		vflag = false;
		vlast = "field_view";
	});

	/*initial update resolution change validation flag*/
	window.localStorage.setItem("resolution_change_validation", "true");
});


var vflag = false;
function settingDefaultLens() {
	var xml = get_xml("xml/factory_default.xml");
	var defaultLensVal = $(xml).find("lens").attr("value");
	$("select#lens_type").val(defaultLensVal);
	var hFov = $(xml).find("hFov").html();
	var vFov = $(xml).find("vFov").html();

	window.localStorage.setItem("lensHFov", hFov);
	window.localStorage.setItem("lensVFov", vFov);

	$("input#hor_ang").val(hFov);
	$("input#ver_ang").val(vFov);

	var distance = $(xml).find("distance").html();
	$("input#distance").val(distance);
	$("input#distanceResult").val(distance);

	var resolution = $(xml).find("resolution").html();
	$("input#img_res").val(resolution);
	$("input#txtImageRes").val(resolution);
	/*var resolutionWithUnit  = resolution + " pix/ft"
	$("input#txtImageRes").val(resolutionWithUnit);*/

	var fov = $(xml).find("fov").html();
	$("input#field_view").val(fov);
	$("input#txtHFOV").val(fov);
	/*$("input#img1_FoV").val( fov  + " ft");
	$("input#img2_FoV").val( fov + " ft");*/

	var conversion = $(xml).find("conversion").html();
	var resolutionStore = resolution * conversion;
	var fovStore = fov / conversion;

	window.localStorage.setItem("imageResolution", resolutionStore);
	window.localStorage.setItem("imageFov", fovStore);

	var lens_xml = get_xml("xml/lenses.xml");
	var currentLensName = $(lens_xml).find('lens[value="' + defaultLensVal + '"]').attr("display");
	var currentLensObj = $("*").find("p#current_lens_name");
	currentLensObj.html(currentLensName);
	var currentLensDesc = $(lens_xml).find('lens[value="' + defaultLensVal + '"]').find("desc").html();
	var currentLensDescObj = $("*").find("h5#lens_des");
	currentLensDescObj.html(currentLensDesc);
	var currentFocalLength = $(lens_xml).find('lens[value="' + defaultLensVal + '"]').attr("flMin");
	$("input#focal_length").val(currentFocalLength);

	var flMin = $(lens_xml).find('lens[value="' + defaultLensVal + '"]').attr("flMin");
	var flMax = $(lens_xml).find('lens[value="' + defaultLensVal + '"]').attr("flMax");

	if (flMax > 60) {
		flMax = 60;
	}

	$("input#range").attr("min", flMin * 10);
	$("input#range").attr("max", flMax * 10);
	$("input#range").val(flMin * 10);
	$("span#start_scope").html(flMin + "mm");
	$("span#end_scope").html(flMax + "mm");

	$("input#range_scope").attr("min", flMin * 10);
	$("input#range_scope").attr("max", flMax * 10);
	$("input#range_scope").val(flMin * 10);
	$("span#start_scope_front").html(flMin + "mm");
	$("span#end_scope_front").html(flMax + "mm");

	window.localStorage.setItem("floatFlag", "float");

	/*initial fov image drawing*/

	var lensHFov = window.localStorage.getItem("lensHFov");
	var lensVFov = window.localStorage.getItem("lensVFov");

	var objDistance = window.localStorage.getItem("objDistance");
	var midObjectSightLine = sightLineForDistance(objDistance);

	var imageFov = 2 * midObjectSightLine * Math.tan(toRad(lensHFov / 2));
	var imageVFov = 2 * midObjectSightLine * Math.tan(toRad(lensVFov / 2));

	var imageFovDisplay = displayFormat(inverseLengthToMetric(imageFov / 1));
	var imageVFovDisplay = displayFormat(inverseLengthToMetric(imageVFov / 1));
	$("input#txtHFOV").val(imageFovDisplay);
	$("input#txtVFOV").val(imageVFovDisplay);

	var bkgHFov = 140;
	var fovWindowWd = 454;

	var fovPicWd = Math.tan(toRad(lensHFov / 2)) / Math.tan(toRad(bkgHFov / 2)) * fovWindowWd;
	var fovPicHd = Math.tan(toRad(lensVFov / 2)) / Math.tan(toRad(lensHFov / 2)) * fovPicWd;

	var top = (111 - fovPicHd) / 2;
	var left = (454 - fovPicWd) / 2;
	var right = left + fovPicWd;
	var bottom = top + fovPicHd;

	var clipSubStr = top + "px," + right + "px," + bottom + "px," + left + "px";
	var clipCssStr = "rect( " + clipSubStr + " )";

	$("img#mask").css("clip", clipCssStr);

	//draw diagonal line
	var diagonal_width = Math.sqrt(100.0 * 100.0 + (fovPicWd / 2.0) * (fovPicWd / 2.0));
	var angle = Math.asin(100.0 / diagonal_width) * 180.0 / 3.14;
	var angle_right = 0 - angle;
	var left_move = 227 - fovPicWd / 2 - (diagonal_width - fovPicWd / 2) / 2;
	var left_move_right = (fovPicWd / 2 - diagonal_width) / 2;

	$("div.left_diagonal").find("div.line").css("transform", "rotate(" + angle + "deg)");
	$("div.left_diagonal").find("div.line").css("-ms-transform", "rotate(" + angle + "deg)");
	$("div.left_diagonal").find("div.line").css("-webkit-transform", "rotate(" + angle + "deg)");
	$("div.left_diagonal").find("div.line").css("left", left_move);
	$("div.left_diagonal").find("div.line").css("width", diagonal_width);

	$("div.right_diagonal").find("div.line").css("transform", "rotate(" + angle_right + "deg)");
	$("div.right_diagonal").find("div.line").css("-ms-transform", "rotate(" + angle_right + "deg)");
	$("div.right_diagonal").find("div.line").css("-webkit-transform", "rotate(" + angle_right + "deg)");
	$("div.right_diagonal").find("div.line").css("left", left_move_right);
	$("div.right_diagonal").find("div.line").css("width", diagonal_width);

	$("input#field_view").val("");
	$("input#img_res").val("");

	updateLens(true);
	vflag = true;
}

function changeLensDesc(currentType) {
	var lens_xml = get_xml("xml/lenses.xml");
	var currentLensDesc = $(lens_xml).find('lens[value="' + currentType + '"]').find("desc").html();
	var currentLensDescObj = $("*").find("h5#lens_des");
	currentLensDescObj.html(currentLensDesc);
}

function changeFocalLength(currentType) {

	var startVal = $("form[name='" + currentType + "']").attr("flMin");
	var endVal = $("form[name='" + currentType + "']").attr("flMax");
	var currentFl = $("input#focal_length").val();

	if ((startVal / 1) <= (currentFl / 1) && (currentFl / 1) <= (endVal / 1)) {
		$("input#focal_length").val(currentFl);

		window.localStorage.setItem("lensFocalLength", currentFl);
	} else {
		$("input#focal_length").val(startVal);

		window.localStorage.setItem("lensFocalLength", startVal);
	}

	if (startVal == endVal) {
		$("div#focal_length_slider, div.hidefocalength").css("display", "none");
	} else {
		$("div#focal_length_slider, div.hidefocalength").css("display", "inline-block");

		var value = startVal * 10;

		$("input#range").attr("min", startVal * 10);

		if (endVal > 60) {
			endVal = 60;
		}

		$("input#range").attr("max", endVal * 10);
		$("input#range").val($("input#focal_length").val() * 10);
		$("span#start_scope").html(startVal + "mm");
		$("span#end_scope").html(endVal + "mm");

		if (currentType == "183" || currentType == "001") {
			window.localStorage.setItem("floatFlag", "float");
		} else {
			window.localStorage.setItem("floatFlag", "int");
		}
	}

}

function calcMaxD(r, lensId) {

	if (r == "Infinity") {
		r = 10000000000;
	}

	var formObj = $("form[name='" + lensId + "']");
	var d1 = $(formObj).find("input[name='d1']").val();
	var d2 = $(formObj).find("input[name='d2']").val();
	var d3 = $(formObj).find("input[name='d3']").val();
	var d1 = parseFloat(d1);
	var d2 = parseFloat(d2);
	var d3 = parseFloat(d3);
	var r = parseFloat(r);
	var rd3 = r - d3;
	var md = d1 + d2 * rd3 * rd3;

	if (parseFloat(md) > 0) {
		window.localStorage.setItem("maxD", 0);
	} else {
		window.localStorage.setItem("maxD", md);
	}
}

function calcHvd(y, maxD, lensId) {
	var formObj = $("form[name='" + lensId + "']");
	var q1a = $(formObj).find("input[name='q1a']").val();
	var q1b = $(formObj).find("input[name='q1b']").val();
	var q2a = $(formObj).find("input[name='q2a']").val();
	var q2b = $(formObj).find("input[name='q2b']").val();
	var q3a = $(formObj).find("input[name='q3a']").val();
	var q3b = $(formObj).find("input[name='q3b']").val();
	var q4a = $(formObj).find("input[name='q4a']").val();
	var q4b = $(formObj).find("input[name='q4b']").val();

	var q2a = parseFloat(q2a);
	var q1b = parseFloat(q1b);
	var q2a = parseFloat(q2a);
	var q2b = parseFloat(q2b);
	var q3a = parseFloat(q3a);
	var q3b = parseFloat(q3b);
	var q4a = parseFloat(q4a);
	var q4b = parseFloat(q4b);
	var maxD = parseFloat(maxD);
	var y = parseFloat(y);
	var d = (q1a * maxD + q1b * 1) * y + (q2a * maxD + q2b * 1) * Math.pow(y, 2) + (q3a * maxD + q3b * 1) * Math.pow(y, 3) + (q4a * maxD + q4b * 1) * Math.pow(y, 4);

	if (d > 0) {
		window.localStorage.setItem("hd", 0);
	} else {
		window.localStorage.setItem("hd", d);
	}
}

function toDeg(x) {
	var mPi = 3.1415926535389;
	var radianAngle = x * 180 / mPi;
	return radianAngle;
}

function toRad(x) {
	var mPi = 3.1415926535389;
	var radAngle = x * mPi / 180;
	return radAngle;
}

function updateLensFovs() {

	var sw = window.localStorage.getItem("current_sw");
	var sd = window.localStorage.getItem("current_sd");
	var sh = window.localStorage.getItem("current_sh");
	var fl = $("input#focal_length").val();
	var lensId = $("select#lens_type").val();
	var r = sw / fl;

	calcMaxD(r, lensId);

	var maxD = window.localStorage.getItem("maxD");
	var y = sw / sd;
	calcHvd(y, maxD, lensId);

	var hd = window.localStorage.getItem("hd");
	var hd = 1 - hd;
	var tempAngle = 2 * Math.atan(sw / 2 / fl * hd);
	var lensHFov = toDeg(tempAngle);
	var y = sh / sd;

	calcHvd(y, maxD, lensId);

	var vd = window.localStorage.getItem("hd");
	var vd = 1 - vd;
	var tempAngle = 2 * Math.atan(sh / 2 / fl * vd);
	var lensVFov = toDeg(tempAngle);

	window.localStorage.setItem("lensHFov", lensHFov);
	window.localStorage.setItem("lensVFov", lensVFov);

	var lensHFovDisplay = displayFormat(lensHFov / 1);
	var lensVFovDisplay = displayFormat(lensVFov / 1);

	$("input#hor_ang").val(lensHFovDisplay);
	$("input#ver_ang").val(lensVFovDisplay);
}


function updateLens(firstRun) {
	if(typeof firstRun === undefined) {
		firstRun = false;
	} else {
		firstRun = true;
	}
	var lensId = $("select#lens_type").val();
	var currentMinval = $("*").find("div#xml_data_container").find("form[name='" + lensId + "']").attr("flMin");
	var currentMaxval = $("*").find("div#xml_data_container").find("form[name='" + lensId + "']").attr("flMax");
	var fl = $("input#focal_length").val();
	var customLensUseFlag = $("input#choose_lens").is(":checked") ? true : false;

	if ((1.6 * 1) <= ((fl) * 1) && ((fl) * 1) <= (1.7 * 1)) {
		fl = 1.68;
		$("input#focal_length").val(1.68);
		$("div#focal_length_slider").css("display", "none");
	}

	if ((1.2 * 1) <= ((fl) * 1) && ((fl) * 1) <= (1.3 * 1)) {
		fl = 1.28;
		$("input#focal_length").val(1.28);
		$("div#focal_length_slider").css("display", "none");
	}

	if ((currentMinval * 1) <= (fl * 1) && (fl * 1) <= (currentMaxval * 1)) {
		$("select#lens_type").val(lensId);

		if (customLensUseFlag) {

			$("input#range_scope").val($("input#focal_length").val() * 10);

			$("p#current_lens_focal_length").html($("input#focal_length").val());
		}

		return;
	}

	var obj = $("*").find("div#xml_data_container").find("form");

	for (var i = 0; i < obj.length; i++) {
		var minVal = $(obj[i]).attr("flMin");
		var maxVal = $(obj[i]).attr("flMax");

		if ((minVal * 1) <= (fl * 1) && (fl * 1) <= (maxVal * 1)) {
			var lensVal = $(obj[i]).attr("name");
			var lensName = $(obj[i]).attr("display");

			$("select#lens_type").val(lensVal);

			/*change focal length*/
			setLensId(lensVal, firstRun);

			$("h5#lens_des").html($(obj[i]).find("input[name='desc']").val());

			var startVal = $(obj[i]).attr("flmin");
			var endVal = $(obj[i]).attr("flmax");

			if (startVal == endVal) {
				$("div#focal_length_slider").css("display", "none");
				if (customLensUseFlag) {
					$("div#focal_scope_front").css("display", "none");
				}
			} else {
				$("div#focal_length_slider").css("display", "inline-block");

				$("input#range").attr("min", startVal * 10);

				if (endVal > 60) {
					endVal = 60;
					$("div#focal_length_slider").css("display", "none");

					if (customLensUseFlag) {
						$("div#focal_scope_front").css("display", "none");
					}
				}

				$("input#range").attr("max", endVal * 10);
				$("input#range").val($("input#focal_length").val() * 10);
				$("span#start_scope").html(startVal + "mm");
				$("span#end_scope").html(endVal + "mm");

				if (customLensUseFlag) {
					$("div#focal_scope_front").css("display", "inline-block");
					$("input#range_scope").attr("min", startVal * 10);
					$("input#range_scope").attr("max", endVal * 10);
					$("input#range_scope").val($("input#focal_length").val() * 10);
					$("span#start_scope_front").html(startVal + "mm");
					$("span#end_scope_front").html(endVal + "mm");
					$("p#current_lens_name").html(lensName);
				}

				/*var length = ( startVal.split(".") ).length;

				if(( startVal.split(".") ).length > 1){
					window.localStorage.setItem("floatFlag","float");
				}else{
					window.localStorage.setItem("floatFlag","int");
				}*/

				if (lensVal == "183" || lensVal == "001") {
					window.localStorage.setItem("floatFlag", "float");
				} else {
					window.localStorage.setItem("floatFlag", "int");
				}
			}

			updateLensFovs();
			return;
		}
	}
}

function checkAvailableTheiaLens() {
	$("div#theia_validation_note").css("display", "none");

	var lensType = $("select#lens_type").val();
	var focalLength = $("input#focal_length").val();

	var validationFlag = $("form[name='" + lensType + "']").attr("theia");

	if (validationFlag == "false") {
		var obj = $("*").find("div#xml_data_container").find("form");

		for (var i = 0; i < obj.length; i++) {

			if ($(obj[i]).attr("theia") == "true") {
				var minVal = $(obj[i]).attr("flMin");
				var maxVal = $(obj[i]).attr("flMax");

				if (parseFloat(minVal) <= parseFloat(focalLength) && parseFloat(focalLength) <= parseFloat(maxVal)) {
					var lensName = $(obj[i]).attr("display");

					$("strong#from_lens").html(lensName);

					$("div#theia_validation_note").css("display", "block");

					return;
				}
			}
		}
	}
}

function updateImageFovAndResolutionFromLens() {
	var objDistance = window.localStorage.getItem("objDistance");
	var midObjectSightLine = sightLineForDistance(objDistance);
	var lensHFov = window.localStorage.getItem("lensHFov");
	var imageFov = 2 * midObjectSightLine * Math.tan(toRad(lensHFov / 2));

	var lensVFov = window.localStorage.getItem("lensVFov");
	var imageVFov = 2 * midObjectSightLine * Math.tan(toRad(lensVFov / 2));


	/*$("input#txtHFOV").val(imageFov.toFixed(3) + " ft");
	$("input#txtVFOV").val(imageVFov.toFixed(3) + " ft");*/

	var hp = window.localStorage.getItem("current_hp");
	var imageResolution = hp / imageFov;

	if (window.localStorage.getItem("resolution_change_validation") == "true") {
		window.localStorage.setItem("imageFov", imageFov);
		window.localStorage.setItem("imageVFov", imageVFov); //imageFov changed to imageVFov
		var imageFovDisplay = displayFormat(inverseLengthToMetric(imageFov / 1));
		var imageVFovDisplay = displayFormat(inverseLengthToMetric(imageVFov / 1));
		/*$("input#field_view").val( imageFovDisplay );*/
		$("input#txtHFOV").val(imageFovDisplay);
		$("input#txtVFOV").val(imageVFovDisplay);
		/*$("input#img1_FoV").val( imageFovDisplay + " ft");
		$("input#img2_FoV").val( imageFovDisplay + " ft");*/
		window.localStorage.setItem("imageResolution", imageResolution);
		var imageResolutionDisplay = displayFormat(lengthToMetric((imageResolution) / 1));
		/*$("input#img_res").val( imageResolutionDisplay );*/
		$("input#txtImageRes").val(imageResolutionDisplay);
		//$("input#txtImageRes").val( imageResolutionDisplay );
		/*var imageResolutionWithUnit  = imageResolutionDisplay + " pix/ft"
		$("input#txtImageRes").val(imageResolutionWithUnit);*/

	}
}

function sightLineForDistance(d) {
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var returnVal = Math.sqrt((d * d + Math.pow((cameraHeight - personHeight), 2)));
	return returnVal;
}

function updateCameraAngleFromObjectDistanceAndHeight() {
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var objDistance = window.localStorage.getItem("objDistance");
	var dh = cameraHeight - personHeight;
	var cameraAngle = toDeg(Math.atan(dh / objDistance));
	window.localStorage.setItem("cameraAngle", cameraAngle);

	$("input#camera_angle").val(displayFormat(cameraAngle));
}

function updateCameraConfiguration() {

	if (fixedObjectDistance()) {
		updateImageFovAndResolutionFromLens();
		updateCameraAngleFromObjectDistanceAndHeight();
	} else {
		if (fixedImageFov()) {
			if (fixedLens() && typeof hp !== "undefined" && typeof imageFov !== "undefined") {

				var imageResolution = hp / imageFov;
				window.localStorage.setItem("imageResolution", imageResolution);

				updateFocalLength();

				updateLens();
			} else {
				updateLensFovs();
				updateImageFovAndResolutionFromLens();
				updateObjectDistanceFromSightline();
			}
		} else {
			var imageResolution = window.localStorage.getItem("imageResolution");
			setImageResolution(imageResolution);
		}
	}
}

function updateFocalLength() {
	var objDistance = window.localStorage.getItem("objDistance");
	var midObjSightLine = sightLineForDistance(objDistance);
	var sw = window.localStorage.getItem("current_sw");

	distortion(sw);

	var hd = window.localStorage.getItem("hd");
	var imageFov = window.localStorage.getItem("imageFov");
	var lensFocalLength = (sw * (1 - hd) * midObjSightLine) / imageFov;

	window.localStorage.setItem("lensFocalLength", lensFocalLength);

	$("input#focal_length").val(displayFormat(lensFocalLength / 1));

	var customLensUseFlag = $("input#choose_lens").is(":checked") ? true : false;

	if (customLensUseFlag) {
		$("p#current_lens_focal_length").html(displayFormat(lensFocalLength / 1));
	}

}

function distortion(x) {
	maxDistortion(x);

	var maxD = window.localStorage.getItem("maxD");
	var sd = window.localStorage.getItem("current_sd");
	var lensId = $("select#lens_type").val();

	calcHvd(x / sd, maxD, lensId);
}

function maxDistortion(x) {
	var fl = $("input#focal_length").val();
	var lensId = $("select#lens_type").val();
	calcMaxD(x / fl, lensId);
}

function updateObjectDistanceFromSightline() {
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var dh = cameraHeight - personHeight;
	var lensHFov = window.localStorage.getItem("lensHFov");
	var imageFov = window.localStorage.getItem("imageFov");

	var midObjSightline = imageFov / (2 * Math.tan(toRad(lensHFov / 2)));

	if (midObjSightline > dh) {
		objectDistance = Math.sqrt(midObjSightline * midObjSightline - dh * dh);
		window.localStorage.setItem("objDistance", objectDistance);

		var unit = window.localStorage.getItem("unit");
		var objectDistanceDisplay = displayFormat(objectDistance * unit);
		/*$("input#distance").val( objectDistanceDisplay );*/
		$("input#distanceResult").val(objectDistanceDisplay);
	} else {
		objectDistance = 0.1;
		window.localStorage.setItem("objDistance", objectDistance);

		var unit = window.localStorage.getItem("unit");
		var objectDistanceDisplay = displayFormat(objectDistance * unit);
		/*$("input#distance").val( objectDistanceDisplay );*/
		$("input#distanceResult").val(objectDistanceDisplay);
	}
}

function setImageResolution(x) {
	var chooseLens = $("input[type='checkbox']#choose_lens").is(":checked") ? true : false;
	var ignoreChooseLens = ($("div#lens_setting_dialog").css("display") == "block") ? true : false;

	if (chooseLens && !ignoreChooseLens) {
		setFixedLens(false);
		setFixedObjectDistance(true);
		setFixedImageResolution(true);
		setFixedImageFov(false);
	} else {
		setFixedLens(true);
		setFixedObjectDistance(false);
		setFixedImageResolution(true);
		setFixedImageFov(false);
	}

	if (fixedParamsCheck(2)) {
		var imageResolution = x;
		window.localStorage.setItem("imageResolution", imageResolution);

		var hp = window.localStorage.getItem("current_hp");
		var vp = window.localStorage.getItem("current_vp");

		var imageFov = hp / imageResolution;
		var imageVFov = vp / imageResolution;
		var unit = window.localStorage.getItem("unit");
		var imageFovDisplay = displayFormat(imageFov * unit);
		var imageVFovDisplay = displayFormat(imageVFov * unit);
		/*$("input#field_view").val( imageFovDisplay );*/
		$("input#txtHFOV").val(imageFovDisplay);
		$("input#txtVFOV").val(imageVFovDisplay);
		if (fixedLens()) {
			/*$("input#img1_FoV").val( imageFovDisplay + " ft" );
			$("input#img2_FoV").val( imageFovDisplay + " ft");*/
			window.localStorage.setItem("imageFov", imageFov);

			updateObjectDistanceFromSightline();
		} else {
			/*$("input#img1_FoV").val( imageFovDisplay + " ft" );
			$("input#img2_FoV").val( imageFovDisplay + " ft");*/
			window.localStorage.setItem("imageFov", imageFov);

			updateFocalLength();

			updateLens();
		}
	}

}

function fixedParamsCheck(x) {
	fpArg = 1 << x;
	var paramFixed = window.localStorage.getItem("paramFixed");

	if (fpArg & paramFixed) {
		return true;
	} else {
		if (findOnes(paramFixed) < 2) {
			paramFixed |= fpArg;
			return true;
		}
	}
	return false;
}

function findOnes(number) {

	var count = 0;

	while (1) {
		value = number % 2;
		number = (number - value) / 2;
		if (value == 1) count++;
		if (number <= 1) {
			if (number == 1) count++;
			break;
		}
	}

	return count;
}

function lengthToMetric(x) {
	var unit = window.localStorage.getItem("unit");
	var returnVal = x / unit;
	return returnVal;
}

function inverseLengthToMetric(x) {
	var unit = window.localStorage.getItem("unit");
	var returnVal = x * unit;
	return returnVal;
}

function setObjectDistance(x) {
	var chooseLens = $("input[type='checkbox']#choose_lens").is(":checked") ? true : false;
	var ignoreChooseLens = ($("div#lens_setting_dialog").css("display") == "block") ? true : false;

	if (chooseLens && !ignoreChooseLens) {
		setFixedLens(false);
		setFixedObjectDistance(true);
		setFixedImageResolution(true);
		setFixedImageFov(false);
	} else {
		setFixedLens(true);
		setFixedObjectDistance(true);
		setFixedImageResolution(false);
		setFixedImageFov(false);
	}

	var flag = fixedParamsCheck(1);

	if (fixedParamsCheck(1)) {
		objectDistance = x;
		window.localStorage.setItem("objDistance", objectDistance);
		updateImageFovAndResolutionFromLens();
		updateCameraAngleFromObjectDistanceAndHeight();
		updateFocalLengthAndImgFovFromDist();
	}
}

function setImageFov(x) {
	var chooseLens = $("input[type='checkbox']#choose_lens").is(":checked") ? true : false;
	var ignoreChooseLens = ($("div#lens_setting_dialog").css("display") == "block") ? true : false;

	if (chooseLens && !ignoreChooseLens) {
		setFixedLens(false);
		setFixedObjectDistance(true);
		setFixedImageResolution(false);
		setFixedImageFov(true);
	} else {
		setFixedLens(true);
		setFixedObjectDistance(false);
		setFixedImageResolution(false);
		setFixedImageFov(true);
	}

	if (fixedParamsCheck(3)) {
		var imageFov = x;

		window.localStorage.setItem("imageFov", imageFov);

		var hPixel = window.localStorage.getItem("current_hp");
		var imageResolution = hPixel / imageFov;

		window.localStorage.setItem("imageResolution", imageResolution);

		var unit = window.localStorage.getItem("unit");
		var imageResolutionDisplay = displayFormat(imageResolution / unit);

		/*$("input#img_res").val( imageResolutionDisplay );*/
		$("input#txtImageRes").val(imageResolutionDisplay);

		if (fixedLens()) {
			updateObjectDistanceFromSightline();
			updateCameraAngleFromObjectDistanceAndHeight();
		} else {
			updateFocalLength();
		}
	}
}

function setFixedLens(fixedLens) {
	var paramFixed = window.localStorage.getItem("paramFixed");

	if (fixedLens) {
		paramFixed |= (1 << 0);
	} else {
		paramFixed &= ~(1 << 0);
	}

	window.localStorage.setItem("paramFixed", paramFixed);
}

function setFixedObjectDistance(fixedObjectDistance) {
	var paramFixed = window.localStorage.getItem("paramFixed");

	if (fixedObjectDistance) {
		paramFixed |= (1 << 1);
	} else {
		paramFixed &= ~(1 << 1);
	}

	window.localStorage.setItem("paramFixed", paramFixed);
}

function setFixedImageResolution(fixedImageResolution) {
	var paramFixed = window.localStorage.getItem("paramFixed");

	if (fixedImageResolution) {
		paramFixed |= (1 << 2);
	} else {
		paramFixed &= ~(1 << 2);
	}

	window.localStorage.setItem("paramFixed", paramFixed);
}

function setFixedImageFov(fixedImageFov) {
	var paramFixed = window.localStorage.getItem("paramFixed");

	if (fixedImageFov) {
		paramFixed |= (1 << 3);
	} else {
		paramFixed &= ~(1 << 3);
	}

	window.localStorage.setItem("paramFixed", paramFixed);
}

function fixedLens() {
	var paramFixed = window.localStorage.getItem("paramFixed");

	return (paramFixed & (1 << 0)) != 0;
}

function fixedObjectDistance() {
	var paramFixed = window.localStorage.getItem("paramFixed");

	return (paramFixed & (1 << 1)) != 0;
}

function fixedImageResolution() {
	var paramFixed = window.localStorage.getItem("paramFixed");

	return (paramFixed & (1 << 2)) != 0;
}

function fixedImageFov() {
	var paramFixed = window.localStorage.getItem("paramFixed");

	return (paramFixed & (1 << 3)) != 0;
}

function setLensFocalLength(lensFocalLength, firstRun) {
	if(typeof firstRun === undefined) {
		firstRun = false;
	} else {
		firstRun = true;
	}
	var value = $("input#focal_length").val();

	if (((value) * 1) > 2000) {
		alert("Please enter focal length value less than 2000mm!");
		$("input#focal_length").val(0);
	}

	if (((value) * 1) > 60) {
		$("div#focal_length_slider").css("display", "none");
	} else {
		$("div#focal_length_slider").css("display", "inline-block");
	}

	var flag = window.localStorage.getItem("floatFlag");

	if (flag == "float") {
		$("input#range").val(($("input#focal_length").val() * 10).toFixed(1));
	} else {
		$("input#range").val(($("input#focal_length").val() * 10).toFixed(0));
	}

	setFixedLens(true);
	setFixedObjectDistance(true);
	setFixedImageResolution(false);
	setFixedImageFov(false);

	var lensFocalLengthInputVal = lensFocalLength;

	$("input#focal_length").val(lensFocalLengthInputVal);

	updateLensFovs();
	if(firstRun === false) {
		updateLens();
	}
	updateCameraConfiguration();
}

function setLensId(lensId, firstRun) {
	if(typeof firstRun === undefined) {
		firstRun = false;
	} else {
		firstRun = true;
	}
	setFixedLens(true);
	setFixedObjectDistance(true);
	setFixedImageResolution(false);
	setFixedImageFov(false);

	if (fixedParamsCheck(0)) {
		var flMin = $("form[name='" + lensId + "']").attr("flMin");
		var flMax = $("form[name='" + lensId + "']").attr("flMax");
		var lensFocalLength = $("input#focal_length").val();

		window.localStorage.setItem("resolution_change_validation", "true");

		if ((lensFocalLength * 1) < (flMin * 1)) {
			setLensFocalLength(flMin, firstRun);
		} else if ((lensFocalLength * 1) > (flMax * 1)) {
			setLensFocalLength(flMax, firstRun);
		} else {
			// I do not understand this validation, it seems to incorrectly prevent the HFoV from updating
			// window.localStorage.setItem("resolution_change_validation", "false");
			setLensFocalLength(lensFocalLength, firstRun);
		}
	}
}

function updateFocalLengthAndImgFovFromDist() {
	var objDistance = window.localStorage.getItem("objDistance");
	var midObjSightLine = sightLineForDistance(objDistance);
	var sw = window.localStorage.getItem("current_sw");

	distortion(sw);

	var hd = window.localStorage.getItem("hd");
	var imageFov = window.localStorage.getItem("imageFov");

	var lensFocalLength = (sw * (1 - hd) * midObjSightLine) / imageFov;
	//console.log("sw: "+sw+" x (1 - hd): "+(1 - hd)+" x midObjSightLine: "+midObjSightLine+" / imageFov: "+imageFov+" = lensFocalLength: "+lensFocalLength);
	window.localStorage.setItem("lensFocalLength", lensFocalLength);

	$("input#focal_length").val(displayFormat(lensFocalLength));
	$("input#range").val((displayFormat(lensFocalLength)) * 10);

	updateLens();
}