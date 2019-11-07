<template>
    <div class="container">
        <div class="row mt-5 text-center" v-if="$gate.isAdmin()">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header menu-header">
                <h3 class="card-title">Users Table</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModal">Add New <i class="fas fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total Orders</th>
                        <th>Registered_at</th>
                        <th>Modify</th>
                  </tr>
                  <tr v-for="user in users.data" :key="user.id">
                      <td>{{ user.id }}</td>
                      <td>{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.orders.length }}</td>
                      <td>{{ user.created_at | myDate }}</td>
                      <td>
                          <a href="#" @click="editModal(user)">
                              <i class="fa fa-edit blue"></i>
                          </a> / 
                          <a href="#" @click="deleteUser(user.id)">
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                  </tr>
                </tbody></table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                  <div class="d-flex justify-content-center">
                    <pagination :data="users" @pagination-change-page="getResults"></pagination>
                  </div>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <div >
        </div>

    <!-- Modal -->
            <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-show="!editMode" id="addNewLabel">Add New</h5>
                    <h5 class="modal-title" v-show="editMode" id="addNewLabel">Update User's Info</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode? updateUser() : createUser()">
                <div class="modal-body">
                     <div class="form-group">
                        <input type="text" name="name"
                            placeholder="Name"
                            class="form-control" v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>

                     <div class="form-group">
                        <input type="email" name="email"
                            placeholder="Email Adress"
                            class="form-control" v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </div>

                    <div class="form-group">
                        <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>

                    <div class="form-group">
                        <input v-model="form.password" type="password" name="password" id="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                    <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
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
                users: {},
                totalOrders: 0,
                orderstotal: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    orders: '',
                    password: '',
                    type: '',
                })
            }
        },
        methods: {
            getResults(page = 1) {
                axios.get('api/users?page=' + page)
                    .then(response => {
                    this.users = response.data;
                });
            },
            userOrders() {
                console.log(this.form);
            },
            deleteUser(id) {
                swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if(result.value) {
                        this.form.delete('/api/users/'+id).then(() => {
                            swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            Fire.$emit('AfterCreate');
                        }).catch(() => {
                            swal.fire("Failed", "There was something wrong.", "warning");
                        })
                    }
                })
            },

            loadUsers() {
                if(this.$gate.isAdmin()) {
                    axios.get("api/users").then(({ data }) => (this.users = data));
                }
            },

            createUser() {
                this.form.post('api/users')
                .then(() => {
                    Fire.$emit('AfterCreate');
                    $('#addNew').modal('hide')
                    toast.fire({
                        type: 'success',
                        title: 'Signed in successfully'
                    })
                })
                .catch(() => {
                })
            },

            updateUser(id) {
                this.form.put('api/users/'+this.form.id)
                .then(() => {
                    $('#addNew').modal('hide');
                    swal.fire(
                        'Updated!',
                        'Information has been updated.',
                        'success'
                    )
                    Fire.$emit('AfterCreate');
                })
                .catch(() => {

                })
            },

            editModal(user) {
                this.editMode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(user);
            },

            newModal() {
                this.editMode = false;
                this.form.reset();
                $('#addNew').modal('show');
            },
            
        },
        created() {
            this.loadUsers();
            this.userOrders();
            Fire.$on('AfterCreate', () => {
                this.loadUsers();
            })
        }
    }
</script>