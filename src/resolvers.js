const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://elsabor-e6312.firebaseio.com"
  });

const db = admin.firestore();

module.exports = {
    Query: {
        async user(_, {input}){
            console.log(input.userName);
            let user = db.collection('users').doc(`${input.userId}`);
            let getDoc = await user.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    console.log(`doc ID: ${doc.id}`);
                    return { userId: doc.id, ...doc.data()}
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

            return getDoc;
        }, 
        deals(_, {input}, {db}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "descp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        deal(_, {input}, {db}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "descp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        savedDeals(_, {input}, {db}){
            return{
                dealId: "testDeal1",
                userId: "test1",
                name: "deal",
                description: "desp",
                link: "link_",
                expiryDate: "10-02-21"
            }
        },
        menu(){
            return{
                menuId: "test-menu",
                userId: "testM",
                link: "link_"
            }
        }
    }
}