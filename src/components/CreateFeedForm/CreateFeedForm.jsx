import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonImage from '../../assets/Images/Person.png';
import { createSubject } from '../../getDataApi';
import {
  Form,
  InputIcon,
  InputWrapper,
  NameInput,
  SubmitButton,
} from './CreateFeedForm.styles';

export default function CreateFeedForm() {
  const nameInputRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateFeed = async (event) => {
    event.preventDefault();

    const trimmedName = nameInputRef.current?.value.trim() || '';
    if (!trimmedName) {
      alert('이름을 입력해 주세요.');
      return;
    }

    try {
      setIsCreating(true);

      const created = await createSubject(trimmedName);
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
        <InputIcon
          src={PersonImage}
          alt="이름 입력 아이콘"
        />
        <NameInput
          ref={nameInputRef}
          id="name"
          type="text"
          placeholder="이름을 입력해주세요"
        />
      </InputWrapper>
      <SubmitButton
        type="submit"
        disabled={isCreating}
      >
        {isCreating ? '생성 중...' : '질문 받기'}
      </SubmitButton>
    </Form>
  );
}


