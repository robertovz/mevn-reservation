    <template>
    <div class="container">
        <div class="row my-5 text-center">
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
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Delivery Address</th>
                        <th>Registered_at</th>
                        <th>is Delivered?</th>
                    </tr>
                    <tr v-for="(order,index) in orders" :key="index">
                        <td>{{order.id}}</td>
                        <td>{{order.product.name}}</td>
                        <td>{{order.product.price | currency}}</td>
                        <td>{{order.amount}}</td>
                        <td>{{order.total | currency}}</td>
                        <td>{{order.address}}</td>
                        <td>{{order.created_at | myDate}}</td>
                        <td>{{order.is_delivered == 1? "Yes" : "No"}}</td>
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
                orders: [],
            }
        },
        methods: {
            loadOrders() {
                axios.get(`api/users/${this.$gate.userId()}/orders`)
                    .then(response => this.orders = response.data)
            }
        },
        created() {
            this.loadOrders();
        }
        
    }
</script>