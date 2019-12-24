import {
  mapMutations,
} from 'vuex';

const dialog = {
  data() {
    return {
      enabled: false,
    };
  },
  watch: {
    enabled(value) {
      if (!value) {
        this.setComponent('');
      }
    },
  },
  created() {
    this.setEnabled(true);
  },
  methods: {
    ...mapMutations([
      'setComponent',
    ]),
    setEnabled(enabled) {
      this.enabled = enabled;
    },
  },
};

export default dialog;
