import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
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
        console.log("button clicked")
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