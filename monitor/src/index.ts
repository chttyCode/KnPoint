import trackerInit from "./monitor";
trackerInit();
console.log("init");

new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({ code: 404 });
  }, 1000);
});
