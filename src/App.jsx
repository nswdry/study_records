import { useState } from 'react'
import './App.css'

export const App = () => {

  return (
    <>
    <h1>学習記録一覧</h1>
    <div>
      <label>学習内容</label>
      <input type='text'/>
    </div>
    <div className='time'>
      <label>学習時間</label>
      <input type='number' min={0} placeholder='0'/>
      <p>時間</p>
    </div>
    <div>
    <p>入力されている学習内容:</p>
      <div className='input-time'>
        <p>入力されている時間:</p>
        <p>時間</p>
      </div>
      <button>登録</button>
    </div>
    <div className='total'>
      <p>合計時間：</p>
      <p> / 1000(h)</p>
    </div>
    <ul>
      {records.map((study) => (
        <li>
          <div className='list-row'>
            <p>学習内容:{title}</p>
            <p>学習時間:{time}</p>
          </div>
        </li>
        ))}
    </ul>
  </>
  );
};