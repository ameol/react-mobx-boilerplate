import { observable, action } from "mobx";

const createLoadingState = (targetClass, ...args) => {
  class BaseLoading extends targetClass {
    @observable loading = false;
    @observable loadingEffect = {};
    constructor() {
      super();
    }

    @action setLoading(loading, key) {
      this.loadingEffect[key] = loading;
      if(this.loading && loading) 
        return;
      this.loading = loading;
    }
  }

  const superProto = Reflect.getPrototypeOf(BaseLoading).prototype;
  let funcs = {};
  args.map(funcName => {
    const func = superProto[funcName];
    if(typeof func !== 'function') return;
    funcs[funcName] = async function(){
      this.setLoading(true, funcName);
      await superProto[funcName].apply(this, arguments);
      this.setLoading(false, funcName);
    }
  })

  Object.assign(BaseLoading.prototype, funcs) 
  return BaseLoading;
}

/*需要进行loading的函数名，例如：func1,func2,func3*/
export default (...arg) => {
  return (targetClass) => {
    return createLoadingState(targetClass, ...arg);
  }
}



