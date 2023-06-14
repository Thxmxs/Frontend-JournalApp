import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { INote } from "../store/journal/interface/Ijournal";


export const loadNotes = async(uid:string) => {
  if(!uid) throw new Error('el uid no es valido ono existe');

  const collectionRef = collection(FirebaseDB,`${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  const notes: INote[] = [];
  docs.forEach((d) => {
    let data = d.data() as INote;
    notes.push({id:d.id,...data})
  })
  return notes
}
