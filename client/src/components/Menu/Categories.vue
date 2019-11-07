<template>
  <div class="container">
    <div class="row" v-if="type == 'admin'">
      <div class="col-12">
        <div class="card-tools py-5">
          <button class="btn bcustom-primary bblue" @click="newModal">
            Add new
            <i class="fas fa-plus fa-fw"></i>
          </button>
        </div>
        <div class="card">
          <div class="card-header menu-title-wrapper">
            <h5 class="card-title mb-0 py-2">Categories Table</h5>
          </div>
          <div class="card-body table-responsive pt-2 p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Created_at</th>
                  <th>Updated_at</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="category in categories.data" :key="category.id">
                  <td>{{ category.id }}</td>
                  <td>{{ category.name }}</td>
                  <td>{{ category.slug }}</td>
                  <td>{{ category.created_at | myDate }}</td>
                  <td>{{ category.updated_at | myDate }}</td>
                  <td>
                    <button class="btn btn-primary" @click="editModal(category)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" @click="deleteCategory(category.id)">
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

    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header modal-admin">
            <h5 class="modal-title" id="exampleModalLongTitle" v-if="!editMode">Add new</h5>
            <h5 class="modal-title" id="exampleModalLongTitle" v-if="editMode">Update</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode ? updateCategory() : createCategory()">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-7 mx-auto">
                  <form class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      placeholder="Enter Name"
                      v-model="form.name"
                    />
                  </form>
                  <form class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="slug"
                      placeholder="Enter Slug"
                      v-model="form.slug"
                    />
                  </form>
                </div>
              </div>
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
import jwtDecode from "jwt-decode";
export default {
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      editMode: false,
      categories: {},
      form: new Form({
        id: "",
        name: "",
        slug: ""
      }),
      type: decoded.type
    };
  },
  methods: {
    loadCategories() {
      axios.get("/categories").then(({ data }) => (this.categories = data));
    },
    createCategory() {
      this.form
        .post("api/categories")
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
    updateCategory() {
      this.form
        .put("api/categories/" + this.form.id)
        .then(() => {
          $("#addNew").modal("hide");
          swal.fire("Updated!", "Information has been updated.", "success");
          Fire.$emit("AfterCreate");
        })
        .catch(() => {});
    },
    editModal(category) {
      this.editMode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(category);
    },
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#addNew").modal("show");
    },
    deleteCategory(id) {
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
              .delete("/api/categories/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed", "There was something wrong.", "warning");
              });
          }
        });
    },
    getResults(page = 1) {
      axios
        .get("api/categories?page=" + page)
        .then(({ data }) => (this.categories = data));
    }
  },
  created() {
    this.loadCategories();
    Fire.$on("AfterCreate", () => {
      this.loadCategories();
    });
  }
};
</script>

<style lang="scss">
</style>