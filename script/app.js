
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time= document.querySelector('.time');
const icon = document.querySelector('.icon img');
const bg = document.querySelector('body')
const light = document.querySelector('bg-1');
const dark = document.querySelector('bg-2')




const updateUI = (data) =>{

  const cityDets = data.cityDets;
  const weather = data.weather;

 //update details template
 details.innerHTML=
 `<h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>`;



//Update the night and day and icon images
  if(weather.IsDayTime){
 
  bg.classList = 'bg-1'
    }else{

  bg.classList = 'bg-2'
    }


   const iconSrc = `icons/${weather.WeatherIcon}.svg`;
   icon.setAttribute('src',iconSrc)


     //remove the d-none class if present
    if(card.classList.contains('d-none')){
    card.classList.remove('d-none')
     }
};


const updateCity = async (city) =>{
  
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets : cityDets,
    weather: weather
    // if the value e propriety are the same (name) we can write like this
    //{cityDets, weather}
  };


};




cityForm.addEventListener('submit', e =>{
  //prevent default refresh page
  e.preventDefault();


   //GET CITY VALUE
   const city = cityForm.city.value.trim();
   cityForm.reset();

  //UPDATE 

   updateCity(city)
  .then(data => updateUI(data))
  .catch(err => console.log(err))

});

