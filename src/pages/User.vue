<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="User Management" />
        <q-breadcrumbs-el v-if="data.tabs === 'list'" label="List" />
        <q-breadcrumbs-el v-if="data.tabs === 'session'" label="User Session" />
        <q-breadcrumbs-el v-if="data.tabs === 'role'" label="Role" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-tabs
          v-model="data.tabs"
          narrow-indicator
          dense
          align="left"
          class="text-primary"
        >
          <q-tab name="list" label="Users" />
          <q-tab name="session" label="Session" />
          <q-tab name="role" label="Roles" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'list'" class="flex flex-center">
      <userbox />
    </div>

    <div v-if="data.tabs === 'session'" class="flex flex-center">
      <user-sessionbox />
    </div>

    <div v-if="data.tabs === 'role'" class="flex flex-center">
      <rolebox />
    </div>
  </div>
</template>

<script>
import Rolebox from './Tab/Role'
import Userbox from './Tab/User'
import UserSessionbox from './Tab/UserSession'

export default {

  components: {
    Rolebox,
    Userbox,
    UserSessionbox,
  },
  data() {
    return {
      data: {
        tabs: 'list'
      },
    }
  },
}
</script>
