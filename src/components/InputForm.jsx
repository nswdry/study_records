const InputForm = ({ title, time, error, onTitleChange, onTimeChange, onRegister }) => (
  <div>
    <div>
      <label>学習内容</label>
      <input type="text" value={title} onChange={onTitleChange} />
    </div>
    <div className="time">
      <label>学習時間</label>
      <input
        type="number"
        min={1}
        placeholder="0"
        value={time}
        onChange={onTimeChange}
      />
      <p>時間</p>
    </div>
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={onRegister}>登録</button>
    </div>
  </div>
);

export default InputForm;