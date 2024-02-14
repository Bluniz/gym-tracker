import {database} from '../configs/firebase';
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
import {Workout, WorkoutWithExercises} from '../types/workout';
import {Exercise} from '../types/exercises';
import {getExercise} from './exercises';

interface CreateWorkoutProps extends Pick<Workout, 'name' | 'exercices'> {}

interface UpdateWorkoutProps
  extends Pick<Workout, 'name' | 'exercices' | 'id'> {}

interface CompleteWorkoutProps extends Pick<Workout, 'id'> {
  complete_time: number;
  done_photo?: string
}

const collectionName = 'workouts';

const db = collection(database, collectionName);
const historyDb = collection(database, 'history');


export async function createWorkout({exercices, name}: CreateWorkoutProps) {
  try {
    await addDoc(db, {
      name,
      exercices,
      created_at: new Date().toISOString(),
      complete_qtd: 0,
      complete_history: [],
    });
  } catch (error) {
    console.log('error', error);
  }
}

export async function listWorkouts() {
  try {
    const data = await getDocs(db);

    const parsedData: DocumentData[] = [];
    data.forEach(doc => {
      parsedData.push({...doc.data(), id: doc.id});
    });

    return parsedData as Workout[];
  } catch (error) {
    console.log(error);
  }
}

export async function getWorkout(id: string) {
  try {
    const docRef = doc(database, collectionName, id);
    const workout = await getDoc(docRef);

    if (workout.exists()) {
      const exercices: Exercise[] = [];
      const workoutData = workout.data() as Workout;
      const foundedExercisesIds = [];
      let hasNotFoundExercise = false;

      for await (const exercise of workoutData.exercices) {
        const data = await getExercise(exercise);
        if (data) {
          exercices.push(data);
          foundedExercisesIds.push(exercise);
        } else {
          hasNotFoundExercise = true;
        }
      }

      if (hasNotFoundExercise) {
        updateWorkout({
          exercices: foundedExercisesIds,
          name: workoutData.name,
          id: workout.id,
        });
      }
      return {
        ...workout.data(),
        id: workout.id,
        exercices,
      } as WorkoutWithExercises;
    } else {
      throw new Error('Workout not found');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateWorkout({id, exercices, name}: UpdateWorkoutProps) {
  try {
    const docRef = doc(database, collectionName, id);
    const oldData = await getDoc(docRef);

    if (oldData.exists()) {
      await updateDoc(docRef, {
        exercices,
        name,
      });
    } else {
      throw new Error('Workout not found');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteWorkout(id: string) {
  try {
    await deleteDoc(doc(database, collectionName, id));
  } catch (error) {
    console.log(error);
  }
}

export async function completeWorkout({
  complete_time,
  id,
  done_photo
}: CompleteWorkoutProps) {
  try {
    const docRef = doc(database, collectionName, id);
    const oldData = await getDoc(docRef);

    if (oldData.exists()) {
      const data = oldData.data();
      const qtd = data?.complete_qtd || 0;

      await addDoc(historyDb, {
        complete_time,
        completed_at: new Date().toISOString(),
        workout_id: id,
        done_photo: done_photo || null,
        workoutName: data?.name
      });
      await updateDoc(docRef, {
        complete_qtd: qtd + 1,
      });
    } else {
      throw new Error('Workout not found');
    }
  } catch (error) {
    console.log(error);
  }
}
