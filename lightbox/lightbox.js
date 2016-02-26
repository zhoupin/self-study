;
(function($) {
	// alert("1");
	var LightBox = function() {
		// alert("2");
		var self = this;
		//创建遮罩和弹出框
		this.popupMask = $('<div id="G-lightbox-mask"></div>');
		this.popupWin = $('<div id="G-lightbox-popup"></div>');

		//保存body
		this.bodyNode = $(document.body);
		//渲染剩余的dom，并且插入到body
		this.renderDOM();

		this.picViewArea = this.popupWin.find("div.light-box-pic-view"); //图片预览区域
		this.popupPic = this.popupWin.find("img.lightbox-image"); //图片
		this.picCaptionArea = this.popupWin.find("div.lightbox-pic-caption"); //图片描述区域
		this.nextBtn = this.popupWin.find("span.lightbox-next-btn"); //按钮
		this.prevBtn = this.popupWin.find("span.lightbox-prev-btn"); //按钮

		this.captionText = this.popupWin.find("p.lightbox-pic-desc"); //题目
		this.crrentIndex = this.popupWin.find("span.lightbox-of-index"); //索引
		this.closeBtn = this.popupWin.find("span.light-close-btn"); //关闭按钮



		//准备开发事件委托，获取组数据
		//不能用下面的方法获取---直接获取，这样，后面加载出来的图片（比如用懒加载实现）还需要从新再去获取--所以我们使用事件委托机制；
		// var lightbox = $(".js-lightbox[data-role = lightbox]");
		// lightbox.click(function(){
		// 	alert("1");
		// });
		//把事件委托到body
		this.groupName = null;
		this.groupData = []; //放置同一组数据
		this.bodyNode.delegate(".js-lightbox,[data-role = lightbox]", "click", function(e) {
			// alert(this);
			//阻止事件冒泡,点击图片不希望触发到其他的click
			e.stopPropagation();
			//获取组名
			// alert($(this).attr("data-group"));
			var currentGroupName = $(this).attr("data-group");
			if (currentGroupName != self.groupName) {
				self.groupName = currentGroupName;
				// alert(currentGroupName);
				//根据当前组名获取同一组数据
				self.getGroup();
			};
			//初始化弹窗
			self.initPopup($(this));

		});

	};
	LightBox.prototype = {
		loadPicSize: function(sourceSrc) {
			var self = this;
			// console.log(sourceSrc);
			this.preLoadImg(sourceSrc, function() {

				// alert("ok");
				self.popupPic.attr("src", sourceSrc);
				var picWidth = self.popupPic.width();
				var picHeight = self.popupPic.height();
				// console.log(picHeight,picWidth);
				//获取到了图片的宽度和高度---传给一个函数改变图片的宽度和高度
				self.changePic(picWidth, picHeight);


			});
		},
		changePic: function(width, height) {
			var self = this,
				windowWidth = $(window).width(),
				windowHeight = $(window).height();

			//过滤一下图片的宽度和高度---如果图片的宽高比大于视图，取一个小的



			this.picViewArea.animate({
				width: width,
				height: height
			});
			this.popupWin.animate({
				width: width,
				height: height,
				marginLeft: -(width) / 2,
				top: (windowHeight - height) / 2
			}, function() {
				self.popupPic.css({
					width: width,
					height: height
				}).fadeIn();
				self.picCaptionArea.fadeIn();
			});
		},
		preLoadImg: function(src, callback) {
			var img = new Image();
			if (!!window.ActiveXObject) {
				img.onreadystatechange = function() {
					if (this.readyState == 'complete') {
						callback();
					}
				}
			} else {
				img.onload = function() {
					callback();
				}
			}
			img.src = src;
		},
		showMaskAndPopup: function(sourceSrc, currentId) {
			// console.log(sourceSrc);
			var self = this;
			this.popupPic.hide();
			this.picCaptionArea.hide();
			this.popupMask.fadeIn();
			var winWidth = $(window).width(),
				winHeight = $(window).height();
			this.picViewArea.css({
				width: winWidth / 2,
				height: winHeight / 2
			});

			var viewHeight = winHeight / 2 + 10;

			this.popupWin.fadeIn();
			this.popupWin.css({
				width: winWidth / 2 + 10,
				height: winHeight / 2 + 10,
				marginLeft: -(winWidth / 2 + 10) / 2,
				top: -viewHeight
			}).animate({
				top: (winHeight - viewHeight) / 2
			}, function() {
				//加载图片
				self.loadPicSize(sourceSrc);
			});
			//根据当前点击元素的id获取在当前组别的索引

			this.index = this.getIndexOf(currentId);
			// console.log(this.index);
			// console.log(this.index);打印出来点击的Deal的索引值

			var grouDatalength = this.groupData.length;
			// console.log(grouDatalength);
			if (grouDatalength > 1) {
				// this.nextBtn this.prevBtn
				if (this.index === 0) {
					this.prevBtn.addClass("disabled");
					this.nextBtn.removeClass("disabled");
				} else if (this.index === grouDatalength - 1) {
					this.nextBtn.addClass("disabled");
					this.prevBtn.removeClass("disabled");
				} else {
					this.prevBtn.removeClass("disabled");
					this.nextBtn.removeClass("disabled");
				}
			} else {
				this.prevBtn.addClass("disabled");
				this.nextBtn.addClass("disabled");
			}
		},
		getIndexOf: function(currentId) {
			var index = 0;

			$(this.groupData).each(function(i) {
				index = i;
				if (this.id === currentId) {
					return false;
				}
			});

			return index;
		},
		initPopup: function(curentObj) {
			var self = this;
			sourceSrc = curentObj.attr("data-source"),
				currentId = curentObj.attr("data-id");

			this.showMaskAndPopup(sourceSrc, currentId);
		},
		getGroup: function() {
			var self = this;
			//根据当前的组别名称获取页面中所有相同组别的对象
			var groupList = this.bodyNode.find("*[data-group = " + this.groupName + "]");
			// alert(groupList.size());
			//清空数组的数据
			self.groupData.length = 0;
			groupList.each(function() {
				self.groupData.push({
					src: $(this).attr("data-source"),
					id: $(this).attr("data-id"),
					caption: $(this).attr("data-caption")
				});
			});
			// console.log(self.groupData);
		},
		renderDOM: function() {
			// alert("1");
			var strDom = '<div class="light-box-pic-view">' +
				'<span class="lightbox-btn lightbox-prev-btn"></span>' +
				'<img  class ="lightbox-image"  src="img/1.jpg">' +
				'<span class="lightbox-btn lightbox-next-btn"></span>' +
				'</div>' +
				'<div class="lightbox-pic-caption">' +
				'<div class="lightbox-caption-area">' +
				'<p class="lightbox-pic-desc">题目</p>' +
				'<span class="lightbox-of-index">当前索引:0 of 0</span>' +
				'</div>' +
				'<span class="light-close-btn"></span>' +
				'</div>';
			//插入到popupWin
			this.popupWin.html(strDom);
			//把遮罩和弹出框插入到body
			this.bodyNode.append(this.popupMask, this.popupWin);
		}
	}
	window['LightBox'] = LightBox;
})(jQuery);