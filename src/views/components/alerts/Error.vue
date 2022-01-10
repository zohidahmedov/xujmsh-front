<template>
  <b-modal
    v-model="hasError"
    ok-only
    ok-variant="danger"
    ok-title="Accept"
    modal-class="modal-danger"
    centered
    title="Diqqat"
  >
    <b-card-text>
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="alertErr"
      >
        <b-alert
          variant="danger"
          outlined
          class="alertError"
        >
          <p class="clearfix">
            <strong
              v-if="error.code"
              class="float-left"
            >Код: {{ error.code }}</strong>
            <strong class="float-right">{{ error.time }}</strong>
          </p>
          <div v-html="error.message" />
        </b-alert>
      </div>
    </b-card-text>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BModal, BAlert } from 'bootstrap-vue'

export default {
  name: 'AlertsError',
  components: { BModal, BAlert },
  data() {
    return {
      dialog: true,
    }
  },
  computed: {
    ...mapGetters({ errors: 'alert/ERRORS', company_tin: 'auth/COMPANY_TIN' }),
    hasError() {
      return !!this.errors.length
    },
  },
  methods: {
    ...mapActions({ closeErrors: 'alert/closeErrors' }),
    handleErrors() {
      this.closeErrors()
    },
  },
}
</script>
<style scoped lang="scss">
@-webkit-keyframes fadeInUp2 {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInUp2 {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
.alertError {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInUp2;
  animation-name: fadeInUp2;
}
</style>
