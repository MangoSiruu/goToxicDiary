/* fetch 함수 인스턴스 */
const fetchInstance = async (url, options = {}) => {
  


  /* 이거 나중에 다시 써야 됨 */
  let response;
  if (options === 'GET') {
    response = await fetch(url);

  } else if (options === 'DELETE') {
    const fetchOptions = {
      method: 'DELETE',
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // credentials: "include",
    };
    response = await fetch(url, fetchOptions);
  } else if (options === 'POST') {
    const fetchOptions = {
      method: 'POST',
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // credentials: "include",
    };
    response = await fetch(url, fetchOptions);
  } else if (options === 'PUT') {
    const fetchOptions = {
      method: 'PUT',
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // credentials: "include",
    };
    response = await fetch(url, fetchOptions);
  }


  




  if (!response.ok) {
    if (response.status === 401) {
        throw new Error("Unauthorized: 인증 정보를 전달하지 않은 경우");
    } else if (response.status === 400) {
        throw new Error("Bad Request: 입력 형식이 잘못된 경우");
    } else if (response.status === 500) {
        throw new Error("Internal Server Error: 서버 내부 오류");
    } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  /* json 형식으로 반환함! */
  return response.json();
};

export default fetchInstance;
