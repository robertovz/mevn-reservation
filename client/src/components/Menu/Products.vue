<template>
  <div class="product">
    <div class="container">
      <div class="row mt-5" v-if="type == 'admin'">
        <div class="col-10">
          <div class="text-left pb-5">
            <button class="btn bcustom-primary bblue" @click="newModal">
              Add new
              <i class="fas fa-plus fa-fw"></i>
            </button>
          </div>
        </div>
        <div class="col-12">
        <div class="card">
          <div class="card-header menu-title-wrapper">
            <div class="card-title mb-0">Products Table</div>
        </div>
        <div class="card-body table-responsive p-0">
          <table class="table table-hover">
            <tbody>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>

              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.amount }}</td>
              <td width="150">
                <button class="btn btn-primary">
                  <a href="#" @click="editModal(product)">
                    <i class="fa fa-edit white"></i>
                  </a>
                </button> /
                <button class="btn btn-danger">
                  <a href="#" @click="deleteProduct(product.id)">
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

    <div class="modal fade addNew" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header modal-wrapper-title">
            <div class="modal-title" v-show="!editmode" id="addNewLabel">Add New Product</div>
            <div class="modal-title" v-show="editmode" id="addNewLabel">Update Product Info</div>
            <button type="button" class="close" data-dimiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editmode ? updateProduct() : createProduct()">
            <div class="modal-body">
              <div class="form-group">
                <input v-model="form.name" type="text" class="form-control" name="name" placeholder="Enter Name" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <input v-model="form.category" type="text" class="form-control" name="type" placeholder="Enter category" :class="{ 'is-invalid': form.errors.has('type') }">
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <input type="file" class="form-control" name="image" @change="uploadImage">
              </div>
              <div class="form-group">
                <input v-model="form.description" type="text" class="form-control" name="quantity" placeholder="Enter description" :class="{ 'is-invalid': form.errors.has('quantity') }">
                <has-error :form="form" field="quantity"></has-error>
              </div>
              <div class="form-group">
                <input v-model="form.price" type="text" class="form-control" name="time" placeholder="Enter price" :class="{ 'is-invalid': form.errors.has('time') }">
                <has-error :form="form" field="time"></has-error>
              </div>
              <div class="form-group">
                <input v-model="form.amount" type="text" class="form-control" name="number" placeholder="Enter amount" :class="{ 'is-invalid': form.errors.has('number') }">
                <has-error :form="form" field="number"></has-error>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn bcustom-primary bred" data-dimiss="modal">Close</button>
              <button type="submit" v-show="editmode" class="btn bcustom-primary bblue">Update</button>
              <button type="submit" v-show="!editmode" class="btn bcustom-primary bgreen">Create</button>
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
import { read } from 'fs';

export default {
  name: "Product",
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      editmode: false,
      products: {},
      form: new Form({
        name: "",
        time: "",
        people: "",
        type: "",
        image: "",
        number: ""
      }),
      type: decoded.type
    };
  },
  methods: {
    createProduct() {
      this.form
        .post("api/product")
        .then(() => {
          Fire.$emit('AfterCreate');
          $('#addNew').modal('hide');

          toast.fire({
            type: 'success',
            title: 'Product Created in successfully'
          })
        })
        .catch(err => {
          console.log(err);
          swal.fire('Failed!', 'There was something wrong.', 'warning');
        });
    },
    editModal(product) {
      this.editmode = true;
      this.form.reset();
      $('#addNew').modal('show');
      this.form.fill(product);
    },
    updateProduct(e) {
      this.form.put('api/product/'+this.form.id)
      .then(() => {
        $('#addNew').modal('hide')
        swal.fire(
          'Updated!', 
          'Information has been updated', 
          'success'
        )
        Fire.$emit('AfterCreate')
      })
    },
    uploadImage(e) {
      let file = e.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (file) => {
        console.log(reader.result.replace(/^data:image\/jpeg;base64,/, ""));
      }
      reader.readAsDataURL(file);
    },
    deleteProduct(id) {
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!", 
        type: 'warning',
        showCancelButton: 'true', 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if(result.value) {
          this.form.delete('api/product/' + id)
          .then(() => {
            swal.fire(
              'Deleted!', 
              'Your file has been deleted.',
              'success'
            )
            Fire.$emit('AfterCreate')
          }).catch(() => {
            swal.fire('Failed!', 'There was something wrong.', 'warning');
          })
        }
      })
    },
    newModal() {
      this.editmode = false;
      $("#addNew").modal("show");
    },
    loadProducts() {
      if(this.type == 'admin') {
        axios.get("api/products").then(({data}) => (this.products = data)) 
      }
    }
    
  },

  created() {
    this.loadProducts();
    Fire.$on('AfterCreate', () => {
      this.loadProducts();
    })
  }
};
</script>