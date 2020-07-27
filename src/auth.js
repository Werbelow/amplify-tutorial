import { Auth } from "aws-amplify";
export function fetchUser() {
  return new Promise((resolve, reject) => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        console.log(err);
        resolve(null);
      });
  });
}
export async function logout() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
