import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/lib/util/colors';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#061D30',
        secondary: colors.blueGrey,
        warning: colors.orange,
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
