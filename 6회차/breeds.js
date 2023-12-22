const randomDogApi = 'https://dog.ceo/api/breeds/image/random/42';
const allBreedsApi = 'https://dog.ceo/api/breeds/list/all';
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById('header');
const main = document.getElementById('main');
const input = document.getElementById('filter_text');
const button = document.getElementById('filter_button');
const select = document.getElementById('filter_select');
const more = document.getElementById('more');
const toTheTop = document.getElementById('tothetop');
const resetBtn = document.getElementById('reset');

let currentDogs = [];

function displayDogs(item) {
    const dogImageDiv = document.createElement('div');
    let newImage = 'images/no_image.png';
    dogImageDiv.classList.add('flex-item');
    dogImageDiv.innerHTML = `<img src=${item} onerror="this.src='${newImage}'">`
    main.appendChild(dogImageDiv);

}
window.addEventListener('load', function () {
    // 강아지 사진 뿌리기
    request1.open('get', randomDogApi);
    request1.addEventListener('load', function () {
        const response = JSON.parse(request1.response);
        response.message.forEach(function (item) {
            currentDogs.push(item);
            displayDogs(item);

        });
    });
    request1.send();

    // 셀렉트에 견종 정보 뿌리기
    request2.open('get', allBreedsApi);
    request2.addEventListener('load', function () {
        const response = JSON.parse(request2.response);
        Object.keys(response.message).forEach(function (item) {
            const option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            select.appendChild(option);
        });
    });
    request2.send();
});

button.addEventListener('click', function () {
    main.innerHTML = '';
    let filteredDogs = currentDogs.filter(function (item) {
        return item.indexOf(input.value) !== -1;
    });

    input.value = '';

    filteredDogs.forEach(function (item) {
        displayDogs(item);
    });
});

select.addEventListener('change', function () {
    main.innerHTML = '';
    let filteredDogs = currentDogs.filter(function (item) {
        return item.indexOf(select.value) !== -1;
    });

    filteredDogs.forEach(function (item) {
        displayDogs(item);
    });
});

more.addEventListener('click', function () {
    request1.open('get', randomDogApi);
    request1.addEventListener('load', function () {
        const response = JSON.parse(request1.response);
        response.message.forEach(function (item) {
            currentDogs.push(item);
            displayDogs(item);
        });
    });
    request1.send();
});

toTheTop.addEventListener('click', function () {
    // scrollTo 스크롤 위치 이동
    window.scrollTo({ top: 0 });
});

resetBtn.addEventListener('click', function () {
    location.reload();
});
