<template>
  <div>
    <Navbar />
    <div class="banner-slide">
      <carousel
        :perPage="1"
        :autoplay="true"
        :loop="true"
        :navigation-next-label="navigationNext"
        :navigation-prev-label="navigationPrev"
      >
        <slide class="slide slide-01">
          <div class="slide-wrapper">
            <div class="slide-title">
              Best place to
              <span class="blue">visit.</span>
              <div>
                Enjoy your
                <span class="blue">vacation.</span>
              </div>
            </div>
            <router-link to="/products" class="slide-text blue">
              Reserve now
              <i class="fas fa-angle-double-right"></i>
              <div class="text-underline"></div>
            </router-link>
          </div>
        </slide>
        <slide class="slide slide-02">
          <div class="slide-wrapper">
            <div class="slide-title">
              Best place to
              <span class="blue">visit.</span>
              <div>
                Enjoy your
                <span class="blue">vacation.</span>
              </div>
            </div>
            <router-link to="/products" class="slide-text blue">
              Reserve now
              <i class="fas fa-angle-double-right"></i>
              <div class="text-underline"></div>
            </router-link>
          </div>
        </slide>
        <slide class="slide slide-03">
          <div class="slide-wrapper">
            <div class="slide-title">
              Best place to
              <span class="blue">visit.</span>
              <div>
                Enjoy your
                <span class="blue">vacation.</span>
              </div>
            </div>
            <router-link to="/products" class="slide-text blue">
              Reserve now
              <i class="fas fa-angle-double-right"></i>
              <div class="text-underline"></div>
            </router-link>
          </div>
        </slide>
      </carousel>
    </div>

    <div class="services">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="services-wrapper">
              <div class="services-icon">
                <i class="fas fa-cocktail"></i>
              </div>
              <div class="services-title">Libero cumque incidunt blanditiis.</div>
              <div class="services-text">
                Minus eveniet id quisquam temporibus consequatur, doloremque delectus omnis placeat,
                aliquam ea rerum aspernatur unde harum maxime.
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="services-wrapper">
              <div class="services-icon">
                <i class="fas fa-hiking"></i>
              </div>
              <div class="services-title">Libero cumque incidunt blanditiis.</div>
              <div class="services-text">
                Minus eveniet id quisquam temporibus consequatur, doloremque delectus omnis placeat,
                aliquam ea rerum aspernatur unde harum maxime.
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="services-wrapper">
              <div class="services-icon">
                <i class="fas fa-award"></i>
              </div>
              <div class="services-title">Libero cumque incidunt blanditiis.</div>
              <div class="services-text">
                Minus eveniet id quisquam temporibus consequatur, doloremque delectus omnis placeat,
                aliquam ea rerum aspernatur unde harum maxime.
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="services-wrapper">
              <div class="services-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="services-title">Libero cumque incidunt blanditiis.</div>
              <div class="services-text">
                Minus eveniet id quisquam temporibus consequatur, doloremque delectus omnis placeat,
                aliquam ea rerum aspernatur unde harum maxime.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="divider my-5" />

    <div class="categories">
      <div class="container">
        <div class="text-primary text-center my-3">
          Categories
          <div class="category-underline"></div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="category-wrapper category-01">
              <div class="category-title">
                Single
                <div class="category-underline"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="category-wrapper category-02">
              <div class="category-title">
                Double
                <div class="category-underline"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="category-wrapper category-03">
              <div class="category-title">
                Triple
                <div class="category-underline"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="divider my-5" />

    <!-- <productsCategory :category="''" :text="'Featured'" /> -->

    <hr class="divider my-5" />

    <div class="hero-wrapper">
      <div class="d-block">
        <div class="hero-title">
          Officiis quae architecto eos blanditiis voluptate laudantium quia debitis soluta
          explicabo fuga.
        </div>
        <div class="hero-divider my-3"></div>
        <div class="hero-text">
          Aliquid hic nobis eum vel temporibus, autem culpa perspiciatis esse quo iste, mollitia error blanditiis
          perferendis, minima dolore eaque! Voluptates, rerum iusto.
        </div>
      </div>
    </div>

    <hr class="divider my-5" />

    <!-- <productsCategory :category="''" :text="'Double'" /> -->

    <hr class="divider my-5" />

    <!-- <productsCategory :category="''" :text="'Triple'" /> -->

    <miniList />
    <compare />

    <div class="reservation mb-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="reservation-wrapper">
              <div class="text-primary">Reservation</div>
              <h5 class="reservation-title">Book a room</h5>
              <div class="col-md-7 mx-auto">
                <div class="reservation-text my-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veritatis, nam numquam atque quasi est aut magnam magni optio quas maiores iusto sit perspiciatis,
                  tenetur amet eius dignissimos sint, pariatur earum!
                  Consequuntur sed ipsa esse facere maxime a illum doloremque voluptates.
                </div>
                <router-link to="/products" class="btn bcustom-primary">
                  Book now
                  <i class="fas fa-angle-double-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  computed: {
    navigationNext: function() {
      return `<h1><i class="fas fa-chevron-right blue"></i></h1>`;
    },
    navigationPrev: function() {
      return `<h1><i class="fas fa-chevron-left blue"></i></h1>`;
    }
  },
  methods: {
    createReservation() {
      this.form.user_id = this.form.id;
      this.form
        .post("api/reservations")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");
          toast.fire({
            type: "success",
            title: "Reservation request sent successfully.",
            text: "We will confirm to you shortly"
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.banner-slide .slide {
  height: 600px;
}
.slide-01 {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/img/banner/banner-02.jpg") no-repeat center center;
}
.slide-02 {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/img/banner/banner-03.jpg") no-repeat center center;
}
.slide-03 {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url("../assets/img/banner/banner-06.jpg") no-repeat center center;
}
.slide-01,
.slide-02,
.slide-03 {
  background-size: cover;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .VueCarousel-dot-container {
    margin-top: -100px !important;
    position: absolute !important;
  }
  .slide-wrapper {
    padding: 20px 50px;
    background: rgba(0, 0, 0, 0.7);
  }
  .slide-title {
    color: #fff;
    font-size: 2rem;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }
  .slide-text {
    font-size: 1.4rem;
    margin-top: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    width: 50%;
    .text-underline {
      line-height: 0;
      border: 2px solid #3490dc;
      width: 25%;
      transition: all 0.3s ease-in-out;
      i {
        font-size: 0.9rem;
        transition: all 0.3s ease-in-out;
      }
    }
    &:hover > .text-underline {
      width: 40%;
    }
    &:hover > i {
      font-size: 1.5rem;
    }
  }
}
@media only screen and(max-width: 991px) {
  .banner-slide .slide {
    height: 450px;
    margin-top: 70px;
  }
  .banner-slide .slide-01 {
    .slide-title {
      font-size: 1.5rem;
    }
    .slide-text {
      font-size: 1.2rem;
      width: 60%;
    }
  }
}
@media only screen and(max-width: 768px) {
  .banner-slide .slide {
    height: 250px;
    margin-top: 70px;
  }
  .banner-slide .slide-01 {
    .slide-title {
      background: rgba(0, 0, 0, 0.5);
      color: #fff !important;
      font-size: 1.2rem;
      padding: 2px 0.5px;
      padding: 1rem 1.5rem;
    }
    .slide-text {
      font-size: 0.9rem;
      width: 60%;
      margin: 0 auto;
      margin-top: 5px;
    }
  }
}
// End Of Banners
// Services
.services-wrapper {
  text-align: center;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-top: 25px;
  .services-icon {
    font-size: 1.5rem;
    margin-top: -27px;
    transform: rotateZ(45deg) !important;
    border-radius: 5px;
    background: #3490dc;
    position: absolute;
    left: 40%;
    i {
      height: 55px;
      width: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      transform: rotateZ(-45deg) !important;
    }
  }
  .services-title {
    font-size: 1rem;
    padding: 2rem 1rem 0rem 1rem;
  }
  .services-text {
    font-size: 0.9rem;
    padding: 1rem 1rem 5rem 1rem;
  }
}
// End Of Services
// Category
.category-wrapper.category-01 {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/img/banner/banner01.jpeg") center/cover no-repeat;
}
.category-wrapper.category-02 {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/img/banner/banner02.jpeg") center/cover no-repeat;
}
.category-wrapper.category-03 {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/img//banner/banner03.jpeg") no-repeat center center;
  background-size: cover;
}
@media only screen and(max-width: 768px) {
  .category-wrapper {
    height: 290px !important;
  }
}
.category-wrapper {
  height: 225px;
  margin-top: 25px;
  text-align: center;
  .category-underline {
    line-height: 0;
    border: 1px solid #fff;
    width: 15%;
    margin: 0 auto;
  }
  img {
    height: 220px;
    width: auto;
  }
  .category-title {
    color: #fff;
    margin-top: 10px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: left;
    font-size: 1rem;
    background: rgba(108, 178, 235, 0.7);
    text-align: center;
    padding: 2px;
    transition: all 0.5s ease-in-out;
  }
}
// End Of Category
// Hero
.hero-wrapper {
  height: 270px;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("../assets/img/banner/banner-01.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-attachment: fixed;
  color: #fff !important;
  .hero-title {
    font-size: 20px;
    display: block;
    padding: 0px 30px;
    line-height: 1.7rem;
    font-weight: bold;
    width: 70%;
    margin: 0 auto;
  }
  .hero-text {
    font-size: 16px;
    padding: 0px 30px;
  }
  .hero-divider {
    border: 2px solid #fff;
    width: 10%;
    margin: 0 auto;
  }
}
@media only screen and(max-width: 768px) {
  .hero-title {
    width: 100% !important;
    font-size: 16px !important;
  }
  .hero-text {
    font-size: 14px !important;
  }
}
// End Of Hero
.divider {
  width: 90%;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(
    left,
    #f0f0f0,
    #8c8b8b,
    #f0f0f0
  ) !important;
  margin: 0 auto;
}
// Reservation
.reservation {
  .reservation-wrapper {
    background: #fff;
    padding: 20px 40px;
    text-align: center;
  }
  .reservation-title {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
  .reservation-text {
    font-size: 15px;
  }
}
@media only screen and(max-width: 768px) {
  .reservation {
    .reservation-wrapper,
    .reservation-title {
      text-align: left !important;
    }
    .text-primary,
    .reservation-title {
      margin-left: 20px !important;
    }
  }
}
// End Of Reservation
// About
.about {
  margin-bottom: 50px;
  .about-wrapper {
    margin-top: 20px;
    padding: 20px 40px;
    background: #fff !important;
    height: 300px;
    .about-text {
      font-size: 15px;
    }
  }
}
</style>