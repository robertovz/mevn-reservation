<template>
  <div
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    id="list"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content modal-list">
        <div class="modal-header">
          <h4>Items to Compare</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <carousel :perPageCustom="[[0,1],[780,2],[1200,4]]" :autoplay="false" :paginationEnabled="false" :navigation-enabled="true"
          :min-swipe-distance="1" :navigation-next-label="navigationNext" :navigation-prev-label="navigationPrev">
            <slide class="slide p-2 modal-list_slide" v-for="item in this.$store.state.compare" :key="item.id">
              <div class="card">
              <img :src="'img/products/' + item.image" class="card-img-top" alt="..." width="250px">
                <div class="card-body">
                  <button
                    @click="$store.commit('removeFromCompare', item)"
                    class="btn btn-primary-outline d-block text-right"
                  >
                    <i class="fas fa-trash red"></i>
                  </button>
                  <div style="height: 75px;">{{ item.name.substring(0,45) }}
                    <span v-if="(item.name).length > 45">...</span></div>
                  <div>{{ item.price | currency }}</div>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
        <div class="modal-footer">
          <button
            :disabled="(this.$store.state.compare.length == 0)"
            data-dismiss="modal" aria-label="Close"
            class="btn btn-dark"
            style="width: 20%"
            data-toggle="modal"
            data-target="#compare"
          >Compare</button>
          <button class="btn btn-primary" style="width: 20%" data-dismiss="modal" aria-label="Close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
    navigationNext: function() { return `<i class="fas fa-chevron-right"></i>` },
    navigationPrev: function() { return `<i class="fas fa-chevron-left"></i>` },
  },
  created() {
  }
};
</script>

<style>
.modal-list_slide {
  visibility: visible;
  flex-basis: 25%;
  width: 25%;
}
@media only screen and (max-width: 1200px) {

  .modal-list_slide {
    visibility: visible;
    flex-basis: 50%;
    width: 50%;
  }
  .modal-list .modal-footer .btn {
    width: 30%!important;
  }

}
@media only screen and (max-width: 400px) {

  .modal-list_slide {
    visibility: visible;
    flex-basis: 100%;
    width: 100%;
  }

}
.modal-content.modal-list {
  background: rgba(255, 255, 255, 0.9);
}
</style>
