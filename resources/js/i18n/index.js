import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@/i18n/lang/en';
import zhTW from '@/i18n/lang/zh-TW';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en',
  messages: {
    en,
    zhTW,
  },
});
