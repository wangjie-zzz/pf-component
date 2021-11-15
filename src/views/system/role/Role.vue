<template>
  <div class="pf-bgwhite pf-p-10">
    <div class="pf-mt-20 pf-text-left">
      <el-button icon="el-icon-refresh" @click="refreshRole"></el-button>
      <el-button type="primary" @click="createRole">新建</el-button>
      <el-button @click="deleteRole">删除</el-button>
    </div>
    <el-table class="pf-mt-20" :config="roleConfig" :data="roleData">
      <el-table-column label="操作" fixed="right" width="80">
        <template #default="scope">
          <el-tooltip effect="light" placement="left" trigger="hover">
            <i class="pf-fs-18 el-icon-menu el-button--text"></i>
            <template #content>
              <div class="pf-flex pf-flex-column pf-flex-0">
                <el-button @click="handleClick(scope.row, 'edit')" type="text" size="mini">编辑</el-button>
                <el-button @click="handleClick(scope.row, 'post')" type="text" size="mini">岗位配置</el-button>
                <el-button @click="handleClick(scope.row, 'user')" type="text" size="mini">人员配置</el-button>
                <el-button @click="handleClick(scope.row, 'auth')" type="text" size="mini">权限配置</el-button>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增角色" v-model="show">
      <el-form ref="roleFormRef" @changeEvent="roleFormRefChange" :config="roleFormConfig" :model="roleInfo"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreateRole">确认</el-button>
          <el-button @click="show = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useRole } from "@/views/system/role/use-role";
import { useNotice } from "@/components/element-plus/notice";
import { emptyForm, FormModel } from "@/model/entity/FormModel";
import { dataService } from "@/services/data-service";
import { FormNameEnum } from "@/constants/enum/form-name.enum";
import { emptyTable } from "@/model/entity/TabelModel";
import { TableNameEnum } from "@/constants/enum/table-name.enum";

export default defineComponent({
  name: "Role",
  setup() {
    const { roleList, addRole } = useRole();
    const show = ref(false);
    const roleConfig = ref(emptyTable);
    const roleData: Ref<any[]> = ref([]);
    const roleFormRef = ref(null);
    const roleFormConfig: Ref<FormModel> = ref(emptyForm);
    const roleInfo: Ref<any> = ref(null as any);
    onMounted(() => {
      Promise.all([
        dataService.loadTable([{ name: TableNameEnum.sysRole, config: roleConfig }]),
        dataService.loadForm([{ name: FormNameEnum.sysRoleForm, config: roleFormConfig, info: roleInfo }])
      ]).then(ress => {
        if (ress.findIndex(res => !res) === -1) {
          refreshRole();
        }
      });
    });
    const refreshRole = () => {
      roleList().then(res => {
        roleData.value = res;
      });
    };
    const createRole = () => {
      show.value = true;
    };
    const deleteRole = () => {
      useNotice().message.error("待完善");
    };
    const confirmCreateRole = () => {
      (roleFormRef.value as any).validate((val: boolean) => {
        if (val) {
          addRole(roleInfo).then(res => {
            if (res) {
              show.value = false;
              refreshRole();
            }
          });
        }
      });
    };

    const handleClick = (data: any, cmd: string) => {
      /*TODO*/
      switch (cmd) {
        case "edit":
          break;
        case "user":
          break;
        case "post":
          break;
        case "auth":
          break;
        default:
      }
    };
    const roleFormRefChange = (newV: any, prop: string) => {};
    return {
      show,
      roleFormRef,
      roleFormRefChange,
      roleFormConfig,
      roleInfo,
      deleteRole,
      createRole,
      confirmCreateRole,
      refreshRole,
      roleConfig,
      roleData,
      handleClick
    };
  }
});
</script>

<style scoped lang="scss"></style>
