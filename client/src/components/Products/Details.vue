<template>
  <div class="detailsComponent">
    <Navbar />
    <Hero />
    <div class="breadcrumbs">
      <ul class="breadcrumb">
        <li class="breadcrumb-item ml-5">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/products">Products</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/details">{{ product.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <div class="card p-5 my-5">
        <div class="row">
          <div class="col-md-9">
            <div class="img-wrapper">
              <img :src="'/img/products/' + product.image" class="card-img-top" alt="..." />
            </div>
            <div class="row">
              <div class="col-12 mt-4">
                <div class="text-center blue font-weight-bold">Extras</div>
              </div>
            </div>
            <div class="row mt-2 mb-5 blue mx-auto">
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-car"></i>
                  </div>
                  <div class="col-9">Parking Available</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-swimmer"></i>
                  </div>
                  <div class="col-9">Pool</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-wifi"></i>
                  </div>
                  <div class="col-9">Free WiFi</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-dumbbell"></i>
                  </div>
                  <div class="col-9">Gym</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-smoking-ban"></i>
                  </div>
                  <div class="col-9">Non-smoking</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="row mt-1 mx-auto">
                  <div class="col-1">
                    <i class="fas fa-wind"></i>
                  </div>
                  <div class="col-9">Air Conditioning</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="mx-2">
              <h3 class="text-capitalize">{{ product.name }}</h3>
              <hr />
              <h4 class="font-weight-bold">{{ product.price | currency }}</h4>
              <p v-html="product.description"></p>
              <div>
                <span class="font-weight-bold">Capacity:</span>
                {{ product.capacity }}
                <span v-if="product.capacity == 1">Person</span>
                <span v-else>People</span>
              </div>
              <div class="mb-3">
                <span class="font-weight-bold">Size:</span>
                {{ product.size }} SQFT
              </div>
              <miniReservation :pId="product.id" :pPrice="product.price" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <productsCategory :category="product.category" :text="'Related'" />

    <div class="container">
      <div class="card p-5 my-5">
        <div class="heading text-left black">Reviews</div>
        <div class="left-review text-left">
          <star-rating
            :inline="true"
            :read-only="true"
            :show-rating="false"
            :star-size="25"
            :increment="0.1"
            active-color="#ff9800"
          />
          <p class="mt-2">{{ totalRate }} average based on {{ totalUser }} reviews.</p>
        </div>
        <hr style="border:3px solid #f1f1f1" />
        <div class="row">
          <div class="side">
            <div class="text-center">5 star</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-5" style="width: 0%"></div>
            </div>
          </div>
          <div class="side right">
            <div class="text-center">{{ bar5 }}</div>
          </div>
          <div class="side">
            <div class="text-center">4 star</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-4" style="width: 0%"></div>
            </div>
          </div>
          <div class="side right">
            <div class="text-center">{{ bar4 }}</div>
          </div>
          <div class="side">
            <div class="text-center">3 star</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-3" style="width: 0%"></div>
            </div>
          </div>
          <div class="side right">
            <div class="text-center">{{ bar3 }}</div>
          </div>
          <div class="side">
            <div class="text-center">2 star</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-2" style="width: 0%"></div>
            </div>
          </div>
          <div class="side right">
            <div class="text-center">{{ bar2 }}</div>
          </div>
          <div class="side">
            <div class="text-center">1 star</div>
          </div>
          <div class="middle">
            <div class="bar-container">
              <div class="bar-1" style="width: 0%"></div>
            </div>
          </div>
          <div class="side right">
            <div class="text-center">{{ bar1 }}</div>
          </div>
        </div>
        <div>
          <hr style="border:3px solid #f1f1f1" />

          <div class="comment-list">
            <div class="orange font-weight-bold text-left page-header py-3 px-4">
              Customer Reviews
              <span v-if="totalUser < 5">({{ totalUser }})</span>
              <span v-else>(5)</span>
            </div>
            <div class="row mt-5" v-if="totalUser == 0">
              <div class="col-12">
                <div class="text-center text-muted font-weight-bold">No reviews yet.</div>
              </div>
            </div>
            <div class="row" v-for="comment in latestComments" :key="comment.id">
              <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">
                <div class="thumbnail">
                  <div class="image">
                    <img
                      src="img/profile/profile.png"
                      class="img-circle elevation-1"
                      alt="User Image"
                      style="width: 55px"
                    />
                  </div>
                  <div class="text-center">{{ comment.user_name }}</div>
                </div>
              </div>
              <div class="col-lg-11 col-md-10 col-sm-10">
                <div class="panel panel-default arrow left">
                  <div class="panel-body card px-4">
                    <header class="text-left">
                      <div class="comment-date mt-3 mb-1" style="font-size: 12px">
                        <i class="fas fa-clock mx-1"></i>
                        {{ comment.created_at | myDate }}
                      </div>
                      <div class="comment-user ml-2">
                        <star-rating
                          v-model="comment.rating"
                          :increment="0.5"
                          text-class="custom-text"
                          :read-only="true"
                          :star-size="25"
                        />
                      </div>
                      <div class="font-weight-bold ml-2">{{ comment.short_description }}</div>
                      <div class="comment-post ml-1">
                        <p>{{ comment.comment }}</p>
                      </div>
                    </header>
                    <div class="text-right">
                      <div class="text-right" v-if="$gate.isAdmin()">
                        <button
                          type="button"
                          class="btn btn-danger"
                          style="font-size: 15px;"
                          @click="deleteReview(comment.id)"
                        >
                          <i class="fa fa-trash" style="font-size: 15px;"></i>
                        </button>
                      </div>
                    </div>
                    <p class="text-right">
                      <a href="#" class="btn btn-default btn-sm">
                        <i class="fa fa-reply"></i> reply
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target=".bd-example-modal-lg"
              v-if="totalUser > 0"
            >View all comments</button>

            <div
              class="modal fade bd-example-modal-lg"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header modal-custom-header mb-2">
                    <div class="font-weight-bold">All Comments</div>
                    <button
                      type="button"
                      class="close white"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="my-5">
                    <div
                      class="orange font-weight-bold text-left page-header py-2 px-5"
                    >Customer Reviews ({{ totalUser }})</div>
                    <div class="row mt-2 mx-5" v-for="comment in comments.data" :key="comment.id">
                      <div class="col-lg-1 col-md-2 col-sm-2 hidden-xs">
                        <div class="thumbnail">
                          <div class="image">
                            <img
                              src="img/profile/profile.png"
                              class="img-circle elevation-1"
                              alt="User Image"
                              style="width: 55px"
                            />
                          </div>
                          <div class="text-center">{{ comment.user_name }}</div>
                        </div>
                      </div>
                      <div class="col-lg-11 col-md-10 col-sm-10">
                        <div class="panel panel-default arrow left">
                          <div class="panel-body card px-4">
                            <header class="text-left">
                              <div class="comment-date mt-3 mb-1" style="font-size: 12px">
                                <i class="fas fa-clock mx-1"></i>
                                {{ comment.created_at | myDate }}
                              </div>
                              <div class="comment-user ml-2">
                                <star-rating
                                  v-model="comment.rating"
                                  :increment="0.5"
                                  text-class="custom-text"
                                  :read-only="true"
                                  :star-size="25"
                                />
                              </div>
                              <div class="font-weight-bold ml-2">{{ comment.short_description }}</div>
                              <div class="comment-post ml-1">
                                <p>{{ comment.comment }}</p>
                              </div>
                            </header>
                            <div class="text-right" v-if="$gate.isAdmin()">
                              <button
                                type="button"
                                class="btn btn-danger"
                                @click="deleteReview(comment.id)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </div>
                            <p class="text-right">
                              <a href="#" class="btn btn-default btn-sm">
                                <i class="fa fa-reply"></i> reply
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form class="d-block text-left mt-4" v-if="$gate.userId() > 0">
          <hr style="border:3px solid #f1f1f1" />
          <div
            class="text-center font-weight-bold p-3"
            style="background: #eee;"
          >You're reviewing: {{ product.name }}</div>
          <h4 class="blue mt-3">Write your own review</h4>
          <p class="red" v-if="userRate == true">You already reviewed this product.</p>
          <h5 class="d-inline-block mb-3">Rating</h5>

          <star-rating
            v-model="form.rating"
            :increment="0.5"
            text-class="custom-text"
            class="d-inline-block my-3"
            :star-size="25"
            min="1"
            :read-only="userRate == true"
          />
          <input
            type="price"
            name="price"
            placeholder="Short description"
            class="form-control mb-2"
            maxlength="15"
            v-model="form.short_description"
            :class="{ 'is-invalid': form.errors.has('short_description') }"
          />
          <has-error :form="form" field="short_description"></has-error>
          <textarea
            name
            id
            class="form-control d-block"
            style="height: 170px"
            placeholder="Write your review"
            maxlength="550"
            v-model="form.comment"
            :class="{ 'is-invalid': form.errors.has('comment') }"
          />
          <has-error :form="form" field="comment"></has-error>
          <button type="button" class="btn btn-primary my-3" @click="setRating(product.id)">Publish</button>
        </form>
        <div v-if="$gate.userId() == null || $gate.userId() == undefined">
          <hr style="border:3px solid #f1f1f1" />
          <div class="jumbotron text-center">
            <h5>You must be logged in to post a comment.</h5>
            <a href="/login" class="d-block">Login</a>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: "",
      form: new Form({
        id: "",
        product_id: "",
        user_id: this.$gate.userId(),
        user_name: this.$gate.userName(),
        rating: 0,
        short_description: "",
        comment: ""
      }),
      rating: 0,
      short_description: "",
      comment: "",
      totalRate: 0,
      totalComment: 0,
      totalUserRate: 0,
      totalUser: 0,
      userRate: false,
      comments: {},
      bar1: 0,
      bar2: 0,
      bar3: 0,
      bar4: 0,
      bar5: 0,
      latestComments: {}
    };
  },
  methods: {
    loadProduct() {
      if (this.$route.params.p_product != undefined) {
        this.$store.commit("addLastItem", this.$route.params.p_product);
      }
      this.product = this.$store.state.lastItem;
      this.product_id = this.product.id;
    },
    getTotalRating() {
      axios.get("api/details/" + this.product.id).then(response => {
        this.comments = response.data;
        this.latestComments = this.comments.data.slice(0, 5);
        var data = response.data.data;
        this.totalUser = data.length;
        if (this.userRate) return 0;
        var id = this.$gate.userId();
        var sum = 0;
        this.bar1 = 0;
        this.bar2 = 0;
        this.bar3 = 0;
        this.bar4 = 0;
        this.bar5 = 0;
        for (let i = 0; i < data.length; i++) {
          sum += parseFloat(data[i]["rating"]);
          if (parseInt(data[i]["rating"]) == "1") {
            this.bar1 += 1;
          }
          if (parseInt(data[i]["rating"]) == "2") {
            this.bar2 += 1;
          }
          if (parseInt(data[i]["rating"]) == "3") {
            this.bar3 += 1;
          }
          if (parseInt(data[i]["rating"]) == "4") {
            this.bar4 += 1;
          }
          if (parseInt(data[i]["rating"]) == "5") {
            this.bar5 += 1;
          }
          if (data[i].user_id == id) {
            this.userRate = true;
            this.form.rating = data[i].rating;
          }
        }
        var avg = sum / this.totalUser;
        this.totalRate = parseFloat(avg.toFixed(1));
        $(".bar-1").css("width", this.bar1 + "%");
        $(".bar-2").css("width", this.bar2 + "%");
        $(".bar-3").css("width", this.bar3 + "%");
        $(".bar-4").css("width", this.bar4 + "%");
        $(".bar-5").css("width", this.bar5 + "%");
      });
    },
    setRating() {
      if (this.form.rating > 0) {
        this.form.post("api/details").then(() => {
          toast.fire({
            type: "success",
            title: "Published successfully"
          });
          var value = this.form.rating;
          this.form.reset();
          this.form.rating = value;
          Fire.$emit("AfterCreate");
        });
      } else {
        swal.fire("Failed", "There was something wrong.", "warning");
      }
    },
    deleteReview(id) {
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
              .delete("/api/details/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed", "There was something wrong.", "warning");
              });
          }
        });
    }
  },
  created() {
    this.getTotalRating();
    this.loadProduct();
    Fire.$on("AfterCreate", () => {
      this.getTotalRating();
    });
  }
};
</script>


<style>
.img-wrapper {
  overflow: hidden;
}
.add-to-cart,
.add-to-compare {
  display: inline;
}
.heading {
  font-size: 25px;
  color: black;
}
.fa {
  font-size: 25px;
}
.checked {
  color: orange;
}
.table_item {
  width: 25%;
}
/* Three column layout */
.side {
  float: left;
  width: 15%;
  margin-top: 10px;
}
.middle {
  margin-top: 10px;
  float: left;
  width: 70%;
}
/* Place text to the right */
.right {
  text-align: right;
}
/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* The bar container */
.bar-container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
}
/* Individual bars */
.bar-5 {
  height: 18px;
  background-color: #4caf50;
}
.bar-4 {
  height: 18px;
  background-color: #2196f3;
}
.bar-3 {
  height: 18px;
  background-color: #00bcd4;
}
.bar-2 {
  height: 18px;
  background-color: #ff9800;
}
.bar-1 {
  height: 18px;
  background-color: #f44336;
}
@media (max-width: 400px) {
  .side,
  .middle {
    width: 100%;
  }
  /* Hide the right column on small screens */
  .right {
    display: none;
  }
}
.user-review {
  border-radius: 50%;
  border: 2px solid grey;
  padding: 15px;
  font-size: 18px;
}
.tabs-component {
  margin: 4em 0;
}
.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}
@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}
.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}
.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}
.tabs-component-tab:hover {
  color: #666;
}
.tabs-component-tab.is-active {
  color: #000;
}
.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}
@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }
  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}
.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
  text-transform: uppercase;
}
.tabs-component-panels {
  padding: 4em 0;
}
@media (min-width: 700px) {
  .tabs-component-panels,
  .product-info {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}
.comment-list .thumbnail {
  text-align: center;
  margin-top: 30%;
}
.comment-list .row {
  margin-bottom: 0px;
}
.comment-list .panel .panel-heading {
  padding: 4px 15px;
  position: absolute;
  border: none;
  /*Panel-heading border radius*/
  border-top-right-radius: 0px;
  top: 1px;
}
.comment-list .panel .panel-heading.right {
  border-right-width: 0px;
  /*Panel-heading border radius*/
  border-top-left-radius: 0px;
  right: 16px;
}
.comment-list .panel .panel-heading .panel-body {
  padding-top: 6px;
}
.comment-list figcaption {
  /*For wrapping text in thumbnail*/
  word-wrap: break-word;
}
/* Portrait tablets and medium desktops */
@media (min-width: 768px) {
  .comment-list .arrow:after,
  .comment-list .arrow:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
  }
  .comment-list .panel.arrow.left:after,
  .comment-list .panel.arrow.left:before {
    border-left: 0;
  }
  .panel.panel-default.arrow.left {
    border-color: lightgrey;
  }
  /*****Left Arrow*****/
  /*Outline effect style*/
  .comment-list .panel.arrow.left:before {
    left: 0px;
    top: 30px;
    /*Use boarder color of panel*/
    border-right-color: inherit;
    border-width: 16px;
  }
  /*Background color effect*/
  .comment-list .panel.arrow.left:after {
    left: 1px;
    top: 31px;
    /*Change for different outline color*/
    border-right-color: #ffffff;
    border-width: 15px;
  }
  /*****Right Arrow*****/
  /*Outline effect style*/
  .comment-list .panel.arrow.right:before {
    right: -16px;
    top: 30px;
    /*Use boarder color of panel*/
    border-left-color: inherit;
    border-width: 16px;
  }
  /*Background color effect*/
  .comment-list .panel.arrow.right:after {
    right: -14px;
    top: 31px;
    /*Change for different outline color*/
    border-left-color: #ffffff;
    border-width: 15px;
  }
}
.comment-list .comment-post {
  margin-top: 6px;
}
</style>