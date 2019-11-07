<template>
  <div class="container">
    <div class="row mb-5 pb-3 py-5">
      <!-- tab -->

      <div class="col-md-12">
        <div class="card">
          <div class="card-header menu-header p-2">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="#activity" data-toggle="tab">Activities</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a>
              </li>
            </ul>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="tab-content">
              <!-- Activity Tab -->
              <div class="tab-pane" id="activity">
                <div class="activity-header">
                  <span class="font-weight-bold">Showing Results: </span><span>Most Recent</span>
                </div>
                <div
                  v-for="product in this.$store.state.viewProducts"
                  :key="product.id"
                  class="pl-3 py-2 activity-wrapper"
                >
                  <div class="activity-img">
                    <img :src="'img/products/' + product.image" class="card-img-top" alt="..." width="250px" style="width: 200px;">
                  </div>
                  <div class="activity-table mt-2">
                    <div class="activity-item font-weight-bold text-muted">{{product.activity}}</div>
                    <span class="activity-item">{{ product.name }}</span>
                    <span class="activity-item">{{ product.price | currency}},</span>
                    <span class="activity-item">{{ product.created_at | myDate }}</span>
                    <span class="activity-item details">
                      <routerLink
                        :to="{ name: 'details', 
                          params: { p_product: product, p_id: product.id}}" class="btn bcustom-secondary"
                      ><span class="pr-3">See more details</span></routerLink>
                    </span>
                  </div>
                </div>
              </div>
              <!-- Setting Tab -->
              <div class="tab-pane active show" id="settings">
                <form class="form-horizontal">
                  <div class="form-group">
                    <label for="inputName" class="col-sm-2 control-label">Name</label>

                    <div class="col-sm-12">
                      <input
                        type
                        v-model="form.name"
                        class="form-control"
                        id="inputName"
                        placeholder="Name"
                        :class="{ 'is-invalid': form.errors.has('name') }"
                      />
                      <has-error :form="form" field="name"></has-error>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputEmail" class="col-sm-2 control-label">Email</label>

                    <div class="col-sm-12">
                      <input
                        type="email"
                        v-model="form.email"
                        class="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                      />
                      <has-error :form="form" field="email"></has-error>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="inputExperience" class="col-sm-2 control-label">Address</label>

                    <div class="col-sm-12">
                      <input
                        type="address"
                        v-model="form.address"
                        class="form-control"
                        id="inputAddress"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                    <div class="col-sm-12">
                      <input type="file" name="photo" class="form-input" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label
                      for="password"
                      class="col-sm-12 control-label"
                    >Password (leave empty if not changing)</label>

                    <div class="col-sm-12">
                      <input
                        type="password"
                        v-model="form.password"
                        class="form-control"
                        id="password"
                        placeholder="Password"
                        :class="{ 'is-invalid': form.errors.has('password') }"
                      />
                      <has-error :form="form" field="password"></has-error>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-12">
                      <button
                        @click.prevent="updateInfo"
                        type="submit"
                        class="btn btn-success"
                      >Update</button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.nav-tabs-custom -->
      </div>
      <!-- end tabs -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        adress: "",
        orders: "",
        password: ""
      })
    };
  },
  methods: {
    updateInfo() {
      this.$Progress.start();
      if (this.form.password == "") {
        this.form.password = undefined;
      }
      this.form
        .put("api/profile")
        .then(() => {
          this.$Progress.start();
          swal.fire("Updated!", "Information has been updated.", "success");
          Fire.$emit("AfterCreate");
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    }
  },
  created() {
    axios.get("api/profile").then(({ data }) => this.form.fill(data));
  }
};
</script>

<style>
.activity-header {
  margin: 10px 45px;
}
.activity-wrapper {
  display: flex;
}
.activity-wrapper:hover {
  background: #eee;
}
.activity-item {
  margin-left: 3px;
}
.activity-table {
  padding: 0 40px;
}
.activity-item.first,
.activity-item.details {
  margin-left: 30px;
}
.activity-item.details {
  float: right;
  margin-right: 20px;
}
@media (max-width: 767px) {
  .activity-header {
    margin: 0px;
    text-align: center;
  }
  .activity-wrapper {
    display: initial;
  }
  .activity-img {
    text-align: center;
  }
  .activity-table {
    padding: 0px;
  }
  .activity-item {
    display: block;
    text-align: center;
  }
  .activity-item.first,
  .activity-item.details {
    margin-left: 0px;
  }
  .activity-item.details {
    float: none;
  }
}
</style>
