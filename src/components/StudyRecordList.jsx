const StudyRecordList = ({ studyRecords }) => (
  <ul>
    {studyRecords.map((record, index) => (
      <li key={index}>
        <p>学習内容: {record.title}</p>
        <p>学習時間: {record.time} 時間</p>
      </li>
    ))}
  </ul>
);

export default StudyRecordList;
