import { createApp } from 'vue';
import './assets/style/general_style.scss';
import './style.css';
import "../node_modules/bootstrap/scss/bootstrap.scss";
import '@fortawesome/fontawesome-free/css/all.css'  // Ajoutez cette ligne
import 'bootstrap';

import App from './App.vue';
import router from './router';


createApp(App).use(router).mount('#app');

