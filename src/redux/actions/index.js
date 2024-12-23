import { USER_STATE_CHANGE } from '../constants';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function fetchUser() {
  return async (dispatch) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No user is currently logged in.');
      return;
    }

    const firestore = getFirestore();
    const userDoc = doc(firestore, 'users', currentUser.uid);
    const docSnapshot = await getDoc(userDoc);

    if (docSnapshot.exists()) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: docSnapshot.data() });
    } else {
      console.log('User does not exist');
    }
  };
}
