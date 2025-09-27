import { collection, addDoc, getDoc, getDocs, where, query, serverTimestamp} from "firebase/firestore";
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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getTasks = async (uid: string) => {
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
}