import axios from './axios';

export async function getSubjectsList(currentPage = 1, pageSize = 8, orderBy = 'name') {
  const offset = (currentPage - 1) * 8;
  const params = { limit: pageSize, offset, sort: orderBy };

  const response = await axios.get('/subjects/', { params }); // 각 불러올 항목 주소로입력 param은 api 확인
  const data = response.data;

  return data;
}

// 상기와 같은 형식으로 아래에 하나씩 작성해서 사용하시면 될것같습니다.
