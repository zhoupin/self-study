//1：object构造函数
var person = new Object();
	person.name = "zz";

//2：对象字面量
var person = {
	naem:"zz";
};
//3:工厂模式
function createPerson (name,age) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.sayName() = function(){
		alert(this.name);
	};
	return o;
}

var Person1 = createPerson("lili","29");

//4:构造函数模式
//4.1原生构造函数-----Object,Array
//4.2自定义构造函数（函数名以大写字母开头）
function Person(name,age){
	this.name = name;
	this.age = age;
	this.sayName = function(){
		alert(this.name);
	};
}
var Person2 = new Person("lili","23");
//constructor构造函数的属性
console.log(Person2.constructor == Person);
//instanceof检查对象的类型
console.log(Person2 instanceof Person);
console.log(Person2 instanceof Object);

//4.3调用函数
//4.3.1当做构造函数调用
var Person3 = new Person("wx","33");
Person3.sayName();
//4.3.2当做普通函数调用
Person("dx","32");
window.sayName();
//4.3.3在另一个对象的作用域中调用
var o = new Object();
Person.call(o,"wangli","43");
o.sayName();

//构造函数的问题？-----每个方法都要在每个实例上重演一遍
Person1.sayName != Person2.sayName

可以通过把函数的定义转移到构造函数外面来解决这个问题------------
function Person(name,age.job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
}
function sayName(){
	alert(this.name);
}
var Person1 = new Person("liji","88","Doctor");
var Person2 = new Person("liji","98","Doctor");


//原型对象
function Person(){
}

Person.prototype.name = "wanm";
Person.prototype.age = "34";
Person.prototype.job = "Doctor";
Person.prototype.sayName = function(){
	alert(this.name);
}
var Person1 = new Person();
Person1.sayName();//wanm
var Person2 = new Person();
Person2.sayName();//wanm
alert(Person1.sayName == Person2.sayName);//ture

// 取到一个对象的原型：
alert(Object.getPrototypeOf(Person1) == Person.prototype) //true

Person1.name = "zhou";
alert(Person1.name)//zhou
alert(Person2.name)//wanm
delete Person1.name;
alert(Person1.name)//wanm

//检查一个属性是存在于实例中还是原型对象中
alert(Person1.hasOwnProperty("name"));//存在于实例中，返回true

//简写原型对象
function Person(){
}
var firend = new Person();
Person.prototype = {
	constructor:Person,
	name:"ewer",
	age:23,
	job:"soft Engineer",
	sayName:function(){
		alert(this.name);
	}
};
firend.sayName();//error

function Person(){
}
Person.prototype = {
	constructor:Person,
	name:"ewer",
	age:23,
	job:"soft Engineer",
	friends:["shely","tom"],
	sayName:function(){
		alert(this.name);
	}
};
var Person1 = new Person;
var Person2 = new Person;
Person1.friends.push("van");
alert(Person1.friends);//"shely,tom,van"
alert(Person1.friends == Person2.friends);//ture

//组合使用构造函数和原型模式
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["lingling","jiajia"];
}
Person.prototype = {
	constructor:Person,
	sayName:function(){
		alert(this.name);
	}
}

var Person1 = new Person("xixi","25","software Engineer");
var Person2 = new Person("huahua","27","Doctor");

Person1.friends.push("nannan");
console.log(Person1.friends);
console.log(Person2.friends);

