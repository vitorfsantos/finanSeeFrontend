import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { ApiInterceptor } from "./services/apiInterceptor";

const app = createApp(App);

// Inicializar interceptor global para API
ApiInterceptor.interceptFetch();

app.use(router);

app.mount("#app");
