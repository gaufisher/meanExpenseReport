
angular.module('QuickrBooks').controller('ModalInstanceCtrl',
    // ['$scope', '$uibModalInstance', 'veiwReceipt', 'PDFViewerService', 'editReceipt', function ($scope, $uibModalInstance, veiwReceipt, pdf, editReceipt) {
    ['$scope', '$uibModalInstance', 'PDFViewerService', 'editReceipt', function ($scope, $uibModalInstance, pdf, editReceipt) {
        // $scope.receiptModalView = veiwReceipt.imgPath;
        // $scope.receiptModalName = veiwReceipt.name;
        var index = editReceipt.index;
        $scope.currentName = editReceipt.receipts[index].name;

        $scope.viewer = pdf.Instance("viewer");

        $scope.nextPage = function() {
            $scope.viewer.nextPage();
        };

        $scope.prevPage = function() {
            $scope.viewer.prevPage();
        };

        $scope.pageLoaded = function(curPage, totalPages) {
            $scope.currentPage = curPage;
            $scope.totalPages = totalPages;
        };

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.save = function () {
            $uibModalInstance.close();
        };
    }]);
