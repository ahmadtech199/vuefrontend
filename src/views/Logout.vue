<template>
  
</template>

<script>
export default {
data(){
    return{
        email:null,
        password:null
    }
},
 created() {
      console.log("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Bus.$emit('logout');
      this.token = null;
      this.$router.push("/login");
    }
}
</script>

<style>

</style>