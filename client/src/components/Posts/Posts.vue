<template>
  <div>
    <div class="posts-wrapper py-3">
      <div class="row">
        <div class="col-md-9">
          <div class="card">
            <div class="card-body" v-if="user !== undefined && user !== null && user !== ''">
              <form @submit.prevent="createPost()">
                <div class="form-group">
                  <vue-editor
                    v-model="form.description"
                    placeholder="Enter Description"
                    :class="{ 'is-invalid': form.errors.has('description') }"
                  />
                  <has-error :form="form" field="description"></has-error>
                </div>
                <button type="submit" class="btn bcustom-primary bblue">Publish</button>
              </form>
            </div>
            <hr />
            <div class="card-body">
              <div class="ml-5 text-left">
                <span>Showing {{posts.length}} results.</span>
              </div>
            </div>
            <hr />
            <div v-for="post in posts" :key="post.id">
              <div class="card-body">
                <div class="card-user px-3">
                  <div class="row">
                    <div class="card-img mb-1">
                      <img
                        src="../../assets/img/profile/profile.png"
                        class="card-img-top"
                        alt="User picture"
                        style="max-width: 60px;"
                      />
                    </div>
                    <div class="card-info">
                      <router-link
                        :to="{ name: 'Profile', 
                    params: { u_name: post.name, u_id: post.user_id }}"
                        class="font-weight-bold black dropdown-user"
                      >{{ post.name}} {{ post.last_name}}</router-link>
                      <router-link
                        :to="{ name: 'Details', 
                    params: { p_post: post, p_name: post.name, p_id: post.id }}"
                        class="ml-3 text-muted"
                      >{{ post.created }}</router-link>
                      <button
                        class="btn btn-outline float-right"
                        v-if="post.user_id == form.user_id || type == 'admin'"
                        @click="deletePost(post.id)"
                      >
                        <i class="fas fa-trash red"></i>
                      </button>
                      <div class="mb-3" v-html="post.description"></div>
                      <div class="float-left">
                        <span class="post-item mx-2" @click="setRating(post)">
                          <i class="far fa-heart"></i>
                          ({{ post.total_ratings }})
                        </span>
                        <span class="post-item" aria-placeholder="dwad">
                          <i class="far fa-comment"></i>
                          ({{ post.total_comments }})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="px-0" v-if="post.id !== posts[posts.length - 1].id" />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <div class="card-img text-center">
                <img
                  src="../../assets/img/profile/profile.png"
                  class="card-img-top"
                  alt="User picture"
                  style="max-width: 60px;"
                />
              </div>
              <div class="card-name font-weight-bold text-center">
                {{ form.name }}
                <span class="ml-1">{{ form.last_name }}</span>
              </div>
            </div>
            <hr class="px-0" />
            <div class="card-body">
              <div class="card-buttons">
                <a href="#" class="black d-block">Profile</a>
                <a href="#" class="black">Settings</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";

export default {
  props: ["posts"],
  data() {
    return {
      user: localStorage.usertoken,
      user_id: "",
      form: new Form({
        user_id: "",
        name: "",
        last_name: "",
        id: "",
        title: "",
        short_description: "",
        description: "",
      }),
      formUpdate: new Form({
        id: "",
        total_ratings: 0,
      }),
      items: this.$route.params.posts,
      type: "",
      itemsPerPage: ""
    };
  },

  methods: {
    createPost() {
      this.form
        .post("api/posts")
        .then(() => {
          Fire.$emit("AfterCreate");

          toast.fire({
            type: "success",
            title: "Post Created in successfully"
          });
          (this.form.title = ""),
            (this.form.short_description = ""),
            (this.form.description = "");
        })
        .catch(err => {
          console.log(err);
          swal.fire("Failed!", "There was something wrong.", "warning");
        });
    },

    deletePost(id) {
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
            axios
              .delete("api/posts/" + id)
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

    setRating(post) {
      this.formUpdate.total_ratings = post.total_ratings + 1;
      this.formUpdate.id = post.id;
      this.formUpdate.put("/api/posts/likes/" + this.formUpdate.id).then(() => {});
      this.$emit("changed");
    },

  },

  created() {
    if (this.user !== undefined && this.user !== null && this.user !== "") {
      const decoded = jwtDecode(this.user);
      this.form.user_id = decoded.id;
      this.form.name = decoded.first_name;
      this.form.last_name = decoded.last_name;
      this.type = decoded.type;
    }
  }
};
</script>

<style lang="scss">
.card-user {
  .card-img {
    width: 10%;
  }

  .card-info {
    width: 90%;
  }
}

@media screen and (max-width: 767px) {
  .card-img {
    width: 100% !important;
  }

  .card-info {
    width: 100% !important;
  }
}

.post-item {
  color: #6c757d;
  float: right;

  &:hover {
    cursor: pointer;
    color: #e3342f !important;
  }
}

.breadcrumb {
  background: #f1f2f9;
}

@media screen and (max-width: 767px) {
  .posts-wrapper {
    .post-item {
      margin-top: 15px;
      float: none;
    }
  }
}
</style>