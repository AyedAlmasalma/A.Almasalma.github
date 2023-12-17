import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import de from './language/de';
import en from './language/en';


const i18n = createI18n({
    locale: 'en',
    messages: {
        en,
        de,
    },
});

createApp(App)
    .use(i18n) // Use Vue I18n
    .mount('#app');
