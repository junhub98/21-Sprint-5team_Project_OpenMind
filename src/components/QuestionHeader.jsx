/* 빈칸 */
import Mailbox from '../assets/Mailbox.png';
import Message from '../assets/Messages.png';

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "24px",
  },
  container: {
    width: "100%",
    maxWidth: "720px",      
    height: "260px",        
    backgroundColor: "#F7F2ED",
    borderRadius: "16px",
    border: "1px solid #E5D8CC",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "48px",
    color: "#E4D5C9",
  },

  text: {
    fontSize: "20px",
    fontWeight: "400",
    color: "542F1A",
  },
};


export default function QuestionHeader () {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <p style={styles.text}>아직 질문이 없습니다</p>
      </div>
    </div>
  );
};