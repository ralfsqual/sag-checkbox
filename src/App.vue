<template>
  <div id="app">
    <sag-checkbox
      id="testCheckbox"
      name="goodsInfos.goodsId"
      :source="source"
      :item-width="150"
      :panel-width="600"
      :has-filter="true"
      mode="default"
      :required="false"
    />
  </div>
</template>

<script>
import SagCheckbox from './components/SagCheckbox.vue'

export default {
  name: 'app',
  components: {
    SagCheckbox
  },
  data(){
    return {
      source: [
        {name: '苹果', value: '1'},
        {name: '香蕉', value: '2', checked: true},
        {name: '梨', value: '3'},
        {name: '哈密瓜', value: '4'},
        {name: '菠萝蜜', value: '5'},
        {name: '橘子', value: '6', checked: true},
        {name: '橘子2', value: '7'},
        {name: '橘子4', value: '8'},
        {name: '橘子5', value: '62'}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
