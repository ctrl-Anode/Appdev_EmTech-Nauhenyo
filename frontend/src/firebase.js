/*import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDoSnXquw0VCEshV6yuUweVoEvew8ulblI",
    authDomain: "nauhenyosystem.firebaseapp.com",
    projectId: "nauhenyosystem",
    storageBucket: "nauhenyosystem.firebasestorage.app",
    messagingSenderId: "954332793298",
    appId: "1:954332793298:web:180993f99bcf3f5446a00b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();*/
/*{
    "type": "service_account",
    "project_id": "nauhenyosystem",
    "private_key_id": "b7184023929da58742c263cfe0b01b4c41441e45",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBJRWdXIQVsETx\ndm3F4+YkQk1j8vuCwbCX2SAssejl65ajT09yHT2tA6IjWUAkpAXs/vxVShcH3bl1\nWVIZbv9Sq0WtvFF97KChV8kcqO/eSiR5+uoBHlN4/SyT/CvXZLTRqhcP9YXfjalw\nKkgBysakXpwqlRUfDpLPXSAyu6c2nyAoeFK7c3pyNYkL69F7ALpGPROL9QLHRboB\nbpCFGoQL4XQuN15Uhcl2ssIHLwhAaggxqkB+rnchDYpGnW84+0XTwItJlyIIB8wP\n0nuxxdAkjLdz1ujsawNG48MfBk1vEtMHK1nY4tn3FhiauwtUkyROsZ2V+mB3qB1s\n9D68mvDzAgMBAAECggEAF7Jdv9wf9daV6YIm3waiWoR/9j6o46wGkeV5GxgLg69Z\n4K4psyMp9ADkHa4k6S9D7YXYnlDkGST3ohF+udFye0lkLSKpD5K+n8z4xw67D0Ii\nzjceCrEWe1ukjSt9PYSvjUxvCULi/+s42fggtDJAGN6QDnFoEVK6ab1P5qmQpGoU\nQrjN+MrZi1D6JPNJhIOoWkkh9vjVEunlsVuJfYULrsXzmYLZvgREiYVP3hTUZLJk\n3p/v8Mmopy2habNpkLEXpiZnxKrkaqvOipO58NuMxjWirr2h5uct4lr/U0AaUov2\n2q6W/wt2Ftclw58mIKwhHuKJyQw1M7yGiD+dVaI7wQKBgQDn4hq2dNZtPB8dGnLo\nE5/veBABtND/a9NyMEwZKCdrytECmtjhOWWeyaJLGeGy/qndaFoJmrsZzvtGzEj9\nSi9lXuxdNDID8g7aeKrPEOvBahePB0cVst1m8R9pSoQdCggrRnLsX/H6Fh6yTeW6\n9QzeBb9J2SVzoJx5HQzX/Cg5wwKBgQDVO5IJUuB5Xu4Ra0gvOHmTv5be2oLpHAPe\nI1KkaYpZ8+EDn6/OTt95pDJm/BhhtcPaWhvav7tIk/IxwTJREo/BaAykbHZBHyfr\nYWHmg0IuFgLaDDsSm6+3U86yppLdVxDvlJFnf5zDs/i3skhy3sNIdckbcJGnXvXr\nb2XVVsfJEQKBgQChtcT7SS/grfTkzvUjc8wtrIU9K2Q1PHURRS1Mvfv/6Ekqj+J/\n7w83VVahGUOVGJRNm+BuokGpFfeWwBCG052KDFC6DxRyO/Sv10cHcL14/QvA60pf\nj4VnrPBC9Xx84+oeg9rRjXeq+JIftsNnRk3a6Bcm4RCFOpTkwaWbWnaTEQKBgGM4\n9RuhlRLlOaKhaVWP0gMOhAXvaDtQ7fvQNASNl/ODqJEnHYfC6/qOjWWeqTnOevSA\nObXwwhVjwq+kVuWi3YICCN/6GIz1En5VMlkxevo3A9yzFEn0aC/Gr8gx+uVEPn09\nhOvEVg47EOFp9Ix/XB+7r3k1SJG5fnWvwJMlbpIBAoGBAInHTDG8foR4gqbOpHrn\nYHzuQmlTYn6MBA5aGDusg+aXM9IfKu2K/rT9rUx7EDJrxOrJg1GPIDyvdLVhXmaU\nDZjRfoJ8HmPMXJRNM26uz81Xt5+A7tCDl/ZLGQ0WO1Te759nuqTj0JpMdnTBTMu6\n04sTM7dlyeiG+1KhMexheivC\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-y8y2n@nauhenyosystem.iam.gserviceaccount.com",
    "client_id": "114937202911868786343",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y8y2n%40nauhenyosystem.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }*/
    import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getFirestore } from 'firebase/firestore';
    import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDoSnXquw0VCEshV6yuUweVoEvew8ulblI",
    authDomain: "nauhenyosystem.firebaseapp.com",
    projectId: "nauhenyosystem",
    storageBucket: "nauhenyosystem.firebasestorage.app",
    messagingSenderId: "954332793298",
    appId: "1:954332793298:web:180993f99bcf3f5446a00b"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export the Firebase services you need
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;
