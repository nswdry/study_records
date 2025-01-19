const TotalTimeDisplay = ({ totalTime }) => (
  <div className="total">
    <p>合計時間：</p>
    <p>{totalTime} / 1000 (h)</p>
  </div>
);

export default TotalTimeDisplay;