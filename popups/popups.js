
window.onload = function(){
	function opendialog(){
			 var obtn = document.getElementById("btsnLogin");
			 //��ȡҳ��ĸ߶ȺͿ��,ʵ���ɰ�
			 var sHeight = document.documentElement.scrollHeight;
			 var sWidth = document.documentElement.scrollWidth;

			 var oMask = document.createElement("div");
			oMask.id = "mask";
			oMask.style.height = sHeight + "px";
			oMask.style.width = sWidth + "px";
			document.body.appendChild(oMask);
			//��������ĸ߶ȺͿ�ȣ�ʵ�ֵ���
			 var wHight = document.documentElement.clientHeight;
			 var oLogin = document.createElement("div");
		 	 oLogin.id = "login";
		 	 oLogin.innerHTML = "<div id='login'><div id ='close'>�رհ�ť</div></div>"
		 	 document.body.appendChild(oLogin);
		 	 //��ȡlogin�ĸ߶ȺͿ��
		 	 var dHight = oLogin.offsetHeight;
		 	 var dWidth = oLogin.offsetWidth;
		 	 //��login��left��top��ֵ
		 	 oLogin.style.left = (sWidth - dWidth)/2+"px";
		 	 oLogin.style.top = (wHight - dHight)/2+"px";
		 	 //�رյ���
		 	$("#close").click(function(){
				$("#mask ,#login").remove();
			});
	}

	$("#btsnLogin").click(function(){
		opendialog();
	});
 }
