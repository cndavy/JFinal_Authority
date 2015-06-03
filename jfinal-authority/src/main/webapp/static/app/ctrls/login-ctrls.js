MainApp.controller('LoginCtrls', [ '$scope', function($scope) {

     $scope.go=function(){
    	 var k = RSAUtils.getKeyPair( $scope.exponent,'',$scope.modulus);
		 var k2 = "name=" + $scope.username + "&pwd=" + $scope.pwd;
	   	 $scope.key= RSAUtils.encryptedString(k, k2);
		
		return true;
     };

} ]);

