$(document).ready(function () {
	/*app picture xml data form setting*/
	var xml = get_xml("xml/appPictures.xml");
	var formObj = $(xml).find("application");
	var targetObj = $("div#xml_data_container_app_picture");

	for (var i = 0; i < formObj.length; i++) {
		var name = $(formObj[i]).attr("display");
		var formAppendAppObj = "<form name='" + $(formObj[i]).attr("display") + "' ></form>"
		targetObj.append(formAppendAppObj);
		/*resolution image obj append*/
		var formAppendResolutionImage = "<form name='resolution_images' id='" + i + "'></form>";
		$("form[name='" + name + "']").append(formAppendResolutionImage);

		var resImages = $(formObj[i]).find("resolution_images").find("resImage");

		for (var j = 0; j < resImages.length; j++) {
			var resImagesAppendObj = "<input type='hidden' name='" + $(resImages[j]).attr("file") + "' resolution = '" + $(resImages[j]).attr("resolution") + "'></input>";
			$("form[name='resolution_images'][id='" + i + "']").append(resImagesAppendObj);
		}

		/*background image obj append*/
		var formAppendBackgroundImage = "<form name='background_image' id='" + i + "' maxFOV='" + $(formObj[i]).find('background_image').attr("maxFOV") + "'></form>";
		$("form[name='" + name + "']").append(formAppendBackgroundImage);
		var formAppendBackgroundImageChild = "<input type='hidden' name='bkgImage' file='" + $(formObj[i]).find('background_image').find('bkgImage').attr('file') + "'>";
		$("form[name='background_image'][id='" + i + "']").append(formAppendBackgroundImageChild);

		/*fov image obj append*/
		var formAppendFovImage = "<form name='FOV_image' id='" + i + "'></form>";
		$("form[name='" + name + "']").append(formAppendFovImage);
		var formAppendFovImageChild = "<input type='hidden' name='FOVImage' file='" + $(formObj[i]).find('FOV_image').find('FOVImage').attr('file') + "'>";
		$("form[name='FOV_image'][id='" + i + "']").append(formAppendFovImageChild);

		/*sample image obj append*/
		var formAppendSampleImage = "<form name='sample_image' id='" + i + "'></form>";
		$("form[name='" + name + "']").append(formAppendSampleImage);
		var formAppendSampleImageChild = "<input type='hidden' name='sampleImage' file='" + $(formObj[i]).find('sample_image').find('sampleImage').attr('file') + "'>";
		$("form[name='sample_image'][id='" + i + "']").append(formAppendSampleImageChild);
	}

	/*set initial backgroud HFOV, fovWindowWd*/
	window.localStorage.setItem("bkgHFov", 140);
	window.localStorage.setItem("fovWindowWd", 454);
	/*draw image fov scale*/
	imageFovLine();

	/*initial elelvation view*/
	var canvas = document.getElementById("canvas_elevation");
	var ctx = canvas.getContext("2d");

	// drawCameraInitial(canvas, ctx, 20);

	/*initial elevation view camera height and camera angle setting*/
	$("input#camera_height").val(0);
	$("input#camera_angle").val(8);

	setCameraHeight(0);
	var canvas = document.getElementById("canvas_elevation");
	var ctx = canvas.getContext("2d");
	drawCamera(canvas, ctx, 20);

	$("input#camera_height").keyup(function (e) {
		if ($(this).val() == '.' || !$(this).val() || parseFloat($(this).val()) < 0 || parseFloat($(this).val()) > 375) {
			$("div#error_message").css("display", "block");
			$(this).val(0);
			$("input#camera_angle").val(8);
			$(this).focus();
		} else {
			$("div#error_message").css("display", "none");
			var cameraHeight = parseFloat($(this).val());

			setCameraHeight(cameraHeight);

			/*elelvation view*/
			var canvas = document.getElementById("canvas_elevation");
			var ctx = canvas.getContext("2d");

			drawCamera(canvas, ctx, 20);
		}
		setTimeout(function () {
			$("div#error_message").css("display", "none");
		}, 1000);
		event.preventDefault();
	});

	$("input#camera_angle").keyup(function () {
		if ($(this).val() == '.' || !$(this).val() || parseFloat($(this).val()) < 0 || parseFloat($(this).val()) > 85) {
			$("div#error_message").css("display", "block");

			$(this).val(0);
			$("input#camera_angle").val(8);
			$(this).focus();
		} else {
			var cameraAngle = parseFloat($(this).val());

			setCameraAngle(cameraAngle);

			/*elelvation view*/
			var canvas = document.getElementById("canvas_elevation");
			var ctx = canvas.getContext("2d");

			drawCamera(canvas, ctx, 20);
		}
		setTimeout(function () {
			$("div#error_message").css("display", "none");
		}, 1000);
		event.preventDefault();
	});
	/*when change elevation view camera height and angle,drawing elevation view */
	/*$("input#camera_height").keyup(function( ) {
		var cameraHeight = parseFloat($(this).val( ));

		setCameraHeight(cameraHeight);

		//elelvation view
		var canvas = document.getElementById("canvas_elevation");
		var ctx = canvas.getContext("2d");

		drawCamera( canvas, ctx, 20 );
	});

	/*$("input#camera_angle").keyup(function( ) {
		var cameraAngle = parseFloat($(this).val( ));

		setCameraAngle(cameraAngle);

		//elelvation view
		var canvas = document.getElementById("canvas_elevation");
		var ctx = canvas.getContext("2d");

		drawCamera( canvas, ctx, 20 );
	});*/

	/*digital zoom*/
	var zoomObj = document.getElementById("digital_zoom");

	zoomObj.addEventListener("input", function () {
		var zoomVal = $(this).val();
		window.localStorage.setItem("zoom", zoomVal);

		getCurrentImageSrcAndDraw();
	}, true);


	/*initial zoom setting*/
	window.localStorage.setItem("zoom", 1);

});

/*define camera height keyup function*/
function cameraHeightKeyUp() {

}
/*
 * image resolution simulation
 * html5 canvas image drawing
*/

/*
 * image resolution
 * */

function drawImageReoslutionCanvas() {
	src = getCurrentImageSrc();
	drawImageResolution(src);
}

function drawImageResolution(src) {
	var canvas = document.getElementById('canvas_resolution');
	var gkhead = new Image;

	gkhead.src = src;

	gkhead.onload = function () {
		canvas.height = canvas.width * (gkhead.height / gkhead.width);
		var scale = window.localStorage.getItem("resolution_scale");

		var digitalZoom = window.localStorage.getItem("zoom");

		var width = gkhead.width;
		var height = gkhead.height;
		var x = (canvas.width - width * scale * digitalZoom) / 2;
		var y = (canvas.height - height * scale * digitalZoom) / 2;

		ctx.drawImage(gkhead, x, y, width * scale * digitalZoom, height * scale * digitalZoom);
	}

	var ctx = canvas.getContext('2d');

	trackTransforms(ctx);

	function redraw() {
		// Clear the entire canvas
		var p1 = ctx.transformedPoint(0, 0);
		var p2 = ctx.transformedPoint(canvas.width, canvas.height);
		ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

		// Alternatively:
		// ctx.save();
		// ctx.setTransform(1,0,0,1,0,0);
		// ctx.clearRect(0,0,canvas.width,canvas.height);
		// ctx.restore();

		var scale = window.localStorage.getItem("resolution_scale");

		var digitalZoom = window.localStorage.getItem("zoom");

		var width = gkhead.width;
		var height = gkhead.height;
		var x = (canvas.width - width * scale * digitalZoom) / 2;
		var y = (canvas.height - height * scale * digitalZoom) / 2;

		ctx.drawImage(gkhead, x, y, width * scale * digitalZoom, height * scale * digitalZoom);
	}

	redraw();

	var lastX = canvas.width / 2, lastY = canvas.height / 2;
	var dragStart, dragged;

	canvas.addEventListener('mousedown', function (evt) {
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';

		var offsetLeft = $("#parent").offset().left;
		var tempEvtPageX = evt.pageX - offsetLeft;
		lastX = evt.offsetX || (tempEvtPageX - canvas.offsetLeft);

		var offsetTop = $("#parent").offset().top;
		var tempEvtPageY = evt.pageY - offsetTop;
		lastY = evt.offsetY || (tempEvtPageY - canvas.offsetTop);

		dragStart = ctx.transformedPoint(lastX, lastY);
		dragged = false;
	}, false);

	canvas.addEventListener('mousemove', function (evt) {
		var offsetLeft = $("#parent").offset().left;
		var tempEvtPageX = evt.pageX - offsetLeft;
		lastX = evt.offsetX || (tempEvtPageX - canvas.offsetLeft);

		var offsetTop = $("#parent").offset().top;
		var tempEvtPageY = evt.pageY - offsetTop;
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);

		dragged = true;

		if (dragStart) {
			var pt = ctx.transformedPoint(lastX, lastY);
			ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
			redraw();
		}
	}, false);

	canvas.addEventListener('mouseup', function (evt) {
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? -1 : 1);
	}, false);

	var scaleFactor = 1.1;
	var zoom = function (clicks) {
		var pt = ctx.transformedPoint(lastX, lastY);
		ctx.translate(pt.x, pt.y);

		var factor = Math.pow(scaleFactor, clicks);
		ctx.scale(factor, factor);
		ctx.translate(-pt.x, -pt.y);
		redraw();
	}
	var i = 1;
	var handleScroll = function (evt) {
		zoom(parseFloat(10));
		/*var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;

		if(parseFloat(delta) > 0) {
			if (delta) zoom(parseFloat(10));
		}else{
			if (delta) zoom(parseFloat(-1));
		}*/

		/*if (delta) zoom(parseFloat(delta) / parseFloat(3));*/

		/*if(parseFloat(delta) > 0) {
			i++;

			$("input#digital_zoom").val(i);

			if(parseFloat(i) <= 0) {
				var j = parseFloat(i) / -1;
				var j = j + 1;
				var displayVal = 1 * Math.pow(0.5,j);

				$("input#digital_zoom").val(displayVal.toFixed(2));
			}

		}else{
			i--;

			$("input#digital_zoom").val(i);

			if(parseFloat(i) <= 0) {
				var j = parseFloat(i) / -1;
				var j = j + 1;
				var displayVal = 1 * Math.pow(0.5,j);

				$("input#digital_zoom").val(displayVal.toFixed(2));
			}
		}*/

		return evt.preventDefault() && false;
	};
	/*canvas.addEventListener('DOMMouseScroll',handleScroll,false);*/
	/*canvas.addEventListener('mousewheel',handleScroll,false);*/
}



// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx) {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function () { return xform; };

	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function () {
		savedTransforms.push(xform.translate(0, 0));
		return save.call(ctx);
	};

	var restore = ctx.restore;
	ctx.restore = function () {
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function (sx, sy) {
		xform = xform.scaleNonUniform(sx, sy);
		return scale.call(ctx, sx, sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function (radians) {
		xform = xform.rotate(radians * 180 / Math.PI);
		return rotate.call(ctx, radians);
	};
	var translate = ctx.translate;
	ctx.translate = function (dx, dy) {
		xform = xform.translate(dx, dy);
		return translate.call(ctx, dx, dy);
	};

	var transform = ctx.transform;
	ctx.transform = function (a, b, c, d, e, f) {
		var m2 = svg.createSVGMatrix();
		m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
		xform = xform.multiply(m2);
		return transform.call(ctx, a, b, c, d, e, f);
	};

	var setTransform = ctx.setTransform;
	ctx.setTransform = function (a, b, c, d, e, f) {
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;

		return setTransform.call(ctx, a, b, c, d, e, f);
	};

	var pt = svg.createSVGPoint();
	ctx.transformedPoint = function (x, y) {
		pt.x = x; pt.y = y;
		return pt.matrixTransform(xform.inverse());
	}
}

function getCurrentImageSrcAndDraw() {
	var imageResolution = window.localStorage.getItem("imageResolution");
	var applicationName = window.localStorage.getItem("applicationName");

	var checkObj = $("form[name='" + applicationName + "']").find("form[name='resolution_images']").find("input");

	for (var i = 0; i < checkObj.length; i++) {
		var maxVal = $(checkObj[i]).attr("resolution");
		var minVal = $(checkObj[i + 1]).attr("resolution");

		if ((minVal * 1) <= (imageResolution * 1) && (imageResolution * 1) <= (maxVal * 1)) {
			var src = "img/" + $(checkObj[i]).attr("name");

			window.localStorage.setItem("resolution_src", src);

			var scale = imageResolution / maxVal;

			window.localStorage.setItem("resolution_scale", scale);

			drawImageResolution(src);
		} else if ((imageResolution * 1) > 1000) {
			var src = "img/" + image_res_1000;

			window.localStorage.setItem("resolution_src", src);

			var scale = imageResolution / 1000;

			window.localStorage.setItem("resolution_scale", scale);

			drawImageResolution(src);
		} else if ((imageResolution * 1) < 12) {
			var src = "img/" + image_res_12;

			window.localStorage.setItem("resolution_src", src);

			var scale = imageResolution / 12;

			window.localStorage.setItem("resolution_scale", scale);

			drawImageResolution(src);
		}
	}
}

function getInitialImageSrcAndDraw() {
	var imageResolution = window.localStorage.getItem("imageResolution");
	var applicationName = window.localStorage.getItem("applicationName");

	var src = image_res_120;
	var src = "img/" + src;

	window.localStorage.setItem("resolution_src", src);

	var scale = 0.492;

	window.localStorage.setItem("resolution_scale", scale);

	drawImageResolution(src);
}

function getPageOffsetLeft(object) {
	var x;

	x = object.offsetLeft;

	if (object.offsetParent != null)
		x += getPageOffsetLeft(object.offsetParent);
	return x;
}

function getPageOffsetTop(object) {
	var x;

	x = object.offsetTop;

	if (object.offsetParent != null)
		x += getPageOffsetTop(object.offsetParent);
	return x;
}

/*
 * image field of view
 * */

function drawFovImageMask() {
	var lensHFov = window.localStorage.getItem("lensHFov");
	var lensVFov = window.localStorage.getItem("lensVFov");
	var bkgHFov = window.localStorage.getItem("bkgHFov");
	var fovWindowWd = window.localStorage.getItem("fovWindowWd");

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
}

/*
 * elevation view
 * */
/* ??duplicate functions?? */
/*
function setCameraHeight( cameraHeight ) {
	var  cameraHeight = cameraHeight;
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraAngle = window.localStorage.getItem("cameraAngle");
	var objectDistance = window.localStorage.getItem("objDistance");

	window.localStorage.setItem("cameraHeight",cameraHeight);

	if(parseFloat(cameraHeight) < parseFloat(personHeight + 0.3)) {
		cameraHeight = personHeight
	}

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	if(fixedObjectDistance(  )) {
		r = (cameraHeight - personHeight) / Math.tan(toRad(cameraAngle));
		setObjectDistance(r);
	}else{
		cameraAngle = toDeg(Math.atan(cameraHeight - personHeight) / objectDistance);

		window.localStorage.setItem("cameraAngle",cameraAngle);

		updateCameraConfiguration( );
	}

}

function setCameraAngle( cameraAngle ) {
	var cameraAngle = cameraAngle;
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var objectDistance = window.localStorage.getItem("objDistance");

	window.localStorage.setItem("cameraAngle",cameraAngle);

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	if(fixedObjectDistance(  )) {
		r = (cameraHeight - personHeight) / Math.tan(toRad(cameraAngle));

		setObjectDistance(r);
	}else{
		cameraHeight = objectDistance * Math.tan(toRad(cameraAngle)) + personHeight;

		window.localStorage.setItem("cameraHeight",cameraHeight);

		updateCameraConfiguration( );
	}
} */

function farObjectDistance() {
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraAngle = window.localStorage.getItem("cameraAngle");
	var lensVFov = window.localStorage.getItem("lensVFov");

	var far = parseFloat(cameraHeight - personHeight) / parseFloat(Math.tan(toRad(parseFloat(cameraAngle) - lensVFov / 2)));

	return far;
}

function farObjectDistanceInitial() {
	var cameraHeight = 3;
	var personHeight = 1.56;
	var cameraAngle = 8.19426;
	var lensVFov = 84;

	var far = (cameraHeight - personHeight) / Math.tan(toRad(cameraAngle - lensVFov / 2));

	return far;
}

function nearObjectDistance() {
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraAngle = window.localStorage.getItem("cameraAngle");
	var lensVFov = window.localStorage.getItem("lensVFov");

	var near = (cameraHeight - personHeight) / Math.tan(toRad(parseFloat(cameraAngle) + lensVFov / 2));

	return near;
}

function nearObjectDistanceInitial() {
	var cameraHeight = 3;
	var personHeight = 1.56;
	var cameraAngle = 8.19426;
	var lensVFov = 84;

	var near = (cameraHeight - personHeight) / Math.tan(toRad(parseFloat(cameraAngle) + lensVFov / 2));

	return near;
}

function drawCamera(canvas, ctx, height) {
	img = new Image();

	img.onload = function () {
		canvas.height = 150;

		ctx.drawImage(img, 0, 0, 128, 98, 0, parseFloat(height), 70, 70);

		drawElevationLayout();

		drawRect(canvas, ctx);

		var d = nearObjectDistance();

		drawPersonAndLineAt(d);

		ctx.moveTo(60, 55);
		ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
		ctx.stroke();

		drawPersonNear(canvas, ctx);

		d = window.localStorage.getItem("objDistance");

		drawPersonAndLineAt(d);

		ctx.moveTo(60, 55);
		ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
		ctx.stroke();

		drawPersonNear(canvas, ctx);

		d = farObjectDistance();

		if (parseFloat(d) <= 0 || !isFinite(d)) {
			var fitRectSizeWidth = window.localStorage.getItem("drawRectWidth");
			var lensVFov = window.localStorage.getItem("lensVFov");
			var cameraAngle = window.localStorage.getItem("cameraAngle");

			var y = fitRectSizeWidth * Math.tan(toRad(lensVFov / 2 - cameraAngle));

			window.localStorage.setItem("y", 55 - y);
			window.localStorage.setItem("x", parseFloat(fitRectSizeWidth) + 60);

			ctx.moveTo(60, 55);
			ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
			ctx.stroke();

		} else {
			var d = farObjectDistance();

			drawPersonAndLineAt(d);

			ctx.moveTo(60, 55);
			ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
			ctx.stroke();

			drawPersonNear(canvas, ctx);
		}

		/*draw number*/
		drawNumber(canvas, ctx);
	}

	img.src = "img/Security-Camera-lg.png";
}

function drawCameraInitial(canvas, ctx, height) {
	img = new Image();

	img.onload = function () {
		/*setting the canvas height*/
		canvas.height = 150;

		/*draw camera image*/
		ctx.drawImage(img, 0, 0, 128, 98, 0, parseFloat(height), 70, 70);

		/*draw x, y edge line*/
		drawElevationLayoutInitial();

		drawRect(canvas, ctx);

		/*draw line1*/
		var d = nearObjectDistanceInitial();

		drawPersonAndLineAtInitial(d);

		ctx.moveTo(60, 55);
		ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
		ctx.stroke();

		drawPersonNear(canvas, ctx);

		/*draw line2*/
		d = 33 / 3.280;

		drawPersonAndLineAtInitial(d);

		ctx.moveTo(60, 55);
		ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
		ctx.stroke();

		drawPersonNear(canvas, ctx);

		/*draw line3*/
		d = farObjectDistanceInitial();

		if (parseFloat(d) <= 0 || !isFinite(d)) {
			var fitRectSizeWidth = window.localStorage.getItem("drawRectWidth");
			var lensVFov = 84;
			var cameraAngle = 8.19426;
			var y = fitRectSizeWidth * Math.tan(toRad(lensVFov / 2 - cameraAngle));

			window.localStorage.setItem("y", 55 - y);
			window.localStorage.setItem("x", parseFloat(fitRectSizeWidth) + 60);

			ctx.moveTo(60, 55);
			ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
			ctx.stroke();


		} else {
			var d = farObjectDistanceInitial();

			drawPersonAndLineAt(d);

			ctx.moveTo(60, 55);
			ctx.lineTo(parseFloat(window.localStorage.getItem("x")), parseFloat(window.localStorage.getItem("y")));
			ctx.stroke();

			drawPersonNear(canvas, ctx);
		}

		/*draw number*/
		drawNumberInitial(canvas, ctx);

	}

	img.src = "img/Security-Camera-lg.png";
}

function drawPersonNear(canvas, ctx) {
	var imageScale = window.localStorage.getItem("imageScale");
	var x = parseFloat(window.localStorage.getItem("x"));
	var y = parseFloat(window.localStorage.getItem("y"));
	var imageWidth = 125 * imageScale;
	var imageHeight = 224 * imageScale;

	img1 = new Image();

	img1.onload = function () {
		ctx.drawImage(img1, 0, 0, 125, 224, x - imageWidth / 2, y, imageWidth, imageHeight);
	}

	img1.src = "img/person04.png";
}

function scaleAspectFit(w1, h1, w2, h2) {
	var hScale = h2 / h1;
	var wScale = w2 / w1;

	return (w1 * hScale > w2) ? wScale : hScale;
}

function drawElevationLayout() {
	var d = farObjectDistance();
	var objectDistance = window.localStorage.getItem("objDistance");
	var cameraHeight = window.localStorage.getItem("cameraHeight");

	if (d <= 0 || d == "Infinity") {
		d = objectDistance / 0.4;
	}

	var drawRectWidth = 200;
	var drawRectHeight = 60;

	var distScale = scaleAspectFit(d, cameraHeight, drawRectWidth, drawRectHeight);
	/*	if(distScale * cameraHeight < 40) {
			distScale = 40 / cameraHeight;
			d = drawRectWidth / distScale;
		}*/

	window.localStorage.setItem("distScale", distScale);
	window.localStorage.setItem("drawRectOriginX", 60);
	window.localStorage.setItem("drawRectOriginY", 55);
	window.localStorage.setItem("drawRectWidth", distScale * d);
	window.localStorage.setItem("drawRectHeight", distScale * cameraHeight);
}

function drawElevationLayoutInitial() {
	var d = farObjectDistanceInitial();
	var objectDistance = 33 / 3.280;
	var cameraHeight = 3;

	if (d <= 0 || d == "Infinity") {
		d = objectDistance / 0.4;
	}

	var drawRectWidth = 200;
	var drawRectHeight = 60;

	var distScale = scaleAspectFit(d, cameraHeight, drawRectWidth, drawRectHeight);

	/*	if(distScale * cameraHeight < 40) {
			distScale = 40 / cameraHeight;
			d = drawRectWidth / distScale;
		}*/

	window.localStorage.setItem("distScale", distScale);
	window.localStorage.setItem("drawRectOriginX", 60);
	window.localStorage.setItem("drawRectOriginY", 55);
	window.localStorage.setItem("drawRectWidth", distScale * d);
	window.localStorage.setItem("drawRectHeight", distScale * cameraHeight);
}

function drawRect(canvas, ctx) {
	var drawRectOriginX = window.localStorage.getItem("drawRectOriginX");
	var drawRectOriginY = window.localStorage.getItem("drawRectOriginY");
	var drawRectWidth = window.localStorage.getItem("drawRectWidth");
	var drawRectHeight = window.localStorage.getItem("drawRectHeight");

	ctx.beginPath();

	ctx.moveTo(drawRectOriginX, drawRectOriginY);
	ctx.lineTo(drawRectOriginX, parseFloat(drawRectOriginY) + parseFloat(drawRectHeight));
	ctx.stroke();

	ctx.moveTo(drawRectOriginX, parseFloat(drawRectOriginY) + parseFloat(drawRectHeight));
	ctx.lineTo(parseFloat(drawRectOriginX + drawRectWidth), parseFloat(drawRectOriginY) + parseFloat(drawRectHeight));
	ctx.stroke();
}

function drawPersonAndLineAt(d) {
	var personHeight = window.localStorage.getItem("personHeight");
	var drawRectHeight = window.localStorage.getItem("drawRectHeight");
	var distScale = window.localStorage.getItem("distScale");
	var maxY = 55 + parseFloat(drawRectHeight);
	var x = distanceInViewCoordinates(d);
	var y = maxY - personHeight * distScale;
	var imageScale = personHeight * distScale / 224;

	window.localStorage.setItem("x", x);
	window.localStorage.setItem("y", y);
	window.localStorage.setItem("imageScale", imageScale);
}

function drawPersonAndLineAtInitial(d) {
	var personHeight = 1.56;
	var drawRectHeight = window.localStorage.getItem("drawRectHeight");
	var distScale = window.localStorage.getItem("distScale");
	var maxY = 55 + parseFloat(drawRectHeight);
	var x = distanceInViewCoordinates(d);
	var y = maxY - personHeight * distScale;
	var imageScale = personHeight * distScale / 224;

	window.localStorage.setItem("x", x);
	window.localStorage.setItem("y", y);
	window.localStorage.setItem("imageScale", imageScale);
}

function distanceInViewCoordinates(d) {
	var fitRectOriginX = window.localStorage.getItem("drawRectOriginX");
	var distScale = window.localStorage.getItem("distScale");

	return parseFloat(fitRectOriginX) + parseFloat(d * distScale);
}

function drawNumber(canvas, ctx) {
	var drawRectOriginY = window.localStorage.getItem("drawRectOriginY");
	var drawRectHeight = window.localStorage.getItem("drawRectHeight");
	var y = parseFloat(drawRectOriginY) + parseFloat(drawRectHeight) + 10;

	var farObjectDistanceInUserUnit = inverseLengthToMetric(farObjectDistance());
	var objectDistance = window.localStorage.getItem("objDistance");
	var distScale = window.localStorage.getItem("distScale");

	if (farObjectDistanceInUserUnit <= 0 || !isFinite(farObjectDistanceInUserUnit)) {
		farObjectDistanceInUserUnit = inverseLengthToMetric(objectDistance) / 0.4;
	}

	var interval = 10;
	var dx = lengthToMetric(interval) * distScale;
	var i = 0;

	for (; interval > 5 && (dx < 30 || dx > 60);) {
		if (dx > 60) {
			interval -= 5;
		} else if (dx < 30) {
			interval += 5;
		}

		dx = lengthToMetric(interval) * distScale;
	}

	var steps = farObjectDistanceInUserUnit / interval;
	var x = 60 + dx - 10;

	ctx.font = "bold 10px Arial";

	/*draw resolution distance text*/
	ctx.fillText("Distance", 0, parseFloat(y));
	ctx.fillText("Resolution", 0, parseFloat(y) + 10);

	var symbol = window.localStorage.getItem("unitSymbol");
	var distanceSymbol = symbol;
	var resolutionSymbol = "pix/" + symbol;

	ctx.fillText(distanceSymbol, 400, parseFloat(y));
	ctx.fillText(resolutionSymbol, 400, parseFloat(y) + 10);

	var d = interval;

	for (var i = 1; i <= steps; i++, x += dx, d += interval) {
		if (x < 454 - 100) {
			ctx.fillText(d, x, y);

			var res = pixelResolutionAtDistance(lengthToMetric(d));

			ctx.fillText(lengthToMetric(res).toFixed(0), x, parseFloat(y) + 10);
		}
	}
}

function drawNumberInitial(canvas, ctx) {

	var drawRectOriginY = window.localStorage.getItem("drawRectOriginY");
	var drawRectHeight = window.localStorage.getItem("drawRectHeight");
	var y = parseFloat(drawRectOriginY) + parseFloat(drawRectHeight) + 10;

	var farObjectDistanceInUserUnit = inverseLengthToMetric(farObjectDistanceInitial());
	var objectDistance = 33 / 3.280;
	var distScale = window.localStorage.getItem("distScale");

	if (farObjectDistanceInUserUnit <= 0 || !isFinite(farObjectDistanceInUserUnit)) {
		farObjectDistanceInUserUnit = inverseLengthToMetric(objectDistance) / 0.4;
	}

	var interval = 10;
	var dx = lengthToMetric(interval) * distScale;

	for (; interval > 5 && (dx < 30 || dx > 60);) {
		if (dx > 60) {
			interval -= 5;
		} else if (dx < 30) {
			interval += 5;
		}

		dx = lengthToMetric(interval) * distScale;
	}

	var steps = farObjectDistanceInUserUnit / interval;
	var x = 60 + dx - 10;

	ctx.font = "bold 10px Arial";

	/*draw resolution distance text*/
	ctx.fillText("Distance", 0, parseFloat(y));
	ctx.fillText("Resolution", 0, parseFloat(y) + 10);

	ctx.fillText("ft", 400, parseFloat(y));
	ctx.fillText("pix/ft", 400, parseFloat(y) + 10);

	var d = interval;

	for (var i = 1; i <= steps; i++, x += dx, d += interval) {
		if (x < 454 - 100) {

			ctx.fillText(d, x, y);

			var res = pixelResolutionAtDistanceInitial(lengthToMetric(d));

			ctx.fillText((lengthToMetric(res)).toFixed(0), x, parseFloat(y) + 10);
		}
	}
}

function pixelResolutionAtDistance(d) {
	var sw = window.localStorage.getItem("current_sw");
	var fl = window.localStorage.getItem("lensFocalLength");
	var lensId = $("select#lens_type").val();
	var cameraHeight = window.localStorage.getItem("cameraHeight");
	var personHeight = window.localStorage.getItem("personHeight");
	var vp = window.localStorage.getItem("current_vp");
	var pp = window.localStorage.getItem("current_pp");
	var sd = window.localStorage.getItem("current_sd");
	var pp = pp / 1000;

	calcMaxD(sw / fl, lensId);

	var maxD = window.localStorage.getItem("maxD");

	var sightLine = Math.sqrt(d * d + (cameraHeight - personHeight) * (cameraHeight - personHeight));

	var rpix1 = 0;
	var rpix2 = rpix1 + parseFloat(pp);

	calcHvd(2 * rpix1 / sd, maxD, lensId);

	var hd = window.localStorage.getItem("hd");
	var pos1 = rpix1 * (1 - hd);

	calcHvd(2 * rpix1 / sd, maxD, lensId);

	var hd = window.localStorage.getItem("hd");

	var pos2 = rpix2 * (1 - hd);

	return 1 / ((sightLine / fl) * (pos2 - pos1));
}

function pixelResolutionAtDistanceInitial(d) {
	var sw = 5.76;
	var fl = 1.8;
	var lensId = "183";
	var cameraHeight = 3;
	var personHeight = 1.56;
	var vp = 1080;
	var pp = 0.003;
	var sd = 6.61;

	var maxD = 0;

	var sightLine = Math.sqrt(d * d + (cameraHeight - personHeight) * (cameraHeight - personHeight));

	var rpix1 = 0;
	var rpix2 = rpix1 + parseFloat(pp);

	var pos1 = rpix1 * (1 - 0);
	var pos2 = rpix2 * (1 - 0);

	return 1 / ((sightLine / fl) * (pos2 - pos1));
}

function setCameraHeight(cameraHeight) {
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraAngle = window.localStorage.getItem("cameraAngle");
	var cameraHeight = lengthToMetric(cameraHeight);

	window.localStorage.setItem("cameraHeight", cameraHeight);

	/* camera height error checking */
	/*	$("input#camera_height").attr("style","color: #000; font-weight: normal; font-style: inherit; text-decoration: none; width: 80px;");
		$("div#error_message").css("display","none");*/

	if (parseFloat(cameraHeight) < parseFloat(personHeight)) {
		cameraHeight = parseFloat(personHeight);

		/* camera height error block */
		/*		$("strong#available_number").html(inverseLengthToMetric(cameraHeight).toFixed(1));

				window.localStorage.setItem("cameraHeight",cameraHeight);

				$("input#camera_height").attr("style","color: red; font-weight: bold; font-style: italic; text-decoration: line-through; width: 80px;");
				$("div#error_message").css("display","block");*/

		/*		setTimeout(function(){
					$("input#camera_height").val(inverseLengthToMetric(cameraHeight).toFixed(1));}
				,3000);*/
	}

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	if (fixedObjectDistance()) {
		var r = (cameraHeight - personHeight) / Math.tan(toRad(parseFloat(cameraAngle)));

		setObjectDistance(r);
	} else {
		var objectDistance = window.localStorage.getItem("objDistance");

		cameraAngle = toDeg(Math.atan((cameraHeight - personHeight) / objectDistance));

		var display = 0;

		if (parseFloat(cameraAngle) > 20) {
			display = cameraAngle.toFixed(0);
		} else if (2.0 < parseFloat(cameraAngle) <= 20) {
			display = cameraAngle.toFixed(1);
		} else if (parseFloat(cameraAngle) <= 2.0) {
			display = cameraAngle.toFixed(2);
		}
		$("input#camera_angle").val(display);

		window.localStorage.setItem("cameraAngle", cameraAngle);

		updateCameraConfiguration();
	}
}

function setCameraAngle(cameraAngle) {
	var cameraAngle = cameraAngle;
	var personHeight = window.localStorage.getItem("personHeight");
	var cameraHeight = window.localStorage.getItem("cameraHeight");

	window.localStorage.setItem("cameraAngle", cameraAngle);

	setFixedLens(false);
	setFixedObjectDistance(false);
	setFixedImageResolution(true);
	setFixedImageFov(true);

	if (fixedObjectDistance()) {
		var r = (cameraHeight - personHeight) / Math.tan(toRad(parseFloat(cameraAngle)));

		setObjectDistance(r);
	} else {
		var objectDistance = window.localStorage.getItem("objDistance");

		cameraHeight = objectDistance * Math.tan(toRad(cameraAngle)) + parseFloat(personHeight);

		$("input#camera_height").val(inverseLengthToMetric(cameraHeight).toFixed(0));

		window.localStorage.setItem("cameraHeight", cameraHeight);

		updateCameraConfiguration();
	}
}

function imageFovLine() {
	var y = 20;
	var fov = window.localStorage.getItem("bkgHFov");
	var width = window.localStorage.getItem("fovWindowWd");
	var canvas = document.getElementById('canvas_fov_scale');
	var ctx = canvas.getContext("2d");
	ctx.font = "bold 10px Arial";

	var j = 0;

	for (var i = 0; i <= fov / 2.0; i += 10) {
		j++;
		var deg = 2 * i;
		var d = (width) * 0.5 / Math.tan(toRad(0.5 * fov));
		var x = width * 0.5 - d * Math.tan(toRad(i));

		ctx.beginPath();

		ctx.moveTo(x, 0);
		ctx.lineTo(x, y);
		ctx.stroke();

	}

	imageFovLineNumber();
}

function imageFovLineNumber() {
	var y = 10;
	var fov = window.localStorage.getItem("bkgHFov");
	var width = window.localStorage.getItem("fovWindowWd");
	var canvas = document.getElementById('canvas_fov_scale_number');
	var ctx = canvas.getContext("2d");
	ctx.font = "bold 10px Arial";

	var j = 0;

	for (var i = 0; i <= fov / 2.0; i += 10) {
		j++;
		var deg = 2 * i;
		var d = (width) * 0.5 / Math.tan(toRad(0.5 * fov));
		var x = width * 0.5 - d * Math.tan(toRad(i));


		var deg = deg + "'";
		if (j % 2 == 0 && i != fov / 2.0) continue;
		ctx.fillText(deg, x, y);
	}
}