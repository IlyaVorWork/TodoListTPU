import { collection, addDoc, getDoc, getDocs, deleteDoc, setDoc, doc, where, query, serverTimestamp, FirestoreError} from "firebase/firestore";
import {firestoreDB} from "../../shared/lib/firebase";
import type {Task} from "../../entities/task";

export const addTask = async (task: Task) => {
  try {
    const docRef = await addDoc(collection(firestoreDB, "tasks"), {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const docSnapshot = await getDoc(docRef)
    return {id: docSnapshot.id, ...docSnapshot.data()} as Task;
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirestoreError;
    console.error(errorCode, errorMessage);
  }
}

export const getTasks = async (uid: string) => {
  try {
    const q = query(
      collection(firestoreDB, "tasks"),
      where("userId", "==", uid)
    )

    const querySnapshot = await getDocs(q);
    const tasks: Task[] = []
    querySnapshot.forEach((doc) => {
      tasks.push({id: doc.id, ...doc.data()} as Task)
    });
    return tasks;
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirestoreError;
    console.error(errorCode, errorMessage);
  }
}

export const updateTask = async (task: Task) => {
  try {
    const docRef = doc(firestoreDB, `tasks/${task.id}`);
    await setDoc(docRef, {
      ...task,
      updatedAt: serverTimestamp(),
    });
    const updatedDocSnapshot = await getDoc(docRef)
    return {id: updatedDocSnapshot.id, ...updatedDocSnapshot.data()} as Task;
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirestoreError;
    console.error(errorCode, errorMessage);
  }
}

export const deleteTask = async (id: string) => {
  try {
    await deleteDoc(doc(firestoreDB, "tasks", id));
  } catch (error) {
    const {code: errorCode, message: errorMessage} = error as FirestoreError;
    console.error(errorCode, errorMessage);
  }
}