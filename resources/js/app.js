import axios from 'axios'
import Noty from 'noty'
//socket
let socket=io()
import {initAdmin} from './admin'
import moment from 'moment'


/*
if(messages.success){
    new Noty({
        type:'success',
        timeout:1000,
        text: `${messages.success}`,
        progressBar:false
      }).show();
}
*/
let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')
addToCart.forEach(btn=>{
    btn.addEventListener('click',e=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        axios.post('/cart/update-cart',pizza)
        .then(res=>{
            new Noty({
                type:'success',
                timeout:1000,
                text: "Items added",
                progressBar:false
              }).show();
            cartCounter.innerText=res.data.totalQty
        }).catch(err=>{
            new Noty({
                type:'error',
                timeout:1000,
                text: "Something went wrong",
              }).show();
        })
    })
})


initAdmin()

//status updation

let inputEl=document.querySelector('#hidden_input')
let order=inputEl?inputEl.value:null
let time=document.createElement('small')
order=JSON.parse(order)
const update=(order)=>{
    
    let stepCompleted=true
    let statuses=document.querySelectorAll('.status_line')
    statuses.forEach((item)=>{
        item.classList.remove('step-completed')
        item.classList.remove('current')
    })
    statuses.forEach(item=>{
        let status=item.dataset.status
        if(stepCompleted===true){
            item.classList.add('step-completed')
        }
        if(item.nextElementSibling){
        if(order.status===status){
            stepCompleted=false
            time.innerText=moment(order.updatedAt).format('hh:mm A')
            item.appendChild(time)
            item.nextElementSibling.classList.add('current')
           }
        }
    })
}
update(order)



//join
if(order){
socket.emit('join',`order_${order._id}`)
}

socket.on('orderUpdated',(data)=>{
    const updatedOrder={...order}
    updatedOrder.updatedAt=moment().format()
    updatedOrder.status=data.status
    console.log("here")
    update(updatedOrder)
    new Noty({
        type:'success',
        timeout:1000,
        text: 'Order updated',
        progressBar:false
      }).show();
})

