import Loading from  './Loading'
import Done from './Done'

export default {
  install(Vue) {
    const LoadingConstructor = Vue.extend(Loading);
    const DoneConstructor = Vue.extend(Done);

    const loading = new LoadingConstructor();
    const done = new DoneConstructor();

    loading.$mount(document.createElement('div'));
    done.$mount(document.createElement('div'));

    document.body.appendChild(loading.$el);
    document.body.appendChild(done.$el);

    Vue.prototype.$loading = loading;
    Vue.prototype.$done = done;
  }
}
