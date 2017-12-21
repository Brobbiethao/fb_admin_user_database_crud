import { database } from '../firebase';

const messagesRef = database.ref('messages');                   // firebase reference

export const createMessage = ({ content, uid }) => {
  return (dispatch) => {                                        // create JSON object, sends it to store
    const message = {
      content,
      uid,
      timeStamp: Date.now()
    };
    messagesRef.push(message);                                  // pushes data to firebase
    console.log(message);
  };
};

export const addMessage = (key, { content, uid }) => {          // helper function to create JSON object in the store
  return {
    type: 'ADD_MESSAGE',
    content,
    key,
    uid
  };
};



                                                                // Destroy function
export const destroyMessage = (key) => {
  return (dispatch) => {
    messagesRef.child(key).remove().then(() => {                // remove child object from firebase
      dispatch(removeMessage(key));                             // calls helper function.  
    });         
  };
};

export const removeMessage = (key) => {                         // helper function to clear store
  return {
    type: 'REMOVE_MESSAGE',
    key
  };
};

// onChange listener to hit Redux
export const startListeningForMessages = () => {
  return ( dispatch ) => {
    messagesRef.on('child_added', (snapshot) => {
      dispatch(addMessage( snapshot.key, snapshot.val() ));
    });
    messagesRef.on('child_removed', (snapshot) => {
      dispatch(removeMessage( snapshot.key));
    });
  };
};
