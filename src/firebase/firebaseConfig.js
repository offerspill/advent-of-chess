import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getUsers = () => {
  return firestore
    .collection("users")
    .get()
    .then((snapshot) => snapshot.docs.map((x) => x.data()));
};

export const getUniqueLowercaseUsernames = async () => {
  const uniqueUsers = await getUsers();
  const uniqueDisplayNames = uniqueUsers.map((user) => {
    if (user && user.displayName) {
      return user.displayName.toLowerCase();
    } else {
      console.error("Found undefined username!");
      return "undefined";
    }
  });

  return uniqueDisplayNames;
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  return getUserDocument(user.uid, user.emailVerified);
};

export const getUserDocument = async (uid, emailVerified) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      emailVerified,
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
