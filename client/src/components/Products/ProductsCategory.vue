<template>
  <div class="row my-4">
    <div class="col-12">
      <carousel
        :perPageCustom="[[0,1],[768,2],[1200,4]]"
        :autoplay="false"
        :loop="true"
        :paginationEnabled="false"
        :navigation-enabled="true"
        :min-swipe-distance="1"
        :navigation-next-label="navigationNext"
        :navigation-prev-label="navigationPrev"
      >
        <slide class="slide col-lg-3" v-for="product in items" :key="product.id">
          <div class="card">
            <router-link
              :to="{ name: 'details', 
                    params: { p_name: product.name, p_id: product.id }}"
              class="text-center"
            >
              <img
                :src="'/img/products/' + product.image"
                class="card-img-top"
                alt="..."
                width="250px"
                height="auto"
              />
            </router-link>
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <router-link
                  :to="{ name: 'details', 
                    params: { p_name: product.name, p_id: product.id }}"
                  class="text-left black card-name"
                >
                  {{ product.name.substring(0,35) }}
                  <span v-if="(product.name).length > 35">...</span>
                </router-link>
                <div
                  class="card-price ml-1 lightblue font-weight-bold"
                >{{ product.price | currency }}</div>
              </div>
              <div class="card-description my-3 mb-4" v-html="product.description.substring(0,100)">
                <span v-if="(product.description).length > 100">
                  ...
                  <router-link
                    :to="{ name: 'details', 
                    params: { p_name: product.name, p_id: product.id }}"
                    class="text-left black card-name"
                  >See more</router-link>
                </span>
              </div>
            </div>
            <div class="d-block mt-2 mb-4 text-center">
              <add-to-cart :p_product="product" />
              <router-link
                :to="{ name: 'details', 
                    params: { p_name: product.name, p_id: product.id }}"
                class="btn bcustom-secondary"
              >
                <span>
                  <i class="fa fa-search icon"></i>
                </span>
              </router-link>
              <add-to-compare :p_product="product" />
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["category"],
  data() {
    return {
      items: {},
      slickOptions: {
        slidesToShow: 1
        // Any other options that can be got from plugin documentation
      },
      form: new Form({
        id: "",
        name: ""
      })
    };
  },
  computed: {
    navigationNext: function() {
      return `<i class="fas fa-chevron-right"></i>`;
    },
    navigationPrev: function() {
      return `<i class="fas fa-chevron-left"></i>`;
    }
  },
  methods: {
    loadProducts() {
      axios
        .get("/api/detail/category?q=" + this.category)
        .then(({ data }) => (this.items = data))
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>

<style>
</style>