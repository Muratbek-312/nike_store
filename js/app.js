// Trend -- Slider
$(document).ready(function () {
  $(".slider").slick({
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 544,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
    speed: 500,
    easing: "ease",
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1000,
  });
});

// Функционал модального окна
let modalBtn = document.querySelectorAll("*[data-madal-btn]");

for (let i = 0; i < modalBtn.length; i++) {
  modalBtn[i].addEventListener("click", function () {
    let name = modalBtn[i].getAttribute("data-madal-btn");
    let modal = document.querySelector("[data-madal-window='" + name + "']");
    modal.style.display = "block";
    let close = modal.querySelector(".modal__close");
    close.addEventListener("click", function () {
      modal.style.display = "none";
    });
  });
}


window.onclick = function (e) {
  if (e.target.hasAttribute("data-madal-window")) {
    let modals = document.querySelectorAll("*[data-madal-window]");
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
  }
};



let productCreateBtn = $(".modal-btn");
let productList = $(".content");
let Inp1 = $("#inp1");
let Inp2 = $("#inp2");
let Inp3 = $("#inp3");
let Inp4 = $("#inp4");
let Inp5 = $("#inp5");
let Inp6 = $("#inp6");

productCreateBtn.on("click", function () {
  let newProduct = {
    nameProduct: Inp1.val(),
    desProduct: Inp2.val(),
    nameUser: Inp3.val(),
    numberPhone: Inp4.val(),
    price: Inp5.val(),
    image: Inp6.val(),
  };
  newProductCon(newProduct);
});


function newProductCon(newProduct) {
  fetch("http://localhost:8000/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((res) => render());
}


function render() {
  fetch("http://localhost:8000/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        productList.append(`                
        <div class="content__item">
          <a href="">
              <img src="${item.image}" alt="">
              <div class="slider__item__info">
                <div class="slider__item_name">
                  <h4>${item.desProduct}</h4>
                  <p>Худи с графикой для скейтбординга</p>
                  <div class="slider__item_name_btn">
                  <buttun class="btn btn-outline-success">Редактирование</buttun>
                  <buttun class="btn btn-outline-danger">Удалить</buttun>
                </div>
                </div>
                <p class="slider__item_price"><span>${item.price} som</span></p>
              </div>
            </a>
        </div>`
        );
      });
    });
}

render()


