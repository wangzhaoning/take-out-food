function bestCharge(selectedItems) {
  var dishesId= new Array();
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






  return  `
============= 订餐明细 =============
${dishesName[0]} x ${dishesCount[0]} = ${disesTotal[0]}元
${finTotal[1]} x ${finTotal[1]} = ${finTotal[1]}元
${finTotal[2]} x ${finTotal[2]} = ${finTotal[2]}元
-----------------------------------
使用优惠:
${usePromotion}(黄焖鸡，凉皮)，省${discountPrice}元
-----------------------------------
总计：${finTotal}元
===================================`.trim();
}
