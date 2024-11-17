import { createApp } from 'vue';
import App from './App.vue';

// 引入 v-md-editor 和主题
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

// 使用 VuePress 主题
import VuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

VMdEditor.use(VuePressTheme);

const app = createApp(App);

// 注册 v-md-editor
app.use(VMdEditor);

app.mount('#app');
