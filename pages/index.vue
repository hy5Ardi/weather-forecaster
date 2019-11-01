<template>
  <div class="container">
    <WeatherInformation/>
  </div>
</template>

<script>
import WeatherInformation from '~/components/WeatherInformation.vue'

export default {
  components: {
    WeatherInformation
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.recents {
  margin-top: 65px;
}

body {
  padding-top: 65px;
}

.search-danger, .search-danger:focus {
  border-color: #d9534f;
}

.search-feedback {
  color: #d9534f;
  display: block;
  margin-top: .25rem;
}
</style>
