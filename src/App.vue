<template>
  <div id="app">

    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="inputChange" />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list :data-source="listInfo" border class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="statuChange(item.id)">
          {{item.info}}
        </a-checkbox>
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{lastItem}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="btnType==='all' ? 'primary' :''" @click="changeList('all')">全部</a-button>
          <a-button :type="btnType==='undone' ? 'primary' :''" @click="changeList('undone')">未完成</a-button>
          <a-button :type="btnType==='done' ? 'primary' :''" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="removeDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    // 解构出state中的数据
    ...mapState(['list', 'inputValue', 'btnType']),
    // 解构出getter中的数据
    ...mapGetters(['lastItem', 'listInfo'])
  },
  methods: {
    // 表单输入值变更，把数据同步到state中
    inputChange(e) {
      this.$store.commit('updataInput', e.target.value)
    },
    // 添加事项
    addItem() {
      this.$store.commit('addItems')
    },
    // 删除事项
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    // 根据复选框的选定状态更新数据
    statuChange(id) {
      this.$store.commit('cbStatuChange', id)
    },
    // 清除已完成
    removeDone() {
      this.$store.commit('removeDone')
    },
    // 切换list栏
    changeList(key) {
      this.$store.commit('changeBtn', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
