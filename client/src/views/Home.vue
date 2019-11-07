<template>
  <div class>
    <Navbar />
    <carousel :per-page="1" class="carousel-banner">
      <slide class="slide-01">
        <div class="img-container"></div>
        <div class="text-slide"></div>
      </slide>
    </carousel>

    <hr class="style-divider" />


    <Footer />
  </div>
</template>

<script>
</script>

<style lang="scss">
.slide-01,
.slide-02,
.slide-03 {
  height: calc(100vh - 66px);
  display: inline-block;
  color: var(--mainWhite);
  text-align: center;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-slide {
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    padding: 2rem 3rem;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 1.75rem;
  }
}

.slide-01 {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url("../assets/img/banner/banner01.jpg") center/cover no-repeat;
}

@media screen and (max-width: 768px) {
  .slide-01,
  .slide-02,
  .slide-03 {
    height: calc(60vh - 40px) !important;
  }
  .text-slide {
    font-size: 1.5rem;
    padding: 1.5rem 2.5rem;
  }
}

@media screen and (max-width: 991px) {
  .slide-01,
  .slide-02,
  .slide-03 {
    height: calc(80vh - 50px);
  }
  .text-slide {
    font-size: 1rem;
    padding: 1rem 2rem;
  }
}
.img-container {
  position: relative;
}
.img-container img {
  width: 100%;
  display: block;
  transition: var(--mainTransition);
}


//End of services section

//Divider

.style-divider {
  width: 80%;
  padding: 5px 0;
  border: none;
  border-top: 1px solid #a0a4bd;
  color: #a0a4bd;
  text-align: center;
}

.style-divider:after {
  content: "§";
  display: inline-block;
  position: relative;
  top: -1em;
  font-size: 1.5em;
  padding: 0 0.25em;
  background: #f2f2f2;
}

//End of divider

</style>