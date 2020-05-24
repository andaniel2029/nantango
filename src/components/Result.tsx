import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { IQuestionAnswer } from "./LevelDetail";
const Sentence: React.FC<{
  QA: IQuestionAnswer;
}> = ({ QA }) => {
  return (
    <div className="sentence">
      <div className="word_en">{QA.en}</div>
      <div className="word_ja">{QA.meanings[1]}</div>
      <div className="word_sound">{QA.meanings[0]}</div>
    </div>
  );
};
const ResultPageWrapper = styled.div`
  padding: 5px;
  margin-left: 20px;
  .success-message,
  #review {
    margin-top: 5px;
  }
`;

const filterWrongAnswers = (answers: IQuestionAnswer[]) => {
  return answers.filter(answer => answer.questionPoints <= 0);
};

export default () => {
  const history = useHistory<{ questionAnswers: IQuestionAnswer[]; level: string }>();
  const { questionAnswers: QAs } = history.location.state;
  const wrongAnswers = filterWrongAnswers(QAs);
  const now = new Date();
  return (
    <ResultPageWrapper>
      <div>
        <h1>英単語補強プリント</h1>
        <p>{`日時：${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`}</p>
        <p>名前：<input type="text"></input></p>
        <p><button onClick={window.print}>印刷</button></p>
      </div>
      {wrongAnswers.length > 0 && (
        <div id="review">
          {wrongAnswers.map((QA, index) => (
            <Sentence key={index} QA={QA} />
          ))}
        </div>
      )}
      {wrongAnswers.length === 0 && (
        <h3 className="success-message">Congratulations, you are super!</h3>
      )}
    </ResultPageWrapper>
  );
};
