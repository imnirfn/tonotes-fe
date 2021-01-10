<template>
  <q-page class="flex flex-center">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="showNotesDialog.show = true"
      />
    </q-page-sticky>
    <q-dialog
      v-model="showNotesDialog.show"
      position="bottom"
      full-width
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Add new notes
          </div>
        </q-card-section>

        <q-card-section class="row q-pt-none">
          <div class="col">
            <q-input
              v-model="form.title"
              outlined
              label="Title"
            />
            <q-input
              v-model="form.description"
              class="q-mt-md"
              outlined
              label="Descriptions"
            />
            <q-input
              v-model="form.category"
              class="q-mt-md"
              outlined
              label="Category"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Add"
            color="primary"
            @click="onClickAddNotes"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import net from 'net'

export default {
  data() {
    return {
      form: { // used for add new notes
        title: '',
        description: '',
        category: '',
        isComplete: false,
        userId: ''
      },
      showNotesDialog: {
        show: false
      },
      socket: {
        instance: null,
        ip: 'localhost',
        port: '13338'
      }
    }
  },

  async created() {
    var res = await this.$store.dispatch('GetInfo')
    this.form.userId = res.user

    res = await this.$store.dispatch('GetAllNotes')
    console.log(res)

    this.connect()
  },

  methods: {
    async connect() {
      const socket = new net.Socket()
      this.socket.instance = socket
      await this.socket.instance.connect(this.socket.port, this.socket.ip)
      socket.on('data', (data) => {
        const jsonstr = new TextDecoder('utf-8').decode(data)
        const json = JSON.parse(jsonstr)
        console.log(json)
      })
    },

    async onClickAddNotes() {
      const res = await this.$store.dispatch('AddNotes', this.form)
      console.log(res)
    }
  },
}
</script>
