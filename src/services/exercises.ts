import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';

import {database} from '../configs/firebase';
import {Exercise} from '../types/exercises';

interface CreateExercisesProps {
  name: string;
  series?: number;
  reps?: number;
  weight?: number;
  last_weight?: number;
  id?: string;
}

const collectionName = 'exercices';

const db = collection(database, collectionName);

export async function createExercises({
  name,
  last_weight,
  reps,
  series,
  weight,
}: CreateExercisesProps) {
  try {
    await addDoc(db, {
      name,
      last_weight: last_weight || null,
      weight: weight || null,
      reps: reps || null,
      series: series || null,
      weight_history: [],
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.log('error', error);
  }
}

export async function getExercise(id: string) {
  try {
    const docRef = doc(database, collectionName, id);
    const exercise = await getDoc(docRef);

    if (exercise.exists()) {
      return exercise.data() as Exercise;
    } else {
      throw new Error('Exercise not found');
    }
  } catch (error) {
    console.log('error', error);
  }
}

export async function listExercises() {
  try {
    const data = await getDocs(db);

    const parsedData: DocumentData[] = [];
    data.forEach(doc => {
      parsedData.push(doc.data());
    });

    return parsedData as Exercise[];
  } catch (error) {
    console.log('error', error);
  }
}

export async function deleteExercise(id: string) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (error) {
    console.log(error);
  }
}

export async function updateExercise({
  weight,
  id,
  name,
  reps,
  series,
}: Partial<CreateExercisesProps>) {
  try {
    const docRef = doc(database, collectionName, id!);

    const oldData = await getDoc(docRef);

    if (oldData.exists()) {
      const weight_history = [
        ...oldData.data().weight_history,
        {
          value: weight,
          date: new Date().toISOString(),
        },
      ];

      await updateDoc(docRef, {
        weight,
        name,
        reps,
        series,
        last_weight: oldData.data().weight,
        weight_history,
      });
    } else {
      throw new Error('Exercise not found');
    }
  } catch (error) {
    console.log(error);
  }
}
