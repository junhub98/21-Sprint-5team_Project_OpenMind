import axios from './axios';

export async function getSubjectsList(currentPage = 1, pageSize = 8, orderBy = 'name') {
  const offset = (currentPage - 1) * 8;
  const params = { limit: pageSize, offset, sort: orderBy };

  const response = await axios.get('/subjects/', { params });
  const data = response.data;

  return data;
}
