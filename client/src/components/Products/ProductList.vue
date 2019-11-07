<template>
  <div class="productsComponent">
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
      </ul>
    </div>
    <div class="container-fluid">
      <div class="row my-5">
        <div class="col-md-3">
          <form class="card">
            <div class>
              <form class="form-inline my-lg-0 track-wrapper white" onSubmit="return false;">
                <div class="row mx-auto">
                  <div class="col-10 mx-auto">
                    <h6 class="font-weight-bold track-text">Product Price</h6>
                  </div>
                  <div class="col-10 mx-auto">
                    <div class="track-container">
                      <span class="multi-range">
                        <input
                          type="range"
                          :min="minValue"
                          :max="maxValue"
                          id="lower"
                          v-model="minPrice"
                        />
                        <input
                          type="range"
                          :min="minValue"
                          :max="maxValue"
                          id="upper"
                          v-model="maxPrice"
                          style="position: relative"
                        />
                        <span class="range-value min">$ {{ minPrice }}</span>
                        <span class="range-value max">$ {{ maxPrice }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
              <hr />
              <form class="form-check m-3 py-2">
                <h5 class="font-weight-bold m-0">Category</h5>
                <div class="ml-2" v-for="item in uniqueCategories" :key="item.id">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :name="item"
                    :id="item"
                    :value="item"
                    v-model="category"
                  />
                  <label class="form-check-label" :for="item" :value="item">{{ item }}</label>
                  <br />
                </div>
              </form>
              <hr />
              <form class="form-check m-3 py-2">
                <h5 class="font-weight-bold m-0">Capacity</h5>
                <div class="ml-2" v-for="item in uniqueCapacity" :key="item.id">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :name="item"
                    :id="item"
                    :value="item"
                    v-model="capacity"
                  />
                  <label class="form-check-label" :for="item" :value="item">{{ item }}</label>
                  <br />
                </div>
              </form>
              <hr />
              <form class="form-check m-3 py-2">
                <h5 class="font-weight-bold m-0">Size</h5>
                <div class="ml-2" v-for="item in uniqueSize" :key="item.id">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :name="item"
                    :id="item"
                    :value="item"
                    v-model="size"
                  />
                  <label class="form-check-label" :for="item" :value="item">{{ item }}</label>
                  <br />
                </div>
              </form>
              <hr />
              <form class="form m-3 py-3" onSubmit="return false;">
                <h5 class="font-weight-bold ml-2">Search</h5>
                <div class="form-inline">
                  <input
                    type="text"
                    v-model="search"
                    class="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    style="overflow: hidden"
                  />
                  <div class="input-group-prepend">
                    <button
                      type="button"
                      @click="searchit"
                      class="btn btn-outline-primary my-2 my-sm-0"
                    >
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <form class="form m-3">
                <h5 class="font-weight-bold ml-2">Compare List</h5>
                <div
                  class="my-2 ml-2"
                >You have {{ this.$store.state.compareItems.length }} item(s) to compare.</div>
                <button
                  :disabled="(this.$store.state.compareItems.length == 0)"
                  type="button"
                  class="btn btn-block btn-dark my-3"
                  data-toggle="modal"
                  data-target="#compare"
                >Compare</button>
                <compare />
              </form>
            </div>
          </form>
        </div>
        <div class="col-md-9">
          <products-component :products.sync="products" @changed="changeProducts"></products-component>
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
      products: {},
      items: {},
      uniqueCategories: {},
      uniqueCapacity: {},
      uniqueSize: {},
      category: [],
      capacity: [],
      size: [],
      search: "",
      searchItem: false,
      min: 10,
      max: 210,
      minValue: 0,
      maxValue: 410,
      maxPrice: 410,
      minPrice: 0,
      orderType: ""
    };
  },
  methods: {
    loadProducts() {
      axios.get("api/products").then(({ data }) => {
        this.products = data.data;
        this.items = data.data;
        this.loadFilter(data.data);
      });
    },
    loadFilter(products) {
      this.uniqueCategories = [
        ...new Set(products.map(product => product.category))
      ];
      this.uniqueCapacity = [
        ...new Set(products.map(product => product.capacity))
      ];
      this.uniqueSize = [...new Set(products.map(product => product.size))];
      this.changeOrder();
    },
    removeFilters(e) {
      this.products = this.items;
      if (this.category.length > 0) {
        this.products = this.products.filter(
          product => product.category == this.category[0]
        );
      }
      if (this.capacity.length > 0) {
        this.products = this.products.filter(
          product => product.capacity == this.capacity[0]
        );
      }
      if (this.size.length > 0) {
        this.products = this.products.filter(
          product => product.size == this.size[0]
        );
      }
    },
    changeProducts(event) {
      this.orderType = event;
      this.changeOrder();
    },
    changeOrder() {
      if (this.orderType == "nameAsc") {
        return (this.products = this.products.sort((prev, curr) =>
          prev.name > curr.name ? 1 : -1
        ));
      }
      if (this.orderType == "nameDesc") {
        return (this.products = this.products.sort((prev, curr) =>
          prev.name > curr.name ? -1 : 1
        ));
      }
      if (this.orderType == "default") {
        return (this.products = this.products.sort((prev, curr) =>
          prev.created_at > curr.created_at ? -1 : 1
        ));
      }
      if (this.orderType == "priceAsc") {
        return (this.products = this.products.sort(
          (prev, curr) => prev.price - curr.price
        ));
      }
      if (this.orderType == "priceDesc") {
        return (this.products = this.products.sort(
          (prev, curr) => curr.price - prev.price
        ));
      }
    },
    searchit() {
      this.$store.commit("searchit", this.search);
    }
  },
  mounted() {
    var lowerSlider = document.querySelector("#lower");
    var upperSlider = document.querySelector("#upper");
    var lowerVal = parseInt(lowerSlider.value);
    var upperVal = parseInt(upperSlider.value);
    upperSlider.oninput = function() {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);
      if (upperVal < lowerVal + 4) {
        lowerSlider.value = upperVal - 4;
        if (lowerVal == lowerSlider.min) {
          upperSlider.value = 4;
        }
      }
    };
    lowerSlider.oninput = function() {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);
      if (lowerVal > upperVal - 4) {
        upperSlider.value = lowerVal + 4;
        if (upperVal == upperSlider.max) {
          lowerSlider.value = parseInt(upperSlider.max) - 4;
        }
      }
    };
  },
  watch: {
    maxPrice() {
      this.removeFilters();
      this.products = this.products.filter(
        product => product.price <= this.maxPrice
      );
      this.products = this.products.filter(
        product => product.price >= this.minPrice
      );
      this.loadFilter(this.products);
    },
    minPrice() {
      this.removeFilters();
      this.products = this.products.filter(
        product => product.price <= this.maxPrice
      );
      this.products = this.products.filter(
        product => product.price >= this.minPrice
      );
      this.loadFilter(this.products);
    },
    category() {
      if (this.category.length == 1) {
        this.products = this.products.filter(
          product => product.category == this.category[0]
        );
      } else {
        this.removeFilters();
      }
      this.loadFilter(this.products);
    },
    capacity() {
      if (this.capacity.length == 1) {
        this.products = this.products.filter(
          product => product.capacity == this.capacity[0]
        );
      } else {
        this.removeFilters();
      }
      this.loadFilter(this.products);
    },
    size() {
      if (this.size.length == 1) {
        this.products = this.products.filter(
          product => product.size == this.size[0]
        );
      } else {
        this.removeFilters();
      }
      this.loadFilter(this.products);
    }
  },
  created() {
    this.loadProducts();
    Fire.$on("searching", () => {
      let query = this.$store.state.search;
      axios
        .get("/api/search?q=" + query)
        .then(data => {
          this.products = data.data;
          this.items = data.data;
          this.searchItem = true;
          this.loadFilter(data.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>

<style lang="scss">
.range-value {
  position: absolute;
  top: -2rem;
}
.range-value.min {
  left: 0;
}
.range-value.max {
  right: 0;
}
.track-wrapper {
  background: #16222a;
  padding: 45px 0;
}
.track-text,
.track-container {
  text-align: center;
  margin: 0 auto;
}
input[type="range"] {
  position: relative;
  box-sizing: border-box;
  appearance: none;
  margin: 0;
  padding: 0 2px;
  /* Add some L/R padding to ensure box shadow of handle is shown */
  overflow: hidden;
  border: 0;
  border-radius: 1px;
  outline: none;
  background: linear-gradient(grey, grey) no-repeat center;
  /* Use a linear gradient to generate only the 2px height background */
  background-size: 100% 2px;
  pointer-events: none;
  width: 100%;
  &:active,
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    height: 15px;
    width: 15px;
    border-radius: 28px;
    background-color: #fff;
    position: relative;
    margin: 5px 0;
    /* Add some margin to ensure box shadow is shown */
    cursor: pointer;
    appearance: none;
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
    &::before {
      content: " ";
      display: block;
      position: absolute;
      top: 13px;
      left: 100%;
      width: 2000px;
      height: 2px;
    }
  }
}
.multi-range {
  position: relative !important;
  top: 35px;
  input[type="range"] {
    position: absolute;
    &:nth-child(1) {
      &::-webkit-slider-thumb::before {
        background-color: purple;
      }
    }
    &:nth-child(2) {
      background: none;
      &::-webkit-slider-thumb::before {
        background-color: grey;
      }
    }
  }
}
</style>