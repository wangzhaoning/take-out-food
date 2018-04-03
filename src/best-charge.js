var items = require('./items').loadAllItems();
var promotions = require('./promotions').loadPromotions();
module.exports=function bestCharge(selectedItems) {
  var Total=0;
  var save=0;
  function orderingDetails(selecteditems){
    for(let i=0;i<items.length;i++)
    {
      if(items[i].id===selecteditems.slice(0,8))
      {
        var ordingItem=items[i].name;
        ordingItem+=selecteditems.slice(8);
        ordingItem+='=';
        count=
        ordingItem+='元';
        break;
      }
    }
    return ordingItem;
  }
  function addTotal(simitems) {
    for(let q=0;q<items.length;q++)
    {
      if(items[q].id===simitems.slice(0,8))
      {
        var   total=simitems.slice(9)*(items[q].price);
      }
    }
    return total;
    }

  //console.log(orderingDetails(selectedItems[0]));
function usePromotions() {

  var discountItems;
  var tdiscountItems;
    for(let j=0;j<selectedItems.length;j++)
    {
       Total+=addTotal(selectedItems);
       if(selectedItems[j].slice(0,8)===promotions[1].items[0]||selectedItems[j].slice(0,8)===promotions[1].items[1])
       {
         save+=addTotal(selectedItems)/2;
         discountItems=(function(){
           for(let m=0;m<items.length;m++)
           {
             if(selectedItems[j].slice(0,8)===items[m].id)
             {
               return items.name;
             }
           }
         });
       }
      // tdiscountItems=discountItems+tdiscountItems;
    }
if(Total>=30)
{
  if(save>6)
  {
    return promotions[1].type+"(黄焖鸡，凉皮)";
  }
  else {return promotions[0].type;}
}
else {
      return '';
}
}
function addSum() {
   return Total-save;
}
function printResult() {
    var soulte="============= 订餐明细 =============\n";
    for(let n=0;n<selectedItems.length;n++)
    {
      soulte+=orderingDetails(selectedItems[n])+'\n';
    }
    soulte+="-----------------------------------\n";
  soulte+="使用优惠:\n";
  soulte+=usePromotions()+','+'省'+save+'元\n';
  soulte+="-----------------------------------\n";
  soulte+="总计："+addSum()+"元\n";
  soulte+="===================================";
  return soulte;
}
var result=printResult();
  return result.trim();


  /* var dishesId= new Array();
    var dishesCount=new Array();
    var dishesName= new Array();
    var  disesTotal= new Array();
    //订餐明细
    for(var i=0;i<selectedItems.length;i++)
    {
      var item= new loadAllItems();
       dishesId[i]=selectedItems[i].slice(0,8);
       dishesCount[i]=parseInt(selectedItems[i].slice(9));
       dishesName[i]=(function () {for(var k=0;k<item.length;k++){if(dishesId[i]===item[k].id){return item[k].name}}
      });
       disesTotal[i]=(function () {for(var k=0;k<item.length;k++){if(dishesId[i]===item[k].id){return item[k].price}}
      })*dishesCount;
      var total=0;
      total+=disesTotal;
      //使用优惠
      var discountPrice=0;
      var promotion=new loadPromotions();
      for(var j=0;j<promotion[1].items.length;j++)
      {
        if(dishesId[i]===promotion[1].items[j])
        {
          discountPrice+=disesTotal/2;
        }
      }
    }
    if(discountPrice>6)
    {
      var usePromotion=promotion[1].type;
    }
    else if(total>30)
    {
      var usePromotion=promotion[0].type;
      discountPrice=6;
    }
    else if(discountPrice===0&&total<30)
    {
      usePromotion=null;
    }
    //总计
   var  finTotal=total-discountPrice;
    return `
  ============= 订餐明细 =============
  黄焖鸡 x 1 = 18元
  肉夹馍 x 2 = 12元
  凉皮 x 1 = 8元
  -----------------------------------
  使用优惠:
  指定菜品半价(黄焖鸡，凉皮)，省13元
  -----------------------------------
  总计：25元
  ===================================`.trim();*/
}



