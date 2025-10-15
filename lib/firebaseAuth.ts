import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  User, 
  onAuthStateChanged 
} from "firebase/auth";

// Signup with Email + Password
export const signupUser = async (email: string, password: string, displayName: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential.user;
};

// Login with Email + Password
export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Login with Google
export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// Login with Facebook
export const loginWithFacebook = async (): Promise<User> => {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// Logout
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Listen for authentication state changes
export const onAuthUserChanged = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
  });
  return unsubscribe;
};

// Get current logged-in user (synchronously)
export const getCurrentUser = () => {
  return auth.currentUser;
};
