<template>
  <div id="alerts">
    <alerts-error />
  </div>
</template>

<script>
import AlertsError from './Error';
export default {
  name: 'Alerts',
  components: {
    AlertsError,
  }
}
</script>
<style>
  #alerts{
    position: relative;
    z-index: 99999;
  }
</style>
