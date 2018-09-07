<template>
  <el-card class="card">
    <!-- 面包屑 -->
      <my-crumbs level1="权限管理" level2="角色列表"></my-crumbs>
    <!--/ 面包屑 -->
    <el-button
    style="margin: 15px 0">添加角色</el-button>
    <!-- 表格 -->
      <template>
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
             asdasdasd
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            width="300">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini"  type="primary" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
              <el-button plain size="mini" type="success" icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    <!--/ 表格 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    this.handleData();
  },
  methods: {
    // 向后端请求数据, 并将数据绑定到tableData中
    async handleData () {
      // 发送请求后端数据
      const response = await this.$http.get('roles');
      // 将返回的数据绑定到tableData上;
      this.tableData = response.data.data;
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
</style>
