<template>
  <el-card class="card">
    <!-- 面包屑 -->
      <my-crumbs level1="权限管理" level2="角色列表1"></my-crumbs>
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
            <template slot-scope="scope">
              <el-row
                v-for="level1 in scope.row.children"
                :key="level1.id">
                <el-col :span="4">
                  <el-tag
                    closable
                    @close="handleClose(scope.row, level1.id)">
                    {{level1.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 显示二级权限 -->
                  <el-row
                    v-for="level2 in level1.children"
                    :key="level2.id">
                    <el-col :span="4">
                      <el-tag
                        closable
                        type="success"
                        @close="handleClose(scope.row, level2.id)">
                        {{level2.authName}}
                      </el-tag>
                    </el-col>
                    <el-col :span="20">
                      <!-- 显示三级权限 -->
                      <el-tag
                        class="level3"
                        v-for="level3 in level2.children"
                        :key="level3.id"
                        closable
                        type="warning"
                        @close="handleClose(scope.row, level3.id)">
                        {{level3.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- 未分配权限 -->
              <el-row v-if="scope.row.children.length === 0">
                <el-col :span="24">未分配权限</el-col>
              </el-row>
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
              <el-button @click="handleRights(scope.row)" plain size="mini" type="success" icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    <!--/ 表格 -->
    <!-- 树形控件 -->
      <el-dialog
      title="权限分配"
      :visible.sync="dialogFormVisible">
        <el-tree
          ref="tree"
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="checkedKeys"
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSetRights()">确 定</el-button>
        </div>
      </el-dialog>
    <!--/ 树形控件 -->
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      // 控制对话框的显示和隐藏
      dialogFormVisible: false,
      data: [],
      defaultProps: {
        // 树上绑定节点的对象
        label: 'authName',
        // 对象的子节点绑定的对象
        children: 'children',
      },
      checkedKeys: [],
      // 记录当前角色id
      currentRoleId: -1
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
        // this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 分配用户角色
    async handleClose (roleId, rightId) {
      // 发送异步请求 删除对应角色的对应权限
      const response = await this.$http.delete(`roles/${roleId.id}/rights/${rightId}`);
      // 接收返回的状态
      const {meta: {msg, status}} = response.data;
      // 判断放回的状态弹出提示
      if (status === 200) {
        this.$message.success(msg);
        // 重新加载当前角色的权限列表
        roleId.children = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    // 添加角色权限结构
    async handleRights (role) {
      // 点击按钮显示弹出框
      this.dialogFormVisible = true;
      // 发送异步请求
      const response = await this.$http.get('rights/tree');
      this.data = response.data.data;
      console.log(this.data)
      // 设置角色所拥有的权限被选中
      // 当前角色role所拥有的权限id
      const arr = [];
      // 遍历一级权限
      role.children.forEach(level1 => {
        // 遍历二级权限
        level1.children.forEach(level2 => {
          // 遍历三级权限 并将其保存到arr数组中
          level2.children.forEach(level3 => {
            arr.push(level3.id)
          })
        });
      });
      this.checkedKeys = arr;
      console.log(this.checkedKeys);
      // 记录当前角色id 
      this.currentRoleId = role.id;
    },
    // 为角色添加权限
    async handleSetRights () {
      // 准备发送异步的数据
      // rids权限id列表，每个id使用,分割
      // 获取树上选中或半选节点的id
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      // 将两个数组通过解构的方式合并
      const arr = [...arr1, ...arr2];
      // 调用数组的join方法 将数组用 , 分隔;
      const rids = arr.join(',');
      const response = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: rids
      });
      // 接收返回的状态,判断并展示
      const {meta: {status, msg}} = response.data;
      if (status === 200) {
        // 弹出提示成功
        this.$message.success(msg);
        // 关闭窗口
        this.dialogFormVisible = false;
        // 刷新表格
        this.handleData();

      } else {
        this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.level3 {
  margin: 0 0 6px 6px;
}
.card {
  height: 100%;
  overflow: auto;
  height: 100%;
}
</style>
