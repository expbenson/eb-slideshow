;(function ($) {
	var namespace = "myPlugin",
			methods = {}

	methods.init = function (options) {
		// 初始化配置
		var settings = $.extend(true, {
			css : {
				"background-color" : "#EEE",
				"border-radius"    : "5px",
				"padding"          : "10px"
			}
		}, options);

		return this.each(function () {
			var $div = $(this),
					$imgs = $div.find(".myPlugin-inner img"),
					imgsLength = $imgs.length

			if (imgsLength <= 0) {
				return false
			}

			// 加入切换图片按钮
			appendToggleBtn($div)

			// 加入插件样式
			pluginCSS($div, settings)

			// 计算图片Size
			computeImgSize($div, $imgs)
			
		})
	}

	/**
	 * Display the first image
	 */
	function showImg() {
		// console.log(this.data("origin"))
		this.attr("src", this.data("origin"))
	}

	/**
	 * 添加切换图片的（左右）按钮
	 */
	function appendToggleBtn($div) {
		var btnClass = namespace + "-btn",
				$btn

		$div.append('<div class="' + btnClass + '">\
									<div>\
										<a href="#" class="' + namespace + '-left"><i class="icon-chevron-left"></i></a>\
									</div>\
									<div>\
										<a href="#" class="' + namespace + '-right"><i class="icon-chevron-right"></i></a>\
									</div>\
								</div>')

		$btn = $div.children("." + btnClass)

		$btn.children().css({
			"position" : "absolute",
			"top"      : "100px"
		})
		$btn.children("div:first-child").css({
			"left"     : 0,
		})
		$btn.children("div:last-child").css({
			"right"    : 0,
		})

		var showImgIndex = 0
		$("." + btnClass + " a").on("click." + namespace, function (event) {
			var $clickBtn = $(this)

			$imgs.eq(showImgIndex).fadeOut()

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

			var $nextImg = $imgs.eq(showImgIndex)
			$nextImg.fadeIn()

			var src
			(src = $nextImg.attr("data-origin")) && $nextImg.attr("src", src).removeAttr("data-origin")
			return false
		})
	}

	/**
	 * 设置插件样式
	 */
	function pluginCSS($pluginDiv, settings) {
		$pluginDiv.css($.extend(settings.css, {
			"position" : "relative"
		})).fadeIn("slow").children("div:first-child").css("text-align", "center")
	}

	/**
	 * 计算图片尺寸
	 */
	function computeImgSize($pluginDiv, $imgs) {
		var imgMaxWidth  = $pluginDiv.width(),
				imgMaxHeight = $(window).height()

		$imgs.each(function (index, elem) {
			var $img = $(elem)

			$img.css("max-width", imgMaxWidth - 50)
			$img.css({
				"max-width" : imgMaxWidth - 50,
				"max-height" : imgMaxHeight - 50
			})
			if (0 === index) showImg.call($img)
			else $img.hide()
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