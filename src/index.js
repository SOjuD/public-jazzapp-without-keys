import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WooWork from'./services/data-transfer'
import App from './components/app'


const wooObj = new WooWork();
let streets;
let products = [];
wooObj.getStreets().then((data)=>{

    // получаем список улиц в виде html тега, парсим улицы в массив
    let streetsString = data.content.rendered.replace(/<[^>]+>/g,'');
    streets = streetsString.split(',');

    let params = {
        per_page: 100,
        page: 1,
        order: 'asc',
        orderby: 'title',
    };
    new Promise( (resolve, reject)=>{
        function getProducts (){
            wooObj.getData('products', params).then( (data)=>{
                if(data.data.length){
                    data.data.forEach(element => {
                        products.push(element);
                    });
                    params.page +=1;
                    getProducts();
                }else{
                    resolve();
                }
            } )
        };
        getProducts();
    }).then(()=>{
        ReactDOM.render(<App streets={streets} products={products}/>, document.getElementById('root'));
    })
}).catch( (err)=>{
    alert(err.message);
} );



