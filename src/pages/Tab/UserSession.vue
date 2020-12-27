<template>
  <div>
    <databox
      title="User Sessions"
      :crud="['delete', 'read']"
      :editablescol="['session']"
      :rows="sessions"
      :columns="columns"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Databox from '../../components/Databox'
import Session from './../../models/Session'

export default {

  components: {
    Databox
  },
  data() {
    return {
      data: {
        tabs: 'session'
      },
      columns: [
        { name: 'session', align: 'left', label: 'Session', field: 'uuid', sortable: true },
        { name: 'user', align: 'center', label: 'User', field: 'user', sortable: true },
        { name: 'signedInAt', align: 'center', label: 'Signed In', field: 'createdAt', sortable: true },
        { name: 'action', align: 'center', label: 'Action' }
      ]
    }
  },

  computed: {
    sessions() {
      return Session.all()
    }
  },

  created() {
    this.$store.dispatch('GetAllSessions')
  },

  methods: {
    onDelete(id) {
      this.$store.dispatch('DeleteSession', id)
    }
  }
}
</script>
