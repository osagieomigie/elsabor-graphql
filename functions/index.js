const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("server-files");

if (!admin.apps.length) {
  admin.initializeApp();
}
//const server = ;

exports.api = functions.https.onRequest(app);
