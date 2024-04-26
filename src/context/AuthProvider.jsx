import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";

const AuthContext = createContext();// 1. aşama
//* with custom hook
export const useAuthContext = () => {// 3. aşama
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("currentUser")) || false);// 
  const navigate = useNavigate();// 1. aşama başarılı olunca 

  useEffect(() => {// user bilgisini state de tutan methodumuz uygulama çalıştığında tetiklensin diye oluşturduk.
    userObserver();
  }, []);

  const createUser = async (email, password,displayName) => {//1. method db'ye user'i kayıt aşaması
    try {
      //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
      const userCredential = await createUserWithEmailAndPassword(
        auth,// bu auth bizim oluşturduğumuz auth
        email,// bu methodu çağırdığımız yerden göstereceğiz
        password // bu methodu çağırdığımız yerden göstereceğiz  
      ); //? kullanıcı profilini güncellemek için kullanılan firebase metodu registerda oluşturduğumuz displayname i kullanmak için ekledik
      await updateProfile(auth.currentUser, {// display name i oluşturmak için kullandığımız method 
        displayName,// key ve value su aynı olan obje
      });
      navigate("/login");
      toastSuccessNotify("registered successfully")
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      toastErrorNotify("error.message")


    }
  };
 


  const signIn= async(email,password)=>{ //2. methot sing in için(login sayfasına)
    try {
      //? mevcut kullanıcı için kullanılan firebase metodu
      await signInWithEmailAndPassword(auth ,email,password)
      navigate("/")// giriş gerçekleşince bizi home gönderecek
      toastSuccessNotify("Logged successfully")

    ;
    } catch (error) {
      console.log(error);
      toastErrorNotify("error.message")

      
    }
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toastSuccessNotify("Logged out successfully");
        navigate("/login")
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const userObserver = () => {// user bilgisini state de tutmak için kullanılan bir firebase methodu
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("logged in");
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });// user bilgilerini tutması için atıyoruz refreshde atmaması için
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        // User is signed out
        setCurrentUser(false);
        sessionStorage.removeItem("currentUser");
        // console.log("logged out");
      }
    });
  };


   // GOOGLE İLE GİRİŞ METHODU
    //* https://console.firebase.google.com/
  //* => Authentication => sign-in-method => enable Google
  //! Google ile girişi enable yap
  //* => Authentication => settings => Authorized domains => add domain
  //! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle
  const googleProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)// bir de pupup dışında redirect var
      .then((result) => {
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        // Handle Errors here.
        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => { //passwordu resetlemek için
    //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Please check your mail box!");// kullanıcıya uyarı verdik
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  


  

  const values = { currentUser, createUser, signIn, logOut, googleProvider, forgotPassword };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;// 2. aşama 
};

export default AuthProvider;
