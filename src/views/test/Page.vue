<template>
  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination @size-change="handleSizeChange" @prev-click="prevClick" @next-click="nextClick" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="options" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination></div
></template>

<script>
export default {
  name: "Page",
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    nextClick(val) {
      console.log(`当前页: ${val}`);
    },
    prevClick(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      options: [10, 20, 30, 50],
      pageSize: 10,
      currentPage4: 0,
      total: 400
    };
  }
};
</script>

<style scoped></style>
