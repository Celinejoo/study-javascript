const stackListArray = [
  {
    id: 1,
    liked: false,
    name: "삼성전자",
    price: 72300,
    change_rate: 1.25,
  },
  {
    id: 2,
    liked: false,
    name: "카카오",
    price: 45000,
    change_rate: -0.8,
  },
  {
    id: 3,
    liked: false,
    name: "네이버",
    price: 198000,
    change_rate: 0.45,
  },
  {
    id: 4,
    liked: false,
    name: "현대차",
    price: 221000,
    change_rate: -1.1,
  },
  {
    id: 5,
    liked: false,
    name: "LG에너지솔루션",
    price: 390500,
    change_rate: 2.33,
  },
  {
    id: 6,
    liked: false,
    name: "POSCO홀딩스",
    price: 510000,
    change_rate: -0.65,
  },
  {
    id: 7,
    liked: false,
    name: "한화솔루션",
    price: 52300,
    change_rate: 1.15,
  },
  {
    id: 8,
    liked: false,
    name: "셀트리온",
    price: 154000,
    change_rate: -2.1,
  },
];

window.onload = function () {
  if (stackListArray.length !== 0) {
    renderAll();
  }
};

// 주식 추가하기
function addStack() {
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("add-price");
  const changeRateInput = document.getElementById("changeRate");

  if (!nameInput || !priceInput || !changeRateInput) return;

  const nameValue = nameInput.value.trim();
  const priceValue = priceInput.value.trim();
  const changeRateValue = changeRateInput.value.trim();

  if (nameValue !== "" && priceValue !== "" && changeRateValue !== "") {
    stackListArray.push({
      name: nameValue,
      price: Number(priceValue).toLocaleString(),
      change_rate: Number(changeRateValue),
      liked: false,
    });
    nameInput.value = "";
    priceInput.value = "";
    changeRateInput.value = "";
    renderList();
  } else {
    alert("input 값 입력");
  }

  const addBtn = document.getElementById("add-btn");
  addBtn.addEventListener("click", addStack);
}

// 전체 주식 계좌 리스트
function renderList() {
  const stackList = document.getElementById("stack-list");
  if (!stackList) return;
  stackList.innerHTML = "";
  // 좋아요한 애들을 먼저 위로 보낸 후에 map
  // 반환값이 0보다 크면 b를 우선하여 정렬
  // true 1 - false 0
  stackListArray
    .sort((a, b) => b.liked - a.liked)
    .map((item) => {
      const tr = createRow(item);
      stackList.appendChild(tr);
    });
}

// 좋아요 계좌 리스트
function renderLikeList() {
  const likeItem = stackListArray.filter((item) => item.liked);
  const likeList = document.getElementById("like-list");
  if (!likeList) return;
  likeList.innerHTML = "";
  likeItem.map((item) => {
    const tr = createRow(item);
    likeList.appendChild(tr);
  });

  // 좋아요 계좌 이름만
  const likeName = document.getElementById("like-name-list");
  const likeNameList = likeItem.map((item) => item.name);
  if (!likeName) return;
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
function getLikeRatio() {
  const likeCount = stackListArray.filter((item) => item.liked);
  const average = Math.ceil((likeCount.length / stackListArray.length) * 100);

  const avergeLi = document.getElementById("ratio-li");
  let span = document.querySelector(".ratio-span");

  if (!span) {
    span = document.createElement("span");
    avergeLi.appendChild(span);
    span.className += "ratio-span";
  }

  span.textContent = `${average}%`;
}

// 삭제하기
function deleteStock(id) {
  const index = stackListArray.findIndex((item) => item.id === id);
  const isConfirm = confirm("삭제할까요");
  if (isConfirm && index !== -1) {
    stackListArray.splice(index, 1);
    renderAll();
  }
}

// 중복되는 테이블 그리기
function createRow(item) {
  const tr = document.createElement("tr");

  //좋아요 버튼
  const likeCell = document.createElement("td");
  const isLikeBtn = document.createElement("button");
  likeCell.appendChild(isLikeBtn);
  tr.appendChild(likeCell);
  isLikeBtn.textContent = item.liked ? "💙" : "🤍";

  isLikeBtn.addEventListener("click", () => {
    item.liked = !item.liked;
    renderAll();
  });

  const nameCell = document.createElement("td");
  tr.appendChild(nameCell);
  nameCell.textContent = item.name;

  const priceCell = document.createElement("td");
  tr.appendChild(priceCell);
  priceCell.textContent = item.price?.toLocaleString();

  const changeRateCell = document.createElement("td");
  tr.appendChild(changeRateCell);

  changeRateCell.textContent =
    item.change_rate > 0 ? `+${item.change_rate}%` : `${item.change_rate}%`;

  if (item.change_rate < 0) changeRateCell.className += "blue-color";

  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.className += "delete-btn";
  tr.appendChild(deleteCell);
  deleteCell.appendChild(deleteBtn);
  deleteBtn.textContent = "삭제";

  deleteBtn.addEventListener("click", () => {
    deleteStock(item.id);
  });
  return tr;
}

function renderAll() {
  renderList();
  renderLikeList();
  isAllLike();
  isOneLike();
  getLikeRatio();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    stackListArray,
    addStack,
    renderList,
    renderLikeList,
    createRow,
    isOneLike,
    isAllLike,
    getLikeRatio,
    deleteStock,
    resetStackList: () => {
      stackListArray.length = 0;
      stackListArray.push(
        { liked: false, name: "삼성전자", price: 72300, change_rate: 1.25 },
        { liked: false, name: "카카오", price: 45000, change_rate: -0.8 },
        { liked: false, name: "네이버", price: 198000, change_rate: 0.45 },
        { liked: false, name: "현대차", price: 221000, change_rate: -1.1 },
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
        { liked: false, name: "한화솔루션", price: 52300, change_rate: 1.15 }
      );
    },
  };
}
