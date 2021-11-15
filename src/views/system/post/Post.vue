<template>
  <div class="pf-bgwhite pf-p-10">
    <div class="pf-mt-20 pf-text-left">
      <el-button icon="el-icon-refresh" @click="refreshPost"></el-button>
      <el-button type="primary" @click="createPost">新建</el-button>
      <el-button @click="deletePost">删除</el-button>
    </div>
    <el-table class="pf-mt-20" :config="postConfig" :data="postData">
      <el-table-column label="操作" fixed="right" width="80">
        <template #default="scope">
          <el-tooltip effect="light" placement="left" trigger="hover">
            <i class="pf-fs-18 el-icon-menu el-button--text"></i>
            <template #content>
              <div class="pf-flex pf-flex-column pf-flex-0">
                <el-button @click="handleClick(scope.row, 'edit')" type="text" size="mini">编辑</el-button>
                <el-button @click="handleClick(scope.row, 'user')" type="text" size="mini">人员配置</el-button>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增岗位" v-model="show">
      <el-form ref="postFormRef" @changeEvent="postFormRefChange" :config="postFormConfig" :model="postInfo"></el-form>
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmCreatePost">确认</el-button>
          <el-button @click="show = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog title="人员配置" v-model="show1">
      <el-transfer
        v-model="transValue"
        :props="{
          key: 'key',
          label: 'label',
          disabled: 'disabled'
        }"
        :data="transData"
      />
      <template #footer>
        <div class="pf-text-right">
          <el-button type="primary" @click="confirmAddUser">确认</el-button>
          <el-button @click="show1 = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";
import { usePost } from "@/views/system/post/use-post";
import { useNotice } from "@/components/element-plus/notice";
import { emptyForm, FormModel } from "@/model/entity/FormModel";
import { dataService } from "@/services/data-service";
import { FormNameEnum } from "@/constants/enum/form-name.enum";
import { emptyTable } from "@/model/entity/TabelModel";
import { TableNameEnum } from "@/constants/enum/table-name.enum";

export default defineComponent({
  name: "Post",
  setup() {
    const { list, add, listUser, addUser } = usePost();
    const show = ref(false);
    const postConfig = ref(emptyTable);
    const postData: Ref<any[]> = ref([]);
    const postFormRef = ref(null);
    const postFormConfig: Ref<FormModel> = ref(emptyForm);
    const postInfo: Ref<any> = ref(null as any);
    onMounted(() => {
      Promise.all([
        dataService.loadTable([{ name: TableNameEnum.sysPost, config: postConfig }]),
        dataService.loadForm([
          {
            name: FormNameEnum.sysPostForm,
            config: postFormConfig,
            info: postInfo
          }
        ])
      ]).then(ress => {
        if (ress.findIndex(res => !res) === -1) {
          refreshPost();
        }
      });
    });
    const refreshPost = () => {
      list().then(res => {
        postData.value = res;
      });
    };
    const createPost = () => {
      show.value = true;
    };
    const deletePost = () => {
      useNotice().message.error("待完善");
    };
    const confirmCreatePost = () => {
      (postFormRef.value as any).validate((val: boolean) => {
        if (val) {
          add(postInfo).then(res => {
            if (res) {
              show.value = false;
              refreshPost();
            }
          });
        }
      });
    };

    const show1 = ref(false);
    let postId = "";
    const transData: Ref<any[]> = ref([]);
    const transValue: Ref<string[]> = ref([]);
    const confirmAddUser = () => {
      addUser(postId, transValue.value).then(res => {
        if (res) {
          show1.value = false;
        }
      });
    };
    const handleClick = (data: any, cmd: string) => {
      switch (cmd) {
        case "user":
          postId = data.postId;
          listUser(postId).then(res => {
            console.log(res);
            if (res && res.length === 2) {
              show1.value = true;
              transData.value = res[0];
              transValue.value = res[1];
            }
          });
          break;
        case "edit":
          /*TODO 岗位信息编辑*/
          break;
        default:
      }
    };
    const postFormRefChange = (newV: any, prop: string) => {};

    return {
      show,
      postFormRef,
      postFormRefChange,
      postFormConfig,
      postInfo,
      deletePost,
      createPost,
      confirmCreatePost,
      refreshPost,
      postConfig,
      postData,
      handleClick,
      transData,
      transValue,
      show1,
      confirmAddUser
    };
  }
});
</script>

<style scoped lang="scss"></style>
