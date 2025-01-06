import './App.css'
import { useState, useEffect } from "react";
import { Diary } from "./types";
import diaryService from "./services/diaries";
import DiaryForm from "./components/DiaryForm";

const DiaryList = ({ diary }: { diary: Diary }) => (
  <li>
    <strong>{diary.date}</strong> 
    <p>Weather: {diary.weather}, Visibility: {diary.visibility}</p>
    <p>{diary.comment}</p> 
  </li>
);

function App() {

  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const fetchedDiaries = await diaryService.getAll();
      if (fetchedDiaries) {
        setDiaries(fetchedDiaries);
      } else {
        console.error('Failed to fetch diaries');
      }
    };
    void fetchDiaryList();
  }, []);

  return (
    <div>
     <DiaryForm addDiary={(diary) => setDiaries([...diaries, { ...diary, id: diaries.length + 1 }])} />
    <h1>Diary Entries</h1>
    {diaries.map((diary) => (
          <DiaryList key={diary.id} diary={diary} />
        ))}
  </div>
  )
}

export default App
