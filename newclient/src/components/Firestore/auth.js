import db from './firestore'
import firebase from 'firebase'
// import auth from 'firebase-auth'

export const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(auth.currentUser)
    } else {
        // redirect to login page
        console.log(user)
    }
    Authenticate.user = user
})

export default class Authenticate {
    
    // static async getUser() {
    //     return await auth.currentUser
    // }

    static user;

    static signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(`user created successfully: ${cred.user}`)
        })
        .catch(err => {
            console.log(err.message)
        })
    }
    
    static login(email, password, redirect) {

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(email, password).then(cred => {
                console.log(`signed in successfully: ${cred.user}`)
                redirect(true, null)
                // if employee redirect to employee view
        
                // if admin redirect to admin view
            })
            .catch(err => {
                redirect(false, err.message)
            })
        })
        
    }
    
    static logout() {
        auth.signOut().then(() => {
            console.log('logged out succesfully')
    
            // material successful dialog shows up
        })
        .catch(err => {
            console.log('something went wrong')
        })
    }
}


// export default this;