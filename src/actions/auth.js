import { auth, database, googleAuthProvider } from '../firebase';                 // import firebase exports
import pick from 'lodash/pick';

const usersRef = database.ref('users');
                                                                        // step 1: Build a sign in function catching firebase auth dispatch
export const signIn = () => {                                           // sign in function
  return (dispatch) => {                                                // nested auth function that returns the stored auth.
    dispatch({ type: "ATTEMPTING_LOGIN" });                             // call loading component
        auth.signInWithPopup(googleAuthProvider);                       // dispatches to the listener
  };
};

                                                                        // Step 1a: Function stores user data as a JSON object
const signedIn = (user) => {
  return {
    type: 'SIGN_IN',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid
  };
};

                                                                        // step 2: Build a logout component that clears the storage JSON object
export const signOut = () => {                                          // sign out function
  return (dispatch) => {                                                // nested auth function that returns the stored auth
    dispatch({ type: "ATTEMPTING_LOGIN"});                              // call loading component
    auth.signOut();                                                     // signout()
  };
};



                                                                        // Step 2a: Function clears user.data
const signedOut = () => {
  return {
    type: 'SIGN_OUT'
  };
};

export const startListeningToAuthChanges = () => {
  return (dispatch) => {                                                // send dispatch to the store
    auth.onAuthStateChanged((user) => {
      if(user) {                                                        // dispatch user data to store
        dispatch(signedIn(user));
        usersRef.child(user.uid).set(pick(user, ['displayName', 'photoURL', 'email', 'uid']));                                  
      } else {                                                          // clears the store of dispatch data
        dispatch(signedOut());
      }
    });
  };
};
