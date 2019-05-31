import '@babel/polyfill';
import SagCheckbox from "./components/SagCheckbox";

const SagCheckboxPlugin = {
    install(Vue/*,options*/){
        Vue.component(SagCheckbox.name,SagCheckbox);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SagCheckboxPlugin);

}
export default SagCheckboxPlugin;
