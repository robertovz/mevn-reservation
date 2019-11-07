<template>
  <div class="container">
    <div class="row mb-5 pb-3 py-5">
      <div class="col-12">
        <div class="card">
          <div class="card-header menu-title-wrapper">
            <h5 class="card-title mb-0 py-2">My Reservations</h5>
          </div>
          <div class="card-body table-responsive pt-2 p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>is Confirmed?</th>
                </tr>
                <tr v-for="reservation in reservations.data" :key="reservation.id">
                  <td>{{ reservation.id }}</td>
                  <td>{{ reservation.user_name }}</td>
                  <td>{{ reservation.user_email }}</td>
                  <td>{{ reservation.message }}</td>
                  <td>{{ reservation.check_in | myDate }}</td>
                  <td>{{ reservation.check_out | myDate }}</td>
                  <td>{{ reservation.status == 1 ? "Yes" : "No" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwtDecode from "jwt-decode";
export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      auth: "",
      id: decoded.id,
      user: localStorage.usertoken,
      reservations: {}
    };
  },
  created() {
    console.log(this.user);
    axios
      .get(`api/users/${this.id}/reservations`)
      .then(({ data }) => (this.reservations = data));
  }
};
</script>