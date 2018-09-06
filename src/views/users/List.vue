<template>
  <el-card class="box-card">
    <!--面包屑-->
      <el-breadcrumb class="crumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    <!--/面包屑-->
    <!-- 搜索框-->
      <el-row class="inp">
        <el-col :span="24">
          <el-input
            clearable
            v-model="searchValue"
            style="width: 300px"
            placeholder="请输入内容">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
          </el-input>
            <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加用户</el-button>
        </el-col>
      </el-row>
    <!--/搜索框-->
    <!-- 表格-->
        <el-table
          v-loading="loading"
          border
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="时间">
            <template slot-scope="scope" >
              {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="mg_state"
            label="用户状态"
            width="80">
            <template slot-scope="scope">
              <el-switch
                @change="handleChange(scope.row)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handlealter(scope.row)" plain size="mini"  type="primary" icon="el-icon-edit"></el-button>
              <el-button @click="handleDelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete"></el-button>
              <el-button plain size="mini" type="success" icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
    <!--/表格-->
    <!--分页-->
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    <!--/分页-->
    <!-- 添加 弹出框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogFormVisible"
        @close="handleClose">
        <el-form
          ref="form"
          :rules="rules"
          :model="formData"
          label-width="80px">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formData.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input  v-model="formData.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
    <!--/ 弹出框 -->
    <!-- 编辑 弹出框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editUserDialogFormVisible"
        @close="handleClose">
        <el-form
          :model="formData"
          label-width="80px">
          <el-form-item prop="username" label="用户名" >
            <el-input v-model="formData.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogFormVisible = false">取 消</el-button>
          <el-button @click="handleEdit" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    <!-- / 弹出框 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        username: '',
        create_time: '',
        email: '',
        mobile: '',
        mg_state: true
      }],
      loading: true,
      // 页码
      pagenum: 1,
      // 页容量
      pagesize: 2,
      // 总页数
      total: 0,
      searchValue: '',
      // 控制对话框的显示或隐藏
      addUserDialogFormVisible: false,
      //控制用户信息弹框显示或隐藏
      editUserDialogFormVisible: false,
      // 绑定对话框中表单的数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  // 当结构创建完成的时候 调用loadData 方法绘制页面
  created () {
    this.loadData();
  },
  methods: {
  // 异步请求列表数据 展示数据
    async loadData () {
      // 设置token
      const token = sessionStorage.getItem('token');
      // 将token 添加到请求头中
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送异步请求
      const reponse = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      // 请求结束 loading 加载图结束
      this.loading = false;
      // 获取返回结果中的 成功或失败的数据
      const {meta: {msg, status}} = reponse.data;
      // 判断获取的数据是否ok
      if (status === 200) {
        // 将获取的数据与 data 中的数据绑定
        this.tableData = reponse.data.data.users;
        // 设置总页数;
        this.total = reponse.data.data.total;
      } else {
        // 当错误的时候 将错误信息显示
        this.$message.error(msg);
      }
    },
    // 删除功能
    handleDelete (id) {
      this.$confirm('您确认删除此用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 当点击确认按钮的时候
        // 发送请求
        const response = await this.$http.delete(`users/${id}`);
        // 接收返回的 状态 结构
        const {meta: {status, msg}} = response.data;
        if (status === 200) {
          // 删除成功经状态打印
          this.$message.success(msg);
          // 如果是最后一页，并且只有一条数据，此时删除数据会有问题
          if (this.pagenum > 1 && this.tableData.length === 1) {
            this.pagenum--;
          }
          // 刷新表格
          this.loadData();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 搜索功能
    handleSearch () {
      this.loadData();
    },
    // 分页相关方法
    // 当页容量发生变化
    handleSizeChange (val) {
      // 将变换的值付给 data 中的 pagesize
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 当页码发生改变
    handleCurrentChange (val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 修改用户状态
    async handleChange (user) {
      const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      // 将返回的数据用对象结构的方式, 保存起来
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        // 成功将成功的状态打印出来
        this.$message.success(msg);
      } else {
        // 失败将失败的结果打印出来
        this.$message.error(msg);
      }
    },
    // 添加用户
    handleAdd () {
      // 表单验证
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          this.$message.warning('验证失败');
          return;
        }
        // 验证成功，发送异步请求
        const response = await this.$http.post('users', this.formData);
        // 获取数据，判断添加是否成功
        const { meta: { status, msg } } = response.data;
        if (status === 201) {
          // 成功
          // 提示
          this.$message.success(msg);
          // 刷新表格
          this.loadData();
          // 关闭对话框
          this.addUserDialogFormVisible = false;
        } else {
          // 失败
          this.$message.error(msg);
        }
      });
    },
    // 清空当页面关闭时清空文本框
    handleClose () {
      // 遍历对象的所有属性, 将属性对应的值设置为空
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    // 修改用户信息
    handlealter (user) {
      // 让添加的弹出框显示
      this.editUserDialogFormVisible = true;
      // 点击后弹出框中显示当前点击的数据
      this.formData.username = user.username;
      this.formData.email = user.email;
      this.formData.mobile = user.mobile;
      // 点击编辑按钮的时候, 将当前的id保存
      this.formData.id = user.id;
    },
    // 编辑用户信息
    async handleEdit () {
      // 点击后发送异步请求
      const response = await this.$http.put(`users/${this.formData.id}`, this.formData);
      // 接收后端返回的状态
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
        // 关闭弹出框
        this.editUserDialogFormVisible = false;
        // 刷新表格
        this.loadData();
      } else {
        this.$message.error(msg);
        
       
      }
    }
  }
};
</script>

<style>
  .box-card {
    height: 100%;
  }
  .inp {
    margin: 15px 0;
  }
  .crumbs {
    margin: 15px 0;
  }
</style>
