
window.onload = function(){
	function opendialog(){
			 var obtn = document.getElementById("btsnLogin");
			 //获取页面的高度和宽度,实现蒙版
			 var sHeight = document.documentElement.scrollHeight;
			 var sWidth = document.documentElement.scrollWidth;

			 var oMask = document.createElement("div");
			oMask.id = "mask";
			oMask.style.height = sHeight + "px";
			oMask.style.width = sWidth + "px";
			document.body.appendChild(oMask);
			//可视区域的高度和宽度，实现弹窗
			 var wHight = document.documentElement.clientHeight;
			 var oLogin = document.createElement("div");
		 	 oLogin.id = "login";
		 	 oLogin.innerHTML = "<div id='login'><div id ='close'>关闭按钮</div></div>"
		 	 document.body.appendChild(oLogin);
		 	 //获取login的高度和宽度
		 	 var dHight = oLogin.offsetHeight;
		 	 var dWidth = oLogin.offsetWidth;
		 	 //给login的left和top赋值
		 	 oLogin.style.left = (sWidth - dWidth)/2+"px";
		 	 oLogin.style.top = (wHight - dHight)/2+"px";
		 	 //关闭弹窗
		 	$("#close").click(function(){
				$("#mask ,#login").remove();
			});
	}

	$("#btsnLogin").click(function(){
		opendialog();
	});
 }
