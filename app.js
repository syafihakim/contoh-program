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

// VIDEO MODAL SCRIPT
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('videoModal');
const popup = document.getElementById("videoPopup");
const video = document.getElementById("popupVideo");

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    video.pause();         // pause video
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });


// SHOWCASE SLIDER
const container = document.getElementById("demoContainer");
const slides = container.children;
const slideWidth = slides[0].offsetWidth + 16; // adjust if you use margin
let currentIndex = 0;

// Function to scroll to a slide
function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  container.scrollTo({
    left: currentIndex * slideWidth,
    behavior: "smooth",
  });
}

// Handle wheel scroll (desktop)
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (e.deltaY > 0 || e.deltaX > 0) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(currentIndex - 1);
  }
}, { passive: false });

// Handle swipe gesture (mobile)
let startX = 0;
container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) { // swipe threshold
    if (diffX > 0) {
      goToSlide(currentIndex + 1); // swipe left → next
    } else {
      goToSlide(currentIndex - 1); // swipe right → prev
    }
  } else {
    goToSlide(currentIndex); // snap back if swipe too small
  }
});

document.getElementById("theCode").textContent = `

// SCROLL CODE NI UNTUK LIHAT
// KIRI KANAN
// ATAS BAWAH

#include <iostream>
using namespace std;

int main() {
    int adults, children, luggageKg;

    cout << "---------------" << endl;
    cout << "Cloud9 AirLine" << endl;
    cout << "---------------" << endl << endl;
    cout << "Let's fly to your next vacation!" << endl << endl;

    cout << "Ticket Price:" << endl;
    cout << "Adults - 55/person" << endl;
    cout << "Children - 35/person" << endl << endl;

    cout << "Enter number of adults : ";
    cin >> adults;
    cout << "Enter number of children : ";
    cin >> children;

    cout << endl << "Luggage Prices:" << endl;
    cout << "RM2 per KG" << endl << endl;

    cout << "Enter total weight (KG) : ";
    cin >> luggageKg;

    // Calculations
    int adultTotal = adults * 55;
    int childTotal = children * 35;
    int luggageTotal = luggageKg * 2;
    int total = adultTotal + childTotal + luggageTotal;

    // Output
    cout << endl << "=================" << endl;
    cout << " Your Order Total" << endl;
    cout << "=================" << endl << endl;

    cout << adults << "x Adult : RM " << adultTotal << endl;
    cout << children << "x Child : RM " << childTotal << endl;
    cout << "Luggage : RM " << luggageTotal << endl << endl;

    cout << "Total : RM " << total << endl;

    cout << "-----------------------" << endl;
    cout << "Total After Tax : RM " << total*1.06 << endl;
    cout << "-----------------------" << endl;

    return 0;
}

`

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