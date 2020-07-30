import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// клиентская часть данных
import ClientRow from '../client';
// часть данных с позициями заказа
import Orders from '../orders';
// итоговая стоимость
import TotalPrice from '../total-price';
// сервис для общения с сервером
import WooWork from '../../services/data-transfer';
// кнопка оформления заказа
import CloseOrder from '../close-order';
// чек для печати
import Cheque from '../cheque';
// строка со скидкой
import Sale from '../sale';

export default class App extends Component {

  orderCount = 0;

  state = {
    // шаблон нового заказа
    order: {
      payment_method: "",
      payment_method_title: "",
      set_paid: true,
      billing: {
        first_name: "Входящий звонок",
        address_1: "",
        phone: ""
      },
      line_items: [],
      shipping_lines: [
        {
          method_id: "",
          method_title: ""
        }
      ]
    },
    // список улиц доставки
    streets: this.props.streets,
    // список товаров
    products: this.props.products,
    // массив товаров для наполнения
    orderProducts: [],
    // итоговый ценник
    totalPrice: 0,
    //поля адреса
    street: '',
    house: '',
    appartment: '',
    entryway: '',
    floor: '',
    // скидка
    discount: 0, 
    deactivateAdd: false

  };

  wooObj = new WooWork();

  // разрешаем/запрещаем добавление новой позиции
  toggleAddButton = (bool)=>{
    if(this.state.deactivateAdd !== bool){
      this.setState({deactivateAdd: bool});
    }
  }
  // устанавливаем размер скидки в this.state.discount
  setDiscount = (val)=>{
    this.setState( ({discount})=>{
      discount = val;
      return {
        discount
      };
    } )
    this.calcTotalPrice();
  }
  // после отправки заказа в woocommerce печатаем чек из ответа сервера
  buildCheque = (data, discount)=>{
    const WinPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    const CSS = `
          <style>
            *{
              font-size: 20px;
              line-height: 1.8;
            }
            ul{
                border-bottom: 2px solid #c4c4c4;
                border-top: 2px solid #c4c4c4;
                padding: 30px 20px 30px 50px;
                margin: 30px 0;
            }
        </style>`;
    WinPrint.document.write(CSS);
    WinPrint.document.write('<div id="root" ></div>');
    ReactDOM.render(<Cheque data={data} discount={discount}></Cheque>, WinPrint.document.getElementById('root'));
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();

    this.clean();
  }
  // подготавливаем данные this.state.order перед отправкой
  preparationOrder = ()=>{
    this.buildAdress();
    this.buildLineItems();
    // this.sendOrder();
  }
  // запиливаем line_itemd  для отправки this.state.order на сервер
  buildLineItems = ()=>{
    this.setState((state)=>{
      const newOrder = {...state.order};
      newOrder.line_items = [];
      const ratio = (100 - state.discount) / 100;
      for ( const el of Object.keys(state.orderProducts) ) {
        const product = {};
        
        product.product_id = state.orderProducts[el].productId;
        if( state.orderProducts[el].type === 'variable' ){
          product.variation_id = state.orderProducts[el].variation.variationId;
        }
        product.quantity =  +state.orderProducts[el].count;
        product.total = String( this.roundToTwo(state.orderProducts[el].totalPrice *= ratio) );
        newOrder.line_items.push(product);
      }

      this.sendOrder(newOrder);
      return{
        order: newOrder
      }
    });
  }
  // очищаем окно оформления после отправки заказа на сервер
  clean = ()=>{
    this.setState({
        order: {
          payment_method: "",
          payment_method_title: "",
          set_paid: true,
          billing: {
            first_name: "Входящий звонок",
            address_1: "",
            phone: ""
          },
          line_items: [],
          shipping_lines: [
            {
              method_id: "",
              method_title: ""
            }
          ]
        },
        orderProducts: [],
        totalPrice: 0,
        street: '',
        house: '',
        appartment: '',
        entryway: '',
        discount: 0
    
    });
  }
  // отправляем state.order на сервер 
  sendOrder = (order)=>{
    // const order = this.state.order;
    this.wooObj.setData('orders', order)
    .then((response) => {
      this.buildCheque(response.data, this.state.discount);
      this.clean();
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  }
  // устанавливаем state.order.payment_method и state.order.payment_method_title
  setPaymentMethod = (paymethodId, paymethodTitle)=>{
    this.setState(({order})=>{
      const newOrder = {...order};
      newOrder.payment_method = paymethodId;
      newOrder.payment_method_title = paymethodTitle;
      return{
        order: newOrder
      }
    })
  }
  // собираем state.billing_adress_1 из переменных адреса в this.state
  buildAdress = ()=>{
    const {street, house, appartment, entryway, floor} = this.state;
    const adress = `${street} ${house}, квартира: ${appartment}, подъезд: ${entryway}, этаж: ${floor}`;
    this.setState(({order})=>{
      const newOrder = {...order};
      newOrder.billing.address_1 = adress;
      return{
        order: newOrder
      }
    })
  }
  // заполняем переменные streets, house и т.д. в this.state
  setAdress = (name, val)=>{
    this.setState( (state)=>{
      const newState = state;
      newState[name] = val;
      return newState;
    } )
  }
  // устанавливаем номер телефона в this.state.billing.phone
  setPhone = (name, val)=>{
    this.setState(({order})=>{
      const newOrder = {...order};
      newOrder.billing.phone = val;
      return{
        order: newOrder
      }
    })
  }
  // устанавливаем доставку в this.state.shipping_lines[0].method_id и this.state.shipping_lines[0].method_title
  setShipping = (shippingId, shippingTitle)=>{
    this.setState(({order})=>{
      const newOrder = {...order};
      newOrder.shipping_lines[0].method_id = shippingId;
      newOrder.shipping_lines[0].method_title = shippingTitle;
      return{
        order: newOrder
      }
    })
  }
  // округляем число с плавающей точкой до 2-х символов после запятой
  roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  }
  // считаем стоимость всех товаров в заказе
  calcTotalPrice = () => {
    this.setState(({ orderProducts, discount }) => {
      let totalPrice = orderProducts.reduce((sum, current) => {
        return this.roundToTwo(sum + +current.totalPrice);
      }, 0)
      const ratio = (100 - discount) / 100;
      totalPrice = this.roundToTwo(totalPrice *= ratio);
      return {
        totalPrice
      };
    })
  }
  // добавляем новую позицию в заказ
  addNewProduct = () => {

    this.toggleAddButton(true);
    
    this.setState(({ orderProducts }) => {

      const baseProduct = {
        orderId: this.orderCount++,
        productId: this.props.products[0].id,
        productName: this.props.products[0].name,
        price: this.props.products[0].price,
        count: 1,
        type: this.props.products[0].type,
        variations: undefined,
        totalPrice: this.props.products[0].price,
        variation: {
          variationId: null,
          variationAttr: '',
          variationPrice: null,
        },
      }

      const newOrderProducts = [...orderProducts, baseProduct];
      return {
        orderProducts: newOrderProducts
      }
    });
    this.calcTotalPrice();

  }
  // меняем продукт в активной позиции
  setProduct = (orderId, id, price, name, type) => {

    this.toggleAddButton(true);
    
    this.setState(({ orderProducts, discount }) => {

      const newOrderProducts = [...orderProducts,];

      const idx = newOrderProducts.findIndex((el) => el.orderId === orderId);
      newOrderProducts[idx] = {
        orderId,
        productId: id,
        productName: name,
        price,
        type,
        count: 1,
        totalPrice: price,
        variations: this.getVariations(orderId, id),
        variation: {
          variationId: null,
          variationAttr: '',
        },
      }

      return {
        orderProducts: newOrderProducts
      };
    });
    this.calcTotalPrice();
  }
  // делаем запрос на сервер за вариациями для выбранного продукта
  getVariations = (orderId, productId) => {

    this.wooObj.getData(`products/${productId}/variations`).then((data) => {
      const currentVariations = data.data.reverse();
      if(currentVariations.length > 0){
        this.setState(({ orderProducts }) => {
          const newOrderProducts = [...orderProducts,];
          const idx = newOrderProducts.findIndex((el) => el.orderId === orderId);
          if(newOrderProducts[idx]){
            newOrderProducts[idx].variations = currentVariations;
          }
          return {
            orderProducts: newOrderProducts
          };
        })
        this.setVariation( orderId, currentVariations[0].id );
      }
      this.toggleAddButton(false);
    })
  }
  // устанавливаем вариацию для активной позиции (запускается так же при добавлении новой позиции)
  setVariation = (orderId, variationId) => {

    const newOrderProducts = [...this.state.orderProducts,];
    const idx = newOrderProducts.findIndex((el) => el.orderId === orderId);
    if(!newOrderProducts[idx]) return;
    const activeVariation = newOrderProducts[idx].variations.find( el=>{
      return el.id === variationId;
    } )
    const variationAttr = activeVariation.attributes[0].option;
    const variationPrice = this.state.order.shipping_lines[0].method_id === "2" ? activeVariation.price : activeVariation.regular_price;
    this.setState(() => {
      newOrderProducts[idx].variation = {
        variationId,
        variationAttr,
        variationPrice
      };
      newOrderProducts[idx].price = variationPrice;

      return {
        orderProducts: newOrderProducts
      };
    })
    this.changeTotalPrice(newOrderProducts[idx].count, orderId);
    this.calcTotalPrice();
  }
  // удаляем активную позицию
  deleteProduct = (orderId)=>{
    this.setState(({orderProducts})=>{
      const idx = orderProducts.findIndex((el) => el.orderId === orderId);
      const newOrderProducts = [
        ...orderProducts.slice(0, idx),
        ...orderProducts.slice(idx + 1)
      ];
      return {
        orderProducts: newOrderProducts
      }
    })
    this.calcTotalPrice();
  }
  // устанавливаем цену на позицию с учётом количества единиц 
  changeTotalPrice = (count, orderId) => {

    this.setState(({ orderProducts }) => {

      const newOrderProducts = [...orderProducts,];
      const idx = newOrderProducts.findIndex((el) => el.orderId === orderId);

      newOrderProducts[idx].count = count;
      newOrderProducts[idx].totalPrice = this.roundToTwo(newOrderProducts[idx].price * newOrderProducts[idx].count);
      return newOrderProducts;
    })
    this.calcTotalPrice();

  }
  render() {
    const { streets, products, totalPrice, orderProducts, street, house, appartment, entryway, floor, discount, deactivateAdd} = this.state;
    return (
      <div className="App container">
        <ClientRow 
          streets={streets}
          setPaymentMethod={this.setPaymentMethod}
          setAdress={this.setAdress}
          setPhone={this.setPhone}
          setShipping={this.setShipping}
          street={street}
          house={house}
          appartment={appartment}
          entryway={entryway}
          floor={floor}
          phone={this.state.order.billing.phone}
          shipping={this.state.order.shipping_lines[0].method_id}
          paymethod={this.state.order.payment_method}
        ></ClientRow>
        <Orders
          products={products}
          addNewProduct={this.addNewProduct}
          setProduct={this.setProduct}
          getVariations={this.getVariations}
          setVariation={this.setVariation}
          changeTotalPrice={this.changeTotalPrice}
          orderProducts={this.state.orderProducts}
          deleteProduct={this.deleteProduct}
          permission ={deactivateAdd}
        ></Orders>
        <Sale
          val={discount}
          changed={this.setDiscount}
        ></Sale>
        <TotalPrice 
          cost={totalPrice} 
        ></TotalPrice>
        <CloseOrder 
          disabled={ !orderProducts.length } 
          preparationOrder={this.preparationOrder}
          ></CloseOrder>
      </div>
    );
  }
}