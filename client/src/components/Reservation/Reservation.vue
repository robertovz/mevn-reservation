<template>
  <div>
    <button class="btn bcustom-primary" @click="openModal">Book this</button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="reservation"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header modal-custom-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">Book this room</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <form class="form-group">
                  <label for="inputName" class="col-sm-10 control-label">Name</label>
                  <div class="col-sm-12">
                    <input
                      type="text"
                      class="form-control"
                      id="inputName"
                      placeholder="Enter Name"
                      v-model="form.user_name"
                      :class="{ 'is-invalid': form.errors.has('user_name') }"
                    />
                    <has-error :form="form" field="name"></has-error>
                  </div>
                </form>
              </div>
              <div class="col-md-6">
                <form class="form-group">
                  <label for="inputEmail" class="col-sm-10 control-label">Email</label>
                  <div class="col-sm-12">
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      placeholder="Enter Email"
                      v-model="form.user_email"
                      :class="{ 'is-invalid': form.errors.has('user_email') }"
                    />
                    <has-error :form="form" field="email"></has-error>
                  </div>
                </form>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <form class="form-group">
                  <label for="inputCheckIn" class="col-sm-10 control-label">Dates</label>

                  <div class="col-sm-12">
                    <HotelDatePicker
                      @check-in-changed="setCheckIn"
                      @check-out-changed="setCheckOut"
                      :class="{ 'is-invalid': form.errors.has('check_out') }"
                      :disabledDates="disabledDates"
                      :key="disabledDates.length"
                    />
                    <has-error :form="form" field="check_out"></has-error>
                  </div>
                </form>
              </div>
              <div class="col-md-6">
                <form class="form-group">
                  <label for="inputCheckOut" class="col-sm-10 control-label">Total Price</label>

                  <div class="col-sm-12">
                    <div class="form-control" aria-readonly="true">{{ form.price | currency}}</div>
                  </div>
                </form>
              </div>
            </div>
            <form class="form-group">
              <label for="inputMessage" class="col-sm-10 control-label">Message</label>
              <div class="col-sm-12">
                <textarea
                  type="text"
                  class="form-control"
                  id="inputMessage"
                  placeholder="Enter a message"
                  v-model="form.message"
                  :class="{ 'is-invalid': form.errors.has('message') }"
                  style="height: 150px;"
                />
                <has-error :form="form" field="message"></has-error>
              </div>
            </form>
            <form class="form-group">
              <div class="col-sm-offset-2 col-sm-12">
                <button
                  type="submit"
                  class="btn bcustom-primary"
                  @click.prevent="createReservation"
                >Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotelDatePicker from "vue-hotel-datepicker";
export default {
  components: {
    HotelDatePicker
  },
  props: {
    pId: 0,
    pPrice: 0
  },
  data() {
    return {
      products: {},
      grid: true,
      form: new Form({
        product_id: "",
        id: "",
        user_id: "",
        user_name: "",
        user_email: "",
        check_in: "",
        check_out: "",
        price: "",
        message: ""
      }),
      orders: {},
      disabledDates: []
    };
  },
  methods: {
    getDates() {
      axios
        .get(`api/products/${this.pId}/reservations`)
        .then(({ data }) => {
          let currentDate = new Date();
          for (let i = 0; i < data.data.length; i++) {
            var checkIn = new Date(data.data[i].check_in);
            var checkOut = new Date(data.data[i].check_out);
            if (currentDate < checkOut && data.data[i].status == 1) {
              let startDate = new Date(
                checkIn.getFullYear(),
                checkIn.getMonth(),
                checkIn.getDate()
              );
              let endDate = new Date(
                checkOut.getFullYear(),
                checkOut.getMonth(),
                checkOut.getDate()
              );
              while (startDate <= endDate) {
                this.disabledDates.push(startDate);
                startDate = new Date(
                  startDate.getFullYear(),
                  startDate.getMonth(),
                  startDate.getDate() + 1
                );
              }
            }
          }
        });
    },
    createReservation() {
      this.form.product_id = this.pId;
      this.form.user_id = this.$gate.userId();
      this.form
        .post("api/reservations")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#reservation").modal("hide");
          toast.fire({
            type: "success",
            title: "Reservation request sent successfully.",
            text: "We will confirm to you shortly"
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    },
    openModal() {
      if (this.$gate.userId() == null) {
        window.location.href = "/login";
      } else {
        $("#reservation").modal("show");
      }
    },
    setCheckIn(date) {
      this.form.check_in = date;
    },
    setCheckOut(date) {
      const duration = date - this.form.check_in;
      const day = 1000 * 60 * 60 * 24;
      const days = Math.floor(duration / day);
      const result = this.pPrice * days;
      if (result > 0) {
        this.form.price = result;
      } else {
        this.form.price = 0;
      }
      this.form.check_out = date;
    }
  },
  created() {
    if (this.$gate.userId() !== null) {
      axios.get("api/profile").then(({ data }) => this.form.fill(data));
    }
    this.getDates();
  }
};
</script>