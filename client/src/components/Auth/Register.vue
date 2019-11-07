<template>
  <div>
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-md-10 mx-auto">
          <div class="register">
            <form @submit.prevent="register()">
              <div class="form-content">
                <div class="login-title">Sign Up</div>
                <div class="form-group">
                  <label for="first_name">First Name</label>
                  <input
                    type="first_name"
                    class="form-control"
                    name="first_name"
                    placeholder="Enter First Name"
                    v-model="form.first_name"
                  />
                </div>
                <div class="form-group">
                  <label for="last_name">Last Name</label>
                  <input
                    type="last_name"
                    class="form-control"
                    name="last_name"
                    placeholder="Enter Last Name"
                    v-model="form.last_name"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="Enter Email"
                    v-model="form.email"
                    :class="{ 'is-invalid': form.errors.has('email') }"
                  />
                  <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    placeholder="Enter Password"
                    v-model="form.password"
                  />
                </div>
                <div class="form-group">
                  <span>
                    Already have an account?
                    <router-link to="/">Log in</router-link>
                  </span>
                </div>
                <div>
                  <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: new Form({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      })
    };
  },

  methods: {
    register() {
      this.form
        .post("/users/register")
        .then(res => {
          $("#register").modal("hide");
          localStorage.setItem("usertoken", res.data);
          this.$router.push({ name: "ProfileUser" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.register {
  display: flex;
  -webkit-display: box;
  -moz-display: box;
  -ms-display: flexbox;
  -webkit-display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  padding: 6%;
  margin: 0;

  .login-title {
    font-weight: 700;
    color: #333;
    text-align: center;
    margin-top: 0.2em;
    font-size: 25px;
  }

  form {
    background-color: #fff;
    padding: 2em;
    padding-bottom: 3em;
    border-radius: 8px;
    max-width: 400px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 10px 40px -14px rgba(0, 0, 0, 0.25);
    width: 100%;

    .form-content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      input {
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
      }

      button {
        font-weight: 600;
        text-align: center;
        font-size: 19px;
        color: #fff;
        background-color: #6cb2eb;
        width: 100%;
        border: none;
        border-radius: 50px;
        padding: 0.8em;
        margin-top: 1em;
        margin-bottom: 1em;
        cursor: pointer;
        overflow: hidden;
        transition: all 200ms ease-in-out;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
        &:hover {
          box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
          transform: translateY(-4px);
          background-color: #1b81d6;
        }
      }
    }
  }
}
</style>