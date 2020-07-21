<template>
  <v-container class="container">
    <v-form>
      <v-row class="left">
        <v-col cols="12" sm="3">
          <v-subheader>이메일 *</v-subheader>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            required
            outlined
            class="left"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="left">
        <v-col cols="12" sm="3">
          <v-subheader class="left">비밀번호 *</v-subheader>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-divider></v-divider>
      </v-row>
      <v-row class="left align-center justify-center">
        <v-col cols="12" sm="8">
          <v-subheader class="justify-self-start align-self-start left"
            >아직 회원이 아니신가요?</v-subheader
          >
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
            class="right"
            to="/signUP"
            dark
            color="rgba(0,153,255,0.7"
            :ripple="false"
            v-model="valid"
            >회원가입</v-btn
          >
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
            class="right"
            @click="submit"
            type="submit"
            dark
            color="rgba(0,153,255,0.7"
            :ripple="false"
            v-model="valid"
            >로그인</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data: () => ({
    valid: false,
    firstname: "",
    email: "",
    emailRules: [
      function(v) {
        if (!v) return "E-mail은 빈칸이 될수 없습니다.";
        if (!/.+@.+/.test(v)) return "Email 입력을 확인하세요";
        return true;
      },
    ],
    password: "",
    passwordRules: [
      (v) => v.length >= 8 || "비밀번호는 8자 이상 이여야 합니다.",
      (v) => v.length <= 16 || "비밀번호는 16자 이하여야 합니다.",
    ],
  }),
  methods: {
    submit: function() {
      axios({
        method: "post",
        url: process.env.VUE_APP_LOGIN,
        data: {
          userId: this.email,
          userPassword: this.password,
        },
        headers: {
          "OUKitchen-Authorization": process.env.VUE_APP_PROCESSPASSWORD,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let data = response.data;
          if (data.code === 0) {
            this.$emit("login", this.email);
            this.$router.push({ name: "Home", query: { redirect: "/" } });
          } else if (data.code === 2) {
            alert("서버 연결에 실패했습니다. 다시한번 시도해 보세요");
          } else if (data.code === 5) {
            alert("존재하지 않는 사용자 입니다");
          } else if (data.code === 6) {
            alert("비밀번호 혹은 아이디를 확인해 주세요");
          } else if (data.code === 7) {
            alert("죄송합니다 이용하실 수 없습니다.");
          } else {
            alert(data.data);
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.right {
  float: right !important;
}
.left {
  text-align: left;
}
</style>
