<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title
        class="pa-2"
      />
      <v-card-text
        class="px-5 py-0"
      >
        <v-list>
          <v-list-item-group>
            <template v-for="(record, index) in records">
              <v-list-item
                :key="index"
                @click="openRecord(record.code)"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title
                      class="secondary--text text--darken-4"
                      v-text="record.name"
                    />
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="getRelativeTime(record.updated_at)"
                    />
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider
                v-if="index + 1 < records.length"
                :key="`divider-${index}`"
              />
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import moment from 'moment';
import dialog from '@/mixins/dialog';

export default {
  mixins: [
    dialog,
  ],
  computed: {
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
    ]),
    ...mapState('record', [
      'records',
    ]),
    code() {
      return this.$route.params.code || '';
    },
  },
  created() {
    this.records.sort((a,b) => moment(b.updated_at) - moment(a.updated_at));
  },
  methods: {
    ...mapActions('editor', [
      'setData',
    ]),
    ...mapActions('record', [
      'fetchRecord',
    ]),
    getRelativeTime(time) {
      return moment(time).fromNow()
    },
    openRecord(code) {
      this.getRecord(code);
    },
    getRecord(code) {
      this.fetchRecord(code)
        .then((data) => {
          this.setData(data.data);
          this.codeEditor.set(data.data);
          this.treeEditor.set(data.data);
        })
        .then(() => {
          code === this.code || this.$router.push(`/${code}`);
        })
        .catch(() => {
          this.$router.push('/');
        })
        .finally(() => {
          this.setComponent('');
        });
    },
  },
};
</script>
