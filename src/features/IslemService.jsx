import { db } from "../firebase/Firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  where,
  limit,
  Timestamp,
} from "firebase/firestore";

const aylargetir = async () => {
  const colref = await collection(db, "aylar");
  const q = query(colref, orderBy("sira"));
  const docsnap = await getDocs(q);

  let dizi = [];

  docsnap.forEach((item) => {
    let veri = { ...item.data(), id: item.id };

    dizi.push(veri);
  });

  return dizi;
};

const yillargetir = async () => {
  const colref = await collection(db, "yillar");
  const q = query(colref, orderBy("ad"));
  const docsnap = await getDocs(q);

  let dizi = [];

  docsnap.forEach((item) => {
    let veri = { ...item.data(), id: item.id };

    dizi.push(veri);
  });
  return dizi;
};

const islemgetir = async (veri) => {
  const islemref = await collection(db, "islemler");

  const docref = await addDoc(islemref, { ...veri, tarih: serverTimestamp() });

  return { ...veri, tarih: Timestamp.now(), id: docref.id };
};

const son10islem = async (email) => {
  const colref = await collection(db, "islemler");

  const q = query(
    colref,
    where("email", "==", email),
    orderBy("tarih", "desc"),
    limit(10)
  );

  const querysnap = await getDocs(q);

  let dizi = [];

  querysnap.forEach((a) => {
    dizi.push({ ...a.data(), id: a.id });
  });

  return dizi;
};

const islemservice = {
  aylargetir,
  yillargetir,
  islemgetir,
  son10islem,
};

export default islemservice;
