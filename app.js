// const banner = document.getElementById("banner");
// const bannerContent = document.getElementById("top-banner");
// const topBanner = document.getElementById("top-banner");
// const videoSection = document.getElementById("video-section");
// let bannerHeight = 0;

// window.addEventListener("scroll", () => {
//   console.log(bannerHeight);
//   const videoTop = videoSection.getBoundingClientRect().top + window.scrollY;
//   const scrollY = window.scrollY;

//   if (scrollY + bannerHeight >= videoTop - bannerHeight) {
//     // Minimize banner
//     banner.classList.add("py-1");
//     banner.classList.remove("py-3");
//     document.getElementById("top-banner").style.display = "none";
//   } else {
//     // Restore
//     banner.classList.add("py-3");
//     banner.classList.remove("py-1");
//     document.getElementById("top-banner").style.display = "";
//   }
// });


// function updateCountdown(targetDate) {

//   const now = new Date();
//   const diff = targetDate - now;

//   if (diff <= 0) {
//     document.getElementById("countdown").textContent = "00:00:00";
//     resetPrice();
//     clearInterval(timer);
//     return;
//   }

//   const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
//   const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
//   const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");

//   document.getElementById("countdown").textContent = `Tamat dalam ${hours}:${minutes}:${seconds}`;
// }

// function updateBannerHeight() {
//   const banner = document.getElementById("banner");
//   if (banner) {
//     document.documentElement.style.setProperty(
//       "--banner-height",
//       banner.offsetHeight + "px"
//     );
//     bannerHeight = banner.clientHeight;
//   }
// }

// // Run on load and when window resizes
// window.addEventListener("load", updateBannerHeight);
// window.addEventListener("resize", updateBannerHeight);

// 
const sheetId = "1o_PVByfyy3NNcHfUMK2obi1jquivOHr6PZjvouksqRk";
const apiKey = "AIzaSyBU8TMPP0ZUxS_979y6cYdNOU6SfdfBXYc";
const range = "Promos!A2:G10";
const promoCodeFromUrl = new URLSearchParams(window.location.search).get("promo");

fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    if (!data.values || !data.values[0]) throw new Error("No data found");

    let promoIdx = -1;

    const now = new Date();
    let validUntilFromDB = undefined;

    for(let i=0; i<10; i++) {

      if (!data.values[i]) break;

      const promoCodeFromDB = data.values[i][0];
      validUntilFromDB = new Date(data.values[i][1]);
      const diff = validUntilFromDB - now;

      if (promoCodeFromDB == promoCodeFromUrl && diff > 0) {
        promoIdx = i;
        break;
      }
    }

    const promoPrice = parseInt(data.values[promoIdx][2], 10);
    const promoName = data.values[promoIdx][3];
    const registerUrl = "https://syafihakim.github.io/cpp-level-1-site/";

    if (promoIdx != -1) {
      // document.getElementById("top-banner").innerHTML = `
      //   <span class="text-md font-semilight">
      //   ${promoName}</br>
      //   <span class="text-4xl font-bold">RM${promoPrice}</span>
      //   <span class="line-through text-gray-600 text-md">RM40</span>
      //   </span>`;

      // document.getElementById("countdown-container").classList.remove("hidden");
      document.querySelectorAll(".btn-daftar").forEach(el => {
        el.href = `${registerUrl}?promo=${promoCodeFromUrl}`;
      });


      updateCountdown(validUntilFromDB);
      timer = setInterval(() => updateCountdown(validUntilFromDB), 1000);

    } else {
      //document.getElementById("countdown-container").classList.add("hidden");
    }

  })
  .catch(error => {
    console.error("Error:", error);
    // document.getElementById("top-banner").textContent =
    //   "⚠️ Uh oh. Tak boleh load data";
  });