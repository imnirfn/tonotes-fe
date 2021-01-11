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
    <div class="text-h5 q-ml-md">
      Pending
    </div>
    <div class="flex">
      <q-card
        v-for="note in notes.filter(note => !note.isComplete)"
        :key="note.uuid"
        flat
        bordered
        class="my-card q-ml-md q-mt-md"
        style="width: 300px"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                {{ note.title }}
              </div>
              <q-chip
                color="secondary"
                text-color="white"
              >
                By {{ users.filter(user => user.uuid === note.userId)[0].name }}
              </q-chip>
            </div>

            <div class="col-auto">
              <q-btn
                color="grey-7"
                round
                flat
                icon="more_vert"
              >
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section @click="onDeleteNotes">
                        Remove Notes
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          {{ note.description }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat>
            Edit
          </q-btn>
          <q-btn
            class="text-positive"
            flat
            @click="onClickComplete(note.uuid)"
          >
            Mark as complete
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="text-h5 q-ml-md q-mt-lg">
      Completed
    </div>
    <div class="flex">
      <q-card
        v-for="note in notes.filter(note => note.isComplete)"
        :key="note.uuid"
        flat
        bordered
        class="my-card q-ml-md q-mt-md"
        style="width: 300px"
      >
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                {{ note.title }}
              </div>
              <q-chip
                color="secondary"
                text-color="white"
              >
                By {{ users.filter(user => user.uuid === note.userId)[0].name }}
              </q-chip>
            </div>

            <div class="col-auto">
              <q-btn
                color="grey-7"
                round
                flat
                icon="more_vert"
              >
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable>
                      <q-item-section @click="onDeleteNotes">
                        Remove Notes
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          {{ note.description }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat>
            Edit
          </q-btn>
          <q-btn
            class="text-negative"
            flat
            @click="onClickInComplete(note.uuid)"
          >
            Mark as incomplete
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-dialog
      v-model="showNotesDialog.show"
      position="right"
      style="width: 400px"
      full-height
      full-width
    >
      <q-card>
        <q-banner class="bg-primary text-white" full-width>
          Add new Notes
        </q-banner>

        <q-card-section class="row q-pt-none q-mt-md">
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
      socket: {
        instance: null,
        ip: 'localhost',
        port: '13338'
      },
      notes: [],
      users: []
    }
  },

  async created() {
    var res = await this.$store.dispatch('GetInfo')
    this.form.userId = res.user

    res = await this.$store.dispatch('GetAllNotes')
    this.notes = res

    res = await this.$store.dispatch('GetAllUsers')
    this.users = res

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
    },

    async onClickComplete(uuid) {
      try {
        await this.$store.dispatch('EditComplete', { uuid: uuid, isComplete: true })
        this.notes = await this.$store.dispatch('GetAllNotes')
      } catch (e) {
        console.log(e)
      }
    },

    async onClickInComplete(uuid) {
      try {
        await this.$store.dispatch('EditComplete', { uuid: uuid, isComplete: false })
        this.notes = await this.$store.dispatch('GetAllNotes')
      } catch (e) {
        console.log(e)
      }
    },

    async onClickEdit(uuid) {
      try {
        await this.$store.dispatch('EditComplete', { uuid: uuid, data: this.form })
        this.notes = await this.$store.dispatch('GetAllNotes')
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>
