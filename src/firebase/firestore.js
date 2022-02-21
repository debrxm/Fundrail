import { firestore } from "./config";
export const CreateCategory = async (data) => {
  const { category, id } = data;
  console.log(data);
  const categoryRef = firestore.doc(`categories/${category.toLowerCase()}`);
  const categoryData = {
    id,
    label: category,
  };
  try {
    await categoryRef.set(categoryData);
  } catch (error) {
    console.log("error creating category", error.message);
  }
};
export const CreateMenu = async (data, userID) => {
  const { id } = data;
  console.log(data);
  const menuRef = firestore.doc(`menus/${userID}/${id}`);
  try {
    await menuRef.set(data);
  } catch (error) {
    console.log("error creating Menu", error.message);
  }
};
export const onCheckoutCart = async (data, currentUser, reference, cleanUp) => {
  let sent = false;
  const batch = firestore.batch();

  const userRef = firestore.doc(`users/${currentUser.id}`);
  data.cart.forEach((item, index) => {
    const kitchenRef = firestore.doc(
      `orders/${item.kitchen_info.phone}/orders`
    );
    batch.set(kitchenRef, data);
  });
  // Final Step Update all product and shopping list
  try {
    await batch.commit();
    cleanUp();
  } catch (error) {
    console.log("error creating order", error.message);
    cleanUp();
  }
};
