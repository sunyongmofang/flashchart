<template>
    <div>
      <el-table border mini :data="tableData">
        <el-table-column v-for="label in fields" :key="label" :prop="label" :label="label"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  props: {
    tableData: Array
  },
  computed: {
    fields: function () {
      let fd = []
      if (this.tableData.length !== 0) {
        for (let field in this.tableData[0]) {
          fd.push(field)
        }
      }
      return fd
    }
  }
}
</script>
