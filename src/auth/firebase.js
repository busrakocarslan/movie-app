import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//* https://firebase.google.com/docs/auth/web/start =>dökümantasyon
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// bu ne yapıyor  firebase config i, frebase'in initialize methodu ile bununiçine kpyup bir app oluşturuyor ve bu app den yetkilendirme ile de bir authentication oluşturuyor. methodları burada yazacak olsaydır. athentication u export etmeye gerek yoktu. ama methodları contexte kullanacağımız için auth u export ettik. ilgili yerlerde kullanacağız. 