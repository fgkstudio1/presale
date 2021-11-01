window.onload=function(){
 function querySt(ji) {
   const hu = window.location.search.substring(1);
   const gy = hu.split("&");

   for (let i=0; i<gy.length; i++) {
    const ft = gy[i].split("=");

    if (ft[0] == ji) {
     return ft[1];
    }
   }
 }

 const ref = querySt("ref");

 if (ref!=null){
  document.getElementById('airinput').value = ref;
 }
}