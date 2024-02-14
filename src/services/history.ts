import {database} from '../configs/firebase';
import {
  collection,
  addDoc,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import { IHistory } from '../types/history';


const collectionName = 'history';

const db = collection(database, collectionName);


export const saveHistoryLog = async ({done_photo, ...rest}: IHistory) => {
  try {
    await addDoc(db, {...rest, done_photo: done_photo || null});
  }
  catch(error){
    console.log(error);
    throw error;
  }
};


export const listHistories = async () => {
  try {
    const response = await getDocs(db);
    const parsedData: DocumentData[] = [];
    response.forEach(doc => {
      parsedData.push({...doc.data(), id: doc.id});
    });

    return parsedData as IHistory[];
  } catch(error){
    console.log(error);
  }
};


