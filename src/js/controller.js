
/*
*这里是其它模块，包含留言列表模块，内容模块。
*/


var listM = angular.module('listM', []);

// list控制器
listM.controller('listCtrl', function($scope, $http){
		$scope.allData = 0;
		$scope.pageConfig = {
	        pageSize: 4
	    };

		$http.get('./data/getLiuYan.php')
        .success(function(data) {
			//整理 得到回复 数组	
			var replayData = [];
			var newData = [];
			for(var i = 0; i< data.length; i++){
				if( data[i]['cid'] != '0' ){
					replayData.push(data[i]);
				}
				else{
					newData.push(data[i]);
				}
			}
			// 根据cid 判断回复是谁的
			// alert(newData.length);
			// alert(replayData.length);
			for(var j = 0; j< newData.length; j++){
				newData[j]['replay'] = [];
				for(var i = 0; i< replayData.length; i++){
					if( replayData[i]['cid'] == newData[j]['id'] ){
						newData[j]['replay'].push(replayData[i]);
					}
				}
			}
			// alert(newData[2]['replay'].length);
			$scope.allData = newData;		

        	$scope.dataLen = newData.length;
        	// alert(data.length);
        	$scope.allPage = Math.ceil($scope.dataLen / $scope.pageConfig.pageSize);

        	//在这里调用设置数据函数 ，因为success方法最后执行。如果在后面调用会取不到data值
        	$scope.setData(1, $scope.pageConfig.pageSize);
        });
        $scope.setData = function(page, pagesize){
        	$scope.nowPage = page;
        	$scope.data = $scope.allData.slice((page - 1) * pagesize, page * pagesize);
        	$scope.firstData = true;
        	//判断数据没有了，则不让点击下一页；
        	if( page*pagesize >= $scope.dataLen )
        		$scope.endData = true;
        	else if( page <= 1 ){
        		$scope.firstData = true;
        		$scope.endData = false;
        	}
        	else{
        		$scope.firstData = false;
        		$scope.endData = false;
        	}
        }
});

// list自定义过滤
// listM.filter('strc', function(){
// 	return function(str){
// 		//处理

// 		return str;
// 	}
// });


// 表单模块
var liuYan = angular.module('liuYan', []);

// 表单控制器
liuYan.controller('formCtrl', function($scope, $http, $routeParams){ 
	//给表单初始化
	$scope.userInfo = {
		name : "xx",
		email : "xx@xxx.xx",
		content : "xxxxxx",
		cid : '',
		time : '',
		headimg : ''
	}

	// 判断是否有参数
	if($routeParams.cid){
		$scope.panelHead = "回复@" + $routeParams.name;
		$scope.userInfo.cid = $routeParams.cid;
	}else{
		$scope.panelHead = "编辑留言";
		$scope.userInfo.cid = '0';
	}
	$scope.sendState = "提交状态";

	$scope.reset = function(){
		$scope.userInfo = {
			name : "",
			email : "",
			content : ""
 		}
    } 

	$scope.sendData = function(){
		// alert($routeParams.cid);
		$scope.sendState = "正在提交...";

		$scope.userInfo.time = Date.parse(new Date());
		// alert($scope.userInfo.time);
		// return false;
		$scope.userInfo.headimg = Math.ceil(Math.random()*5);

		$http.post('./data/addLiuYan.php', JSON.stringify($scope.userInfo))
			.success(function(data) {
 
            if (!data.success) {
                $scope.btn = false;
                $scope.sendState = data.errors.sql;
            } else {
                $scope.sendState = data.message;
                $scope.btn = true;
            }
        });
	}

});

