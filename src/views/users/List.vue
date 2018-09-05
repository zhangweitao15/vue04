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
            style="width: 300px"
            placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button type="success" plain>添加用户</el-button>
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
              <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="success" icon="el-icon-check"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
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
      pagenum: 1, // 页码
      pagesize: 2, //页容量
      total: 0 //总页数
    };
  },
  created () {
    this.loadData();
  },
  methods: {
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
    // 异步请求列表数据
    async loadData () {
      // 设置token
      const token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      const reponse = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // 请求结束
      this.loading = false;
      const {meta: {msg, status}} = reponse.data;
      // 判断获取的数据是否ok
      if (status === 200) {
        // 将获取的数据与 data 中的数据绑定
        this.tableData = reponse.data.data.users;
        // 设置总页数;
        this.total = reponse.data.data.total;
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
