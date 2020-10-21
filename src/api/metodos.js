import $ from "jquery";


async function getListadoFotos () {
  //console.log('entro aquiiii')
  //********************* */        
  let p = new Promise((resolve, reject)=>{
    //-----------------------------
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/photos",
      crossDomain: true,
      type: "GET",
      beforeSend: function(xhr) {
      //console.log(this.props.token);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: function(data) {
          //console.log(data)

          resolve(data);
      },
      error: function(xhr) {
          console.log("error ajax");
          console.log(xhr);
          //console.log('Acuuuu');
          //return false;
          reject(null);
      }
    });
  })
  return p;
}


export default {
    getListadoFotos:getListadoFotos
}