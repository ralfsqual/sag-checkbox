<template>
  <div class="wrapper" @click.stop>
    <template v-if="mode === 'default'" >
      <div class="result" :class="{required:required}" :style="{width:realWidth}" @click.stop="visible = true" :title="title">
        <span v-for="item in checkedItems" :key="item.value" class="checked-item" @click.stop="itemClickHandler(item)" title="点击删除">{{item.name}}</span>
      </div>
      <transition name="fade">
        <ul class="panel panel-pop clearfix" v-show="visible" :style="{minWidth: realWidth, width:realPanelWidth}">
          <li class="tools clearfix">
            <input type="text" v-if="hasFilter" class="filter" v-model="filterQuery" />
            <a href="javascript:void(0)" class="tool-btn" @click="checkAll" >全选</a>
            <a href="javascript:void(0)" class="tool-btn" @click="clearAll" >清空</a>
          </li>
          <li class="li-item" v-for="(item,index) in items" :key="item.value" @click.stop="itemClickHandler(item)" :style="{width:realItemWidth}" v-show="item.visible !== false">
            <input type="checkbox" :name="name|formatName(index)" :checked="item.checked" /><label>{{item.name}}</label>
          </li>
        </ul>
      </transition>
    </template>
    <template v-if="mode === 'plain'" >
      <ul class="panel clearfix" :style="{minWidth: realWidth}">
        <li class="li-item" v-for="(item,index) in items" :key="item.value" @click.stop="itemClickHandler(item)" :style="{width:realItemWidth}">
          <input type="checkbox" :name="name|formatName(index)" :checked="item.checked" /><label>{{item.name}}</label>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SagCheckbox',
  props: {
    id: String,
    name: {type:String, required: true },
    source:{type: Array, required: true },
    hasFilter:{type: Boolean, default: true },
    required:{type:[Boolean,String], default: true },
    width:{type: [Number,String], default: "300px" },
    panelWidth:{type: [Number,String], default: "300px" },
    itemWidth:{type: [Number,String], default: "auto" },
    mode:{type:String, default:"default" } // default plain
  },
  data(){
    return {
      visible:false,
      filterQuery:"",
      items:[]
    };
  },
  filters:{
    // 组织组件name,带上索引
    formatName(name,index){
      if(!name)return'';
      let [prefix,subfix]  = name.split(".");
      if(prefix && subfix){
        return prefix + '[' + index +']' + subfix;
      }
      return prefix||subfix;
    }

  },
  computed:{
    realWidth(){
      return this.formatMesure(this.width);
    },
    realItemWidth(){
      return this.formatMesure(this.itemWidth);
    },
    realPanelWidth(){
      return this.formatMesure(this.panelWidth);
    },
    checkedItems(){
      return this.items.filter(it => it.checked);
    },
    title(){
      return this.items.filter(it => it.checked).map(x => x.name).join(",");
    }
  },
  methods:{
    /**
     * 点击了待选项
     * @param item
     */
    itemClickHandler(item){
      item.checked = !item.checked;
      this.reloadItem();
    },
    checkAll(){
      this.items.forEach(it => it.checked = true);
      this.reloadItem();
    },
    clearAll(){
      this.items.forEach(it => it.checked = false);
      this.reloadItem();
    },
    hidePanel(){
      this.visible = false;
    },
    reloadItem(){
      this.items = [...this.items];
    },

    formatMesure(value){
      return isNaN(value)?value:value + 'px';
    }
  },
  watch:{
    filterQuery(newValue){
      this.items.forEach(item => item.visible = false);
      this.items.filter(item => item.name.indexOf(newValue) !== -1).forEach(i=>i.visible = true);
    }
  },
  created(){
    this.items = this.source;
  },
  mounted() {
    if(window && this.mode === 'default') {
      window.document.addEventListener('click', this.hidePanel, false);
    }
  },
  destroyed() {
    if(window && this.mode === 'default') {
      window.document.removeEventListener('click', this.hidePanel, false);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  display:inline-block;
  position: relative;
  text-align: left;
}
.result{
  background: url("../static/dropdown.png") no-repeat right center;
  border: 1px solid #ccc;
  width: 300px;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
}
.required{
  border-left: 1px solid red;
}
.result .checked-item{
  margin: 0 5px;
  padding-right: 10px;
  background: url("../static/delete.gif") no-repeat right center;
  cursor: pointer;
}
.filter{
  float: left;
  margin: 2px 2px;
}
.tool-btn {
  margin-right: 5px;
  float:right;
}
ul.panel {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

ul.panel input[type="checkbox"]{
  vertical-align: middle;
  margin-bottom: 2px;
}
ul.panel-pop {
  position:absolute;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
}
ul.panel li{
  height: 25px;
}
li.li-item {
  margin-left:2px;
  display: inline-block;
  text-align: left;
  overflow-x: hidden;
}
li.li-item,li.li-item label{
  cursor: pointer;
}
li.li-item:hover {
  outline: 1px dashed cadetblue ;
}

.panel .tools{
  height: 28px;
  clear: both;
  line-height: 28px;
}
.panel .tools .clear,.panel .tools .ok{
  float:right;
}
.tools input[type="text"]{
  height: 20px;
  padding: 0 2px;
}
a {
  color: #42b983;
}

.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}

.fade-enter-active/*, .fade-leave-active*/ {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
