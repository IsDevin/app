
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/category/category","pages/profile/profile","pages/shopcart/shopcart","pages/search/search","pages/search-list/search-list","pages/detailes/detailes","pages/profile/comfig/profile-config/profile-config","pages/profile/comfig/profile-path-list/profile-path-list","pages/profile/comfig/add-path-page/add-path-page","pages/profile/myOrderPage/myOrderPage","pages/comfirmOrder/comfirmOrder","pages/login/login","pages/login-tel/login-tel","pages/login-code/login-code"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"app","compilerVersion":"2.6.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"百年奥莱","navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleNView":{"buttons":[{"float":"left","fontSrc":"./static/iconfont.ttf","text":""},{"float":"right","fontSrc":"./static/iconfont.ttf","text":""}]}}},{"path":"/pages/category/category","meta":{},"window":{"navigationBarTitleText":"分类","navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"white","scrollIndicator":"none","titleNView":{"titleColor":"#606060","searchInput":{"placeholder":"请输入关键字","disabled":true,"autoFocus":false,"backgroundColor":"#F7F7F7","borderRadius":"15px","placeholderColor":"#B3B3B3","align":"left"}}}},{"path":"/pages/profile/profile","meta":{},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/shopcart/shopcart","meta":{},"window":{"titleNView":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"white","scrollIndicator":"none","titleNView":{"titleColor":"#606060","searchInput":{"placeholder":"nike","disabled":false,"autoFocus":true,"backgroundColor":"#F7F7F7","borderRadius":"15px","placeholderColor":"#B3B3B3","align":"left"},"buttons":[{"color":"#606060","float":"right","fontSize":"16px","width":"60px","text":"搜索"}]}}},{"path":"/pages/search-list/search-list","meta":{},"window":{"navigationBarBackgroundColor":"#FFFFFF","navigationBarTextStyle":"white","scrollIndicator":"none","titleNView":{"titleColor":"#606060","searchInput":{"placeholder":"nike","disabled":true,"autoFocus":false,"backgroundColor":"#F7F7F7","borderRadius":"15px","placeholderColor":"#B3B3B3","align":"left"},"buttons":[{"color":"#606060","float":"right","fontSize":"16px","width":"60px","text":"筛选"}]}}},{"path":"/pages/detailes/detailes","meta":{},"window":{"navigationBarTitleText":"商品详情","scrollIndicator":"none","titleNView":{"type":"transparent","buttons":[{"type":"share"},{"type":"menu"}]}}},{"path":"/pages/profile/comfig/profile-config/profile-config","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/profile/comfig/profile-path-list/profile-path-list","meta":{},"window":{"navigationBarTitleText":"地址管理"}},{"path":"/pages/profile/comfig/add-path-page/add-path-page","meta":{},"window":{"navigationBarTitleText":"新增地址","titleNView":{"titleColor":"#606060","buttons":[{"color":"#606060","float":"right","fontSize":"16px","width":"60px","text":"保存"}]}}},{"path":"/pages/profile/myOrderPage/myOrderPage","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/comfirmOrder/comfirmOrder","meta":{},"window":{"navigationBarTitleText":"确认订单","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false}},{"path":"/pages/login-tel/login-tel","meta":{},"window":{"navigationBarTitleText":"输入手机号","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/login-code/login-code","meta":{},"window":{"navigationBarTitleText":"输入验证码","navigationBarBackgroundColor":"#FFFFFF"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});