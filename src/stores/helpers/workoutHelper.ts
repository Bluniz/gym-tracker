import Toast from "react-native-root-toast"
import { listWorkouts, getWorkout, completeWorkout, createWorkout } from "../../services"
import { CompleteWorkoutParams, CreateWorkoutParams } from "../types/workoutTypes"


  export const startWorkoutsLoading = (set: any) => set(() => ({isWorkoutsLoading: true}))
  export const finishWorkoutsLoading = (set: any) => set(() => ({isWorkoutsLoading: false}))
  export const startWorkoutDetailsLoading = (set: any) => set(() => ({isWorkoutDetailsLoading: true}))
  export const finishWorkoutDetailsLoading = (set: any) => set(() => ({isWorkoutDetailsLoading: false}))
  export const startWorkouRefeshingLoading = (set: any) => set(() => ({isWorkoutsRefreshing: true}))
  export const finishWorkouRefeshingLoading = (set: any) =>
    set(() => ({isWorkoutsRefreshing: false}))


  export const getWorkouts = async (set: any, get: any, type?: 'refresh') => {
    try {
      if (!type) get().startWorkoutsLoading();
      if (type === 'refresh') get().startWorkouRefeshingLoading();
      const workouts = await listWorkouts();
      set(() => ({workouts}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      if (!type) get().finishWorkoutsLoading();
      if (type === 'refresh') get().finishWorkouRefeshingLoading();
    }
  }

  export const getWorkoutHelper = async (set: any, get: any, id: string) => {
     try {
      get().startWorkoutDetailsLoading();
      const workout = await getWorkout(id);
      set(() => ({workout}));
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishWorkoutDetailsLoading();
    }
  }

  export const completeWorkoutHelper = async (set: any, get:any, params: CompleteWorkoutParams) => {
    try {
      get().startWorkoutDetailsLoading();
      await completeWorkout({complete_time: params.complete_time, id: params.id!});
      await get().getWorkout(params.id!);
    } catch (error) {
      console.log(error);
      Toast.show('Something is wrong!');
      if (error instanceof Error) Toast.show(error.message);
    } finally {
      get().finishWorkoutDetailsLoading();
    }
  }

  export const createWorkoutHelper = async (set: any, get: any, props: CreateWorkoutParams)=> {
    try {
      get().startLoading()
      await createWorkout({
        name: props.title,
        exercices: props.exercises
      })

      Toast.show("Treino criado com sucesso")
    

    } catch(error) {
      if (error instanceof Error) Toast.show(error.message);

    } finally {
            get().finishLoading();

    }
  }