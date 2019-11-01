<template>
  <div>
    <div class="col-md-4">
      <h2>Search for a Location</h2>
      <form class="form-inline">
        <div class="input-group">
          <input type="text" placeholder="City Name" class="form-control" :class="{'search-danger': getErrors.find(error => error.type === 'empty-input')}" v-model="city">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary" @click.prevent="search(city)">Search</button>
          </span>
        </div>
        <span v-if="getErrors.find(error => error.type === 'empty-input')" class="search-feedback">{{ getErrors.find(error => error.type === 'empty-input').error }}</span>
      </form>
      <div class="recents" v-if="getRecents.length > 0">
        <h2>Recent Searches <span class="badge">{{ getRecents.length }}</span></h2>
        <ul>
          <li v-for="recent in getRecents">{{ recent }}</li>
        </ul>
      </div>
    </div>
    <div v-if="isLoading" class="col-md-4">
      <div class="alert alert-warning">
        <b>Hey!</b> We are currently loading the data.
      </div>
    </div>
    <div v-else-if="isLoading" class="col-md-4">
      <div class="alert alert-warning">
        <b>Hey!</b> There's no location available named "{{ city }}"
      </div>
    </div>
    <div class="col-md-4" v-else>
      <h2>Weather for {{ fetchWeather.name }}</h2>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th>Status <i class="fas fa-info-circle"></i></th>
            <td>{{ fetchWeather.weather[0].main }}</td>
          </tr>
          <tr>
            <th>Temperature <i class="fas fa-thermometer-quarter"></i></th>
            <td>{{ fetchWeather.main.temp }} ‎°C</td>
          </tr>
          <tr>
            <th>Wind <i class="fas fa-wind"></i></th>
            <td>{{ fetchWeather.wind.speed }} m/s ({{ fetchWeather.wind.deg }}‎°)</td>
          </tr>
          <tr>
            <th>Humidity <i class="fas fa-tint"></i></th>
            <td>{{ fetchWeather.main.humidity }}%</td>
          </tr>
          <tr>
            <th>Visibility <i class="fas fa-eye"></i></th>
            <td>{{ fetchWeather.visibility / 1000 }} km</td>
          </tr>
          <tr>
            <th>Sunrise <i class="fas fa-sun"></i></th>
            <td>{{ $moment(fetchWeather.sys.sunrise * 1000).fromNow() }}</td>
          </tr>
          <tr>
            <th>Sunset <i class="far fa-sun"></i></th>
            <td>{{ $moment(fetchWeather.sys.sunset * 1000).fromNow() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'WeatherTable',
      data() {
          return {
              city: ''
          }
      },
      created() {
        this.$store.dispatch('fetchWeather', 'Tartu');
      },
      computed: {
        fetchWeather() {
          return this.$store.state.weather;
        },
        isLoading() {
          return this.$store.state.loading;
        },
        getRecents() {
            return this.$store.state.recents;
        },
        getErrors() {
            return this.$store.state.errors;
        }
      },
      methods: {
          addRecent(city) {
            this.$store.commit('ADD_RECENT', city);
          },
          search(city) {
              if (city) {
                  this.$store.dispatch('fetchWeather', city);
                  this.addRecent(city);
                  this.$store.dispatch('deleteError', 'empty-input');
              } else if (!this.getErrors.find(error => error.type === 'empty-input')) {
                  this.$store.commit('ADD_ERROR', {
                      "type": "empty-input",
                      "error": "You must enter valid Location."
                  });
              }
          }
      }
  }
</script>
