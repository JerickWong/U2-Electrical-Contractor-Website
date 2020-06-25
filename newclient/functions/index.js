import functions from 'firebase-functions'
import admin from 'firebase-admin'
admin.initializeApp();

exports.makeManagerRole = functions.https.onCall((data, context) => {
    // get user and add custom claim (admin)
    
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            // represents the different claims
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return {
            message: `An error has occured! ${err.message}`
        }
    })
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
