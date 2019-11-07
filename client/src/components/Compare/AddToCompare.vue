<template>
    <div class="add-to-compare">
   
        <button class="btn bcustom-secondary" @click="addToCompare"><i class="fas fa-signal" /></button>
    
  </div>
</template>

<script>
export default {
  name: "add-to-compare",
      props: {
        p_product: {}
      },
  data(){
    return {
      item: this.p_product,
    }
  },
  methods:{
    addToCompare() {
      if(this.$store.state.compare.length < 10) {
        $('#list').modal('show');
        this.$store.commit('addToCompare', this.item)
      }
    },
  },
};
</script>


<style>

</style>