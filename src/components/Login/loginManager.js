import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

// export const initializeLoginFramework = () = > {
//     firebase.initializeApp(firebaseConfig)
// }

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

//google 

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
            //console.log(displayName, photoURL, email)
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}
//facebook
export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            var user = result.user;
            user.success = true;
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

// sign out
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            }
            return signedOutUser;
        })
        .catch(err => {
            // An error happened
        })
}
// create user with email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}
// sign in with with email and password
export const signInWithEmailAndPassword = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;

        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;

        });
}
// update user name
const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(function () {
        console.log('user name update successful.');
    }).catch(function (error) {
        console.log(error);
    });
}