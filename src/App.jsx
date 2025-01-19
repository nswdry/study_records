import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { getStudyRecords, insertStudyRecord } from "./SupabaseService";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TotalTimeDisplay from "./components/TotalTimeDisplay";
import StudyRecordList from "./components/StudyRecordList";
import "./App.css";

export const App = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [studyRecords, setStudyRecords] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalTime = studyRecords.reduce((acc, record) => acc + record.time, 0);

 const fetchStudyRecords = async () => {
    setIsLoading(true); // ローディング状態を開始
    const data = await getStudyRecords(); // Supabaseからデータを取得
    if (data) {
      setStudyRecords(data); // データを状態にセット
    }
    setIsLoading(false); // ローディング状態を終了
  };

  // 初回レンダリング時にデータ取得
  useEffect(() => {
    fetchStudyRecords();
  }, []);


  const handleRegistration = async () => {
    if (title === "" || time === 0) {
      setError("学習内容と学習時間は必須です。");
      return;
    }

    const newRecord = { title, time };
    const data = await insertStudyRecord(newRecord);
    if (data) {
      setStudyRecords((prevRecords) => [...prevRecords, ...data]);
      setTitle("");
      setTime(0);
      setError("");
    } else {
      setError("データの登録に失敗しました。");
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <InputForm
        title={title}
        time={time}
        error={error}
        onTitleChange={(e) => setTitle(e.target.value)}
        onTimeChange={(e) => setTime(Number(e.target.value))}
        onRegister={handleRegistration}
      />

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <TotalTimeDisplay totalTime={totalTime} />
          <StudyRecordList studyRecords={studyRecords} />
        </>
      )}
    </BrowserRouter>
  );
};