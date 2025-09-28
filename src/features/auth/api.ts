import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {FirebaseError} from "firebase/app";

export const registerUser = async (email: string, password: string) => {
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    return userCredential.user;
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirebaseError;
    console.error(errorCode, errorMessage);
  }
}

export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  return userCredential.user;
}

export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirebaseError;
    console.error(errorCode, errorMessage);
  }
}
