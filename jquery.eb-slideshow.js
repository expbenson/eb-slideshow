;(function ($) {
	var namespace = "eb-slideshow",
			methods = {},
			$slideshow

	methods.init = function (options) {
		// 初始化配置
		var settings = $.extend(true, {
			css : {
				"background-color" : "#EEE",
				"border-radius"    : "5px",
				"padding"          : "10px"
			},
			img : {
				dir : '' // 图片默认在网站根路径
			}
		}, options);

		return this.each(function () {
			var $div = $(this),
					$imgs = $div.find("." + namespace + "-inner img"),
					imgsLength = $imgs.length

			if (imgsLength <= 0) {
				return false
			}

			$div.hide()
			$imgs.hide()
			loadImg($imgs.eq(0)).show().on("load", function (event) {
				var top = $(this).height() / 2,
						$btn = $("." + namespace + "-left, ." + namespace + "-right")

				// console.log($btn)
				$("." + namespace + "-left, ." + namespace + "-right").parent().css("top", top + "px")
			})

			// 加入切换图片按钮
			appendToggleBtn($div, $imgs, settings.img.dir)

			// 加入圆形按钮
			appendSelectBtn($div, imgsLength, $imgs, settings.img.dir)

			// 加入插件样式
			pluginCSS($div, settings)

			// 计算图片Size
			computeImgSize($imgs, function (size) {
				pluginSize = size
				// console.log("ComputeImgSize", pluginSize)
				// $(imgs).off("load." + namespace)
			})

			// 绑定Resize事件
			// pluginResize.call(this, pluginSize, $imgs, function () {
			// 	console.log(pluginSize)
			// })

			// 延时载入图片
			lazyLoadImg(Array.prototype.slice.call($imgs, 1))

			$(window).on("resize", function (event) {
				(function (method, context, event) {
					clearTimeout(method.tID)
					method.tID = setTimeout(function () {
						method.call(context, event, $div, $imgs)
					}, 200)
				})(winResizeEvent, this, event, $div, $imgs)
			})
		})
	}

	/**
	 * 延时载入图片
	 */
	function lazyLoadImg(imgs, delay) {
		var $imgs = $(imgs)
		delay = ((delay > 0) && delay) || 500

		setTimeout(function () {
			var $singleImg,
					src

			for (var i = 0, len = $imgs.length; i < len; i += 1) {
				loadImg($imgs.eq(i))
			}
		}, delay)
		return $imgs
	}

	/**
	 * Load the image
	 */
	function loadImg($img) {
		var src

		;(src = $img.attr("data-origin")) && $img.attr("src", src).removeAttr("data-origin")
		return $img
	}

	/**
	 * 添加切换图片的（左右）按钮
	 */
	function appendToggleBtn($div, $imgs, imgPath) {
		var btnClass   = namespace + "-btn",
				$btn,
				imgsLength = $imgs.length,
				imgPath    = imgPath + "/eb-slideshow-btn.png"

		$div.append('<div class="' + btnClass + '">\
									<div>\
										<a href="#" class="' + namespace + '-left"><span style="background-image: url(' + imgPath + '); background-position: 0 0; display: block; width: 21px; height: 34px;"></span><!-- <i class="icon-chevron-left"></i> --></a>\
									</div>\
									<div>\
										<a href="#" class="' + namespace + '-right"><span style="background-image: url(' + imgPath + '); background-position: -63px 0; display: block; width: 21px; height: 34px;"></span></a>\
									</div>\
								</div>')

		$btn = $div.children("." + btnClass)

		$btn.children().css({
			"position" : "absolute",
			"top"      : "100px"
		})
		$btn.children("div:first-child").css({
			"left"     : "10px",
		})
		$btn.children("div:last-child").css({
			"right"    : "10px",
		})

		// var showImgIndex = 0
		$("." + btnClass + " a").on("click." + namespace, function (event) {
			var $clickBtn = $(this),
					showImgIndex = $div.data("currentImgIndex") || 0

			$imgs.eq(showImgIndex).stop().fadeOut(function () {
				if ($clickBtn.hasClass(namespace + "-left")) {
					if (showImgIndex <= 0) {
						showImgIndex = imgsLength - 1
					} else {
						showImgIndex -= 1
					}
				} else if ($clickBtn.hasClass(namespace + "-right")) {
					if (showImgIndex >= imgsLength - 1) {
						showImgIndex = 0
					} else {
						showImgIndex += 1
					}
				}
				highlightBtn.call($div, showImgIndex)

				var $nextImg = $imgs.eq(showImgIndex)
				$nextImg.fadeIn()

				var src
				;(src = $nextImg.attr("data-origin")) && $nextImg.attr("src", src).removeAttr("data-origin")
			})

			return false
		})
	}

	/**
	 * 添加圆形按钮
	 */
	function appendSelectBtn($div, imgCount, $imgs, imgPath) {
		var $ul      = $("<ul></ul>"),
				li       = "",
				imgPath  = imgPath + "/eb-slideshow-btn.png"

		imgCount = imgCount || 1
		for (var i = 0; i < imgCount; i += 1) {
			li += '<li></li>'
		}
		$ul.append(li)
		$div.append($('<div class="' + namespace + '-select"></div>').append($ul)).css("text-align", "center")
		$div.find("." + namespace + "-select ul").css({
			"list-style" : "none",
			"margin"     : 0,
			"height"     : "21px",
			"padding"    : "10px 0"
		}).find("li").css({
			"display"             : "inline-block",
			"width"               : "21px",
			"height"              : "21px",
			"background-image"    : "url(" + imgPath + ")"
		})
		highlightBtn.call($div, 0)

		$ul.find("li").on("click", function (event) {
			var $li    = $(event.target),
					$allLi = $li.parent().children()
			for (var i = $allLi.length - 1; i >= 0; i -= 1) {
				if ($li[0] === $allLi[i]) {
					var currentIndex = parseInt($div.data("currentImgIndex"))
					$imgs.eq(currentIndex).stop().fadeOut(function () {
						currentIndex = i
						$imgs.eq(currentIndex).fadeIn()
						highlightBtn.call($div, currentIndex)
					})
					break;
				}
			}
		})
	}

	/**
	 * 设置插件样式
	 */
	function pluginCSS($pluginDiv, settings) {
		$pluginDiv.css($.extend(settings.css, {
			"position" : "relative",
			"box-sizing" : "border-box",
			"-webkit-box-sizing" : "border-box",
			"-moz-box-sizing" : "border-box"
		})).fadeIn("slow").children("div:first-child").css("text-align", "center")
	}

	/**
	 * 计算图片尺寸
	 */
	function computeImgSize($imgs, cb) {
		var loadedCount = 0,
				imgCount = $imgs.length

		// $imgs.on("load", function (event) {
		// 	loadedCount += 1
		// 	console.log(loadedCount, imgCount)

		// 	if (loadedCount >= imgCount) {
		// 		var maxWidth  = 0,
		// 				maxHeight = 0,
		// 				$img

		// 		for (var i = imgCount - 1; i >= 0; i-= 1) {
		// 			$img = $imgs.eq(i)
		// 			maxWidth = Math.max(maxWidth, $img.width())
		// 			maxHeight = Math.max(maxHeight, $img.height())
		// 		}

		// 		cb({
		// 			width  : maxWidth,
		// 			height : maxHeight + 20
		// 		})
		// 	}
		// 	console.log(this, "Loaded.")
		// })
		$imgs.each(function (index, elem) {
			var $img = $(elem)

			$img.css({
				"max-width"  : "80%",
				"max-height" : "640px"
			})
		})
	}

	/**
	 * 整理插件高度
	 */
	function pluginResize(pluginSize, $imgs, cb) {
		var $div = $(this)

		var resizeEvent = function (event) {
			var $window = $(this)

			console.log(pluginSize, $window.height())
			pluginSize.height = (pluginSize.height && Math.min($window.height(), pluginSize.height)) || $window.height()
			// console.log("Param", pluginSize)
			$div.css("height", pluginSize.height)
			$imgs.css("max-height", pluginSize.height - 20)
		}
		
		$(window).on("resize." + namespace, function (event) {
			(function (method, context) {
				clearTimeout(method.tID)
				method.tID = setTimeout(function () {
					method.call(context, event)
				}, 300)
			})(resizeEvent, this)
		})

		$(window).trigger("resize")
	}

	/**
	 * 窗口resize触发的事件
	 */
	function winResizeEvent(event, $slideshow, $imgs) {
		var btnHeight = $imgs.eq(0).height() / 2
		// 调整左右按钮的高度
		console.log($imgs.eq(0).height(), btnHeight)
		$slideshow.find("." + namespace + "-left,." + namespace + "-right").css("top", btnHeight)
	}

	/**
	 * 高亮指定的btn
	 */
	function highlightBtn(highlightIndex) {
		var $ebSlideshowSelect =  $(".eb-slideshow-select li")
		$ebSlideshowSelect.each(function (index, elem) {
			if (index === highlightIndex) {
				$(elem).css("background-position", "-42px 0")
			} else {
				$(elem).css("background-position", "-21px 0")
			}
		})

		this.data("currentImgIndex", highlightIndex)
	}

	/**
	 * namespace
	 */
	$.fn[namespace] = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
		} else if ("object" === typeof method || !method) {
			return methods.init.apply(this, arguments)
		} else {
			$.error("Method " + method + " does not exist on jQuery." + namespace)
		}
	}

	/**
	 * Init at once
	 */
	$(document).ready(function ($) {
		$("." + namespace)[namespace]()
	})
})(jQuery)
