document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open')
    }
})


$('h1').html("Самая крутая пицца ждет <span>только в нашем ресторане</span>");

$('#products-title').css('color', '#000000');


let products = $('.product');
for (let i = 0; i < products.length; i++) {
    let productTitle = products.eq(i).find('.product__title');
    productTitle.text(productTitle.text().replace(/(Кури[а-я]+)(.+)/gi, '$2 из индейки'));// с помощью jQuery  .text()   находим текст и изменяем его
    if (i % 2 === 1) {
        let element = products.eq(i).children().eq(1);
        element.text(element.text() + '*');
    }
}


// document.getElementById('choose-pizza').onclick = function () {
//     document.getElementsByClassName('products')[0].scrollIntoView({behavior: "smooth"});
// };

//jQuery
$('#choose-pizza').click(function () {
    $('.products')[0].scrollIntoView({behavior: "smooth"});
});


let productInput = $('#product-input');
$('.btn-add-to-cart').click((e) => {
    productInput.val($(e.target).parents('.product').find('.product__title').text());


    $('.actions-order')[0].scrollIntoView({behavior: "smooth"});
});

// Цикл находит все кнопки "В корзину"
let addToCartButtons = document.getElementsByClassName('btn-add-to-cart');
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].onclick = scrollToForm; //Тема контекст
}

function scrollToForm() {
    productInput.value = this.target.parentElement.previousElementSibling.previousElementSibling.innerText;
    document.getElementsByClassName('actions-order')[0].scrollIntoView({behavior: "smooth"});
}


/*$('#create-order').click(function () {
    let addressInput = $('#address-input');
    let phoneInput = $('#phone-input');

    if (!productInput.val()) {
        alert('Заполните поле Пицца');
        return;
    }
    if (!addressInput.val()) {
        alert('Заполните поле Адрес');
        return;
    }
    if (!phoneInput.val()) {
        alert('Заполните поле Телефон');
        return;
    }
    // Этот код делает спец запрос на загатовленный адрес сайта
    $.ajax({
        method: 'GET',
        url: 'https://testologia.site/test-cookie?name=' + productInput.val(),
        xhrFields: { // этот параметр используется для того, чтобы в запросе разрешить cookie
            withCredentials: true
        }
    })

    alert('Спасибо за заказ, бро');
    for (let i = 0; document.getElementsByTagName('input').length; i++) {
        document.getElementsByTagName('input')[i].value = "";
    }

});*/


$('#create-order').click(function () {
    console.log(1); // проверяем начинает ли код отрабатывать

    let hasError = false;
    let addressInput = $('#address-input');
    let phoneInput = $('#phone-input');

    $('.actions-order-form input').css('border-color', 'rgb(119, 94, 49)');

    if (!productInput.val()) {
        productInput.css('border-color', 'red');
        hasError = true;
    }
    if (!addressInput.val().match(/^[а-яА-я0-9,\.\s]+$/)) {
        addressInput.css('border-color', 'red');
        hasError = true;
    }
    if (!phoneInput.val().match(/^\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}/)) {
        phoneInput.css('border-color', 'red');
        hasError = true;
    }
    if (!hasError) {
        console.time('ajax');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {
                products: productInput.val(),
                name: addressInput.val(),
                phone: phoneInput.val(),
            }
        }).done(function (msg) {
            console.timeEnd('ajax');
            if (msg.success) {
                alert('Спасибо,бро');
            } else {
                alert('Что-то не так!!!')
            }
        })
    }
})


// При загрузке проверяем хранится ли что-то в localStorage
if (!localStorage.getItem('cookieAccepted')) {
    $('.cookie').show();
}

// При клике записываем данные в localStorage
$('.cookie-accept').click(function () {
    $('.cookie').hide();
    localStorage.setItem('cookieAccepted', '1');
})


//  объект в котором несколько нужных функций для работы с куками
let cookie = {
    // функция устанавливает значение в куку
    set: (name, value, options) => {
        if (!name || !value) {
            return null; // это будет значить что кука не установлена
        }

        let string = name + ' = ' + value;
        if (options) {
            string += ';' + options;
        }

        document.cookie = string;
        return cookie;
    },

    // функция получает значение куки
    get: (name) => {
        const value = '; ' + document.cookie;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },

    //удалять куку
    delete: (name) => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:001 GMT';
    }
}

// Корзина с localStorage
let btnForCart = $('.product-action .btn');


$(btnForCart).click(function (event) {
    // Ищем родителя, затем соседний эл-т с классом product__title и берем у него текст .text() и .trim() обрезаем лишние пробелы
    let productTitle = $(event.target).parent().siblings('.product__title').text().trim();

    let cartArray = [];

    let cart = localStorage.getItem('cart'); // Достаем из хранилища все что есть (СТРОКУ) по ключу - cart

    // При клике проверяем: есть ли такой ключ в массиве localStorage
    if (cart) {
        cartArray = JSON.parse(cart); // Преобразование строки из cart в объект или массив JS
    }

    cartArray.push(productTitle); //Добавляем полученное значение productTitle в массив - cartArray = []
    localStorage.setItem('cart', JSON.stringify(cartArray)); //Преобразование массива обратно в строку и сохранение в хранилище - cart
    console.log(localStorage);
})

























