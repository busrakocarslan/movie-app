import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//* https://firebase.google.com/docs/auth/web/start =>dökümantasyon
//* https://console.firebase.google.com/ => project settings
//! firebase console settings bölümünden firebaseconfig ayarlarını al
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// bu ne yapıyor  firebase config i, frebase'in initialize methodu ile bununiçine kpyup bir app oluşturuyor ve bu app den yetkilendirme ile de bir authentication oluşturuyor. methodları burada yazacak olsaydır. athentication u export etmeye gerek yoktu. ama methodları contexte kullanacağımız için auth u export ettik. ilgili yerlerde kullanacağız. 