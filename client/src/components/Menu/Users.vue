<template>
  <div class="product">
    <div class="container">
      <div class="row mt-5" v-if="type == 'admin'">
        <div class="col-10">
          <div class="text-left pb-5">
            <button class="btn bcustom-primary bblue" @click="newModal">
              Add new
              <i class="fas fa-user-plus fa-fw"></i>
            </button>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <div class="card-header menu-title-wrapper">
              <div class="card-title mb-0">Users Table</div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <th>id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Registered at</th>
                    <th>Modify</th>
                  </tr>

                  <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.type }}</td>
                    <td>{{ user.created }}</td>
                    <td width="150">
                      <button class="btn btn-primary">
                        <a href="#" @click="editModal(user)">
                          <i class="fa fa-edit white"></i>
                        </a>
                      </button> /
                      <button class="btn btn-danger">
                        <a href="#" @click="deleteUser(user.id)">
                          <i class="fa fa-trash white"></i>
                        </a>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade addNew"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header modal-wrapper-title">
            <div class="modal-title" v-show="!editmode" id="addNewLabel">Add New User</div>
            <div class="modal-title" v-show="editmode" id="addNewLabel">Update User Info</div>
            <button type="button" class="close" data-dimiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.first_name"
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Enter First Name"
                  :class="{ 'is-invalid': form.errors.has('first_name') }"
                />
                <has-error :form="form" field="first_name"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.last_name"
                  type="text"
                  class="form-control"
                  name="last_name"
                  placeholder="Enter Last Name"
                  :class="{ 'is-invalid': form.errors.has('last_name') }"
                />
                <has-error :form="form" field="last_name"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.email"
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Enter Email"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <select
                  name="type"
                  v-model="form.type"
                  id="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value>Select User Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Enter Password"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dimiss="modal">Close</button>
              <button type="submit" v-show="editmode" class="btn btn-primary">Update</button>
              <button type="submit" v-show="!editmode" class="btn btn-success">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import jwtDecode from "jwt-decode";

export default {
  name: "Users",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      editmode: false,
      users: {},
      form: new Form({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        type: "",
        password: ""
      }),
      type: decoded.type
    };
  },

  methods: {
    loadUsers() {
      if(this.type == 'admin') {
        axios.get("/users").then(({ data }) => (this.users = data));
      }
    },

    createUser() {
      this.form
        .post("users/register")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");

          toast.fire({
            type: "success",
            title: "User Created in successfully"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    editModal(user) {
      this.editmode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(user);
    },

    updateUser() {
      this.form.put("/users/" + this.form.id).then(() => {
        $("#addNew").modal("hide");
        swal.fire("Updated!", "Information has been updated", "success");
        Fire.$emit("AfterCreate");
      });
    },

    deleteUser(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: "true",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.form
              .delete("/users/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed!", "There was something wrong.", "warning");
              });
          }
        });
    },

    newModal() {
      this.editmode = false;
      $("#addNew").modal("show");
    }
  },

  created() {
    this.loadUsers();
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
  }
};
</script>

<style lang="scss">
</style>