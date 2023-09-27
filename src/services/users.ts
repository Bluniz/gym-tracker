import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../configs/firebase';

export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, { displayName });

  return {
    name: credential.user.displayName,
    email: credential.user.email,
  };
};

export const logIn = async (email: string, password: string) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  return { name: credential.user.displayName, email: credential.user.email };
};

export const logOut = async () => {
  return signOut(auth);
};
