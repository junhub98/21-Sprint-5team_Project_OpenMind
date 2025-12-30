import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonImage from '../../../assets/MainPage/Person.png';
import { createSubject } from '../../../utils/getDataApi';
import {
  Form,
  InputIcon,
  InputWrapper,
  NameInput,
  SubmitButton,
  TagButton,
  TagDropdown,
  TagList,
  TagItem,
  SelectedTag,
  TagButtonWrapper,
  TagContent,
  TagText,
  RemoveButton,
} from './CreateFeedForm.styles';

// 태그 리스트 (필요에 따라 수정 가능)
const TAG_LIST = [
  'ENTP',
  'ENTJ',
  'ENFP',
  'ENFJ',
  'ESTP',
  'ESFP',
  'ESTJ',
  'ESFJ',
  'INTP',
  'INTJ',
  'INFP',
  'INFJ',
  'ISTP',
  'ISTJ',
  'ISFP',
  'ISFJ',
];

export default function CreateFeedForm() {
  const nameInputRef = useRef(null);
  const tagDropdownRef = useRef(null);
  const selectedTagRef = useRef(null);
  const selectedTagDisplayRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  // 드롭다운 표시/숨김을 DOM 직접 조작으로 처리
  const toggleDropdown = (show) => {
    if (tagDropdownRef.current) {
      tagDropdownRef.current.style.display = show ? 'block' : 'none';
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  const handleClickOutside = (event) => {
    if (
      tagDropdownRef.current &&
      !tagDropdownRef.current.contains(event.target) &&
      !event.target.closest('[data-tag-button]')
    ) {
      toggleDropdown(false);
    }
  };

  const handleTagButtonClick = (event) => {
    event.preventDefault();
    const isVisible = tagDropdownRef.current?.style.display === 'block';
    toggleDropdown(!isVisible);

    if (!isVisible) {
      // 드롭다운이 열릴 때만 이벤트 리스너 추가
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  };

  const handleTagSelect = (tag) => {
    selectedTagRef.current = tag;

    // 선택된 태그 표시 영역 업데이트 (DOM 직접 조작)
    if (selectedTagDisplayRef.current) {
      const tagText = selectedTagDisplayRef.current.querySelector('[data-tag-text]');
      if (tagText) {
        tagText.textContent = `#${tag}`;
      }
      selectedTagDisplayRef.current.style.display = 'flex';
    }

    toggleDropdown(false);
    document.removeEventListener('mousedown', handleClickOutside);
  };

  const handleRemoveTag = (event) => {
    event.preventDefault();
    selectedTagRef.current = null;

    // 선택된 태그 표시 영역 숨기기
    if (selectedTagDisplayRef.current) {
      selectedTagDisplayRef.current.style.display = 'none';
    }
  };

  const handleCreateFeed = async (event) => {
    event.preventDefault();

    const trimmedName = nameInputRef.current?.value.trim() || '';
    if (!trimmedName) {
      alert('이름을 입력해 주세요.');
      return;
    }

    try {
      setIsCreating(true);

      const selectedTag = selectedTagRef.current;
      const created = await createSubject(trimmedName, selectedTag);
      // 응답으로 받은 id를 로컬스토리지에 저장
      localStorage.setItem('subjectId', created.id.toString());
      navigate(`/post/${created.id}/answer`);
    } catch (error) {
      console.error(error);
      alert('피드 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Form onSubmit={handleCreateFeed}>
      <InputWrapper>
        <InputIcon src={PersonImage} alt="이름 입력 아이콘" />
        <NameInput ref={nameInputRef} id="name" type="text" placeholder="이름을 입력해주세요" />
        <TagButtonWrapper>
          <TagButton type="button" data-tag-button onClick={handleTagButtonClick}>
            MBTI
          </TagButton>
          <TagDropdown ref={tagDropdownRef} style={{ display: 'none' }}>
            <TagList>
              {TAG_LIST.map((tag) => (
                <TagItem key={tag} onClick={() => handleTagSelect(tag)}>
                  {tag}
                </TagItem>
              ))}
            </TagList>
          </TagDropdown>
        </TagButtonWrapper>
      </InputWrapper>
      <SelectedTag ref={selectedTagDisplayRef} style={{ display: 'none' }}>
        <TagContent>
          <TagText data-tag-text></TagText>
          <RemoveButton type="button" data-tag-remove onClick={handleRemoveTag}>
            ×
          </RemoveButton>
        </TagContent>
      </SelectedTag>
      <SubmitButton type="submit" disabled={isCreating}>
        {isCreating ? '생성 중...' : '질문 받기'}
      </SubmitButton>
    </Form>
  );
}
