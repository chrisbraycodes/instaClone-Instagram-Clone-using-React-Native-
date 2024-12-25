import { USER_STATE_CHANGE } from '../constants';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export function fetchUser() {
  return async (dispatch, getState) => {
    const { currentUser } = getState().user || {}; // Ensure user exists in state
    if (currentUser) {
      console.log('User data already fetched');
      return;
    }

    try {
      const auth = getAuth();
      const authUser = auth.currentUser;

      if (!authUser) {
        console.log('No user is currently logged in.');
        return;
      }

      const firestore = getFirestore();
      const userDoc = doc(firestore, 'users', authUser.uid);
      const docSnapshot = await getDoc(userDoc);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();

        // Convert Firestore timestamp to ISO string if it exists
        if (userData.createdAt && userData.createdAt.toDate) {
          userData.createdAt = userData.createdAt.toDate().toISOString();
        }

        console.log('User fetched:', userData);
        dispatch({ type: USER_STATE_CHANGE, currentUser: userData });
      } else {
        console.log('User does not exist in Firestore');
      }
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };
}
