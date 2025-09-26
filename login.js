import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvQ848Q9tmZbiMNdxfBC8mo4NIwxPB2zk",
    authDomain: "maintenancert-fd650.firebaseapp.com",
    projectId: "maintenancert-fd650",
    storageBucket: "maintenancert-fd650.firebasestorage.app",
    messagingSenderId: "1060708463163",
    appId: "1:1060708463163:web:da265fe034fbd1c030a21e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign up a new user
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // User signed up successfully
    const user = userCredential.user;
    console.log("User signed up:", user.uid);
    // You might want to create a profile document in Firestore here
    await createUserProfile(user.uid, email); 
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
}

// Sign in an existing user
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // User signed in successfully
    const user = userCredential.user;
    console.log("User signed in:", user.uid);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
}

// Sign out the current user
async function userSignOut() {
  try {
    await signOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
}
import { doc, setDoc, getDoc } from "firebase/firestore";

// Create a user profile document in Firestore
async function createUserProfile(uid, email) {
  try {
    await setDoc(doc(db, "users", uid), {
      email: email,
      // Add other profile fields as needed (e.g., name, avatar, preferences)
      createdAt: new Date()
    });
    console.log("User profile created for:", uid);
  } catch (error) {
    console.error("Error creating user profile:", error.message);
  }
}

// Get a user's profile data from Firestore
async function getUserProfile(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("User profile data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error.message);
  }
}
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, you can now load their profile data
    console.log("User logged in:", user.uid);
    getUserProfile(user.uid);
    // Update your UI to reflect the logged-in state
  } else {
    // User is signed out
    console.log("No user logged in.");
    // Update your UI to reflect the logged-out state
  }
});

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

// Function to create or update a user profile in Firestore
const createUserProfile = async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid); // Reference to the user's document
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      // Create a new profile if it doesn't exist
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || "New User", // Default display name
        photoURL: user.photoURL || "",
        createdAt: new Date(),
        // Add any other profile fields you need
      });
      console.log("User profile created for:", user.uid);
    } else {
      console.log("User profile already exists for:", user.uid);
      // You can update existing profile data here if needed
    }
  }
};

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, get their UID and connect to their profile
    const uid = user.uid;
    console.log("User signed in with UID:", uid);
    createUserProfile(user); // Create or update profile
  } else {
    // User is signed out
    console.log("User signed out.");
  }
});

// Example of retrieving a user's profile data
const getUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    console.log("User profile data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such user profile!");
    return null;
  }
};

// You can call getUserProfile(someUid) when needed
