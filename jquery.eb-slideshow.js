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
				dir : '', // 图片默认在网站根路径
				data : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAiCAYAAADBEP4dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGNDRDMTQ2RjQzNDQxMUUyQjVFQUVGNEJBQTE5RUIzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGNDRDMTQ3MDQzNDQxMUUyQjVFQUVGNEJBQTE5RUIzOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY0NEMxNDZENDM0NDExRTJCNUVBRUY0QkFBMTlFQjM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY0NEMxNDZFNDM0NDExRTJCNUVBRUY0QkFBMTlFQjM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pnKfeAAACHRJREFUeNrsmlts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"
			}
		}, options);

		return this.each(function () {
			var $div = $(this),
					$imgs = $div.find("." + namespace + "-inner img"),
					imgsLength = $imgs.length,
					btnImg = settings.img.data || (settings.img.dir + "/eb-slideshow-btn.png")

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
			appendToggleBtn($div, $imgs, btnImg)

			// 加入圆形按钮
			appendSelectBtn($div, imgsLength, $imgs, btnImg)

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

			touchSwipe($div[0])
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
				imgsLength = $imgs.length

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
				li       = ""

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
	 * 左右滑动事件
	 */
	function touchSwipe(slideshow) {
		var startX = 0,
			startY = 0,
			endX = 0,
			endY = 0

		if (typeof slideshow !== "object") return

		slideshow.addEventListener("touchstart", function (event) {
			if (event.touches && event.touches.length) {
				var touch = event.touches[0]
				startX = touch.pageX
				startY = touch.pageY
				endX = startX
				endY = startY
			}
		})
		slideshow.addEventListener("touchmove", function (event) {
			if (event.touches && event.touches.length) {
				var touch = event.touches[0]
				endX = touch.pageX
				endY = touch.pageY

				if (startX != endX && startY != endY) {
					var tan = Math.abs((endY - startY) / (endX - startX)),
					tan30 = Math.tan(Math.PI / 6)
					if (tan30 > tan) {
						event.preventDefault()
					}
				}
			}
		})
		slideshow.addEventListener("touchend", function (event) {
			if (endX < startX && Math.abs(endX - startX) > 50) {
				$(".eb-slideshow-right").trigger("click")
			} else if (endX > startX && Math.abs(endX - startX) > 50) {
				$(".eb-slideshow-left").trigger("click")
			}
		})
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
