import styled from 'styled-components';
import { useEffect } from 'react';
import useSearchParam from '../hooks/useSearchParam';

const PageBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  font-family: 'pretendard';
  font-size: 20px;
  font-weight: 400;
  background-color: var(--gray-20);

  color: ${({ $active }) => ($active ? 'var(--brown-40)' : 'var(--gray-40)')};

  /*background: ${({ $active }) =>
    $active ? 'linear-gradient(to right, #1e6fff, #3692ff)' : '#ffffff'}; */

  &:hover {
    color: ${({ $active }) => ($active ? 'var(--brown-40)' : 'var(--brown-30)')};
  }
`;

const ArrowButton = styled(Button)`
  &:disabled {
    color: var(--gray-30);
    cursor: not-allowed;
  }
`;

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const { setSearchParams } = useSearchParam();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageGroup = Math.ceil(currentPage / 5 - 1);
  const [startPage, endPage] = [pageGroup * 5 + 1, pageGroup * 5 + 5];
  const [startIndex, endIndex] = [startPage - 1, endPage];

  function handlePageClick(page) {
    setSearchParams(
      (pre) =>
        page ? { ...Object.fromEntries(pre), currentPage: page } : { ...Object.fromEntries(pre) },
      { replace: false },
    );
  }

  return (
    <PageBox>
      <ArrowButton
        disabled={currentPage == 1}
        onClick={() => {
          setCurrentPage((currentPage) => currentPage - 1);
          handlePageClick(currentPage - 1);
        }}
      >
        &lt;
      </ArrowButton>

      {pages.slice(startIndex, endIndex).map((page) => (
        <Button
          $active={page === currentPage}
          key={page}
          onClick={() => {
            setCurrentPage(page);
            handlePageClick(page);
          }}
        >
          {page}
        </Button>
      ))}

      <ArrowButton
        disabled={currentPage == totalPages}
        onClick={() => {
          setCurrentPage((currentPage) => currentPage + 1);
          handlePageClick(currentPage + 1);
        }}
      >
        &gt;
      </ArrowButton>
    </PageBox>
  );
}

export default Pagination;
