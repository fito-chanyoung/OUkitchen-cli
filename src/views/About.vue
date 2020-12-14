<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import axios from 'axios';
/* eslint-disable */
export default {
  methods: {},
  mounted() {
    this.$loadScript('https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js')
      .then(() => {
        // Script is loaded, do something
        const that = this;
        // eslint-disable-next-line
        const naverLogin = new naver.LoginWithNaverId({
          clientId: 'SOZDf5zOJC5AR1Fgllv5',
          callbackUrl: 'http://localhost:8080/#/call_back',
          isPopup: false,
          callbackHandle: true,
        });

        /* (3) 네아로 로그인 정보를 초기화하기 위하여 init을 호출 */
        naverLogin.init();
        let tokenArr = window.location.href.split('#');
        tokenArr = tokenArr[tokenArr.length - 1].split('&');
        let tokenObj = {};

        for (const n of tokenArr) {
          let tmpArr = n.split('=');
          tokenObj[tmpArr[0]] = tmpArr[1];
        }
        console.log(tokenObj.access_token);
        axios
          .get('https://openapi.naver.com/v1/nid/me', {
            Authorization: `${tokenObj.token_type}tokenObj.access_token`,
          })
          .then((data) => console.log(data));

        /* (4) Callback의 처리. 정상적으로 Callback 처리가 완료될 경우 main page로 redirect(또는 Popup close) */
        naverLogin.getLoginStatus(function (status) {
          if (status) {
            const email = naverLogin.user.getEmail();
            const name = naverLogin.user.getName();
            const profileImage = naverLogin.user.getProfileImage();
            const birthday = naverLogin.user.getBirthday();
            const uniqId = naverLogin.user.getId();
            const age = naverLogin.user.getAge();
            console.log(email);
            console.log(name);
            console.log(profileImage);
            console.log(birthday);
            console.log(uniqId);
            console.log(age);
          } else {
            console.log('AccessToken이 올바르지 않습니다.');
          }
        });
      })
      .catch(() => {
        // Failed to fetch script
      });
  },
};
</script>
