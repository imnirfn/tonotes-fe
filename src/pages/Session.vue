<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" to="/" />
        <q-breadcrumbs-el label="Session Management" />
        <q-breadcrumbs-el v-if="data.tabs === 'session'" label="Session" />
        <q-breadcrumbs-el v-if="data.tabs === 'templates'" label="Templates" />
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
          <q-tab name="session" label="Session" />
          <q-tab name="templates" label="Templates" />
        </q-tabs>
      </div>
    </div>

    <div v-if="data.tabs === 'session'" class="flex flex-center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        tabs: 'session'
      },
    }
  },
}
</script>
