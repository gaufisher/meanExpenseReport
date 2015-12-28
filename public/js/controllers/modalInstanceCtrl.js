

angular.module('QuickrBooks').controller('ModalInstanceCtrl',
    ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

        $scope.ok = function () {
            //$uibModalInstance.close($scope.selected);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]);
