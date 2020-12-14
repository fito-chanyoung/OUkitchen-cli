/* eslint-disable prettier/prettier */
<template>
  <v-container class="container">
    <v-form v-model="valid" lazy-validation>
      <v-row justify="start">
        <v-col cols="12" sm="3"> 성 함 *</v-col>
        <v-col cols="12" sm="9">
          <v-text-field v-model="firstname" :rules="nameRules" :counter="10" outlined required>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3"> 이메일 * </v-col>
        <v-col cols="12" sm="7">
          <v-text-field v-model="email" :rules="emailRules" ref="Email" outlined> </v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn text @click="checkDuple">
            중복확인
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="3">비밀번호 *</v-col>
        <v-col cols="12" sm="9">
          <v-text-field v-model="password" type="password" :rules="passwordRules" required outlined>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn class="right" @click="submit" :ripple="false" :disabled="!valid">submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    firstname: '',
    valid: true,
    duplicated: false,
    nameRules: [
      (v) => !!v || '이름은 비어서는 안됩니다.',
      (v) => v.length <= 10 || '이름은 10자 이내로 작성해 주셔야 됩니다.',
    ],
    email: '',
    emailRules: [
      (v) => {
        console.log(v);
        if (!v) return 'E-mail은 빈칸이 될수 없습니다.';
        /.+@.+/.test(v) || 'Email 입력을 확인하세요';
        return true;
      },
    ],
    password: '',
    passwordRules: [
      (v) => v.length >= 8 || '비밀번호는 8자 이상 이여야 합니다.',
      (v) => v.length <= 16 || '비밀번호는 16자 이하여야 합니다.',
    ],
  }),
  methods: {
    submit() {
      let data = { name: this.firstname, email: this.email, password: this.password };
      alert(data);
    },
    checkDuple: function () {
      let email = this.$refs.Email.$el.querySelector('input').value;
      console.log('email', typeof (email));
      axios({
        method: 'post',
        url: 'http://ec2-54-180-100-83.ap-northeast-2.compute.amazonaws.com:8080/api/v1/user/login/check',
        data: {
          "userId": email,
        },
        headers:{
          "OUKitchen-Authorization":"zpxlffjrm:1q2w3r!",
          "Content-Type": "application/json"
        }
      })
        .then(data=> console.log(data));
    },
  },
};
</script>
