const db = require("../models/index"),
  Map = db.store,
  Op = db.Sequelize.Op;

exports.map = (req, res) => {
  res.render("map");
};

//카테고리별로 상품 보여주도록 함
// exports.respondWithCategory = (req, res) => {
//   let paramsCategory = req.params.category;
//   //product.ejs를 랜더링할 때 변수 category를 product.ejs에 넘겨줌
//   // -> product.ejs에서 <% category %> 로 접근 가능해짐
//   switch (category) {
//     case 'zeroWaste' :
//       res.render("product", { category: paramsCategory});
//   }
//   res.render("product", { category: paramsCategory});
// };

//스토어 목록 가져오는 함수
exports.getStore = async (req, res) => {
  console.log("controller함수 안");
  let category = req.params.category;
  // let storelist = await Map.findAll({
  //   attributes: ['store_id', 'store_name', 'address', 'region_name', 'web_link', 'scrap_count', 'is_upcycling', 'is_zero_waste', 'is_low_carbon']
  // })
    let showlist;
  try {
    switch (category) {
      case 'zerowaste' : {
        showlist = await Map.findAll({
          attributes: ['store_id', 'store_name', 'address', 'region_name', 'web_link', 'scrap_count'],
          where: {
            is_zero_waste: 1
          }
        })
        break;
      }
      case 'upcycling' : {
        showlist = await Map.findAll({
          attributes: ['store_id', 'store_name', 'address', 'region_name', 'web_link', 'scrap_count'],
          where: {
            is_upcycling: 1
          }
        })
        break;
      }
      case 'lowcarbon' : {
        showlist = await Map.findAll({
          attributes: ['store_id', 'store_name', 'address', 'region_name', 'web_link', 'scrap_count'],
          where: {
            is_low_carbon: 1
          }
        })
        break;
      }
    }
  }catch(err) {
    return err;
  }
  console.log(showlist);
  res.render("mapwithstore", {showlist: showlist});
}
  // try {
  //   const zwlist = await Product.findAll({
  //     attributes : ['product_id', 'product_name', 'image_link', 'price', 'brand'],
  //     //where : {}
  //   })
  //   console.log(zwlist);
  //   console.log("데이터받아옴");
  //   res.render("productByCategory/zerowasteProduct", {list : zwlist});
  // }catch (err) {
  //   return err;
  // };
  // try {

  //   if (findUpcycling) {
  //     const store = await store.findAll({
  //       where: {
  //         is_upcycling: 1,
  //         attributes : ['store_id', 'store_name', 'address', 'region_name']
  //       }
  //       //where : {}
  //     })
  //   } else if (findZeroWaste) {
  //     const store = await store.findAll({
  //       where: {
  //         is_zero_waste: 1,
  //         attributes : ['store_id', 'store_name', 'address', 'region_name']
  //       }
  //     })
  //   } else if (findLowCarbon) {
  //     const store = await store.findAll({
  //       where: {
  //         is_low_carbon: 1,
  //         attributes : ['store_id', 'store_name', 'address', 'region_name']
  //       }
  //   })
  // }
  //   console.log(store);
  //   console.log("데이터받아옴");
  //   res.render("map", {list : store});
  // }catch (err) {
  //   return err;
  // };


// exports.upcyclingStore = (req, res) => {
//   let paramKeyword = req.param.paramKeyword;
  
//   this.map.findAll({
//     where: {
//       is_upcycling: true
//     }
//   });
// }