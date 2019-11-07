    <template>
  <div class="container">
    <div class="row my-5 text-center" v-if="$gate.isAdmin()">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header menu-header">
            <h3 class="card-title">Orders Table</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>User_ID</th>
                  <th>Product_ID</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Delivery Address</th>
                  <th>Registered_at</th>
                  <th>is Delivered?</th>
                  <th>Action</th>
                  <th>Modify</th>
                </tr>
                <tr v-for="(order,index) in orders" :key="index">
                  <td>{{order.id}}</td>
                  <td>{{order.user_id}}</td>
                  <td>{{order.product_id}}</td>
                  <td>{{order.amount}}</td>
                  <td>{{order.total | currency}}</td>
                  <td>{{order.address}}</td>
                  <td>{{order.created_at | myDate}}</td>
                  <td>{{order.is_delivered == 1? "Yes" : "No"}}</td>
                  <td>
                    <button
                      class="btn btn-success"
                      @click="deliver(index)"
                      v-if="order.is_delivered == 0"
                    >Deliver</button>
                  </td>
                  <td>
                    <a href="#" @click="deleteOrder(order.id)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: {}
    };
  },
  methods: {
    loadOrders() {
      axios.get("api/orders").then(({ data }) => (this.orders = data.data));
    },
    deliver(index) {
      let order = this.orders[index];
      axios.post(`/api/orders/${order.id}/deliver`).then(response => {
        this.orders[index].is_delivered = 1;
        Fire.$on("AfterCreate");
      });
    },
    deleteOrder(id) {
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
            axios
              .delete("/api/orders/" + id)
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$on("AfterCreate");
              })
              .catch(() => {
                swal.fire("Failed", "There was something wrong.", "warning");
              });
          }
        });
    }
  },
  created() {
    this.loadOrders();
    Fire.$on("AfterCreate", () => {
      this.loadOrders();
    });
  }
};
</script>