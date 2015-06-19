/*
*这是一个入口文件，依赖注入了其它模块
*/
var LiuYanBan = angular.module('LiuYanBan', ['ngRoute', 'listM', 'liuYan']);

// LiuYanBan.directive('list', function(){
// 	return {
// 		restrict: 'E',
// 		replace : true,
// 		transclude: true,
// 		template: '<div>Hi there<span ng-transclude></span></div>',
// 		link : function(scope, element, attrs){
// 			alert(element);
// 		}
// 	};
// });

LiuYanBan.config(function($routeProvider){
	$routeProvider.when('/index', {
		templateUrl : 'tpl/list.html',
		controller : "listCtrl"
		})
	.when('/form', {
		templateUrl : "tpl/form.html",
		controller : "formCtrl"
	})
	.when('/replay/:cid/:name', {
		templateUrl : "tpl/form.html",
		controller : "formCtrl"
	})
	.otherwise({
		redirectTo: "/index"
	})
});
