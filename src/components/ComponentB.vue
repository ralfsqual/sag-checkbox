<template>
  <div>{{$options.name}}</div>
</template>

<script>
  /* eslint-disable no-console */

  import A from '../utils/store'

  export default {
    name: "ComponentB",

    beforeCreate(){
      console.log(`${this.$options.name} beforeCreate`)
    },
    created() {
      console.log(`${this.$options.name} created`)
    },
    beforeMount(){
      // console.log(`A1 name: ${A.name}`);
      console.log(`${this.$options.name} beforeMount`)
    },
    mounted(){
      // console.log(this.$parent.A.name)

      console.log('A is the same? ' + (this.$parent.A === A()))

      console.log(`${this.$options.name} mounted`)
    },
    beforeDestroy(){
      console.log(`${this.$options.name} beforeDestroy`)
    },
    destroyed(){
      console.log(`${this.$options.name} destroyed`)
    }
  }
</script>

<style scoped>

</style>
