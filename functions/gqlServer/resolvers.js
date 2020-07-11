const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://elsabor-e6312.firebaseio.com",
});

const db = admin.firestore();

module.exports = {
  Query: {
    async user(_, { input }) {
      let user = db.collection("users").doc(`${input.userId}`);
      let getDoc = await user
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            console.log("Document data:", doc.data());
            console.log(`doc ID: ${doc.id}`);
            return { id: doc.id, userId: doc.id, ...doc.data() };
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });

      return getDoc;
    },
    async loginQuery(_, { input }) {
      let result = {};
      let user = db.collection("users").where("email", "==", input.email);
      let getDoc = await user
        .get()
        .then((doc) => {
          if (!doc.docs) {
            console.log("No such document!");
          } else {
            doc.docs.forEach((userDoc) => {
              result = {
                id: userDoc.id,
                userId: userDoc.id,
                ...userDoc.data(),
              };
            });

            return result;
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });

      return getDoc;
    },
    async deals() {
      let deal = db.collection("Deal");
      let getDoc = await deal
        .get()
        .then((doc) => {
          if (!doc.docs) {
            console.log("No deals available!");
          } else {
            let result = [];
            doc.docs.forEach((element) =>
              result.push({
                id: element.id,
                dealId: element.id,
                ...element.data(),
              })
            );
            return result;
          }
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });

      return getDoc;
    },
    async deal(_, { input }) {
      let deal = db.collection("Deal").doc(`${input.dealId}`);
      let getDoc = await deal
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            console.log("Document data:", doc.data());
            return { id: doc.id, dealId: doc.id, ...doc.data() };
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });

      return getDoc;
    },
    async savedDeals(_, { input }) {
      console.log(`UserId: ${input.userId}`);
      let deal = db.collection("savedDeals");
      let getDoc = await deal
        .where("userId", "==", `${input.userId}`)
        .get()
        .then((doc) => {
          if (!doc.docs) {
            console.log("No deals available!");
          } else {
            let promises = [];
            doc.docs.forEach((element) => {
              console.log(
                `element ${element.data().dealId}, userId: ${
                  element.data().userId
                }`
              );
              promises.push(
                db.collection("Deal").doc(element.data().dealId).get() // join dealID from savedDeals collection to Deals collection
              );
            }); // join by ID
            return Promise.all([...promises]);
          }
        })
        .then((doc) => {
          // once all the join promises are done, return result
          let result = [];
          doc.forEach((element) => {
            result.push({
              id: element.id,
              dealId: element.id,
              ...element.data(),
            });
          });
          console.log(result);
          return result;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });

      return getDoc;
    },
    async menu() {
      let menu = db.collection("menu");
      let getDoc = await menu
        .get()
        .then((doc) => {
          if (!doc.docs) {
            console.log("No menus available!");
          } else {
            let result = [];
            doc.docs.forEach((element) =>
              result.push({
                id: element.id,
                menuId: element.id,
                ...element.data(),
              })
            );
            return result;
          }
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        });

      return getDoc;
    },
  },

  Mutation: {
    async addUser(_, { input }) {
      let result = {};
      let userInfo = await db
        .collection("users")
        .add({ ...input })
        .then((ref) => {
          console.log(`ref: ${ref.id}`);
          return { id: ref.id, userId: ref.id, ...input };
        })
        .catch((e) => {
          console.log(`Error: ${e}`);
        });
      return userInfo;
    },
    async deleteUser(_, { input }) {
      let result = {};

      try {
        // get user info to return back to client
        await db
          .collection("users")
          .doc(`${input.userId}`)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              doc.ref.delete(); // delete from user table
              result = { id: doc.id, userId: doc.id, ...doc.data() };
            }
          })
          .catch((err) => {
            console.log("Error getting document", err);
          });

        // delete reference in savedDeals table
        db.collection("savedDeals")
          .where("userId", "==", input.userId)
          .then((doc) => {
            doc.forEach((element) => element.ref.delete());
          })
          .catch((e) => {
            console.log(`Error deleting: ${e}`);
          });

        // delete reference in Deal table
        db.collection("Deal")
          .where("userId", "==", input.userId)
          .then((doc) => {
            doc.forEach((element) => element.ref.delete());
          })
          .catch((e) => {
            console.log(`Error deleting: ${e}`);
          });
      } catch (e) {
        console.log(`No other references: ${e}`);
      }

      return result;
    },

    async addDeal(_, { input }) {
      let deal = await db
        .collection("Deal")
        .add({ ...input })
        .then((ref) => {
          db.collection("savedDeals").add({
            userId: input.userId,
            dealId: ref.id,
          }); // add deal to savedDeals collection
          return { id: ref.id, dealId: ref.id, ...input }; // return Deal back to client
        })
        .catch((e) => {
          console.log(`Error: ${e}`);
        });

      return deal;
    },

    async addSavedDeal(_, { input }) {
      let result = {};
      try {
        await db.collection("savedDeals").add({ ...input }); // add deal to savedDeals collection
        await db
          .collection("Deal")
          .doc(input.dealId)
          .get()
          .then((doc) => {
            console.log(doc.data());
            result = { id: doc.id, dealId: doc.id, ...doc.data() }; // return Deal back to client
          });
      } catch (e) {
        console.log(`Error: ${e}`);
      }

      return result;
    },

    async addMenu(_, { input }) {
      let menu = await db
        .collection("menu")
        .add({ ...input })
        .then((ref) => {
          return { id: ref.id, menuId: ref.id, ...input }; // return menu back to client
        })
        .catch((e) => {
          console.log(`Error: ${e}`);
        });

      return menu;
    },
  },
};
