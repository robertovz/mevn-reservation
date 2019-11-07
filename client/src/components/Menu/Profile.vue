<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-12">
        <div class="card">
          <div class="card-header menu-title-wrapper">
            <div class="card-title mb-0">Profile</div>
          </div>
        <div class="col-md-8 col-sm-12 mx-auto">
          <div class="card-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="inputName" class="col-10">Name</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" v-model="form.first_name" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputLastName" class="col-10">Last Name</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" v-model="form.last_name" />
                </div>
              </div>
              <div class="form-group">
                <label for="inputEmail" class="col-10">Email</label>
                <div class="col-sm-12">
                  <input type="email" class="form-control" v-model="form.email" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-12">
                  <button type="submit" @click.prevent="updateInfo" class="btn bcustom-primary bblue">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from 'axios';

export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      form: new Form({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      }),
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    };
  },

  methods: {
    loadUser() {

    },

    updateInfo() {
      this.form.put('/users/' + this.form.id)
      .then(() => {
        swal.fire(
          'Updated!', 
          'Information has been updated', 
          'success'
        )
      })
    }
  },

  created() {
      axios.get("users/profile/" + this.id)
      .then(({data}) => {
        this.form.fill(data)
      })
  }
};
</script>