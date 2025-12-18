/* 빈칸 */
import Mailbox from '../assets/Mailbox.png';
import Message from '../assets/Messages.png';
import './QuestionHeader.scss';

export default function QuestionHeader () {
  return (
    <div className="wrapper">
      <div className="container" >
        <p className="text" >아직 질문이 없습니다</p>
      </div>
    </div>
  );
};