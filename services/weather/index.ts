import axios from "axios"

const apiKey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY || "0eb2688e3864475db1a61901251007";
interface params{
    city:string
}
const fetchWeather=async(params:params)=>{
    const city = params.city || 'Delhi';
    try{
        const { data } = await axios.get('https://api.weatherapi.com/v1/current.json', {
            params: {
                key: apiKey,
                q: city,
                aqi: 'no',
            },
            });
            console.log(data);
    }catch(e){
        console.log(e);
    }
}

// (()=>{
//     fetchWeather({
//         city:"Delhi"
//     })
// })()

// {
//   location: {
//     name: 'Delhi',
//     region: 'Ontario',
//     country: 'Canada',
//     lat: 42.85,
//     lon: -80.5,
//     tz_id: 'America/Toronto',
//     localtime_epoch: 1752128859,
//     localtime: '2025-07-10 02:27'
//   },
//   current: {
//     last_updated_epoch: 1752128100,
//     last_updated: '2025-07-10 02:15',
//     temp_c: 16.4,
//     temp_f: 61.5,
//     is_day: 0,
//     condition: {
//       text: 'Fog',
//       icon: '//cdn.weatherapi.com/weather/64x64/night/248.png',
//       code: 1135
//     },
//     wind_mph: 2.2,
//     wind_kph: 3.6,
//     wind_degree: 218,
//     wind_dir: 'SW',
//     pressure_mb: 1013,
//     pressure_in: 29.91,
//     precip_mm: 0,
//     precip_in: 0,
//     humidity: 95,
//     cloud: 0,
//     feelslike_c: 16.4,
//     feelslike_f: 61.5,
//     windchill_c: 19.8,
//     windchill_f: 67.6,
//     heatindex_c: 19.8,
//     heatindex_f: 67.6,
//     dewpoint_c: 19.4,
//     dewpoint_f: 67,
//     vis_km: 10,
//     vis_miles: 6,
//     uv: 0,
//     gust_mph: 4.7,
//     gust_kph: 7.6
//   }
// }