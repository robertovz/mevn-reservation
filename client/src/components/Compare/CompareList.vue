<template>
  <!-- Modal -->
  <div
    class="modal fade bd-example-modal-xl"
    tabindex="-1"
    role="dialog"
    id="compare"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content modal-compare">
        <div class="modal-header">
          <h2 class="text-muted p-1 mt-2">Compare List</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card compare-card">
            <div class="card-body table-responsive p-0">
              <table class="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td class="font-weight-bold text-left" style="margin-top: 50%">Product</td>
                    <td v-for="item in this.$store.state.compare" :key="item.id">
                      <router-link
                        :to="{ name: 'details', 
                    params: { p_product: item, p_id: item.id }}"
                        class="text-center d-block" data-dismiss="modal" aria-label="Close"
                      >
                        <img
                          :src="'img/products/' + item.image"
                          class="card-img-top"
                          alt="..."
                          style="width: 250px; margin: 0 auto"
                        />
                      </router-link>
                      <button
                        @click="$store.commit('removeFromCompare', item)"
                        class="btn btn-primary-outline d-block text-right"
                      >
                        <i class="fas fa-trash red"></i>
                      </button>
                      <router-link
                        :to="{ name: 'details', 
                    params: { p_product: item, p_id: item.id }}"
                        class="text-center black d-block" data-dismiss="modal" aria-label="Close"
                      >
                      {{ item.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Price</td>
                    <td
                      v-for="item in this.$store.state.compare"
                      :key="item.id"
                      class="green"
                    >{{ item.price | currency }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Description</td>
                    <td
                      v-for="item in  this.$store.state.compare"
                      :key="item.id"
                      v-html="item.description"
                    ></td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Category</td>
                    <td
                      v-for="item in  this.$store.state.compare"
                      :key="item.id"
                      class="text-capitalize"
                    >{{ item.category }} Bike</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Color</td>
                    <td
                      v-for="item in  this.$store.state.compare"
                      :key="item.id"
                      class="text-capitalize"
                    >{{ item.color }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Speed</td>
                    <td v-for="item in  this.$store.state.compare" :key="item.id">{{ item.speed }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Wheel Size</td>
                    <td
                      v-for="item in  this.$store.state.compare"
                      :key="item.id"
                    >{{ item.wheel_size }} Inch</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Wheel Spec</td>
                    <td
                      v-for="item in  this.$store.state.compare"
                      :key="item.id"
                      class="text-capitalize"
                    >{{ item.wheel_spec }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold text-left">Availability</td>
                    <td v-for="item in this.$store.state.compare" :key="item.id">
                      <p class="green" v-if="item.amount > 0">In Stock</p>
                      <p class="red" v-if="item.amount == 0">Out of Stock</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal -->
</template>

<script>
export default {
  props: ["modals"],
  data() {
    return {};
  },
  methods: {
    openCompare() {
      Fire.$emit("quantity");
      if (this.$store.state.compare.length === 0) {
        $("compare").modal("hide");
      }
    }
  },
  created() {
    Fire.$on("quantity", () => {
      this.openCompare();
    });
  }
};
</script>

<style>
.compare-card {
  max-height: 470px;
  overflow-y: auto;
  text-align: center;
}
.modal-compare td {
  min-width: 200px;
}
</style>