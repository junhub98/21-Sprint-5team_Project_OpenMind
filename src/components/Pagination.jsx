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
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (hover: hover) {
    &:hover {
      transform: ${({ $active }) => ($active ? 'none' : 'translateY(-2px)')};
      color: ${({ $active }) => ($active ? 'var(--brown-40)' : 'var(--brown-30)')};
    }
  }
`;

const ArrowButton = styled(Button)`
  &:disabled {
    color: var(--gray-30);
    cursor: not-allowed;
  }
`;

const ArrowButtonRight = styled(ArrowButton)`
  @media (hover: hover) {
    &:hover {
      transform: ${({ disabled }) => (disabled ? 'none' : 'translateX(2px)')};
    }
  }
`;

const ArrowButtonLeft = styled(ArrowButton)`
  @media (hover: hover) {
    &:hover {
      transform: ${({ disabled }) => (disabled ? 'none' : 'translateX(-2px)')};
    }
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
      <ArrowButtonLeft
        disabled={currentPage == 1}
        onClick={() => {
          setCurrentPage((currentPage) => currentPage - 1);
          handlePageClick(currentPage - 1);
        }}
      >
        &lt;
      </ArrowButtonLeft>

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

      <ArrowButtonRight
        disabled={currentPage == totalPages}
        onClick={() => {
          setCurrentPage((currentPage) => currentPage + 1);
          handlePageClick(currentPage + 1);
        }}
      >
        &gt;
      </ArrowButtonRight>
    </PageBox>
  );
}

export default Pagination;
