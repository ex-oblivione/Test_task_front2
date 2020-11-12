$.getJSON("products.json", function (data) {
  $(data).each(function (index) {
    // Преобразование assocProducts в массив для элемента "Могут понадобиться" 
    let assocProductsArr = [];
    assocProductsArr = data[index].assocProducts.split(/\s*(?:;|$)\s*/);

    // Преобразование элемента  в элемент html "Могут понадобиться" (<div class="product_tags hidden-sm">)
    let assocProductsStr = "";
    $.each(assocProductsArr, function (elem, value) {
      if (value !== "") {
        assocProductsStr += `<a href="#" class="url--link">${value}</a>, \n`;
      }
    }
    );
    assocProductsStr = assocProductsStr.slice(0, -7) + "</a>\n";



    // Задаем переменные для всех 4 вариантов цены
    let priceGoldAlt = 0,
      priceGold = 0,
      priceRetailAlt = 0,
      priceRetail = 0;

    // Создаем массивы: 1) для значений цены из json 2) для значений с округлением до сотых 3) для значений приведенных к строке с запятой-разделителем (то, что выведется в итоге на экран)
    let arrPriceInit = [],
      arrPriceNum = [],
      arrPriceStr = [];

    arrPriceInit = [data[index].priceGoldAlt, data[index].priceGold, data[index].priceRetailAlt, data[index].priceRetail]

    // Создается значение цены с округлением до сотых
    for (let i = 0; i < arrPriceInit.length; i++) {
      arrPriceNum.push(arrPriceInit[i].toFixed(2));
    }

    // Цена преобразуется в строку и разделитель-точка заменяется на запятую
    for (let i = 0; i < arrPriceNum.length; i++) {
      arrPriceStr.push(arrPriceNum[i].toString().replace(/(?=\B(?:\d{3})+(?!\d))/g, " ").replace(".", ","));
    }

    // Итоговые значения цены для использования в шаблоне
    priceGoldAlt = arrPriceStr[0];
    priceGold = arrPriceStr[1];
    priceRetailAlt = arrPriceStr[2];
    priceRetail = arrPriceStr[3];


    // Переменная для назначение кнопке (class="btn btn_cart") аттрибута data-product-id
    let productId = "";
    productId = data[index].productId;



    $(".product__area").append(`<div id="products_section">
    <div class="products_page pg_0">
      <div class="product product_horizontal">
        <span class="product_code">Код: ${data[index].code.slice(5)}</span>
        <div class="product_status_tooltip_container">
          <span class="product_status">Наличие</span>
        </div>
        <div class="product_photo">
          <a href="#" class="url--link product__link">
            <img
              src="http:${data[index].primaryImageUrl.slice(0, -4)}_220x220_1.jpg"
            />
          </a>
        </div>
        <div class="product_description">
          <a href="#" class="product__link"
            >${data[index].title}</a
          >
        </div>
        <div class="product_tags hidden-sm">
          <p>Могут понадобиться:</p>
          ${assocProductsStr}
        </div>
        <div class="product_units">
          <div class="unit--wrapper">
            <div class="unit--select unit--active unit--select_unit_m" data-unit="m">
              <p class="ng-binding">За м. кв.</p>
            </div>
            <div class="unit--select unit--select_unit_pack" data-unit="pack">
              <p class="ng-binding">За упаковку</p>
            </div>
          </div>
        </div>
        <p class="product_price_club_card">
          <span class="product_price_club_card_text"
            >По карте<br />клуба</span
          >
          <span class="goldPrice goldPriceAlt">${priceGoldAlt}</span>
          <span class="goldPrice goldPriceMain hide">${priceGold}</span>
          <span class="rouble__i black__i">
            <svg
              version="1.0"
              id="rouble__b"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              width="30px"
              height="22px"
              viewBox="0 0 50 50"
              enable-background="new 0 0 50 50"
              xml:space="preserve"
            >
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#rouble_black"
              ></use>
            </svg>
          </span>
        </p>
        <p class="product_price_default">
          <span class="retailPrice retailPriceAlt">${priceRetailAlt}</span>
          <span class="retailPrice retailPriceMain hide">${priceRetail}</span>
          <span class="rouble__i black__i">
            <svg
              version="1.0"
              id="rouble__g"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              width="30px"
              height="22px"
              viewBox="0 0 50 50"
              enable-background="new 0 0 50 50"
              xml:space="preserve"
            >
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#rouble_gray"
              ></use>
            </svg>
          </span>
        </p>
        <div class="product_price_points">
          <p class="ng-binding">Можно купить за 231,75 балла</p>
        </div>
        <div class="list--unit-padd"></div>
        <div class="list--unit-desc">
          <div class="unit--info">
            <div class="unit--desc-i"></div>
            <div class="unit--desc-t">
              <p>
                <span class="ng-binding">Продается упаковками:</span>
                <span class="unit--infoInn"
                  >1 упак. = 2.47 м. кв.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="product__wrapper">
          <div class="product_count_wrapper">
            <div class="stepper">
              <input
                class="product__count stepper-input"
                type="text"
                value="1"
              />
              <span class="stepper-arrow up"></span>
              <span class="stepper-arrow down"></span>
            </div>
          </div>
          <span
            class="btn btn_cart"
            data-url="/cart/"
            data-product-id="${productId}"
          >
            <svg class="ic ic_cart">
              <use
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#cart"
              ></use>
            </svg>
            <span class="ng-binding">В корзину</span>
          </span>
        </div>
      </div>
    </div>
  </div>`);


    // Константы для элементов переключателя показателя За кв. м и За упаковку и для элементов цены (4 шт.)
    const unitSelectUnitM = document.getElementsByClassName("unit--select_unit_m");
    const unitSelectUnitPack = document.getElementsByClassName("unit--select_unit_pack");
    const goldPriceAlt = document.getElementsByClassName("goldPriceAlt");
    const retailPriceAlt = document.getElementsByClassName("retailPriceAlt");
    const goldPriceMain = document.getElementsByClassName("goldPriceMain");
    const retailPriceMain = document.getElementsByClassName("retailPriceMain");

    // Переключатель показателя За кв. м. Присваивается класс unit--active. Вместе с тем ставится цена За кв. м
    for (let i = 0, l = unitSelectUnitM.length; i < l; i++) {
      unitSelectUnitM[i].addEventListener("click", () => {

        if (unitSelectUnitM[i].classList.contains("unit--active")) {
          console.log("Уже есть класс");
          return;
        }

        unitSelectUnitPack[i].classList.remove("unit--active");
        goldPriceMain[i].classList.add("hide");
        retailPriceMain[i].classList.add("hide");
        unitSelectUnitM[i].classList.add("unit--active");
        goldPriceAlt[i].classList.remove("hide");
        retailPriceAlt[i].classList.remove("hide");


      })
    };

    // Переключатель показателя За упаковку. Присваивается класс unit--active. Вместе с тем ставится цена За упаковку
    for (let i = 0, l = unitSelectUnitPack.length; i < l; i++) {
      unitSelectUnitPack[i].addEventListener("click", () => {

        if (unitSelectUnitPack[i].classList.contains("unit--active")) {
          // console.log("Уже есть класс");
          return;
        }

        unitSelectUnitM[i].classList.remove("unit--active");
        goldPriceAlt[i].classList.add("hide");
        retailPriceAlt[i].classList.add("hide");
        unitSelectUnitPack[i].classList.add("unit--active");
        goldPriceMain[i].classList.remove("hide");
        retailPriceMain[i].classList.remove("hide");
      })
    };
  });

  addFuncClick();

});


// Счетчик товаров
function addFuncClick() {
  $(".stepper-arrow.down").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".stepper-arrow.up").click(function () {
    var $input = $(this).parent().find(".product__count.stepper-input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
};