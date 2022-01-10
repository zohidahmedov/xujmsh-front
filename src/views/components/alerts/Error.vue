<template>
  <v-dialog v-model="errors.length > 0" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2 mb-5">
        <div class="float-left mr-2">
          <img src="../../assets/images/icons/warning.svg" alt />
        </div>
        <h5 class="modal-title">{{$t('Внимание')}}</h5>
      </v-card-title>

      <v-card-text>
        <div class="alertErr" v-for="(error, index) in errors" :key="index">
          <v-alert color="red" outlined class="alertError">
            <p class="clearfix">
              <strong class="float-left" v-if="error.code">Код: {{error.code}}</strong>
              <strong class="float-right">{{error.time|date("DD.MM.YYYY HH:mm:ss")}}</strong>
            </p>
            <div v-html="error.message"></div>
          </v-alert>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="handleErrors(errors)">
          {{$t('Закрыть')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- <transition name="fade">
    <div class="modal fade show" v-if="errors.length">
      <div class="modal-backdrop fade show"></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="float-left mr-2">
              <img src="../../assets/images/icons/warning.svg" alt />
            </div>
            <h5 class="modal-title">Внимание</h5>
            <button type="button" class="close" @click="handleErrors(errors)">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-6 text-right"></div>
            </div>
            <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
              <p class="clearfix">
                <strong class="float-left" v-if="error.code">Код: {{error.code}}</strong>
                <strong class="float-right">{{error.time|date("DD.MM.YYYY HH:mm:ss")}}</strong>
              </p>
              <span v-html="error.message"></span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="handleErrors(errors)"
            >Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </transition> -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AlertsError',
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    ...mapGetters({ errors: 'alert/ERRORS', company_tin: 'auth/COMPANY_TIN' }),
  },
  methods: {
    ...mapActions({ closeErrors: 'alert/closeErros' }),
    handleErrors(errors) {
      this.$root.$emit('error-modal-closed', errors);
      this.closeErros();
    },
  },
};
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
