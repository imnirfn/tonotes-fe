<template>
  <q-page class="">
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Notes" />
      </q-breadcrumbs>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="showNotesDialog.show = true"
      />
    </q-page-sticky>
    <q-list
      v-for="note in notes"
      :key="note.uuid"
      dense
      bordered
      padding
      class="rounded-borders q-mt-lg"
    >
      <q-item>
        <div>
          <div>
            <q-chip
              class=""
              color="positive"
              text-color="white"
            >
              {{ note.title }}
            </q-chip>
            <q-chip
              v-if="note.category !== ''"
              color="primary"
              text-color="white"
            >
              {{ note.category }}
            </q-chip>
          </div>
          <q-item-section>
            {{ note.description }}
          </q-item-section>
        </div>
      </q-item>
    </q-list>
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
// import net from 'net'

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
      ip: 'localhost',
      port: '13338',
      socket: null,
      notes: []
    }
  },

  async created() {
    var res = await this.$store.dispatch('GetInfo')
    this.form.userId = res.user

    res = await this.$store.dispatch('GetAllNotes')
    this.notes = res

    // this.connect()
  },

  methods: {
    async connect() {
      this.socket = new WebSocket('ws://192.168.0.120:13338')
      // await this.socket.connect(this.port, this.ip)
      this.socket.on('data', (data) => {
        const json = JSON.parse(new TextDecoder('utf-8').decode(data))
        console.log(json)
      })
    },

    async onClickAddNotes() {
      try {
        const res = await this.$store.dispatch('AddNotes', this.form)
        console.log(res)
        this.notes = await this.$store.dispatch('GetAllNotes')
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>
