
<template>
  <div class="mx-auto mt-3 mb-6 text-center" >
      <v-progress-circular
        :indeterminate="isLoading"
        :size="100"
        color="success"
        class="circle"
      ></v-progress-circular>
      <br><br>
    <h2>LOADING.....</h2>
  </div>
</template>

<script>

  export default {
    name: 'HelloWorld',
    data () {
      return {
        isLoading:true,
      }
    },
    mounted(){
        setTimeout(()=>{
           this.$router.push("/")
        }, 2500)
        
     // this.interval = setInterval(() => {
       // this.createIncrease()
      //}, 100)
    },
   /* methods:{
      createIncrease(){
        if(this.value <= 100) this.value++;
        else this.value = 0;
      }
    }*/
  }

</script>
<style scoped>
.circle{
    margin-top: 200px;
  color: rgb(49, 165, 126);
}
h2{
  color: rgb(225, 11, 11);
}
</style>

