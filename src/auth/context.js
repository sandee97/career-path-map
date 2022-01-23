import React, { useContext, useState, useEffect } from "react"
import { auth} from "../firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const userDb = firebase.firestore().collection("users")
const AuthContext = React.createContext()
export function useAuth(){
    return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const provider = new firebase.auth.GoogleAuthProvider()
  async function signup(email, password,phoneNumber) {
    return auth.createUserWithEmailAndPassword(email, password).then(async (cred) =>{
      userDb.doc(cred.user.uid).set({
        uid : cred.user.uid,
        name : "",
        phoneNumber : phoneNumber,
        email : cred.user.email,
        formData: null
      })
      cred.user.sendEmailVerification();
        auth.signOut();
        alert("Email sent");
        console.log(JSON.stringify(cred.user['emailVerified']))
    }).catch(e =>{
      console.log(e);
    })
  }
  function socialsignup(provider){
    return auth.signInWithPopup(provider).then(async (cred) =>{
      userDb.doc(cred.user.uid).set({
        uid : cred.user.uid,
        name : "",
        number : null,
        email : cred.user.email,
        formData :null
      })
    }).catch( e =>{
      console.log(e)
    })  
}
   function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password);

  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  const updatedUserDetailsObject = (uid, oldUD, newUD) => {
    return {
      uid: uid,
      name: newUD.name ? newUD.name : (oldUD.name ? oldUD.name : ""),
      phoneNumber: newUD.phoneNumber ? newUD.phoneNumber : (oldUD.phoneNumber ? oldUD.phoneNumber : ""),
      email: newUD.email ? newUD.email : (oldUD.email ? oldUD.email : ""),
      formData: newUD.formData ? newUD.formData.concat(oldUD.formData) : (oldUD.formData ? oldUD.formData : ""),
    }
  }
  function updateUserDetails (uid, newUserDetails){
    alert("hehe")
    return userDb.doc(uid).get().then((user) => {
      console.log("Retrieved for uid:", uid, ":", user)
      if (!user || !user.data()) {
        console.log("User with id ", uid, " does not exist as per the records, pls wait as we make an account for him in the records")
        const userEntry = updatedUserDetailsObject(uid, {}, newUserDetails)
        userDb.doc(uid).set(userEntry).then(() => {
          console.log("User successfully added")
          return { message: "success" }
        }).catch((e) => {
          return { message: "error", error: e }
        })
      }
      else {
        const userData = user.data()
        const userEntry = updatedUserDetailsObject(uid, userData, newUserDetails)
        userDb.doc(uid).set(userEntry).then(() => {
          console.log("success")
          return { message: "success" }
        }).catch((e) => {
          console.log(e)
          return { message: "error", error: e }
        })
      }
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updateUserDetails,
    updatePassword,
    socialsignup  
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}