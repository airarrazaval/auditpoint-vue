<template>
  <b-row>
    <b-col>
      <b-card>
        <div slot="header">
          <strong>{{ title }}</strong>
          <small>{{ subtitle }}</small>
        </div>
        <b-form-fieldset>
          <b-form-checkbox type="checkbox" id="enabled" v-model="enabled">Enabled</b-form-checkbox>
        </b-form-fieldset>
        <b-form-fieldset label="Code">
          <b-form-input type="text" id="code" placeholder="Enter the company code" v-model="code"></b-form-input>
        </b-form-fieldset>
        <b-form-fieldset label="Name">
          <b-form-input type="text" id="name" placeholder="Enter the company name" v-model="name"></b-form-input>
        </b-form-fieldset>
        <b-form-fieldset label="Location">
          <b-form-input type="number" id="location" placeholder="Enter the company location code" v-model="code"></b-form-input>
        </b-form-fieldset>
        <div class="row">
          <div class="col-sm-6">
            <b-form-fieldset label="Start of Operations">
              <b-form-input type="date" id="dateStart" placeholder="Enter the starting date of operations" v-model="dateStart"></b-form-input>
            </b-form-fieldset>
          </div>
          <!--/.col-->
          <div class="col-sm-6">
            <b-form-fieldset label="End of Operations">
              <b-form-input type="date" id="dateEnd" placeholder="Enter the ending date of operations" v-model="dateEnd" v-bind:disabled="!enabled"></b-form-input>
            </b-form-fieldset>
          </div>
          <!--/.col-->
        </div>
        <!--/.row-->
      </b-card>
    </b-col>
    <!--/.col-->
  </b-row>
</template>


<script>
export default {
  props: {
    id: String
  },
  data () {
    return {
      title: 'Company',
      subtitle: '',
      code: '',
      name: '',
      location: 0,
      dateStart: null,
      dateEnd: null,
      enabled: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
