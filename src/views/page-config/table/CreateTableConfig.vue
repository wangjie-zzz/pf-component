<template>
  <pf-main :title="'创建表格'">
    <div class="pf-mt-20">
      <el-form ref="tableFDom" :config="tableFConfig" :model="tableInfo"></el-form>
    </div>
    <div class="pf-text-right pf-mr-20">
      <el-button icon="el-icon-refresh" v-if="isSave" @click="refresh"></el-button>
      <el-button type="primary" v-if="!isSave" @click="saveTable">保存</el-button>
      <el-button type="primary" v-if="isSave" @click="create">创建</el-button>
      <el-button
        type="primary"
        v-if="isSave"
        @click="
          () => {
            importDbShow = true;
          }
        "
        >导入数据表</el-button
      >
      <el-button v-if="isSave" @click="del">删除</el-button>
      <el-button type="primary" v-if="isSave" @click="preview">预览</el-button>
    </div>
    <el-table class="pf-mt-20" :config="fieldTConfig" :data="fieldList">
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
    <el-dialog :width="'80%'" title="表单项" v-model="show">
      <el-form ref="fieldFDom" :config="fieldFConfig" :model="fieldInfo" :col-count="3"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreate">确认</el-button>
          <el-button @click="show = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog :width="'80%'" title="表单预览" v-model="previewShow">
      <el-table :config="previewTableConfig"></el-table>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="previewOver">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <async-import-for-db :show="importDbShow" :table-id="tableInfo.tableId" @close="closeImportDbDialog"></async-import-for-db>
  </pf-main>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, ref, Ref } from "vue";
import { useNotice } from "@/components/element-plus/notice";
import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import PfMain from "@/components/layout/PfMain.vue";
import { useDict } from "@/constants/util/dict-convert";
import { emptyForm, FormModel } from "@/model/entity/FormModel";
import { dataService } from "@/services/data-service";
import { FormNameEnum } from "@/constants/enum/form-name.enum";
import { copy } from "@/constants/util/objects-utils";
import { SysTableInfo } from "@/model/entity/SysTableInfo";
import { SysTableField } from "@/model/entity/SysTableField";
import { emptyTable, TableModel } from "@/model/entity/TabelModel";
import { TableNameEnum } from "@/constants/enum/table-name.enum";

export default defineComponent({
  name: "CreateTableConfig",
  components: {
    PfMain,
    AsyncImportForDb: defineAsyncComponent(() => import("@/views/page-config/dialog/ImportForDb.vue"))
  },
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const { convertAllOptions } = useDict();
    const { message, loading } = useNotice();

    const isSave: Ref<boolean> = ref(false);
    const tableFDom = ref(null);
    const tableFConfig: Ref<FormModel> = ref(emptyForm);
    const tableInfo: Ref<SysTableInfo> = ref({} as any);

    const show: Ref<boolean> = ref(false);
    const fieldFDom = ref(null);
    const fieldFConfig: Ref<FormModel> = ref(emptyForm);
    const fieldInfo: Ref<SysTableField> = ref(null as any);

    const previewShow: Ref<boolean> = ref(false);
    const previewTableConfig: Ref<TableModel> = ref({} as TableModel);

    /*列表上方按钮方法*/
    const saveTable = () => {
      (tableFDom.value as any).validate((val: boolean) => {
        if (val) {
          clientService.general(systemApi.tableConfigApi.create, undefined, tableInfo.value).then(res => {
            if (res.code === Constants.CODE.SUCCESS) {
              message.success(res.message);
              isSave.value = true;
              refresh();
            } else {
              message.error(res.message);
            }
          });
        }
      });
    };
    const create = () => {
      fieldInfo.value = dataService.toFormValue(fieldFConfig.value as any);
      show.value = true;
    };
    const confirmCreate = () => {
      const param = copy(fieldInfo.value);
      param.tableId = tableInfo.value.tableId;
      clientService.general(systemApi.tableConfigApi.updateField, undefined, param).then(res => {
        if (res.code === Constants.CODE.SUCCESS) {
          message.success(res.message);
          show.value = false;
          refresh();
        } else {
          message.error(res.message);
        }
      });
    };
    const refresh = () => {
      init(tableInfo.value.name);
    };
    const del = () => {
      // systemApi.dictApi.delete
      message.error("待完善");
    };
    const preview = () => {
      tableInfo.value.fieldDtos = fieldList.value;
      previewTableConfig.value = dataService.toTableModel(tableInfo.value);

      previewShow.value = true;
    };
    const previewOver = () => {
      previewShow.value = false;
    };

    /*导入数据库表信息*/
    const importDbShow: Ref<boolean> = ref(false);
    const closeImportDbDialog = () => {
      importDbShow.value = false;
    };
    /*表单列，列表信息*/
    const fieldTConfig: Ref<TableModel> = ref(emptyTable);
    const fieldList: Ref<SysTableField[]> = ref([]);
    const handleClick = (data: SysTableField, cmd: string) => {
      switch (cmd) {
        case "edit":
          // 修改操作 需要将fieldId 赋值
          fieldInfo.value = data;
          show.value = true;
          break;
        default:
          message.error("未定义的操作！");
      }
    };

    const init = (name: string) => {
      clientService
        .general<any>(systemApi.tableConfigApi.info, { name })
        .then(res => {
          if (res.code === Constants.CODE.SUCCESS) {
            tableInfo.value = res.data.table;
            fieldList.value = res.data.fields;
            isSave.value = true;
            tableFConfig.value.setFormDisable();
          } else {
            message.error(res.message);
          }
        });
    };
    onMounted(() => {
      Promise.all([
        dataService.loadForm([
          {
            name: FormNameEnum.sysTableFieldForm,
            config: fieldFConfig,
            info: fieldInfo
          },
          {
            name: FormNameEnum.sysTableForm,
            config: tableFConfig,
            info: tableInfo
          }
        ]),
        dataService.loadTable([{ name: TableNameEnum.sysTableField, config: fieldTConfig }])
      ]).then(ress => {
        if (ress.findIndex(res => !res) === -1) {
          fieldFConfig.value?.setOptions("dict", convertAllOptions());
          if (props.name) {
            init(props.name);
          }
        }
      });
    });

    return {
      refresh,
      fieldList,
      fieldTConfig,
      handleClick,
      saveTable,
      confirmCreate,
      del,
      create,
      tableFDom,
      tableFConfig,
      tableInfo,
      isSave,
      fieldFDom,
      fieldFConfig,
      fieldInfo,
      importDbShow,
      closeImportDbDialog,
      show,
      preview,
      previewShow,
      previewTableConfig,
      previewOver
    };
  }
});
</script>
<style scoped lang="scss">
.#{$prefix} {
  &-create-table-config {
  }
}
</style>
