import './presentation/assets/style/main.scss';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import App from './App.vue';

//Pinia
import { createPinia } from 'pinia';


// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const starWarsTheme = {
    dark: true,
    colors: {
        primary: '#FFE81F',
        secondary: '#2E67F8',
        accent: '#FF0000',
        error: '#FF3B30',
        info: '#4BD5EE',
        success: '#2FBF71',
        warning: '#FF9F00',
        background: '#121212',
        ink: '#1E1E1E',
    }
};

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'starWarsTheme',
        themes: {
            starWarsTheme,
        }
    }
});

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(vuetify);

app.mount('#app');
