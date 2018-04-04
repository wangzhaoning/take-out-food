var items = require('./items').loadAllItems();
var promotions = require('./promotions').loadPromotions();

module.exports=function bestCharge(selectedItems) {
  var itemsDetails = orderingDetails(selectedItems, items);
  var usePromote = usePromotions(itemsDetails, promotions);
  var addsum = addSum(usePromote);
  var result = printResult(itemsDetails, usePromote, addsum);
  return result.trim();
}

  function orderingDetails(selectedItems,items) {
    let ordingdetalis=[];
    for (let i of selectedItems) {
      let ordingItem = i.split('x');
      let obj = {};
      for (let itm of items) {
        if (ordingItem[0].trim() === itm.id) {
          obj.name = itm.name;
          obj.count = ordingItem[1];
          obj.price = itm.price * ordingItem[1];
          obj.id=itm.id;
          break;
        }
      }
      ordingdetalis.push(obj);
    }
    return ordingdetalis;
  }

function usePromotions(ordingdetails,promotions) {

    let total1=0;
    let save1=0;
    let obj1={};
     obj1.ispromotions=0;
    for(let item of ordingdetails)
    {
      total1+=item.price;
    }
    obj1.total=total1;
    if(total1>=30)
    {
      obj1.ispromotions=1;
      for (let itm of ordingdetails)
      {
        for(let proitems of promotions[1].items)
        {
          if(itm.id===proitems)
          {
            save1+=itm.price/2;
            break;
          }
        }
      }
      if(save1>6)
      {
        obj1.usepromotion='指定菜品半价(黄焖鸡，凉皮)';
      }
      else{
       obj1.usepromotion=promotions[0].type;
       save1=6;
      }
    }
  obj1.save=save1;
    return obj1;
  }

function addSum(usepromotion) {
   return usepromotion.total-usepromotion.save;
}

function printResult(itemsDetails,usePromote,addsum) {
    let soulte="============= 订餐明细 =============\n";
    for(let its of itemsDetails)
    {
      soulte+=its.name+' x'+its.count+' = '+its.price+'元\n';
    }
    soulte+='-----------------------------------\n';
    if(usePromote.ispromotions===1)
    {
      soulte += '使用优惠:\n' +usePromote.usepromotion+  '，' + '省' + usePromote.save + '元' + '\n';
      soulte += '-----------------------------------\n';
    }
  soulte+="总计："+addsum+"元\n";
  soulte+="===================================";
  return soulte;
}




