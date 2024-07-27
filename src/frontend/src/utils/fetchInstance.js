const fetchInstance = async (url, { method = 'GET', headers = {}, body = null, queryParams = {} } = {}) => {
  // Construct URL with query parameters
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  console.log(headers);

  // Set up fetch options
  const fetchOptions = {
      method,
      headers: {
          'Content-Type': 'application/json',
          ...headers, // Merge custom headers with default headers
      },
      credentials: 'include', // Include credentials (cookies) with the request
  };

  if (body) {
      fetchOptions.body = JSON.stringify(body); // Ensure body is a JSON string
  }

  // Perform fetch
  let response;
  try {
      response = await fetch(fullUrl, fetchOptions);

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

      return response.json(); // Parse JSON response
  } catch (error) {
      console.error('Fetch error:', error);
      throw error;
  }
};

export default fetchInstance;
