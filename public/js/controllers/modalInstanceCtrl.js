

angular.module('QuickrBooks').controller('ModalInstanceCtrl',
    ['$scope', '$uibModalInstance', 'veiwReport', function ($scope, $uibModalInstance, veiwReport) {
        $scope.receiptModalView = veiwReport.path;
        $scope.receiptModalName = veiwReport.name;

        $scope.ok = function () {
            $uibModalInstance.close();
        };
    }]);
