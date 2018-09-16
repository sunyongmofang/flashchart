<template>
    <div>
      <el-table border :data="tableData">
        <el-table-column v-for="label in field" :key="label" :prop="label" :label="label"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'showData',
  props: [
    'tableData',
    'field'
  ]
}
</script>
