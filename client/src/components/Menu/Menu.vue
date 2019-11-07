<template>
  <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
    <div class="nav-menu bwhite text-center py-2" style="height: 50px!important;">
      <a href="#" id="show-sidebar" class="btn btn-sm btn-dark float-left mx-3" @click="closeMenu">
        <i class="fas fa-bars"></i>
      </a>
      <div class="navbar-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </div>
    </div>
    <nav id="sidebar" class="sidebar-wrapper">
      <div class="sidebar-content">
        <!-- sidebar-brand  -->
        <div class="sidebar-item sidebar-brand">
          <a href="#">pro sidebar</a>
          <div id="close-sidebar" @click="closeMenu">
            <div class="fas fa-times"></div>
          </div>
        </div>
        <!-- sidebar-header  -->
        <div class="sidebar-item sidebar-header d-flex flex-nowrap">
          <div class="user-pic">
            <img src="../../assets/img/profile/profile.png" class="img-responsive img-rounded" alt="User picture" />
          </div>
          <div class="user-info">
            <span class="user-name">
              <div class="text-capitalize">{{ first_name }}</div>
            </span>
            <span class="user-role text-capitalize">{{type}}</span>
            <span class="user-status">
              <i class="fa fa-circle"></i>
              <span>Online</span>
            </span>
          </div>
        </div>
        <!-- sidebar-menu  -->
        <div class="sidebar-item sidebar-menu">
          <ul>
            <li class="header-menu" v-if="type == 'admin'">
              <span>General</span>
            </li>
            <li class="sidebar-dropdown">
              <a href="#" v-if="type == 'admin'">
                <i class="fa fa-tachometer-alt"></i>
                <span class="menu-text">Dashboard</span>
              </a>
              <div class="sidebar-submenu">
                <ul>
                  <li>
                    <router-link to="/users">
                      <i class="fas fa-user"></i>
                      <span class="menu-text">Users</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/product">
                      <i class="fa fa-shopping-cart"></i>
                      <span class="menu-text">Products</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/categories">
                      <i class="fas fa-project-diagram"></i>
                      <span class="menu-text">Categories</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/reservations">
                      <i class="fa fa-book"></i>
                      <span class="menu-text">Reservations</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul>
            <li class="header-menu">
              <span>Extra</span>
            </li>
            <li>
              <router-link to="/profile">
                <i class="fa fa-cogs"></i>
                <span class="menu-text">Settings</span>
              </router-link>
            </li>
            <li>
              <router-link to="/userboard">
                <i class="fa fa-envelope"></i>
                <span class="menu-text">My Reservations</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- sidebar-menu  -->
      </div>
      <!-- sidebar-footer  -->
      <div class="sidebar-footer">
        <div>
          <a href="#" @click="logout">
            <i class="fa fa-power-off"></i> Logout
          </a>
        </div>
        <div class="pinned-footer">
          <a href="#">
            <i class="fas fa-ellipsis-h"></i>
          </a>
        </div>
      </div>
    </nav>
    <div class="page-content">
      <router-view />
    </div>
  </div>
  <!-- page-wrapper -->
</template>

<script>
import jwtDecode from "jwt-decode";
export default {
  components: {},
  data() {
    const token = localStorage.usertoken;
    const decoded = jwtDecode(token);
    return {
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      type: decoded.type
    };
  },
  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      localStorage.removeItem("usertoken");
      this.$router.go();
    }
  },

  mounted() {
    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }

    });
  },

  created() {
  }
};
</script>