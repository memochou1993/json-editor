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
      !value && this.setDialog('');
    },
  },
  created() {
    this.setEnabled(true);
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    setEnabled(enabled) {
      this.enabled = enabled;
    },
  },
};

export default dialog;
