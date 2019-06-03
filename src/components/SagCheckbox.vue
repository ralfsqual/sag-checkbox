<template>
  <div class="wrapper" :id="id" @click.stop>
    <template v-if="mode === 'default'" >
      <div class="result" :class="{required}" :style="{width:realWidth}" @click.stop="visible = true" :title="title">
        <span v-for="item in checkedItems" :key="item.value" class="checked-item" @click.stop="itemClickHandler(item)" >{{item.name}}</span>
      </div>
      <transition name="fade">
        <ul class="panel panel-pop clearfix" v-show="visible" :style="{minWidth: realWidth, width:realPanelWidth}">
          <li class="tools clearfix">
            <input type="text" v-if="hasFilter" class="filter" v-model="filterQuery" />
            <a href="javascript:void(0)" class="tool-btn" @click="checkAll" >全选</a>
            <a href="javascript:void(0)" class="tool-btn" @click="clearAll" >清空</a>
          </li>
          <li class="li-item" v-for="(item,index) in items" :key="item.value" @click.stop="itemClickHandler(item)" :style="{width:realItemWidth}" :title="item.name" v-show="item.visible !== false">
            <input type="checkbox" :name="name|formatName(index)" :checked="item.checked" :value="item.value" /><label>{{item.name}}</label>
          </li>
        </ul>
      </transition>
    </template>
    <template v-if="mode === 'plain'" >
      <ul class="panel clearfix" :style="{minWidth: realWidth}">
        <li class="li-item" v-for="(item,index) in items" :key="item.value" @click.stop="itemClickHandler(item)" :style="{width:realItemWidth}">
          <input type="checkbox" :name="name|formatName(index)" :checked="item.checked" :value="item.value" /><label>{{item.name}}</label>
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
    width:{type: [Number,String], default: "300" },
    panelWidth:{type: [Number,String], default: "316" },
    itemWidth:{type: [Number,String], default: "auto" },
    mode:{type:String, default:"default", validator:value => ['default','plain'].includes(value)}
  },
  data(){
    return {
      visible:false,
      filterQuery:"",
      items:this.source || []
    };
  },
  filters:{
    // 组织组件name,带上索引
    formatName(name,index){
      if(!name)return'';
      let [prefix,subfix]  = name.split(".");
      if(prefix && subfix){
        return prefix + '[' + index +'].' + subfix;
      }
      return prefix||subfix;
    }

  },
  computed:{
    realWidth(){
      return this.formatMesure(this.width);
    },
    realItemWidth(){
      let width = this.formatMesure(this.itemWidth);
      return width === 'auto' ? '100%' : width;
    },
    realPanelWidth(){
      if(this.panelWidth === 'auto' && !isNaN(this.width)){
          return (parseInt(this.width) + 16) + 'px';
      }
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
  mounted() {
    if(window) {
      window['vm$' + this.id] = this;
      if(this.mode === 'default'){
        window.document.addEventListener('click', this.hidePanel, false);
      }
    }
  },
  beforeDestroy() {
    if(window) {
      window['vm$' + this.id] = undefined;
      if(this.mode === 'default') {
        window.document.removeEventListener('click', this.hidePanel, false);
      }
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
  border: 1px solid #ccc;
  white-space: nowrap;
  border-right: none;
  width: 300px;
  height: 24px;
  line-height: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.result:after{
  content:'';
  background: url("../static/dropdown.png") no-repeat 5px center;
  height: 24px;
  width: 16px;
  display: block;
  position: absolute;
  top: 0;
  right: -17px;
  border: 1px solid #ccc;
  border-left:none;
}
.required{
  border-left: 1px solid red;
}
.result .checked-item{
  margin: 0 5px;
  padding-left: 10px;
  background: url("../static/delete.gif") no-repeat left center;
  cursor: pointer;
}
.filter{
  float: left;
  margin: 2px 2px;
}
.tool-btn {
  margin-right: 5px;
  float:right;
  text-decoration: none;
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
  border-top: none;
}
ul.panel li{
  height: 25px;
}

.panel .tools{
  height: 30px;
  clear: both;
  line-height: 28px;
}
.tools input[type="text"]{
  height: 20px;
  padding: 0 2px;
  border:1px solid #ccc;
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

li.li-item,li.li-item label{
  cursor: pointer;
}

.li-item {
  position: relative;
  height: 25px;
  margin-left:2px;
  display: inline-block;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
}
.li-item input[type='checkbox'] {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
}
.li-item label {
  position: absolute;
  left: 24px;
  top: 5px;
  height: 20px;
  line-height: 20px;
}
.li-item label:before {
  content: '';
  position: absolute;
  left: -24px;
  top: 0;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}

.li-item label:after {
  content: '';
  position: absolute;
  left: -18px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: 0;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #fff;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
}

.li-item input[type='checkbox']:checked + label:before {
  background: #4cd764;
  border-color: #4cd764;
}
.li-item input[type='checkbox']:checked + label:after {
  background: #4cd764;
}


.fade-enter-active/*, .fade-leave-active*/ {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
