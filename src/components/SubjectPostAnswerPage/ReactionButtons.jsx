import { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import ThumbsUp from '../../assets/thumbs-Up.png';
import ThumbsDown from '../../assets/thumbs-down.png';
import ThumbsUpActive from '../../assets/thumbs-up-active.png';
import ThumbsDownActive from '../../assets/thumbs-down-active.png';

const ReactionContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0px;
`;

const ReactionButton = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  span {
    ${(props) => 
      props.$liked &&
      css`color:#1877f2`}

    ${(props) => 
      props.$disliked &&
      css`color:#b93333`}
  }

  img {
    display: block;
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  ${(props) => 
      props.likeActive && css`
        color: #1877f2;
      `
    }

  ${(props) => 
      props.dislikeActive && css`
        color: #b93333;
      `
    }
`;


function ReactionButtons( {isAnswered, initialLike=0, initialDislike=0}) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLike);
  const [dislikeCount, setDislikeCount] = useState(initialDislike);
  
const handleLike = () => {

    if(!isAnswered) return;

    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      return;
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);

      if (disliked) {
        setDisliked(false);
        setDislikeCount((prev) => prev - 1);
      }
    }

    
  };

  const handleDislike = () => {
    if(!isAnswered) return;

    if (disliked) {
      setDisliked(false);
      setDislikeCount((prev) => prev - 1);
      return;
    } else {
      setDisliked(true);
      setDislikeCount((prev) => prev + 1);

      if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
      }
    }

    
  };

  return (
    <div>
      <ReactionContainer>
        <ReactionButton 
          $liked={liked} 
          $disliked={false}
          onClick={handleLike}>
          
          <img src={liked ? ThumbsUpActive : ThumbsUp} alt="좋아요"/>
          <span>좋아요 {likeCount}</span>
        </ReactionButton>

        <ReactionButton 
          $liked={false}
          $disliked={disliked}
          onClick={handleDislike}>
          
          <img src={disliked ? ThumbsDownActive : ThumbsDown} alt="싫어요"/>
          <span>싫어요 {dislikeCount}</span>
        </ReactionButton>
      </ReactionContainer>
    </div>
  )
}

export default ReactionButtons;