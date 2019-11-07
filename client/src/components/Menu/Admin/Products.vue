<template>
  <div class="container">
    <div class="row my-5 text-center" v-if="$gate.isAdmin()">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header menu-header">
            <h3 class="card-title">Products Table</h3>

            <div class="card-tools text-center">
              <button class="btn btn-success" @click="newModal">
                Add New
                <i class="fas fa-user-plus fa-fw"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Registered_at</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="product in products.data" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.price | currency}}</td>
                  <td>{{ product.amount }}</td>
                  <td>{{ product.created_at | myDate }}</td>
                  <td width="100">
                    <a href="#" @click="editModal(product)">
                      <i class="fa fa-edit blue"></i>
                    </a> /
                    <a href="#" @click="deleteProduct(product.id)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <pagination :data="products" @pagination-change-page="getResults"></pagination>
            </div>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>

    <div></div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-show="!editMode" id="addNewLabel">Add New</h5>
            <h5 class="modal-title" v-show="editMode" id="addNewLabel">Update Product's Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editMode? updateProduct() : createProduct()">
            <div class="modal-body">
              <div class="row">
                <!-- main product -->
                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      class="form-control"
                      v-model="form.name"
                      :class="{ 'is-invalid': form.errors.has('name') }"
                    />
                    <has-error :form="form" field="name"></has-error>
                  </div>

                  <div class="form-group">
                    <select
                      name="category"
                      v-model="form.category"
                      id="category"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('category') }"
                    >
                      <option value>Select Product Category</option>
                      <option value="mountain">Mountain</option>
                      <option value="cyclocross">Cyclocross</option>
                      <option value="comfort">Comfort</option>
                    </select>
                    <has-error :form="form" field="category"></has-error>
                  </div>

                  <div class="form-group">
                    <select
                      name="color"
                      v-model="form.color"
                      id="color"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('color') }"
                    >
                      <option value>Select Product Color</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="white">White</option>
                    </select>

                    <has-error :form="form" field="color"></has-error>
                  </div>

                  <div class="form-group">
                    <select
                      name="frame_material"
                      v-model="form.frame_material"
                      id="frame_material"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('frame_material') }"
                    >
                      <option value>Select Product Frame-material</option>
                      <option value="aluminum">Aluminum</option>
                      <option value="carbon">Carbon</option>
                      <option value="steel">Steel</option>
                    </select>

                    <has-error :form="form" field="frame_material"></has-error>
                  </div>

                  <div class="form-group">
                    <vue-editor
                      placeholder="Short description for product"
                      v-model="form.description"
                      :class="{ 'is-invalid': form.errors.has('description') }"
                    ></vue-editor>
                    <has-error :form="form" field="description"></has-error>
                  </div>
                </div>
                <!-- product sidebar -->
                <div class="col-md-4">
                  <div class="form-group">
                    <select
                      name="speed"
                      v-model="form.speed"
                      id="speed"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('speed') }"
                    >
                      <option value>Select Product Speed</option>
                      <option value="21">21</option>
                      <option value="29">29</option>
                      <option value="38">38</option>
                    </select>
                    <has-error :form="form" field="speed"></has-error>
                  </div>

                  <div class="form-group">
                    <select
                      name="wheel_size"
                      v-model="form.wheel_size"
                      id="wheel_size"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('wheel_size') }"
                    >
                      <option value>Select Product Wheel Size</option>
                      <option value="20">20 Inch</option>
                      <option value="24">24 Inch</option>
                      <option value="26">26 Inch</option>
                      <option value="29">29 Inch</option>
                    </select>
                    <has-error :form="form" field="wheel_size"></has-error>
                  </div>

                  <div class="form-group">
                    <select
                      name="wheel_spec"
                      v-model="form.wheel_spec"
                      id="wheel_spec"
                      class="form-control"
                      :class="{ 'is-invalid': form.errors.has('wheel_spec') }"
                    >
                      <option value>Select Product Wheel Spec</option>
                      <option value="clincher">Clincher</option>
                      <option value="reynolds">Reynolds</option>
                      <option value="oval">Oval</option>
                      <option value="carbon">Carbon</option>
                    </select>
                    <has-error :form="form" field="wheel_spec"></has-error>
                  </div>

                  <div class="form-group">
                    <label for="product_image">Product Images</label>
                    <input type="file" @change="uploadImage" class="form-control" />
                  </div>

                  <div class="form-group">
                    <input
                      type="price"
                      name="price"
                      placeholder="Price"
                      class="form-control"
                      v-model="form.price"
                      :class="{ 'is-invalid': form.errors.has('price') }"
                    />
                    <has-error :form="form" field="price"></has-error>
                  </div>

                  <div class="form-group">
                    <input
                      type="amount"
                      name="amount"
                      placeholder="Amount"
                      class="form-control"
                      v-model="form.amount"
                      :class="{ 'is-invalid': form.errors.has('amount') }"
                    />
                    <has-error :form="form" field="amount"></has-error>
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                    <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: false,
      products: {},
      form: new Form({
        id: "",
        name: "",
        description: "",
        price: "",
        image: "",
        amount: "",
        category: "",
        color: "",
        frame_material: "",
        speed: "",
        wheel_size: "",
        wheel_spec: ""
      })
    };
  },
  methods: {
    getResults(page = 1) {
      axios.get("api/products?page=" + page).then(response => {
        this.products = response.data;
      });
    },
    deleteProduct(id) {
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
              .delete("/api/products/" + id)
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

    loadProducts() {
      if (this.$gate.isAdmin()) {
        axios.get("api/products").then(({ data }) => (this.products = data));
      }
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var image = new Image();
        var reader = new FileReader();

        reader.onload = file => {
          this.form.image = reader.result;
        };

        reader.readAsDataURL(file);
      }
    },
    createProduct() {
      this.$Progress.start();
      this.form
        .post("api/products")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");
          toast.fire({
            type: "success",
            title: "Signed in successfully"
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },
    updateProduct(id) {
      this.form
        .put("api/products/" + this.form.id)
        .then(() => {
          $("#addNew").modal("hide");
          swal.fire("Updated!", "Information has been updated.", "success");
          Fire.$emit("AfterCreate");
        })
        .catch(() => {});
    },
    editModal(product) {
      this.editMode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(product);
    },
    newModal() {
      this.editMode = false;
      this.form.reset();
      $("#addNew").modal("show");
    }
  },
  created() {
    this.loadProducts();
    Fire.$on("AfterCreate", () => {
      this.loadProducts();
    });
  }
};
</script>