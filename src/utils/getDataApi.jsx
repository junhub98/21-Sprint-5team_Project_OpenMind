import axios from './axios';

export async function getSubjectsList(currentPage = 1, pageSize = 8, orderBy = 'name') {
  const offset = (currentPage - 1) * pageSize;

  const params = { limit: pageSize, offset, sort: orderBy };

  const response = await axios.get('/subjects/', { params }); // 각 불러올 항목 주소로입력 param은 api 확인
  const data = response.data;

  return data;
}

// 상기와 같은 형식으로 아래에 하나씩 작성해서 사용하시면 될것같습니다.

export async function getSubjectById(subjectId) {
  const response = await axios.get(`/subjects/${subjectId}/`);
  return response.data;
}

export async function getQuestionsList(subjectId, currentCards, loadCount) {
  // 질문을 불러올 피드의 ID, 현재까지 불러온 질문의 갯수, 한번에 불러올 질문의 갯수
  const params = { limit: loadCount, offset: currentCards };

  const response = await axios.get(`/subjects/${subjectId}/questions/`, { params });
  const data = response.data;

  return data;
}

export async function createSubject(name, tag = null) {
  const subjectName = tag ? `${name}#tag:${tag}` : name;
  const response = await axios.post('/subjects/', { name: subjectName });
  return response.data;
}

export function parseSubjectName(subjectName) {
  const parts = subjectName.split('#tag:');
  if (parts.length === 2) {
    return { name: parts[0], tag: parts[1] };
  }
  return { name: subjectName, tag: null };
}


// 답변 생성하기
export async function createAnswer(questionId, content) {
  const response = 
    await axios.post(`/questions/${questionId}/answers/`, { content });
    
    return response.data;
}

// 삭제하기
export async function deleteAnswer(answerId) {
  await axios.delete(`/answers/${answerId}/`);
}

// 수정하기 (PUT 보다 PATCH가 안전)
export async function updateAnswer(answerId, newContent) {
  const response = 
    await axios.patch(`/answers/${answerId}/`, { content: newContent });
    
    return response.data;
}

// 거절하기 
export async function rejectAnswer(answerId) {
  const response = await axios.patch(`/answers/${answerId}/`, {
    content: '답변을 거절했습니다.',
    isRejected: true,
  });
  return response.data;
}
