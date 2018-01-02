
    /**
     *  Red White ==> 10 11
     *  L M XL ==> 20 21 22
     *  A B C ==> 30 31 32
     **/
//后端数据模板
    /*var data = {
     "10;20;30": {
     price: 5,
     count: 1
     },
     "10;21;31": {
     price: 10,
     count: 2
     },
     "11;21;30": {
     price: 5,
     count: 1
     },
     "10;20;31": {
     price: 10,
     count: 2
     },
     "11;20;31": {
     price: 10,
     count: 9
     },
     "11;20;32": {
     price: 10,
     count: 5
     },
     "11;22;32": {
     price: 10,
     count: 6
     }
     };*/
//销售属性集
    /*var keys = [
     [10, 11],
     [20, 21, 22],
     [30, 31, 32]
     ];*/

var app = {
    SKUResult: null,               //保存最后的组合结果信息
    init (data) {
        var _this = this;
        _this.SKUResult = {};
        if (data) {
            if (data !== Object(data)) {
                throw new TypeError('Invalid object');
            }
            _this.initSKU(data);
        }
    },
    getObjKeys (obj) {              //获得对象的key
        if (obj !== Object(obj)) {
            throw new TypeError('Invalid object');
        }
        var keys = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                keys[keys.length] = key;
            }
        }
        return keys;
    },
    add2SKUResult (combArrItem, sku) {                  //把组合的key放入结果集SKUResult
        var key = combArrItem.join(":");
        var count = sku.stock_num || 0;
        
        var SKUResult = this.SKUResult;
        
        if (SKUResult[key]) {//SKU信息key属性·
            SKUResult[key].counts += count;
            SKUResult[key].is_stocks.push(sku.is_stock);
            SKUResult[key].times.push(sku.count_down);
            SKUResult[key].recIds.push(sku.sku_id);
            SKUResult[key].promotes.push(sku.is_promote);
            SKUResult[key].promote_prices.push(sku.promote_price);
            SKUResult[key].shop_prices.push(sku.price);
            SKUResult[key].stockTip.push(sku.stockTip);
        } else {
            SKUResult[key] = {
                counts: [count],
                is_stocks: [sku.is_stock],
                times: [sku.count_down],
                recIds:[sku.sku_id],
                promotes: [sku.is_promote],
                shop_prices: [sku.price],
                promote_prices: [sku.promote_price],
                stockTip: [sku.stockTip]
            };
        }
    },
    initSKU (data) {                                        //初始化得到结果集
        var i, j, skuKeys = this.getObjKeys(data);
        var _this = this;
        for (i = 0; i < skuKeys.length; i++) {
            var skuKey = skuKeys[i];//一条SKU信息key
            var sku = data[skuKey];	//一条SKU信息value
            var skuKeyAttrs = skuKey.split(":"); //SKU信息key属性值数组
            skuKeyAttrs.sort(function (value1, value2) {
                return parseInt(value1) - parseInt(value2);
            });
        
            //对每个SKU信息key属性值进行拆分组合
            var combArr = _this.combInArray(skuKeyAttrs);
            for (j = 0; j < combArr.length; j++) {
                _this.add2SKUResult(combArr[j], sku);
            }
        
            //结果集接放入SKUResult
            _this.SKUResult[skuKeyAttrs.join(":")] = {
                counts: [sku.stock_num],
                is_stocks: [sku.is_stock],
                times: [sku.count_down],
                recIds: [sku.sku_id],
                promotes: [sku.is_promote],
                promote_prices: [sku.promote_price],
                shop_prices: [sku.price],
                stockTip: [sku.stockTip]
            }
        }
    },
    /**
    * 从数组中生成指定长度的组合
    * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
    */
    combInArray (aData) {
        var _this = this;
        if (!aData || !aData.length) {
            return [];
        }
    
        var len = aData.length;
        var aResult = [];
    
        for (var n = 1; n < len; n++) {
            var aaFlags = _this.getCombFlags(len, n);
            while (aaFlags.length) {
                var aFlag = aaFlags.shift();
                var aComb = [];
                for (var i = 0; i < len; i++) {
                    aFlag[i] && aComb.push(aData[i]);
                }
                aResult.push(aComb);
            }
        }
    
        return aResult;
    },
    /**
    * 得到从 m 元素中取 n 元素的所有组合
    * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
    */
    getCombFlags(m, n) {
        if (!n || n < 1) {
            return [];
        }
    
        var aResult = [];
        var aFlag = [];
        var bNext = true;
        var i, j, iCnt1;
    
        for (i = 0; i < m; i++) {
            aFlag[i] = i < n ? 1 : 0;
        }
    
        aResult.push(aFlag.concat());
    
        while (bNext) {
            iCnt1 = 0;
            for (i = 0; i < m - 1; i++) {
                if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
                    for (j = 0; j < i; j++) {
                        aFlag[j] = j < iCnt1 ? 1 : 0;
                    }
                    aFlag[i] = 0;
                    aFlag[i + 1] = 1;
                    var aTmp = aFlag.concat();
                    aResult.push(aTmp);
                    if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                        bNext = false;
                    }
                    break;
                }
                aFlag[i] == 1 && iCnt1++;
            }
        }
        return aResult;
    }
    
};

export default {
    sku: app
}