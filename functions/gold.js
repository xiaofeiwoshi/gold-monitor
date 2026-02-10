export async function onRequest(context) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8"
    };

    try {
        const jdUrl = "https://ms.jr.jd.com/gw/generic/hj/h5/m/latestPrice?reqData=%7B%7D";
        const response = await fetch(jdUrl, {
            headers: { "Referer": "https://jr.jd.com/" }
        });
        const data = await response.json();
        const resData = data.resultData.datas;

        return new Response(JSON.stringify({
            price: parseFloat(resData.price),
            yesterday: parseFloat(resData.yesterdayPrice)
        }), { headers: corsHeaders });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
    }
}
