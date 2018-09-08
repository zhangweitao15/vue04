<template>
 <el-card class="box-roles">
  <my-crumbs level1="权限管理" level2="权限列表" ></my-crumbs>
  <!-- 表格 -->
  <template>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!--一级权限 -->
          <el-row>
            <el-col :span="4">
              <!-- 显示一级权限的名字 -->
              <el-tag>
              </el-tag>
            </el-col>
            <el-col :span="20"></el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="权限名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="children.path"
        label="路径"
        width="300">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="props">
          {{s}}
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
    // 发送异步请求获取权限列表数据
    async handleData () {
      const response = await this.$http.get('roles');
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
        // 将结果返回的结果绑定到当前组件上
        this.tableData = response.data.data;
      }
    }
  }
};
</script>

<style>
 .box-roles {
  height: 100%;
 }
</style>
