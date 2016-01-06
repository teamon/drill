import xr from "xr"

const API = {
  sources: {
    list: () => xr.get("/api/sources"),
    get: (id) => xr.get("/api/sources/" + id)
  }
};

export default API;
