const stackListArray = [
  {
    liked: false,
    name: "삼성전자",
    price: 72300,
    change_rate: 1.25,
  },
  {
    liked: false,
    name: "카카오",
    price: 45000,
    change_rate: -0.8,
  },
  {
    liked: false,
    name: "네이버",
    price: 198000,
    change_rate: 0.45,
  },
  {
    liked: false,
    name: "현대차",
    price: 221000,
    change_rate: -1.1,
  },
  {
    liked: false,
    name: "LG에너지솔루션",
    price: 390500,
    change_rate: 2.33,
  },
  {
    liked: false,
    name: "POSCO홀딩스",
    price: 510000,
    change_rate: -0.65,
  },
  {
    liked: false,
    name: "한화솔루션",
    price: 52300,
    change_rate: 1.15,
  },
  {
    liked: false,
    name: "셀트리온",
    price: 154000,
    change_rate: -2.1,
  },
];

const stackList = document.getElementById("stack-list");
const likeList = document.getElementById("like-list");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("add-price");
const changeRateInput = document.getElementById("changeRate");
const addBtn = document.getElementById("add-btn");

function addStack() {
  const nameValue = nameInput.value.trim();
  const priceValue = priceInput.value.trim();
  const changeRateValue = changeRateInput.value.trim();

  if (nameValue !== "" && priceValue !== "" && changeRateValue !== "") {
    stackListArray.push({
      name: nameValue,
      price: priceValue.toLocaleString(),
      change_rate: changeRateValue,
      liked: false,
    });
    nameInput.value = "";
    priceInput.value = "";
    changeRateInput.value = "";
    renderList();
  }
}

addBtn.addEventListener("click", addStack);

// 전체 주식 계좌 리스트
function renderList() {
  stackList.innerHTML = "";
  // 좋아요한 애들을 먼저 위로 보낸 후에 map
  stackListArray
    // 반환값이 0보다 크면 b를 우선하여 정렬
    // true 1 - false 0
    .sort((a, b) => b.liked - a.liked)
    .map((item) => {
      const tr = createRow(item);
      stackList.appendChild(tr);
    });
}

// 좋아요 계좌 리스트
function renderLikeList() {
  const likeItem = stackListArray.filter((item) => item.liked);

  likeList.innerHTML = "";
  likeItem.map((item) => {
    const tr = createRow(item);
    likeList.appendChild(tr);
  });

  // 좋아요 계좌 이름만
  const likeName = document.getElementById("like-name-list");
  const likeNameList = likeItem.map((item) => item.name);
  likeName.innerHTML = "";
  likeNameList.map((item) => {
    const li = document.createElement("li");
    likeName.appendChild(li);
    li.textContent = item;
  });
}

// 모두 좋아요 했나요?
function isAllLike() {
  const isAllLikeValue = stackListArray.every((item) => item.liked);

  const allLikeli = document.getElementById("all-like-li");
  let span = document.querySelector(".all-like-span");

  if (!span) {
    span = document.createElement("span");
    allLikeli.appendChild(span);
    span.className += "all-like-span";
  }

  span.textContent = isAllLikeValue ? "⭕️" : "❌";
}

// 하나 이상 좋아요 했나요?
function isOneLike() {
  const isOneLikeValue = stackListArray.some((item) => item.liked);
  const oneLikeli = document.getElementById("one-like-li");
  let span = document.querySelector(".like-span");

  if (!span) {
    span = document.createElement("span");
    oneLikeli.appendChild(span);
    span.className += "like-span";
  }
  span.textContent = isOneLikeValue ? "⭕️" : "❌";
}

// 좋아요 비율
function calculateRatio() {
  const likeCount = stackListArray.filter((item) => item.liked);
  const average = Math.ceil((likeCount.length / stackListArray.length) * 100);

  const avergeLi = document.getElementById("ratio-li");
  let span = document.querySelector(".ratio-span");

  if (!span) {
    span = document.createElement(span);
    avergeLi.appendChild(span);
    span.className += "ratio-span";
  }

  span.textContent = `${average}%`;
}

// 중복되는 테이블 그리기
function createRow(item) {
  const tr = document.createElement("tr");

  //좋아요 버튼
  const like = document.createElement("td");
  const isLikeBtn = document.createElement("button");
  like.appendChild(isLikeBtn);
  tr.appendChild(like);
  isLikeBtn.textContent = item.liked ? "💙" : "🤍";

  isLikeBtn.addEventListener("click", () => {
    item.liked = !item.liked;
    renderList();
    renderLikeList();
    isOneLike();
    isAllLike();
    calculateRatio();
  });

  const name = document.createElement("td");
  tr.appendChild(name);
  name.textContent = item.name;

  const price = document.createElement("td");
  tr.appendChild(price);
  price.textContent = item.price.toLocaleString();

  const changeRate = document.createElement("td");
  tr.appendChild(changeRate);

  changeRate.textContent =
    item.change_rate > 0 ? `+${item.change_rate}%` : `${item.change_rate}%`;

  if (item.change_rate < 0) changeRate.className += "blue-color";

  const deleteTd = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.className += "delete-btn";
  tr.appendChild(deleteTd);
  deleteTd.appendChild(deleteBtn);
  deleteBtn.textContent = "삭제";

  deleteBtn.addEventListener("click", () => {
    const index = stackListArray.indexOf(item);
    const isConfirm = confirm("삭제할까요");
    if (isConfirm) {
      if (index !== -1) stackListArray.splice(index, 1);
      renderList();
      renderLikeList();
      calculateRatio();
    }
  });
  return tr;
}

renderList();
renderLikeList();
isAllLike();
isOneLike();
calculateRatio();
