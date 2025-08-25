//  메모이제이션과 프로토타입 학습을 위한 ReactQuery 구현

class ReactQuery {
  constructor(options = {}) {
    this.cache = new Map();
    this.defaultStaleTime = options.staleTime || 5 * 60 * 1000;
  }

  // 데이터
  // 언제 저장했는지
  // 얼마나 오래 유효한지

  _isCacheValid() {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      staleTime: options.staleTime || this.defaultStaleTime,
      key,
    };

    const cache = this.cache.get(key);
    if (!cache) return false;

    const now = Date.now();
    const staleTime =
      options.staleTime !== undefined
        ? options.staleTime
        : cacheEntry.staleTime;

    const isStale = now - cacheEntry.timestamp > staleTime;

    return !isStale;
  }
}

//프로토타입에 메서드 추가하기

ReactQuery.prototype.fetchQuery = async function (key, fetcher) {
  try {
    // key 확인
    if (!key || typeof key !== "string") {
      throw new Error("key 필수.");
    }
    // fetcher가 함수인지
    if (!fetcher || typeof fetcher !== "function") {
      throw new Error("fetcher는 함수");
    }

    // cache 유효한가
    // -> cache에 저장이 되어 있는지, 시간이 지나진 않았는지

    const checkedCache = this.cache.get(key);

    if (!checkedCache && _isCacheValid) {
      throw new Error("캐시가 존재하지 않음.");
    }

    // key 중복됐는지
    if (this.cache.has(key)) {
      // fetcher skip
      return this.cache.get(key).data;
    }

    this.cache.set(key, cacheEntry);
    return data;
  } catch (error) {
    throw error;
  }
};

ReactQuery.prototype.invalidateQuery = function (key) {
  const cacheEntry = this.cache.get(key);
  if (cacheEntry) {
    cacheEntry.timestamp = 0;
    // 강제로 0으로 만들어서 초기화
  }
};

ReactQuery.prototype.clear = function () {
  this.cache.clear();
};

const client = new ReactQuery();
