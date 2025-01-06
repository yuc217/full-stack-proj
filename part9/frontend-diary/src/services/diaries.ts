import axios from "axios";
import { Diary, DiaryFormValues } from "../types";

const apiBaseUrl = "http://localhost:3000/api";

const getAll = async () => {
  try{
    const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
    } else {
      console.error(error);
    }
  }
};

const create = async (object: DiaryFormValues) => {
  try{
    const { data } = await axios.post<Diary>(
      `${apiBaseUrl}/diaries`,
      object
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
    } else {
      console.error(error);
    }
  }

};

export default {
  getAll,
  create
};

