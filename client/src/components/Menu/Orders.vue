<template>
  <div class="container">
    <div class="row mb-5 pb-3 py-5">
      <div class="col-12">
        <div class="card-tools py-5">
          <button class="btn btn-primary" @click="newModal">
            Add new
            <i class="fas fa-user-plus fa-fw"></i>
          </button>
        </div>
        <div class="card">
          <div class="card-header card-admin">
            <h5 class="card-title mb-0 py-2">My Reservations</h5>
          </div>
          <div class="card-body table-responsive pt-2 p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>is Confirmed?</th>
                </tr>
                <tr v-for="reservation in reservations" :key="reservation.id">
                  <td>{{ reservation.id }}</td>
                  <td>{{ reservation.user_name }}</td>
                  <td>{{ reservation.user_email }}</td>
                  <td>{{ reservation.check_in }}</td>
                  <td>{{ reservation.check_out }}</td>
                  <td>{{ reservation.status == 1 ? "Yes" : "No" }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header modal-admin">
            <h5 class="modal-title" id="exampleModalLongTitle" v-if="!editMode">Add new</h5>
            <h5 class="modal-title" id="exampleModalLongTitle" v-if="editMode">Update</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode ? updateOrder() : createOrder()">
            <div class="modal-body">
              <form class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="user_name"
                  placeholder="Enter User Name"
                  v-model="form.user_name"
                  :class="{ 'is-invalid': form.errors.has('user_name') }"
                />
                <has-error :form="form" field="user_name"></has-error>
              </form>
              <form class="form-group">
                <input
                  type="email"
                  class="form-control"
                  name="user_email"
                  placeholder="Enter User Email"
                  v-model="form.user_email"
                  :class="{ 'is-invalid': form.errors.has('user_email') }"
                />
                <has-error :form="form" field="user_email"></has-error>
              </form>
              <form class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="check_in"
                  placeholder="Enter Check In"
                  v-model="form.check_in"
                  :class="{ 'is-invalid': form.errors.has('check_in') }"
                />
                <has-error :form="form" field="check_in"></has-error>
              </form>
              <form class="form-group">
                <input
                  type="text"
                  class="form-control"
                  name="check_out"
                  placeholder="Enter Check Out"
                  v-model="form.check_out"
                  :class="{ 'is-invalid': form.errors.has('check_out') }"
                />
                <has-error :form="form" field="check_out"></has-error>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-success" v-if="editMode">Update</button>
              <button type="submit" class="btn btn-primary" v-if="!editMode">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      editMode: false,
      product_id: this.$route.params.pId,
      reservations: {},
      form: new Form({
        product_id: this.$route.params.pId,
        id: "",
        user_name: "",
        user_email: "",
        check_in: "",
        check_out: "",
        status: ""
      })
    };
  },
  methods: {
    createOrder() {
      this.form
        .post("api/orders")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");
          toast.fire({
            type: "success",
            title: "Created in successfully"
          });
        })
        .catch(() => {});
    },
    updateOrder() {
    },
    editModal(user) {
      this.editMode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(user);
    },
    newModal() {
      this.editMode = false;
      $("#addNew").modal("show");
    },
  },
  created() {
    axios
      .get(`api/products/${this.product_id}/orders`)
      .then(({ data }) => (this.reservations = data));
  }
};
</script>