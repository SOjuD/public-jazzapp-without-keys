import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export default class WooWork{

    _url = "https://jazzcafe.by/";
    // _url = "http://test7.dix.by/";

    api = new WooCommerceRestApi({
    url: this._url,
    consumerKey: "******************",
    consumerSecret: "******************",
    version: "wc/v3",
    // queryStringAuth: true
    });

    setData( endPoint, data ){
        return this.api.post(endPoint, data);
    }
    getData(endPoint, params = {}){
        return this.api.get(endPoint, params);
    }

    async getStreets(){
        const res = await fetch(`${this._url}wp-json/wp/v2/pages/3059`, { method: 'GET'});
        if(!res.ok){
            throw new Error(`Не удалось получить ответ от wp, resoinse status:${res.status}`);
        }
        return await res.json();
    }

}
 