import xr from "xr"

const API = {
  sources: {
    list: function(){
      return xr.get("/api/sources")
    },
    get: function(id){
      return xr.get("/api/sources/" + id)
    }
  }
};

export default API;
