let User = {
	//查询用户名
	queryUserName( param ) {
		//非第三方
		if(param.userName) {
			return `select * from user where userName = '${param.userName}' or phone = '${param.userName}'`;
		}else {
			//第三方
			return `select * from user where provider = '${param.provider}' or openid = '${param.openid}'`;
		}
	},
	//验证用户名和密码
	queryUserPwd( param ) {
		return `select * from user where userName = '${param.userName}' or phone = '${param.userName}' and userPwd = '${param.userPwd}'`;
	},
	//增加一条用户数据
	insertData( param ) {
		//导入MD5
		let md5 = require('js-md5');
		//生成token
		let jwt = require('jsonwebtoken');
		//token
		let token = jwt.sign({
		  exp: Math.floor(Date.now() / 1000) + (60 * 60),
		  data: param.openid
		}, 'myuniapp');
		//昵称
		let nike = param.nickName || '默认名称';
		let userName = param.userName || '18888888888';
		//图片路径
		let imageUrl = param.avatarUrl || '/static/img/list1.jpg';
		let openid = param.openid;
		return `insert into user
		(phone,nike,userPwd,userName,imageUrl,token,provider,openid) 
		values 
		('${userName}','${nike}','1234567','${userName}','${imageUrl}','${token}','${param.provider}','${param.openid}')`;
	}
}
module.exports = User;