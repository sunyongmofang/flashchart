<template>
    <div>
      <el-table border :data="tabledata">
        <el-table-column v-for="label in field" :key="label" :prop="label" :label="label"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'showData',
  props: [
    'tabledata',
    'field'
  ]
}
</script>
