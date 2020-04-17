var express = require('express');
var connection = require('../db/sql.js');
var router = express.Router();
var userSql = require('../db/userSql.js');


//设置允许跨域访问该服务.
router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 第三方登录接口
router.post('/api/otherLogin',function(req,res,next){
	let params = {
		provider: req.body.provider,
		openid:req.body.openid,
		nickName:req.body.nickName,
		avatarUrl:req.body.avatarUrl
	}
	new Promise((resolved,rejct) => {
		//先查询是否存在
		connection.query(userSql.queryUserName(params),function(error,results) {
			if(error) {
				return rejct(error);
			}
			return resolved(results)
		})
	})
	.then(result => {
		//有数据
		if(result.length > 0) {
			res.send({
				success:true,
				userInfo: result[0]
			})
		//没数据
		}else {
			connection.query(userSql.insertData(params),function(fail,data) {
				if(fail) {
					console.log(fail);
					return;
				}
				connection.query(userSql.queryUserName(params),function(eor,rel) {
					if(eor) {
						console.log(eor);
						return;
					}
					//获取数据
					res.send({
						success:true,
						userInfo:rel[0],
						msg:'登录成功'
					})
				})
			})
		}
	})
	.catch(err => {
		console.log(err);
	})
	
})

//token验证
router.post('/api/test',function(req,res,next) {
	res.send({
		data:'成功'
	})
})

router.post('/api/register',function(req,res,next){
	let params = {
		userName:req.body.phoneNumber
	}
	//查询手机号是否存在
	connection.query(userSql.queryUserName(params),function (error,results,fields) {
		if(results.length > 0) {
			//手机号已经存在
			res.send({
				success: false,
				msg:'号码以存在。。。'
			})
		}else {
			connection.query(userSql.insertData(params),function(err,results,fields){
				if(err) {
					console.log(err.message);
					return;
				}
				console.log('插入成功：'+results);
				res.send({
					success: true,
					msg:'注册成功'
				})
			})
		}
	})
});

router.post('/api/login',function(req,res,next) {
	let params = {
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}
	//查询用户的手机号或用户名是否存在
	connection.query(userSql.queryUserName(params), function (error, results, fields) {
		if(error) return;
		if(results.length > 0) {
			//查询用户密码是否正确
			connection.query(userSql.queryUserPwd(params), function (error, results, fields){
				if(results.length > 0) {
					res.send({
						success: true,
						msg:'登录成功',
						userInfo:results[0]
					})
				}else {
					res.send({
						success: false,
						msg:'密码不正确',

					})
				}
			})
		}else {
			res.send({
				success: false,
				msg:'用户名或手机号码不存在'
			})
		}
	});
})
router.get('/api/goods/categoryList',function(req,res,next) {
	res.send({
		"code":'0',
		"data":[
			{
				"id":1,
				"name":'家具家纺',
				"data":[
					{
						"name":"家纺",
						"list":[
							{
								"id":1,
								"name":"毛巾/浴巾",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":2,
								"name":"枕头/被子",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":3,
								"name":"沙发",
								"imgUrl":"/static/img/list1.jpg"
							}
						]
					},
					{
						"name":"生活用品",
						"list":[
							{
								"id":1,
								"name":"浴室用品",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":2,
								"name":"洗晒",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":3,
								"name":"洗发露",
								"imgUrl":"/static/img/list1.jpg"
							}
						]
					}
				]
			},
			{
				"id":2,
				"name":'女装',
				"data":[
					{
						"name":"裙装",
						"list":[
							{
								"id":1,
								"name":"半身裙",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":2,
								"name":"连衣裙",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":3,
								"name":"古装裙",
								"imgUrl":"/static/img/list1.jpg"
							}
						]
					},
					{
						"name":"上衣",
						"list":[
							{
								"id":1,
								"name":"T恤",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":2,
								"name":"衬衫",
								"imgUrl":"/static/img/list1.jpg"
							},
							{
								"id":3,
								"name":"oversize",
								"imgUrl":"/static/img/list1.jpg"
							}
						]
					}
				]
			}
		]
	})
})


router.get('/api/goods/getDataById',function(req,res,next) {
	let id = req.query.id;
	connection.query(`SELECT * FROM goods_search where id = ${id}`, function (error, results, fields) {
	  if (error) throw error;
	  res.send({
	    "code": "0",
	  	"list": results
	  })
	});
})

router.get('/api/goods/search', function(req,res,next) {
	//获取key
	let [title,orderName] = Object.keys(req.query);
	//title的值
	let name =  req.query[title];
	//排序名称
	let oName = orderName;
	//排序的值
	let isDesc = req.query[orderName];
	connection.query(`SELECT * FROM goods_search where title like '%${name}%' order by ${oName} ${isDesc}`, function (error, results, fields) {
	  if (error) throw error;
	  res.send({
	    "code": "0",
	  	"list": results
	  })
	});
})

//运动户外首次加载数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
  res.send({
	  "code": 0,
	  "data": [
		  {
			  "type": 'bannerList',
			  "data": [
				  {"imageUrl":'/static/img/banner1.jpg'}
			  ]
		  },
		  {
			  "type": 'iconsList',
			  "data": [
				  	{
				  		iconsUrl: '/static/img/icons1.png',
				  		title: '进口食品'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons2.png',
				  		title: '中外名酒'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons3.png',
				  		title: '休闲食品'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons4.png',
				  		title: '居家出行'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons5.png',
				  		title: '洗护喂养'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons6.png',
				  		title: '进口食品'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons7.png',
				  		title: '进口食品'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons8.png',
				  		title: '进口食品'
				  	}
			  ]
		  },
		  {
			  "type": 'hotList',
			  data: [
				  	{
				  		id: 1,
				  		imageUrl: '/static/img/hot1.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 2,
				  		imageUrl: '/static/img/hot2.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 3,
				  		imageUrl: '/static/img/hot3.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 4,
				  		imageUrl: '/static/img/hot3.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 5,
				  		imageUrl: '/static/img/hot3.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 6,
				  		imageUrl: '/static/img/hot3.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	}	
			  ]
		  },
		  {
			  type: 'sliderList',
			  data: [
				  {
					  "recommImage" : '/static/img/shop1.jpg',
					  "data": [
						{
							id: 1,
							imageUrl: '/static/img/commodity1.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 2,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 3,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 4,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 5,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 6,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 7,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						}  
					  ]
				  }
			  ]
		  },
		  {
			  "type": "commodityList",
			  "data": [
				{
					id: 1,
					imageUrl: '/static/img/commodity1.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 2,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 3,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 4,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				}  
			  ]
		  }
	  ]
  })
});


//服饰内衣第一次加载数据
router.get('/api/index_list/3/data/1', function(req, res, next) {
  res.send({
	  "code": 0,
	  "data": [
		  {
			  "type": 'bannerList',
			  "data": [
				  {"imageUrl":'/static/img/banner1.jpg'}
			  ]
		  },
		  {
			  "type": 'iconsList',
			  "data": [
				  	{
				  		iconsUrl: '/static/img/icons1.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons2.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons3.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons4.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons5.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons6.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons7.png',
				  		title: '服饰内衣'
				  	},
				  	{
				  		iconsUrl: '/static/img/icons8.png',
				  		title: '服饰内衣'
				  	}
			  ]
		  },
		  {
			  "type": 'hotList',
			  data: [
				  	{
				  		id: 1,
				  		imageUrl: '/static/img/commodity1.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 2,
				  		imageUrl: '/static/img/commodity2.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 3,
				  		imageUrl: '/static/img/commodity3.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 4,
				  		imageUrl: '/static/img/commodity4.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 4,
				  		imageUrl: '/static/img/commodity4.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	},
				  	{
				  		id: 4,
				  		imageUrl: '/static/img/commodity4.jpg',
				  		title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
				  		price: 299,
				  		oprice: 599,
				  		discount: 7
				  	}	
			  ]
		  },
		  {
			  type: 'sliderList',
			  data: [
				  {
					  "recommImage" : '/static/img/shop1.jpg',
					  "data": [
						{
							id: 1,
							imageUrl: '/static/img/commodity1.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 2,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 3,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 4,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 4,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 4,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						},
						{
							id: 4,
							imageUrl: '/static/img/commodity2.jpg',
							title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
							price: 299,
							oprice: 599,
							discount: 7
						}  
					  ]
				  }
			  ]
		  },
		  {
			  "type": "commodityList",
			  "data": [
				{
					id: 1,
					imageUrl: '/static/img/commodity1.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 2,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 3,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				},
				{
					id: 4,
					imageUrl: '/static/img/commodity2.jpg',
					title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
					price: 299,
					oprice: 599,
					discount: 7
				}  
			  ]
		  }
	  ]
  })
});

//首页第一次加载数据
router.get('/api/index_list/data', function(req, res, next) {
  res.send({
	  "code": 0,
	  "data": {
		  "topBar": [
			{
				"id": 1,
				"name": "推荐"
			},
			{
				"id": 2,
				"name": "运动户外"
			},
			{
				"id": 3,
				"name": "服饰内衣"
			},
			{
				"id": 4,
				"name": "鞋靴箱包"
			},
			{
				"id": 5,
				"name": "美妆个护"
			},
			{
				"id": 6,
				"name": "家具数码"
			},
			{
				"id": 7,
				"name": "食品母婴"
			}	
		  ],
		  data: [
			  {
				  "type": "swiperList",
				  "data": [
					  {"imgUrl": "/static/img/swiper1.jpg"},
					  {"imgUrl": "/static/img/swiper1.jpg"},
					  {"imgUrl": "/static/img/swiper1.jpg"}
				  ]
			  },
			  {
				  "type": "recommendList",
				  "data": [
					  {
						  "id": 1,
						  "bigImg": "/static/img/Children.jpg",
						  "data": [
							  {"imgUrl": "/static/img/Children1.jpg"},
							  {"imgUrl": "/static/img/Children2.jpg"},
							  {"imgUrl": "/static/img/Children3.jpg"}
						  ]
					  },
					  {
						  "id": 2,
						  "bigImg": "/static/img/Furnishing.jpg",
						  "data": [
							  {"imgUrl": "/static/img/Furnishing1.jpg"},
							  {"imgUrl": "/static/img/Furnishing2.jpg"},
							  {"imgUrl": "/static/img/Furnishing3.jpg"}
						  ]
					  }
				  ]
			  },
			  {
				  "type": "commodityList",
				  "data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}  
				  ]
			  }
		  ]
	  }
  })
});

//首页第一次上拉加载
router.get('/api/index_list/1/data/2',function(req,res,next) {
	res.send({
		"code": 0,
		"data": [
			{
				"type": 'commodityList',
				"data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				]
			}
		]
	})
});

//运动户外第一次上拉加载
router.get('/api/index_list/2/data/2',function(req,res,next) {
	res.send({
		"code": 0,
		"data": [
			{
				"type": 'commodityList',
				"data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				]
			}
		]
	})
});


//运动户外二次上拉加载
router.get('/api/index_list/2/data/3',function(req,res,next) {
	res.send({
		"code": 0,
		"data": [
			{
				"type": 'commodityList',
				"data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				]
			}
		]
	})
});

//运动户外三次上拉加载
router.get('/api/index_list/2/data/4',function(req,res,next) {
	res.send({
		"code": 0,
		"data": [
			{
				"type": 'commodityList',
				"data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				]
			}
		]
	})
});

//服饰内衣第一次上拉加载
router.get('/api/index_list/3/data/2',function(req,res,next) {
	res.send({
		"code": 0,
		"data": [
			{
				"type": 'commodityList',
				"data": [
					{
						id: 1,
						imageUrl: '/static/img/commodity1.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 2,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 3,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					},
					{
						id: 4,
						imageUrl: '/static/img/commodity2.jpg',
						title: '大衣毛绒大款2020，必买必买必买，今年爆款产品走过路过不要错过哦哦哦哦哦哦哦',
						price: 299,
						oprice: 599,
						discount: 7
					}
				]
			}
		]
	})
});
module.exports = router;
