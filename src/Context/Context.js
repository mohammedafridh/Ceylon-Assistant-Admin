import {createContext, useContext, useEffect, useState} from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {auth} from '../Firebase';

const UserAuthContext = createContext()

export function UserAuthContextProvider({children}) {

    const[user,setUser] = useState('');

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth, email,password);
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            unsubscribe();
        }
    },[]);

    const context = {
        user,
        signUp,
        logIn,
        logOut,
        // googleSignIn
    }

  return (
    <UserAuthContext.Provider value = {context}>
      {children}
    </UserAuthContext.Provider>
  )
}

export function useUserAuth(){
    return useContext(UserAuthContext)
}
