import React, { useState } from "react";
import { Diary, Weather, Visibility } from "../types";

const DiaryForm = ({ addDiary }: { addDiary: (diary: Omit<Diary, "id">) => void }) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (weather && visibility) {
      try {
        addDiary({ date, weather, visibility, comment });
        setDate("");
        setWeather("");
        setVisibility("");
        setComment('');
      } catch (err) {
        setError("Failed to add diary.");
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <fieldset>
          <legend>Weather:</legend>
          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Visibility:</legend>
          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </fieldset>
      </div>
      <div>
        <label>Comment: </label>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Add Diary</button>
    </form>
  );
};

export default DiaryForm;