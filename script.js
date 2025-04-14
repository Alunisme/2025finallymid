document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const aboutModal = document.getElementById("about-modal");
  const iframe = document.getElementById("modal-iframe");
  const closeButtons = document.querySelectorAll(".close-button");
  const quizTrigger = document.getElementById("quiz-trigger");
  const aboutTrigger = document.getElementById("about-trigger");
  const triggers = document.querySelectorAll(".modal-trigger");
  const menuContainer = document.querySelector(".menu-container");

  // 點擊子選項時顯示彈出視窗
  triggers.forEach(trigger => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault(); // 防止預設行為
      const url = this.getAttribute("data-url"); // 取得連結 URL
      iframe.src = url; // 設定 iframe 的來源
      modal.style.display = "flex"; // 顯示彈出視窗
    });
  });

  // 點擊測驗卷時顯示 iframe
  quizTrigger.addEventListener("click", function (event) {
    event.preventDefault(); // 防止預設行為
    iframe.src = "https://alunisme.github.io/2025Newtest/"; // 設定 iframe 的來源
    modal.style.display = "flex"; // 顯示彈出視窗
  });

  // 點擊自我介紹時顯示白色頁面
  aboutTrigger.addEventListener("click", function (event) {
    event.preventDefault(); // 防止預設行為
    aboutModal.style.display = "flex"; // 顯示自我介紹彈出視窗
  });

  // 點擊關閉按鈕時隱藏彈出視窗
  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      modal.style.display = "none";
      aboutModal.style.display = "none";
      iframe.src = ""; // 清空 iframe 的來源
    });
  });

  // 點擊彈出視窗外部時隱藏彈出視窗
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      iframe.src = ""; // 清空 iframe 的來源
    }
    if (event.target === aboutModal) {
      aboutModal.style.display = "none";
    }
  });

  // 當滑鼠移到視窗上方時顯示選單
  window.addEventListener("mousemove", function (event) {
    if (event.clientY < 300) {
      // 滑鼠接近視窗上方時顯示選單
      menuContainer.classList.add("show");
    } else {
      // 滑鼠離開上方時隱藏選單
      menuContainer.classList.remove("show");
    }
  });

  // 控制筆記彈窗的顯示與隱藏，並設定 iframe 的 src
  document.getElementById('book-trigger').addEventListener('click', function (e) {
    e.preventDefault(); // 防止預設行為
    const bookModal = document.getElementById('book-modal');
    const iframe = bookModal.querySelector('iframe');
    iframe.src = "https://hackmd.io/@YyFThXCPSWyphIjJu2XjOQ/SJCujigCkl"; // 設定新的網址
    bookModal.style.display = 'flex'; // 顯示筆記彈窗
  });

  document.querySelector('#book-modal .close-button').addEventListener('click', function () {
    const bookModal = document.getElementById('book-modal');
    const iframe = bookModal.querySelector('iframe');
    iframe.src = ""; // 清空 iframe 的 src，避免背景播放
    bookModal.style.display = 'none'; // 隱藏筆記彈窗
  });

  window.addEventListener('click', function (e) {
    const bookModal = document.getElementById('book-modal');
    if (e.target === bookModal) {
      const iframe = bookModal.querySelector('iframe');
      iframe.src = ""; // 清空 iframe 的 src，避免背景播放
      bookModal.style.display = 'none'; // 點擊彈窗外部隱藏彈窗
    }
  });
});