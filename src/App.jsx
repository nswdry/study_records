import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter } from "react-router-dom";
// Supabaseを利用する
import { createClient } from "@supabase/supabase-js";

// Supabaseに接続
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const App = () => {
  // 状態管理（studyRecords で全てを管理）
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [studyRecords, setStudyRecords] = useState([]);
  const [error, setError] = useState("");

  // 合計時間の計算
  const totalTime = studyRecords.reduce((acc, record) => acc + record.time, 0);

  // 入力変更時のハンドラ
  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeTime = (event) => setTime(Number(event.target.value));

  // 登録ボタンが押されたときの処理
  const onClickRegistration = async () => {
    if (title === "" || time === 0) {
      setError("学習内容と学習時間は必須です。");
      return;
    }

    const newRecord = { title, time };
    // Supabaseに新しいレコードを挿入
    const { data, error } = await supabase
      .from("study-record")
      .insert([newRecord]);

    if (error) {
      setError("データの登録に失敗しました。");
      console.error(error);
      return;
    }

    // 登録したデータをstudyRecordsに追加
    setStudyRecords((prevRecords) => [...prevRecords, ...data]);

    // 入力をリセット
    setTitle("");
    setTime(0);
    setError("");
  };

  // `study-record` テーブルからデータを取得する関数
  useEffect(() => {
    getStudyRecords();
  }, []);

  async function getStudyRecords() {
    const { data, error } = await supabase
      .from("study-record")
      .select("title, time");  // titleとtimeフィールドを取得

    if (error) {
      console.error("Error:", error);
      return;
    }
    if (data) {
      setStudyRecords(data); // 取得したデータを状態にセット
    }
  }

  return (
    <BrowserRouter>
      <h1>学習記録一覧</h1>
      <div>
        <label>学習内容</label>
        <input type="text" value={title} onChange={onChangeTitle} />
      </div>
      <div className="time">
        <label>学習時間</label>
        <input type="number" min={1} placeholder="0" value={time} onChange={onChangeTime} />
        <p>時間</p>
      </div>
      <div>
        <p>入力されている学習内容: {title}</p>
        <div className="input-time">
          <p>入力されている時間: {time}</p>
          <p>時間</p>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={onClickRegistration}>登録</button>
      </div>
      <div className="total">
        <p>合計時間：</p>
        <p>{totalTime} / 1000 (h)</p>
      </div>
      <ul>
        {studyRecords.map((record, index) => (
          <li key={index}>
            <p>学習内容: {record.title}</p>
            <p>学習時間: {record.time} 時間</p>
          </li>
        ))}
      </ul>
    </BrowserRouter>
  );
};