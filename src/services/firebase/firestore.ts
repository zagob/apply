import { format } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from ".";

const db = getFirestore(app);

interface CreateUserProps {
  id: string;
  name: string | null;
  avatar: string | null;
}

export async function createUser(data: CreateUserProps) {
  await setDoc(doc(db, "users", data.id), data);
}

export async function getUser(idUser: string) {
  const user = (await getDoc(doc(db, "users", idUser))).data();

  return user;
}

export async function getCounts(idUser: string, year: number) {
  const ref = collection(db, `users/${idUser}/counts`);

  const allDocs = await getDocs(ref);

  const formatDocs = allDocs.docs
    .map((item) => {
      const data = item.data();

      return {
        value: data.value,
        month: Number(format(new Date(data.created_at.toDate()), "MM")),
        year: Number(format(new Date(data.created_at.toDate()), "yyyy")),
      };
    })
    .filter((item) => item.year === year);

  return formatDocs;
}

export async function getCount(
  idUser: string,
  monthNumber = format(new Date(), "MM'-'yyyy")
) {
  const refDoc = doc(db, `users/${idUser}/counts`, monthNumber);
  const data = await getDoc(refDoc);
  const returnValue = data.data() as { value: number };
  return returnValue?.value;
}

export async function addCount(count: number, idUser: string) {
  const dateNow = format(new Date(), "MM'-'yyyy");

  await setDoc(doc(db, `users/${idUser}/counts`, dateNow), {
    value: count,
    created_at: serverTimestamp(),
  });
}

export async function downCount(count: number, idUser: string) {
  const dateNow = format(new Date(), "MM'-'yyyy");

  await setDoc(doc(db, `users/${idUser}/counts`, dateNow), {
    value: count,
    created_at: serverTimestamp(),
  });
}
