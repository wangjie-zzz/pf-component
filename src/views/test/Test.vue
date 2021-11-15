<template>
  <div class="pf-bgwhite">
    <!--<el-button @click="click">click</el-button>
    <h1>{{ two }}</h1>
    <el-tree @node-click="nodeClick" :data="data" :highlight-current="true" :current-node-key="activeKey" node-key="id" default-expand-all @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :allow-drop="allowDrop" :allow-drag="allowDrag">
    </el-tree>-->
    <test-child :refObj="refObj"></test-child>
    <ref-test></ref-test>
    <p>{{ refObj.aa }}----------{{ refObj.bb.bbb }}</p>
    <button @click="numberTest">
      number
    </button>
    <form-test></form-test>
    <page></page>
    <el-button @click="getApp">getApp</el-button>
    <Suspense>
      <async-test><span>async1</span></async-test>
    </Suspense>
    <el-button @click="() => (showAsync2 = !showAsync2)">showOrnoShow Async2</el-button>
    <async-test2 v-if="showAsync2"><span>async2 </span></async-test2>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  provide,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  defineAsyncComponent
} from "vue";
import TestChild from "@/views/test/child/TestChild.vue";
import RefTest from "@/views/test/RefTest.vue";
import FormTest from "@/views/test/formtest/FormTest.vue";
import Page from "@/views/test/Page.vue";
import FileDialog from "@/components/dialog/FileDialog.vue";
import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

export default defineComponent({
  name: "Test",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {
    Page,
    TestChild,
    RefTest,
    FormTest,
    AsyncTest: defineAsyncComponent(() => import("@/views/test/AsyncTest.vue")),
    AsyncTest2: defineAsyncComponent(() => import("@/views/test/AsyncTest2.vue"))
  },
  setup() {
    onBeforeMount(() => {
      console.log("Test Component is onBeforeMount!");
    });
    onMounted(() => {
      console.log("Test Component is mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Test Component is onBeforeUpdate!");
    });
    onUpdated(() => {
      console.log("Test Component is onUpdated!");
    });
    onBeforeUnmount(() => {
      console.log("Test Component is onBeforeUnmount!");
    });
    onUnmounted(() => {
      console.log("Test Component is onUnmounted!");
    });
    onErrorCaptured(() => {
      console.log("Test Component is onErrorCaptured!");
    });
    onRenderTracked(() => {
      console.log("Test Component is onRenderTracked!");
    });
    onRenderTriggered(() => {
      console.log("Test Component is onRenderTriggered!");
    });
    onBeforeRouteLeave((to, from) => {
      console.log("onBeforeRouteLeave", to, from);
      return true;
    });
    onBeforeRouteUpdate(async (to, from) => {
      console.log("onBeforeRouteUpdate", to, from);
    });
    const refObj = ref({ aa: "aa", bb: { bbb: "bbb" } });
    // const refObj = { aa: "aa", bb: { bbb: "bbb" } };
    provide("parent", { aa: "aa" });
    const data = ref([
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1"
              },
              {
                id: 10,
                label: "三级 1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1"
          },
          {
            id: 6,
            label: "二级 2-2"
          }
        ]
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1"
          },
          {
            id: 8,
            label: "二级 3-2",
            children: [
              {
                id: 11,
                label: "三级 3-2-1"
              },
              {
                id: 12,
                label: "三级 3-2-2"
              },
              {
                id: 13,
                label: "三级 3-2-3"
              }
            ]
          }
        ]
      }
    ]);
    const activeKey = ref(1);
    const two = computed(() => {
      console.log(activeKey.value);
      return activeKey.value * 2;
    });
    const currentPage = ref(0);
    const pageOpts = reactive([100, 200, 300, 400]);
    const pageSize = ref(100);
    const dataTotal = ref(100);
    const showAsync2 = ref(false);
    return {
      data,
      activeKey,
      two,
      click() {
        activeKey.value = activeKey.value + 1;
      },
      nodeClick(a: any, b: any, c: any) {
        console.log(activeKey.value);
        console.log(a, b, c);
      },
      refObj,
      numberTest() {
        console.log(Number(100 / 3.33333).toFixed(1));
        console.log(Number(100 / 0).toFixed(1));
      },
      getApp() {
        clientService.general(systemApi.appApi.list).then(res => {
          console.log(res);
        });
      },
      showAsync2
    };
  },
  methods: {
    handleDragStart(node: any, ev: any) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode: any, dropNode: { label: any }, ev: any) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode: any, dropNode: { label: any }, ev: any) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode: any, dropNode: { label: any }, ev: any) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode: any, dropNode: { label: any }, dropType: any, ev: any) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode: any, dropNode: { label: any }, dropType: any, ev: any) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode: any, dropNode: { data: { label: string } }, type: string) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode: { data: { label: string | string[] } }) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    }
  }
});
</script>

<style scoped></style>
