var a = "abc";
a = a + "def";

var b = 5;
var c = 5;
b = 7;

console.log(a, b, c);

var a = 10;
var b = a;
var obj1 = { c: 10, d: "ddd" };
var obj2 = obj1;
console.log("obj1 = obj2", obj2 === obj1);
b = 15;
// 15를 찾고 없으면 데이터를 영역에 할당을 한 후에 b의 값을 변경
// 값이 변경됨
console.log(a === b); // false
obj1.c = 20;
// obj1.c의 값이 변경이 되었을지라도 true
// 왜 ?
// obj1의 값이 변경이 된 것이 아니기 때문
// 별도의 객체 데이터 영역에 할당된 값들이 변경된 것이기 때문이다.
console.log(obj1 === obj2); //true

var user = {
  name: "kim",
  gender: "male",
};

var changeName = function (user, newName) {
  var newUser = user;
  newUser.name = newName;
  return newUser;
};

var user2 = changeName(user, "joo");

if (user !== user2) {
  console.log("정보변경");
}

console.log(user.name, user2.name);
console.log(user === user2);
// 이 코드의 문제점은 원본도 달라짐.

//변경 전과 후에 서로 다른 객체를 바라보게 만들어야함.

// 원본을 달라지지 않게 한 후에 만들기 위해서는
//
var user1 = {
  name: "kim",
  gender: "male",
};

var user2 = Object.assign({}, user1);
user2.name = "lee";

console.log(user1 === user2);

// undefined 와 null
// 1. undefined
// 값을 대입하지 않은 변수
// 객체 내부에 존재하지 않는 프로퍼티에 접근하려고 할 때
// return 문이 없거나 호출되지 않은 함수의 결과
