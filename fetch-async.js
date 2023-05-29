/* Пример fetch c промисами получение данных по API  (версия без даты и проверок )
async function getCurrencies() {
	// 1. Получить данные с сервера
	const url = 'https://www.cbr-xml-daily.ru/daily_json.js';
	const response = await fetch(url);
	const data = await response.json();
	// 2. Отобразить эти данные на странице
	renderRates(data);
}
getCurrencies(); //Запускаем функцию получения курса валют с сервера
function renderRates(data) {
	const usdRate = data.Valute.USD.Value.toFixed(2);
	const eurRate = data.Valute.EUR.Value.toFixed(2);
	// 2. Отобразить эти данные на странице
	const usdElement = document.querySelector('#usd'); //Получаем элементы для отображения курсов валют из HTML
	const eurElement = document.querySelector('#eur');
	usdElement.innerText = usdRate;
	eurElement.innerText = eurRate;
}
*/


//====  Пример fetch c промисами получение данных по API   =======

async function getCurrencies() {

	// 1. Получить данные с сервера
	const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

	// Блок try-catch, в котором мы выполняем запрос к серверу с помощью fetch и ждем ответа с помощью await.
	try {
	  const response = await fetch(url);
	
	  if(response.status !== 200) {
		throw new Error('Ошибка получения данных с сервера'); // Проверяем, что статус ответа равен 200, иначе выбрасываем ошибку
	  }
	  const data = await response.json(); //Парсим ответ с помощью response.json() и сохраняем данные в переменную data.
	  // 2. Отобразить эти данные на странице

	  renderRates(data); //Вызываем функцию renderRates и передаем ей полученные данные.

	} catch(error) {
	  console.error(error);
	  const errorElement = document.createElement('div'); //Создаем элемент для отображения ошибки на странице
	  errorElement.innerText = `Ошибка загрузки данных: ${error.message}`;
	  const currencyBox = document.querySelector('.currency-box');
	  currencyBox.appendChild(errorElement);
	}
   
   }
   
   getCurrencies(); //Запускаем функцию получения курса валют с сервера
   //Объявляем функцию renderRates, которая принимает данные о курсах валют.
   function renderRates(data) {
   
	const usdRate = data.Valute.USD.Value.toFixed(2); //округляем до 2х знаков после запятой
	const eurRate = data.Valute.EUR.Value.toFixed(2);
   
	// 2. Отобразить эти данные на странице
	
	const usdElement = document.querySelector('#usd'); //Получаем элементы для отображения курсов валют из HTML
	const eurElement = document.querySelector('#eur');
   
	usdElement.innerText = usdRate;
	eurElement.innerText = eurRate;
   
	// Отображаем текущую дату
	const dateElement = document.createElement('div');
	const currencyBox = document.querySelector('.currency-box');
	const currentDate = new Date(data.Date); //Преобразуем полученную дату в объект типа Date
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`; //Форматируем дату
    dateElement.innerText = ` ${formattedDate}`; //Отображаем отформатированную дату на странице
	currencyBox.prepend(dateElement);
   }