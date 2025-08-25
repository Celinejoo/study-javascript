import { beforeEach, test, expect } from "vitest";
import {
  addStack,
  stackListArray,
  renderList,
  renderLikeList,
  createRow,
  isOneLike,
  isAllLike,
  getLikeRatio,
  deleteStock,
} from "./stocklist.js";

beforeEach(() => {
  document.body.innerHTML = `
   <input type="text" id="name" value="" />
    <input type="number" id="add-price" value="" />
    <input type="text" id="changeRate" value="" />
    <ul id="stack-list"></ul>
    <ul id="like-list"></ul>
     <button id="add-btn"></button>
    <tbody id="stack-list"></tbody>
    <ul id="like-name-list"></ul>
    <tbody id="like-list"></tbody>
    <li id="one-like-li">좋아요를 하나 이상 했나요?</li>
    <li id="all-like-li">모든 주식을 좋아요 했나요?</li>
    <li id="ratio-li">좋아요 주식 비율</li>
  `;
  stackListArray.length = 7;
});

test(`주식리스트 배열의 갯수가 0이 아니면 주식 리스트가 그려진다,
   정렬의 기준은 좋아요한 주식 순이다.`, () => {
  renderList();
});

test("input에 값이 하나라도 비어 있으면 alert이 뜬다", () => {
  document.getElementById("name").value = "";
  document.getElementById("add-price").value = "50000";
  document.getElementById("changeRate").value = "2.5";
  addStack();
});

test("input에 값을 입력 후 버튼을 클릭하면 주식리스트의 마지막에 추가된다. ", () => {
  document.getElementById("name").value = "삼성전자";
  document.getElementById("add-price").value = "50000";
  document.getElementById("changeRate").value = "2.5";
  document.getElementById("stackList");

  addStack();
  renderList();
  expect(stackListArray.length).toBe(8);
  expect(stackListArray[7]).toEqual({
    name: "삼성전자",
    price: "50,000",
    change_rate: 2.5,
    liked: false,
  });
});

test("deleteStock 에 특정 주식의 아이디를 넘기면 주식 목록에서 삭제된다", () => {
  deleteStock(stackListArray);
});

test("하얀하트를 클릭하면 파란하트로 변경되며 liked의 값이 true로 변경된다.", () => {
  createRow(stackListArray);
});

test(`사용자가 좋아요한 주식의 이름들과 좋아요한 주식 리스트 테이블이 출력된다.
   파란하트를 클릭하면 하얀하트로 변경되며 좋아요 리스트에서는 지워진다.`, () => {
  renderLikeList();
});

test("사용자가 좋아요를 하나 이상했다면 O가 출력되며 좋아요가 없다면 X로 출력된다.", () => {
  isOneLike();
});

test("사용자가 모두 좋아요를 했다면 O가 출력되고 아니라면 X가 출력된다.", () => {
  isAllLike();
});

test("전체 주식의 배열에서 좋아요한 주식의 비율을 계산한다.", () => {
  getLikeRatio();
});

// 동작 점검
// 데이터에 따른 시나리오
