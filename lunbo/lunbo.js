window.onload = function(){
	var container = document.getElementById('content');
	var list = document.getElementById('list');
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1;
	var animated = false;//存放动画时是否再运行的状态
	var timer;
//显示按钮样式
	function showButton(){
		//去掉其他按钮的样式之后
		for(i=0;i<buttons.length;i++){
			if(buttons[i].className == 'on'){
				buttons[i].className = '';
				break;
			}
		}
		//再添加当前按钮的样式
		buttons[index-1].className = 'on';
	}
//动画效果
	function animate(offset){
		animated = true;
		var newleft = parseInt(list.style.left) + offset;
		//通过调节time和intervar可以调整动画的效果，比如它们相等时，没有动画。
		var time = 300;//位移总的时间
		var intervar = 10;//位移间隔时间
		var speed = offset/(300/10);//每次的位移量
		function go(){
		 	if((speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)){
		 		list.style.left = parseInt(list.style.left) + speed +'px';
		 		setTimeout(go,intervar);
		 	}else{
		 			animated = false;
					list.style.left = newleft + 'px';
					//注意比较的时候要数字和数字比较（类型要一致）
					if(newleft > -600){
						list.style.left = -2400 + 'px';
					}
					if(newleft < -2400){
						list.style.left = -600 + 'px';
					}
		 	}
		 }

		go();

	}
//自动播放
	function play(){
		timer = setInterval(function(){
			next.onclick();
		},3000);
	}
//停止自动播放
	function stop(){
		// debugger;
		clearInterval(timer);
	}
//点击右箭头
	next.onclick = function(){
		// list.style.left = parseInt(list.style.left)-600 +'px';
		if(index == 4){
			index = 1;
		}else{

		index += 1;
		}
		showButton();
		//判断是否在动画执行中，如果不在，则运行动画
		if(!animated){
			animate(-600);
		}

	}
//点击左箭头
	prev.onclick = function(){
		if(index == 1){
			index = 4;
		}else{			
			index -= 1;
		}
		if(!animated){
			animate(600);
		}
		showButton();
		// list.style.left = parseInt(list.style.left)+600 +'px';
	}
//点击小按钮
	for(var i = 0 ;i<buttons.length;i++){
		buttons[i].onclick = function(){
			if(this.className == 'on'){
				return;
			}
			//自定义属性index通过getAttribute来获取
			//得到点击按钮的index值，然后计算它代表图片与当前按钮表示的图片的距离，计算他们的偏移量
			var myIndex = parseInt(this.getAttribute('index'));
			var offset = -600 * (myIndex-index);
			if(!animated){
				animate(offset);
			}
			//将当前图片的index赋给index
			index = myIndex;
			showButton();	
			// debugger;可以调试代码是否运行到这里
		}
	}
//执行自动播放和停止自动播放
	container.onmouseover = stop;
	container.onmouseout = play;
	play();
}