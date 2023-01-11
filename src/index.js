import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkV0RkDrIWA-Ux9cXUczeGgHAUnbeKpsQ",
  authDomain: "get-email-to-calendar.firebaseapp.com",
  projectId: "get-email-to-calendar",
  storageBucket: "get-email-to-calendar.appspot.com",
  messagingSenderId: "537676850635",
  appId: "1:537676850635:web:494f941b8889e7f3c3424e"
};

const app = initializeApp(firebaseConfig);

const { createApp } = Vue;

const Calendar = {
  data() {
    return {
      auth: getAuth(),
      providerGoogle: new GoogleAuthProvider(),
      isLogin: false,
      email: '',
      name: '',
      career: '',
      success: false,

      uri: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfhRRX0esPOj3Mo8ZHdg7pEe3rJ9xocUvwVROSzD3JwHFF0yw/formResponse'
    }
  },
  methods: {
    // Google login
    async googleLogin() {
      const result =
        await signInWithPopup(this.auth, this.providerGoogle)
          .catch((error) => console.debug(error.message));
      const user = result.user;
      this.email = user.email;
      this.isLogin = true;
    },
    // submit
    async submit() {
      if(this.email === '') {
        alert('請先登入 Google 帳號');
        this.isLogin = false;
        return false;
      }
      if(this.name < 2) {
        alert('請填寫姓名');
        this.$refs.name.focus();
        return false;
      }
      if(this.career === '') {
        alert('請選擇天職');
        this.$refs.career.focus();
        return false;
      }

      const config = {
        method: 'post',
        url: `${this.uri}?emailAddress=${this.email}&entry.356111020=${this.name}&entry.646662341=${this.career}`,
        data: ""
      };

      const result =
        await axios(config)
          .catch(function (error) {
            console.debug(error);
          });
      
      this.success = true;


      // var data = {
      //   'emailAddress': this.email,
      //   'entry.356111020': this.name,
      //   'entry.646662341': this.career
      // };
      // $.ajax({
      //   type: 'POST',
      //   url: this.uri,
      //   data: data,
      //   contentType: 'application/json',
      //   dataType: 'jsonp',
      //   complete: function() {
      //     alert('資料已送出！');
      //   }
      // });

    }
  },
  mounted() {},
};

createApp(Calendar).mount('#app');