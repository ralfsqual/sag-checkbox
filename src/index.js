import SagCheckbox from "./components/SagCheckbox";

const SagCheckboxPlugin = {
    install(Vue/*,options*/){
        Vue.component(SagCheckbox.name,SagCheckbox);
        console.log(SagCheckbox.name +' is registered')
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SagCheckboxPlugin);
    console.log('SagCheckboxPlugin is used')

}
export default SagCheckboxPlugin;
