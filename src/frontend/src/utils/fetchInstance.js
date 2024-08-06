const fetchInstance = async (url, { method = {}, body = null, queryParams = {} } = {}) => {
  // 미리 초기화 선언
  let response;
  let bodies;

  // queryString ? 은 인자로 받은게 있으면 완성시키고 받은게 없으면 null
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // 보낼 JSON 바디가 들어있을 경우
  if (body) {
    bodies = JSON.stringify(body);
  }

  try {
    response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: bodies,
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: 인증 정보를 전달하지 않은 경우');
      } else if (response.status === 400) {
        throw new Error('Bad Request: 입력 형식이 잘못된 경우');
      } else if (response.status === 500) {
        throw new Error('Internal Server Error: 서버 내부 오류');
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchInstance;
