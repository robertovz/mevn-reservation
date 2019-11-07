<template>
  <div>
    <div class="row mb-2">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between sort-filter">
              <form class="input-group-prepend d-block text-left mx-3 my-2" autocomplete="off">
                <label class="mr-sm-2" for="inlineFormCustomSelect">Sort by:</label>
                <select
                  class="custom-select mr-sm-2"
                  id="orderType"
                  name="orderType"
                  v-model="orderType"
                  @change="itemsPage()"
                >
                  <option value="default" selected>Default</option>
                  <option value="nameAsc">Name: A-Z</option>
                  <option value="nameDesc">Name: Z-A</option>
                  <option value="priceAsc">Price: Lowest To Highest</option>
                  <option value="priceDesc">Price: Highest To Lowest</option>
                </select>
              </form>
              <form class="input-group-prepend d-block text-left mx-3 my-2">
                <label class="mr-sm-2" for="inlineFormCustomSelectQuantity">Show:</label>
                <select
                  class="custom-select mr-sm-2"
                  id="inlineFormCustomSelectQuantity"
                  @change="itemsPage()"
                >
                  <option value="10" selected>10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </form>
              <form class="input-group-prepend d-block mx-3 my-2">
                <div class="input-group prepend mx-2 mt-4">
                  <button
                    class="btn btn-dark btn-grid-list"
                    style="40px"
                    :disabled="grid"
                    @click="viewProduct"
                  >
                    <i class="fas fa-th"></i>
                  </button>
                  <button
                    class="btn btn-dark btn-grid-list ml-2"
                    style="40px"
                    :disabled="!grid"
                    @click="viewProduct"
                  >
                    <i class="fas fa-th"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-2 mb-3 ml-5 text-left">
            <span>Showing {{products.length}} results.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="products" id="products">
      <div class="row" v-if="grid">
        <div class="col-lg-4 col-md-6" v-for="product in products" :key="product.id">
          <div class="card product-grid">
            <router-link
              :to="{ name: 'Details', 
                    params: { p_product: product }}"
            >
              <img :src="'/img/products/' + product.image" class="card-img-top" alt="..." />
              <div class="card-price">
                {{ product.price | currency }}
                <div class="price-text">per night</div>
              </div>
              <div class="card-body">
                <div class="card-name white">{{ product.name }}</div>
              </div>
            </router-link>
            <add-to-compare :p_product="product" class="btn-compare"></add-to-compare>
            <miniList />
          </div>
        </div>
      </div>

      <div class="row" v-if="!grid">
        <div class="col-12" v-for="product in products" :key="product.id">
          <div class="card product-list">
            <div class="row">
              <div class="col-md-5">
                <router-link
                  :to="{ name: 'Details', 
                    params: { p_product: product }}"
                >
                  <img
                    :src="'/img/products/' + product.image"
                    class="card-img-top"
                    alt="..."
                    width="250px"
                  />
                </router-link>
              </div>
              <div class="col-md-4">
                <div class="card-body">
                  <router-link
                    :to="{ name: 'Details', 
                    params: { p_product: product }}"
                  >
                    <div class="text-center d-block text-muted font-weight-bold">{{ product.name }}</div>
                  </router-link>
                  <div class="card-price mt-3">
                    {{ product.price | currency }} / 
                    <span>per night</span>
                  </div>
                  <div v-html="product.description"></div>
                </div>
              </div>
              <div class="col-md-3 d-flex justify-content-center align-items-center">
                  <add-to-compare :p_product="product" class="py-3"></add-to-compare>
                  <miniList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "vue-date-pick";
export default {
  props: ["products"],
  components: { DatePick },
  data() {
    return {
      grid: true,
      form: new Form({
        id: "",
        user_id: "",
        name: "",
        email: "",
        date_and_time: "",
        message: ""
      }),
      orderType: ""
    };
  },
  methods: {
    viewProduct() {
      this.grid = !this.grid;
    },
    handleScroll() {
      if (window.innerWidth < 768) {
        this.grid = false;
        $(".btn-grid-list").css("display", "none");
      } else {
        $(".btn-grid-list").css("display", "block");
      }
    },
    itemsPage() {
      this.$emit("changed", this.orderType);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
.product-grid {
  .card-price {
    position: absolute;
    top: 0px;
    left: 0px;
    color: #fff;
    padding: 10px;
    border-radius: 0 0 10px 0;
    line-height: 1rem;
    background: rgba(0, 0, 0, 0.8);
    .price-text {
      font-size: 0.7rem;
      text-transform: capitalize;
    }
  }
  .card-body {
    background: rgb(67, 69, 70);
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 0.9rem;
  }
  .btn-compare {
    color: #fff;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 57%;
    right: 0;
    transform: translateX(30px);
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
}
.product-grid:hover > .btn-compare {
  transform: translateX(0px);
  opacity: 1;
}
@media only screen and(max-width: 768px) {
  .product-list {
    text-align: center;
  }
}
</style>