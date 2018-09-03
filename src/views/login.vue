<template>
    <div class="login-wrap">
        <el-form
        class="login-form"
        label-position="top"
        label-width="80px"
        :model="formData">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formData.username" tyoe="text" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input  v-model="formData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="handleLogin" class="login-btn" type="primary">登录</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 1. 绑定文本框
// 2. 给按钮添加点击事件，发送异步请求
// 3.
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin () {
      this.$http
        .post('login', this.formData)
        .then((response) => {
          const { meta: { msg, status } } = response.data;
          if (status === 200) {
            this.$message.success(msg);
            sessionStorage.setItem('token', response.data.data.token);
          } else {
            this.$message.error(msg);
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
    .login-wrap {
        background-color: #324152;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form {
        width: 500px;
        padding: 20px;
        background-color: #fff;
    }
    .login-btn {
        width: 100%;
    }
</style>
