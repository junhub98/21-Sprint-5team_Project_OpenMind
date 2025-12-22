import { useState, useEffect } from 'react';
import './ReactionButtons.scss';
import ThumbsUp from '../assets/thumbs-Up.png';
import ThumbsDown from '../assets/thumbs-down.png';
import ThumbsUpActive from '../assets/thumbs-up-active.png';
import ThumbsDownActive from '../assets/thumbs-down-active.png';

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
        <ul className='reaction-container'>
        <li
          type="button"
          className={`reaction-button ${liked ? 'like-active' : ''}`}
          onClick={handleLike}
        >
          <img src={liked ? ThumbsUpActive : ThumbsUp} alt="좋아요"/>
          <span>좋아요 {likeCount}</span>
        </li>

        <li
          type="button"
          className={`reaction-button ${disliked ? 'dislike-active' : ''}`}
          onClick={handleDislike}
        >
          <img src={disliked ? ThumbsDownActive : ThumbsDown} alt="싫어요"/>
          <span>싫어요 {dislikeCount}</span>
        </li>
      </ul>
    </div>
  )
}

export default ReactionButtons;