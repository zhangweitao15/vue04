<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
        <el-row>
          <el-col :span="5">
            <img src="@/assets/logo.png" alt="">
          </el-col>
          <el-col class="middle" :span="18">
            <span>电商后台管理系统</span>
          </el-col>
          <el-col  :span="1">
            <a class="logout" href="#">退出</a>
          </el-col>
        </el-row>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px">
                <el-menu
          :unique-opened="true"
          :router="true"
          style="height: 100%"
          default-active="0">
          <el-submenu index="1">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="/users">
              <i class="el-icon-view"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="/roles">
              <i class="el-icon-view"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-view"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <el-breadcrumb class="main-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div style="margin-top: 15px; width: 400px">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">

            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <template>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="日期"
        width="120">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="地址"
        width="250">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      input5: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {
    handleCurrentChange () {

    }
  }
};
</script>

<style>
    .main-title {
      margin: 15px 0;
    }
    .sidebar {
      height: 100%;
    }
    .logout {
      text-align: center;
      color: orange;
      text-decoration: none;
    }
    .middle {
      text-align: center;
      color: #fff;
      font-size: 20px;
    }
    .el-container {
        height: 100%;
    }
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>
