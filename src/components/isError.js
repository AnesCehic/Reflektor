export function isError(err) {
  if(err.response.status == 403 && localStorage.getItem("admin") === "true") {
    localStorage.clear();
    window.location.reload()
  }
}