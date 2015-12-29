
app.service('receiptFactory', ['$http', function ($http) {
    return {
        uploadFile: function(receipt) {
            var fd = new FormData();
            fd.append('receipt', receipt);
            $http.post('/app/receipt/upload', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
              console.log("Uploaded");
            })
            .error(function(){
              console.log("Upload Failed");
            });
        }
    };

}]);
