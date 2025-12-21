
import axios from './axios';

export async function getSubjectsList(currentPage = 1, pageSize = 8, orderBy = 'name') {
  const offset = (currentPage - 1) * pageSize;
  const params = { limit: pageSize, offset, sort: orderBy };

  const response = await axios.get('/subjects/', { params }); // 각 불러올 항목 주소로입력 param은 api 확인
  const data = response.data;

  return data;
}

// 상기와 같은 형식으로 아래에 하나씩 작성해서 사용하시면 될것같습니다.

export async function getQuestionsList(subjectId, currentCards, loadCount) {
  // 질문을 불러올 피드의 ID, 현재까지 불러온 질문의 갯수, 한번에 불러올 질문의 갯수
  const params = { limit: loadCount, offset: currentCards };

  const response = await axios.get(`/subjects/${subjectId}/questions/`, { params });
  const data = response.data;

  return data;
}

export async function createSubject(name) {
  const response = await axios.post('/subjects/', { name });
  return response.data;
}

