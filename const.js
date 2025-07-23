// 이름을 불변하게 유지하는 방법
var v = 1;
v = 2;
console.log("v :", v);

const c = 1;

// 값을 불변하게 유지하는 방법
// 자바스크립트에서 변수가 어떠한 방식으로 가르치는가를 알아야 불변값을 이해할 수 있음

// 데이터 타입
// 1. 기본형 number, string, boolean, null, undfined, Symbol
// 2. 참조형 Object, Array, function,

// 데이터 타입에 따라 동작 방식이 다르다.
var v1 = 1;
var v2 = 1;
// v1 === v2
console.log(v1 === v2);

// 참조형은 별도의 데이터를 생성한다.
// 객체는 바뀔 수 있는 가변성을 가지고 있기 때문이다.
var o1 = { name: "kim" };
var o2 = { name: "kim" };

console.log(o1 === o2);

// 원본 데이터를 건들지 않고 변경하고 싶다.
// o1의 값을 복제해서 사용한다.
var o1 = { name: "kim" };
var o2 = Object.assign({}, o1);
o2.name = "lee";

// 중첩된 객체의 복사
// 배열 concat()
// o2만 변경, o1 원본은 그대로
var o1 = { name: "kim", score: [1, 2] };
var o2 = Object.assign({}, o1);
o2.score = o2.score.concat();
console.log(o1 === o2, o1.scrore === o2.score);

// 불변의 함수 만들기

function fn(person) {
  person.name = "lee";
}

var o1 = { name: "kim" };
fn(o1);
console.log(o1);

// 원본을 바꾸지 않으려면 복제
// 복제본을 리턴

// freez : 값 자체를 바꾸지 못하는거
// const : 이름이 가리키는 값을 못 바꾸는 하는 것
