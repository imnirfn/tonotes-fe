<template>
  <div>
    <q-list>
      <q-item class="q-py-lg">
        <q-img
          src="~assets/tagline.png"
          width="240px"
          height="60px"
        />
      </q-item>

      <EssentialLink
        v-for="link in menus"
        :key="link.meta.title"
        :title="link.meta.title"
        :caption="link.meta.subtitle"
        :link="link.path"
        :icon="link.meta.icon"
        :color="link.meta.color"
      />
    </q-list>
  </div>
</template>

<script>
import EssentialLink from '../components/EssentialLink'
import { mapGetters } from 'vuex'

export default {
  components: {
    EssentialLink,
  },

  data() {
    return {}
  },

  computed: {
    ...mapGetters(['menus']),
  },
}
</script>
