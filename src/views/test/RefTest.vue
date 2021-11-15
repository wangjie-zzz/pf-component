<template>
  <div>
    <p>{{ obj.name }}</p>
    <!--    <p>{{ state0 }}</p>-->
    <!--    <p>{{ state1.name.value }}</p>-->
    <!--    <p>{{ state2 }}</p>-->
    <p>{{ state20.name }}</p>
    <!--    <p>{{ state3.name }}</p>-->
    <button @click="myFn">按钮</button>
  </div>
</template>

<script lang="ts">
import { ref, toRef, toRefs, reactive } from "vue";

export default {
  name: "RefTest",
  setup() {
    const obj = { name: "lnj", desc: { sex: "1" } };
    /*
        ref(obj.name) -> ref(lnj)
        -> reactive({value:lnj})
        * */
    // ref->复制
    // let state = ref(obj.name);
    // toRef->引用
    /*
        ref和toRef区别:
        ref->复制, 修改响应式数据不会影响以前的数据 (前提是基础类型的情况下)
        toRef->引用, 修改响应式数据会影响以前的数据
        ref->数据发生改变, 界面就会自动更新
        toRef->数据发生改变, 界面也不会自动更新

        toRef应用场景:
        如果想让响应式数据和以前的数据关联起来, 并且更新响应式数据之后还不想更新UI, 那么就可以使用toRef
        * */
    // const state0 = toRef(obj, "name");
    // const state1 = toRefs(obj);
    // const state2 = ref(obj.name);
    const state20 = reactive(obj);
    // const state3 = { ...obj }; // 解构 会复制一个新对象 浅拷贝
    function myFn() {
      obj.name = "zs"; // 不会触发视图更新  因为 obj是非响应性的
      // state0.value = "zs0"; // 不会触发视图更新
      // state1.name.value = "zs1"; // 不会触发视图更新
      // state2.value = "zs2"; // 会触发视图更新
      state20.name = "zs2"; // 会触发视图更新
      state20.desc.sex = "2"; // 会触发视图更新
      // state3.name = "zs3";
      // state3.desc.sex = "2";
      /*
            结论: 如果利用ref将某一个对象中的属性变成响应式的数据
                 我们修改响应式的数据是不会影响到原始数据的obj !== state
            * */
      /*
            结论: 如果利用toRef将某一个对象中的属性变成响应式的数据
                 我们修改响应式的数据是会影响到原始数据的
                 但是如果响应式的数据是通过toRef创建的, 那么修改了数据并不会触发UI界面的更新
            * */
      console.log(obj, /*state0, state1,*/ state20 /*,state20*/ /*, state3*/); //{name:'zs'}
    }
    return { obj, /*state1, state0,  state20,*/ state20, /*state3,*/ myFn };
  }
};
</script>

<style scoped></style>
