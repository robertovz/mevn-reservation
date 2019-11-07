<template>
  <div class="container">
    <div class="row" v-if="auth=='loggedIn' || (user!=null || user!=undefined)">
      <div class="col-12">
        <div class="card-tools py-5"></div>
        <div class="card">
          <div class="card-header menu-title-wrapper">
            <h5 class="card-title mb-0 py-2">Reservation Table</h5>
          </div>
          <div class="card-body table-responsive pt-2 p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Price</th>
                  <th>Message</th>
                  <th>is Confirmed?</th>
                  <th>Action</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="reservation in reservations.data" :key="reservation.id">
                  <td>{{ reservation.id }}</td>
                  <td>{{ reservation.product_id }}</td>
                  <td>{{ reservation.user_name }}</td>
                  <td>{{ reservation.user_email }}</td>
                  <td>{{ reservation.check_in | myDate }}</td>
                  <td>{{ reservation.check_out | myDate }}</td>
                  <td>{{ reservation.price | currency }}</td>
                  <td width="200">{{ reservation.message }}</td>
                  <td>{{ reservation.status == 1 ? "Yes" : "No" }}</td>
                  <td>
                    <button
                      class="btn btn-success"
                      @click="confirm(reservation)"
                      v-if="reservation.status == 0"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="deleteReservation(reservation.id)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
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
      user: localStorage.usertoken,
      check_id: "",
      editMode: false,
      reservations: {},
      form: new Form({
        product_id: "",
        user_id: "",
        user_name: "",
        user_email: "",
        check_in: "",
        check_out: "",
        price: ""
      })
    };
  },
  methods: {
    loadReservations() {
      axios
        .get("/reservations/")
        .then(({ data }) => (this.reservations = data));
    },
    confirm(reservation) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You have to confirm this action!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, confirm it!"
        })
        .then(result => {
          if (result.value) {
            axios
              .post(`/reservations/${reservation.id}/confirm`)
              .then(({ data }) => {
                Fire.$emit("AfterCreate");
              });
            this.form.fill(reservation);
            this.form
              .post("/orders")
              .then(() => {
                Fire.$emit("AfterCreate");
                $("#addNew").modal("hide");
                toast.fire({
                  type: "success",
                  title: "Confirmed in successfully"
                });
              })
              .catch(() => {});
          }
        });
    },
    updateReservation() {
      this.form
        .put("/reservations")
        .then(() => {
          $("#addNew").modal("hide");
          swal.fire("Updated!", "Information has been updated.", "success");
          Fire.$emit("AfterCreate");
        })
        .catch(() => {});
    },
    editModal(reservation) {
      this.editMode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(reservation);
    },
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#addNew").modal("show");
    },
    deleteReservation(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.form
              .delete("/reservations/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                this.modalCheck(this.check_id);
              })
              .catch(() => {
                swal.fire("Failed", "There was something wrong.", "warning");
              });
          }
        });
    },
    getResults(page = 1) {
      axios
        .get("/reservations?page=" + page)
        .then(({ data }) => (this.reservations = data));
    }
  },
  created() {
    this.loadReservations();
    Fire.$on("AfterCreate", () => {
      this.loadReservations();
    });
  }
};
</script>

<style lang="scss">
</style>