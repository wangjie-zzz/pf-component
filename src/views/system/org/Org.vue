<template>
  <div class="pf-flex">
    <div class="pf-w-15 pf-p-10 pf-mr-10 pf-bgwhite">
      <el-button icon="el-icon-refresh" size="mini" @click="refreshComp"></el-button>
      <el-button type="primary" size="mini" @click="createComp">添加</el-button>
      <el-tree
        class="pf-mt-10"
        :data="treeData"
        :props="{
          children: 'children',
          label: 'name'
        }"
        node-key="id"
        :current-node-key="activeNode.id"
        @node-click="handleNodeClick"
        :highlight-current="true"
      ></el-tree>
    </div>
    <div class="pf-flex-1  pf-p-10 pf-bgwhite">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane class="pf-mt-10" label="部门配置" name="dept">
          <div class="pf-bgwhite pf-p-10">
            <div class="pf-mt-20 pf-text-left">
              <el-button icon="el-icon-refresh" @click="refreshDept"></el-button>
              <el-button type="primary" @click="createDept">新建</el-button>
              <el-button @click="deleteDept">删除</el-button>
            </div>
            <el-table class="pf-mt-20" :config="deptConfig" :data="deptData">
              <el-table-column label="操作" fixed="right" width="80">
                <template #default="scope">
                  <el-tooltip effect="light" placement="left" trigger="hover">
                    <i class="pf-fs-18 el-icon-menu el-button--text"></i>
                    <template #content>
                      <div class="pf-flex pf-flex-column pf-flex-0">
                        <el-button @click="handleClick(scope.row, 'edit')" type="text" size="mini">编辑</el-button>
                      </div>
                    </template>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane class="pf-mt-10" label="用户配置" name="user">
          <div class="pf-bgwhite pf-p-10">
            <div class="pf-mt-20 pf-text-left">
              <el-button icon="el-icon-refresh" @click="refreshUser"></el-button>
              <el-button type="primary" @click="createUser">新建</el-button>
              <el-button @click="deleteUser">删除</el-button>
            </div>
            <el-table class="pf-mt-20" :config="userConfig" :data="userData">
              <el-table-column label="操作" fixed="right" width="80">
                <template #default="scope">
                  <el-tooltip effect="light" placement="left" trigger="hover">
                    <i class="pf-fs-18 el-icon-menu el-button--text"></i>
                    <template #content>
                      <div class="pf-flex pf-flex-column pf-flex-0">
                        <el-button @click="handleClick(scope.row, 'edit-user')" type="text" size="mini">编辑</el-button>
                      </div>
                    </template>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="新增公司" v-model="show">
      <el-form ref="compForm" @changeEvent="compFormChange" :config="compFormConfig" :model="compInfo"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreateComp">确认</el-button>
          <el-button @click="show = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="新增部门" v-model="show1">
      <el-form ref="deptFormRef" @changeEvent="deptFormRefChange" :config="deptFormConfig" :model="deptInfo"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreateDept">确认</el-button>
          <el-button @click="show1 = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="新增用户" v-model="show2">
      <el-form ref="userFormRef" @changeEvent="userFormRefChange" :config="userFormConfig" :model="userInfo"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreateUser">确认</el-button>
          <el-button @click="show2 = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from "vue";
import { TNode, useOrg } from "@/views/system/org/use-org";
import { useTenant } from "@/views/system/tenant/use-tenant";
import { emptyForm, FormModel } from "@/model/entity/FormModel";
import { useNotice } from "@/components/element-plus/notice";
import { dataService } from "@/services/data-service";
import { FormNameEnum } from "@/constants/enum/form-name.enum";
import { emptyTable, TableModel } from "@/model/entity/TabelModel";
import { TableNameEnum } from "@/constants/enum/table-name.enum";

export default defineComponent({
  name: "User",
  setup() {
    const { companyList, addCompany, addDept, addUser, deptList, userList, findNodeById, tNodeToOptions } = useOrg();
    const { list } = useTenant();
    const activeTab = ref("dept");
    const activeNode: Ref<TNode> = ref({} as any);
    const treeData: Ref<TNode[]> = ref([]);

    const show = ref(false);
    const compForm = ref(null);
    const compFormConfig: Ref<FormModel> = ref(emptyForm);
    const compInfo: Ref<any> = ref(null as any);

    const refreshComp = () => {
      companyList().then(res => {
        treeData.value = res;
        activeNode.value = treeData.value.length > -1 ? treeData.value[0] : ({} as any);
      });
    };
    const createComp = () => {
      list().then(res => {
        show.value = true;
        if (res && res.length > 0) {
          compFormConfig.value?.setOptions(
            "comTenId",
            res.map(ten => {
              return { key: ten.tenId, value: ten.tenName, disabled: false };
            })
          );
        }
      });
    };
    const confirmCreateComp = () => {
      (compForm.value as any).validate((val: boolean) => {
        if (val) {
          addCompany(compInfo.value, treeData).then(res => {
            if (res) {
              show.value = false;
            }
          });
        }
      });
    };
    const show2 = ref(false);
    const userConfig: Ref<TableModel> = ref(emptyTable);
    const userData: Ref<any[]> = ref([]);
    const userFormRef = ref(null);
    const userFormConfig: Ref<FormModel> = ref(emptyForm);
    const userInfo: Ref<any> = ref(null as any);
    const refreshUser = () => {
      userList(activeNode.value.id, activeNode.value.isCom).then(res => {
        userData.value = res;
      });
    };
    const createUser = () => {
      list().then(res => {
        show2.value = true;
        if (res && res.length > 0) {
          userFormConfig.value?.setOptions(
            "userTenId",
            res.map(ten => {
              return { key: ten.tenId, value: ten.tenName, disabled: false };
            })
          );
        }
      });
    };
    const deleteUser = () => {
      useNotice().message.error("待完善");
    };
    const confirmCreateUser = () => {
      (userFormRef.value as any).validate((val: boolean) => {
        if (val) {
          addUser(userInfo).then(res => {
            if (res) {
              show2.value = false;
            }
          });
        }
      });
    };

    const show1 = ref(false);
    const deptConfig: Ref<TableModel> = ref(emptyTable);
    const deptData: Ref<any[]> = ref([]);
    const deptFormRef = ref(null);
    const deptFormConfig: Ref<FormModel> = ref(emptyForm);
    const deptInfo: Ref<any> = ref(null as any);
    const refreshDept = () => {
      deptList(activeNode.value.id, activeNode.value.isCom).then(res => {
        deptData.value = res;
      });
    };
    const createDept = () => {
      list().then(res => {
        show1.value = true;
        if (res && res.length > 0) {
          deptFormConfig.value?.setOptions(
            "deptTenId",
            res.map(ten => {
              return { key: ten.tenId, value: ten.tenName, disabled: false };
            })
          );
        }
      });
    };
    const deleteDept = () => {
      useNotice().message.error("待完善");
    };
    const confirmCreateDept = () => {
      (deptFormRef.value as any).validate((val: boolean) => {
        if (val) {
          addDept(deptInfo.value, treeData).then(res => {
            if (res) {
              show1.value = false;
            }
          });
        }
      });
    };
    watch(activeNode, () => {
      refreshDept();
      refreshUser();
    });
    const handleNodeClick = (data: TNode) => {
      activeNode.value = data;
    };
    const handleTabClick = (data: any) => {
      console.log(data);
    };
    const handleClick = (data: any, cmd: string) => {
      console.log(data, cmd);
      useNotice().message.error(cmd + "待完善");
    };
    const userFormRefChange = (newV: any, prop: string) => {
      if (prop === "userTenId") {
        userFormConfig.value?.setOptions(
          "userComId",
          tNodeToOptions(
            treeData.value.filter(t => t.isCom && t.supId === newV),
            true
          )
        );
      } else if (prop === "userComId") {
        const node = findNodeById(treeData.value, newV);
        if (node) {
          userFormConfig.value?.setOptions("userDeptId", tNodeToOptions(node.children.filter(t => !t.isCom)));
        } else {
          userFormConfig.value?.setOptions("userDeptId", []);
        }
      }
    };
    const deptFormRefChange = (newV: any, prop: string) => {
      if (prop === "deptTenId") {
        deptFormConfig.value?.setOptions(
          "deptComId",
          tNodeToOptions(
            treeData.value.filter(t => t.isCom && t.supId === newV),
            true
          )
        );
      } else if (prop === "deptComId") {
        const node = findNodeById(treeData.value, newV);
        if (node) {
          deptFormConfig.value?.setOptions("deptSupDeptId", tNodeToOptions(node.children.filter(t => !t.isCom)));
        } else {
          deptFormConfig.value?.setOptions("deptSupDeptId", []);
        }
      }
    };
    const compFormChange = (newV: any, prop: string) => {
      if (prop === "comTenId") {
        compFormConfig.value?.setOptions(
          "comSupComId",
          tNodeToOptions(
            treeData.value.filter(t => t.isCom && t.supId === newV),
            true
          )
        );
      }
    };
    onMounted(() => {
      Promise.all([
        dataService.loadForm([
          {
            name: FormNameEnum.companyForm,
            config: compFormConfig,
            info: compInfo
          },
          { name: FormNameEnum.deptForm, config: deptFormConfig, info: deptInfo },
          { name: FormNameEnum.sysUserForm, config: userFormConfig, info: userInfo }
        ]),
        dataService.loadTable([
          { name: TableNameEnum.sysDept, config: deptConfig },
          { name: TableNameEnum.sysUser, config: userConfig }
        ])
      ]).then(ress => {
        if (ress.findIndex(res => !res) === -1) {
          refreshComp();
        }
      });
    });

    return {
      activeTab,
      activeNode,
      treeData,
      show,
      compFormConfig,
      compForm,
      compInfo,
      refreshComp,
      createComp,
      confirmCreateComp,
      show1,
      deptFormConfig,
      deptFormRef,
      deptInfo,
      deptConfig,
      deptData,
      refreshDept,
      createDept,
      confirmCreateDept,
      deleteDept,
      show2,
      userConfig,
      userData,
      userFormRef,
      userFormConfig,
      userInfo,
      refreshUser,
      createUser,
      confirmCreateUser,
      deleteUser,
      handleNodeClick,
      handleTabClick,
      handleClick,
      deptFormRefChange,
      userFormRefChange,
      compFormChange
    };
  }
});
</script>

<style scoped lang="scss"></style>
