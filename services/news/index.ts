import axios from "axios";

const API_KEY=process.env.NEXT_PUBLIC_NEWSAPI || "e57f5ddc9ce84a3bad296387e56c62b0";
const URL=`https://newsapi.org/v2/everything`
interface params{
    query:string,
    from:string,//date

}
type responseData={
    source:string,
    author:string,
    title:string,
    description:string,
    content:string,
}
const fetchNews=async(params:params):Promise<responseData[]>=>{
    // console.log(API_KEY);
    const data=await axios.get(URL,{
        params:{
            q:params.query,
            from:params.from,
            sortBy:"popularity",
            apiKey:API_KEY
        }
    });
    // console.log(data);
    const response:responseData[]=[];
    if (data.status===200 && data.data){
        data.data.articles.forEach((element:any) => {
            const res:responseData={
                source:element.source.name || "",
                author:element.author || "",
                title:element.title || "",
                content:element.content || "", 
                description:element.description || "",
            }
            // console.log(res);
            response.push(res);
        });
    }
    return response;
}
// (()=>{
//     fetchNews({
//         query:"bitcoin",
//         from:"2025-06-10"
//     })
// })()