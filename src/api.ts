import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { firebaseConfig } from "./firebaseConfig";
import { ContactType } from "./types/Contact";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export const loginFacebook = {
  fbPopup: async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    let result = await firebase.auth().signInWithPopup(provider);
    return result;
  },
  addUser: async (u: ContactType) => {
    await db.collection("users").doc(u.id).set(
      {
        name: u.name,
        avatar: u.avatar,
      },
      { merge: true }
    );
  },
  getContactList: async (userId: string) => {
    let list: ContactType[] = [];
    let results = await db.collection("users").get();
    results.forEach((result) => {
      let data = result.data();
      if (result.id !== userId) {
        list.push({
          id: result.id,
          name: data.name,
          avatar: data.avatar,
        });
      }
    });
    return list;
  },
  addNewChat: async (user: ContactType, user2: ContactType) => {
    let newChat = await db.collection("chats").add({
      messages: [],
      users: [user.id, user2.id],
    });
    db.collection("users")
      .doc(user.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user2.name,
          image: user2.avatar,
          with: user2.id,
        }),
      });
    db.collection("users")
      .doc(user2.id)
      .update({
        chats: firebase.firestore.FieldValue.arrayUnion({
          chatId: newChat.id,
          title: user.name,
          image: user.avatar,
          with: user.id,
        }),
      });
  },
  onChatList: (
    userId: string | undefined,
    setChatList: (arg0: any) => void
  ) => {
    return db
      .collection("users")
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          let data: any = doc.data();
          if (data.chats) {
            setChatList(data.chats);
          }
        }
      });
  },
};
