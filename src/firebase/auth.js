import firebase, { auth, firestore } from "./config";

export const createUserProfileDocument = async (
  userAuth,
  otherProps,
  getUser
) => {
  if (!userAuth) return;
  const kitchenRef = firestore.doc(`kitchens/${userAuth.uid}`);
  const snapShot = await kitchenRef.get();
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapShot = await userRef.get();
  let ref;
  Promise.all([snapShot, userSnapShot])
    .then(async () => {
      if (otherProps?.role) {
        console.log("Kitchen");
        if (!snapShot.exists) {
          const { email, emailVerified, uid, photoURL } = userAuth;
          const userData = {
            id: uid,
            email,
            wallet_value: 0,
            wallet_point: 0,
            profile_image: photoURL || "",
            emailVerified,
            ...otherProps,
          };
          try {
            auth.currentUser.sendEmailVerification();
            await kitchenRef.set(userData);
          } catch (error) {
            console.log("error creating user", error.message);
          }
        }
        getUser(kitchenRef);
        // ref = kitchenRef;
      } else if (snapShot.exists) {
        console.log("Kitchen Exist");
        getUser(kitchenRef);
        // ref = kitchenRef;
      } else if (userSnapShot.exists) {
        console.log("User Exist");
        getUser(userRef);
        // ref = userRef;
      } else {
        console.log("User");
        if (!userSnapShot.exists) {
          const { first_name, last_name, phone, college } = otherProps;
          const { email, emailVerified, uid, photoUri } = userAuth;
          const created_at = Date.now();
          const userData = {
            id: uid,
            first_name,
            last_name,
            phone,
            college: college || "",
            email,
            role: "customer",
            wallet_value: 0,
            wallet_point: 0,
            created_at,
            profile_image: photoUri || "",
            emailVerified,
          };
          try {
            auth.currentUser.sendEmailVerification();
            await userRef.set(userData);
          } catch (error) {
            console.log("error creating user", error.message);
          }
        }
        getUser(userRef);
      }
      // return ref;
    })
    .catch((error) => console.log(error));
  return ref;
};
export const CompleteStoreSetup = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);

  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const UpdateShopInfo = async (data, userId) => {
  const userRef = firestore.doc(`users/${userId}`);
  try {
    await userRef.update(data);
  } catch (error) {
    console.log("error", error.message);
  }
};
export const CreateEmployeeProfile = async (data) => {
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  try {
    await cashierRef.set(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const UpdateEmployeeProfile = async (data) => {
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  try {
    await cashierRef.update(data);
  } catch (error) {
    console.log("error creating cashier", error.message);
  }
};
export const OnArchiveEmployee = async (data, history) => {
  const batch = firestore.batch();
  const { id } = data;
  const cashierRef = firestore.doc(`employees/${id}`);
  const archiveRef = firestore.doc(`archived_employees/${id}`);
  batch.set(archiveRef, data).delete(cashierRef);
  try {
    await batch.commit();
    history.goBack();
  } catch (error) {
    console.log(
      "An error occured while trying to archive cashier",
      error.message
    );
  }
};
export const OnDeleteEmployee = async (id) => {
  const batch = firestore.batch();
  const cashierRef = firestore.doc(`employees/${id}`);
  const cashierStatsRef = firestore.doc(`cashier_stats/${id}`);
  batch.delete(cashierRef).delete(cashierStatsRef);
  try {
    await batch.commit();
  } catch (error) {
    console.log(
      "An error occured while trying to delete cashier",
      error.message
    );
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
