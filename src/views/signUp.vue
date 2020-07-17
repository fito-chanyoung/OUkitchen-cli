<template>
  <v-container class="container">
    <v-form v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="3">이메일 *</v-col>
        <v-col cols="12" sm="7">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            ref="Email"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn text @click="checkDuple">중복확인</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">비밀번호 *</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            v-model="password"
            type="password"
            :rules="passwordRules"
            required
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn
            class="right"
            @click="submit"
            :ripple="false"
            :disabled="!valid"
            >submit</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    firstname: "",
    valid: true,
    duplicated: true,
    nameRules: [
      (v) => !!v || "이름은 비어서는 안됩니다.",
      (v) => v.length <= 10 || "이름은 10자 이내로 작성해 주셔야 됩니다.",
    ],
    email: "",
    emailRules: [
      function (v) {
        console.log(v);
        if (!v) return "E-mail은 빈칸이 될수 없습니다.";
        /.+@.+/.test(v) || "Email 입력을 확인하세요";
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
    submit: function () {
      console.log(process.env.VUE_APP_PROCESSPASSWORD);
      let data = {
        email: this.email,
        password: this.password,
      };
      if (this.duplicated) alert("이메일 중복검사는 반드시 필요합니다.");
      else {
        axios({
          method: "post",
          url: process.env.VUE_APP_REG,
          data: {
            userId: this.email,
            userPassword: data.password,
          },
          headers: {
            "OUKitchen-Authorization": process.env.VUE_APP_PROCESSPASSWORD,
            "Content-Type": "application/json",
          },
        }).then((response) => {
          let data = response.data;
          if (data.code === 0) {
            alert("회원 가입을 축하드립니다. 로그인 페이지로 이동합니다.");
            this.$emit("login");
            window.location.href = "/login";
          } else if (data.code === 2) {
            alert("서버 연결에 실패했습니다. 다시한번 시도해 보세요");
          } else {
            alert(data.data);
          }
        });
      }
    },
    checkDuple: function () {
      console.log(process.env);
      let email = this.$refs.Email.$el.querySelector("input").value;
      console.log("email", typeof email);
      axios({
        method: "post",
        url: process.env.VUE_APP_REG_CHECK,
        data: {
          userId: email,
        },
        headers: {
          "OUKitchen-Authorization": process.env.VUE_APP_PROCESSPASSWORD,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          let data = response.data;
          if (data.code === 0) {
            this.duplicated = false;
            alert("사용 가능한 아이디입니다.");
          } else if (data.code === 2) {
            alert("서버 연결에 실패했습니다. 다시 시도해 주세요");
          } else if (data.code === 8) {
            alert("이미 가입된 아이디 입니다.");
          } else this.duplicated = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
