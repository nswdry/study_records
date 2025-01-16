import { useState, useEffect } from "react";
import './App.css'
import { BrowserRouter } from "react-router-dom";
// Supabaseを利用する
import { createClient } from "@supabase/supabase-js";
// Supabaseに接続
const supabase = createClient (
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const totalTime = records.reduce((acc, record) => acc + record.time, 0);

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeTime = (event) => setTime(Number(event.target.value));

  const onClickRegistration = () => {
    if (title === "" || time === 0) {
      setError("学習内容と学習時間は必須です。");
      return;
    }
    const newRecords = [...records, { title, time }];
    setRecords(newRecords);
    setTitle("");
    setTime(0);
    setError(""); // 入力が正しい場合はエラーメッセージをクリア
  };


  return (
    <BrowserRouter>
    <h1>学習記録一覧</h1>
    <div>
      <label>学習内容</label>
      <input type='text' value={title} onChange={onChangeTitle}/>
    </div>
    <div className='time'>
      <label>学習時間</label>
      <input type='number' min={1} placeholder='0' value={time} onChange={onChangeTime}/>
      <p>時間</p>
    </div>
    <div>
    <p>入力されている学習内容:{title}</p>
      <div className='input-time'>
        <p>入力されている時間:{time}</p>
        <p>時間</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={onClickRegistration}>登録</button>
    </div>
    <div className='total'>
      <p>合計時間：</p>
      <p> {totalTime}/ 1000(h)</p>
    </div>
    <ul>
      {records.map((record, index) => (
        <li key={index}>
          <p>学習内容: {record.title}</p>
          <p>学習時間: {record.time} 時間</p>
        </li>
      ))}
    </ul>
  </BrowserRouter>
  );
};