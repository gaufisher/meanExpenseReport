'use strict';

angular.module('QuickrBooks').controller('viewReportByIdCtrl', ['$scope', 'Report', 'LineItemTypes', 'expenseReportFactory', '$state', 'projectFactory', 'getAllProjects', 'Upload', '$timeout', '$uibModal', '$window',
    function($scope, Report, LineItemTypes, expenseReportFactory, $state, projectFactory, getAllProjects, Upload, $timeout, $uibModal, $window) {
        $scope.expenseReport = Report;
        $scope.LineItemTypes = LineItemTypes.data;
        $scope.hasProject = true;
        $scope.setExpenseReport = function () {
            for (var i = 0; i < $scope.expenseReport.items.length; i++)
            console.log($scope.expenseReport.items[i].value);
            if ($scope.expenseReport.hasOwnProperty('items')) {
                for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                    $scope.expenseReport.items[i].value = $scope.expenseReport.items[i].value / 100;
                }
            }
            $scope.dropdownvalue = {};
			if($scope.expenseReport.items.length > 0)
			{
				$scope.showButton = true;
			}
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                $scope.dropdownvalue.name = $scope.expenseReport.items[i].type;
                var item = {};
                item.type = $scope.dropdownvalue.name;
                for (var j = 0; j < $scope.LineItemTypes.length; j++) {
                    if ($scope.LineItemTypes[j].name === item.type) {

                        $scope.dropdownvalue = {
                            name: ''
                        };
                        $scope.LineItemTypes.splice(j, 1);
                        break;
                    }
                }
            }
        };
        var persist = function (status) {
            $scope.expenseReport.status = status;
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {
                if ($scope.expenseReport.items[i].value == null) {
                    $scope.expenseReport.items[i].value = 0.00;
                }
                var datMoney = $scope.expenseReport.items[i].value.toString();
                $scope.expenseReport.items[i].value = datMoney;

            }
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReports", {}, {
                        reload: true
                    });

                },
                function (error) {}
            );
        };

        var updateReport = function () {
            expenseReportFactory.updateExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReports", {}, {
                        reload: true
                    });
                },
                function (error) {
                    //console.log("working as intended");
                }
            );
        };

        $scope.save = function () {
            console.log($scope.expenseReport);
			if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
				delete $scope.expenseReport.project;
			}
            if ($scope.expenseReport.hasOwnProperty('status')) {
                updateReport();
            } else {
                persist("saved");
            }
            $state.go("viewReports", {}, {
                reload: true
            })
        };

        $scope.submit = function () {
			if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
                delete $scope.expenseReport.project;
            }
            if ($scope.expenseReport.project != null) {
 			    if ($scope.expenseReport.hasOwnProperty('status')) {
                    $scope.expenseReport.status = "submitted";
                    updateReport();
                } else {
                    persist("submitted");
                }
                $state.go("viewReports", {}, {
                    reload: true
                });
            } else {
                $scope.hasProject = false;
            }

        };

        $scope.unsubmit = function (reportId) {
            $scope.expenseReport.status = "saved";
            console.log($scope.unsubmitReason);
            $scope.expenseReport.unsubmitReasons.push({date: new Date(), notes: $scope.unsubmitReason});
            expenseReportFactory.updateExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("viewReport", {id: reportId}, {
                        reload: true
                    });
                },
                function (error) {
                    //console.log("working as intended");
                }
            );
        };

        $scope.addItem = function () {
            var item = {};
            item.type = $scope.dropdownvalue.name;
            $scope.showButton = true;
            var arr = $scope.expenseReport.items;
            arr.push(item);
            for (var i = 0; i < $scope.LineItemTypes.length; i++) {
                if ($scope.LineItemTypes[i].name === item.type) {
                    $scope.dropdownvalue = {
                        name: ''
                    };
                    $scope.LineItemTypes.splice(i, 1);
                    break;
                }
            }

        }

        $scope.delete = function (index) {
            var lineItem = {};
            lineItem.name = $scope.expenseReport.items[index].type;
            $scope.LineItemTypes.push(lineItem);
            //To Do: remove the line item when I press delete
            $scope.expenseReport.items.splice(index, 1);
            $scope.showButton = $scope.expenseReport.items.length < 1 ? false : true;
        };

        $scope.cancel = function () {
            $state.go("viewReports", {}, {
                reload: true
            });
        };

        /************************* Receipt functions required *****************************/

        $scope.onFileSelect = function(elem) {
            var isFileAlreadyUploaded = isFileExist(elem.files[0].name);
            var type = getFileType(elem.files[0].name);
            var isValid = isValidType(type);

            if (fileType === "pdf") {
                $scope.fileThumb = "images/pdf_icon.png";
            } else if (!isValid) {
                $scope.fileThumb = "images/sad.jpg";
            } else {
                $scope.fileThumb = elem.files[0];
            }

            if (!isFileAlreadyUploaded && fileType !== "") {
                $scope.invalidUploadFile = false;
                $scope.fileError = "";
                $scope.invalidFile = false;
            } else if (isFileAlreadyUploaded) {
                $scope.invalidUploadFile = true;
                $scope.invalidFile = true;
                $scope.fileError = "File already exist.";
            } else {
                $scope.invalidUploadFile = true;
                $scope.invalidFile = true;
                $scope.fileError = "Invalid file type, only jpg, jpeg, gif, png, and pdf accepted.";
            }
        }

        $scope.inputFileClick = function() {
            $scope.fileError = "";
        }

        $scope.removeUploadPreview = function() {
            $scope.picFile = null;
            $scope.fileError = "";
            $scope.newFileName = "";
        }

        $scope.uploadReceipt = function(file) {
            var name = getFileName(file);

            var isFileAlreadyUploaded = isFileExist(name);
            var type = getFileType(file.name);
            var isValid = isValidType(type);

            if (isValid && !isFileAlreadyUploaded) {
                file.upload = Upload.upload({
                      url: '/app/receipt/upload',
                      data: {receipt: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                        if (file.result) {
                            addFileToExpenseReport(file);
                            $scope.removeUploadPreview();
                        }
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });

                $scope.invalidFile = false;
            } else {
                if (isFileAlreadyUploaded) {
                    $scope.invalidFile = true;
                    $scope.fileError = "Receipt with name already exist.";
                } else {
                    $scope.invalidFile = true;
                    $scope.fileError = "Invalid file type, only jpg, jpeg, gif, png, and pdf accepted.";
                }
            }
        }

        $scope.removeFileFromScopeAndReport = function(index) {
            $scope.expenseReport.receipts.splice(index, 1);
        }

        var isFileExist = function(fileName) {
            var fileAlreadyExist = false;
            for (var i = 0; i < $scope.expenseReport.receipts.length; i++) {
                if (fileName === $scope.expenseReport.receipts[i].name) {
                    fileAlreadyExist = true;
                }
            }
            return fileAlreadyExist;
        }

        var getFileType = function(fileName) {
            var fileNameSections = fileName.split(".");
            return fileNameSections[fileNameSections.length-1];
        }

        var isValidType = function(fileType) {
            if (fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "png" || fileType === "pdf") {
                return true;
            }
            return false;
        }

        var addFileToExpenseReport = function(file) {
            var type = getFileType(file.name);
            var fileDataString = "";
            var receipt = {};

            receipt.name = getFileName(file);
            receipt.imgPath = "uploads/" + file.name;
            receipt.fileType = type;

            // if (type === "pdf") {
            //     receipt.dataString = "";
            // } else {
            //     fileDataString = file.$ngfDataUrl.split("base64,");
            //     receipt.dataString = fileDataString[1];
            // }

            $scope.expenseReport.receipts.push(receipt);
        }

        var getFileName = function(file) {
            if ($scope.newFileName !== undefined || $scope.newFileName !== "") {
                return $scope.newFileName;
            } else {
                return file.name;
            }
        }

        $scope.viewReceiptFile = function(elem) {
            $window.open(elem.receipt.imgPath);
            // var receipt = {};
            // receipt.imgPath = elem.receipt.imgPath;
            // receipt.name = elem.receipt.name;
            // if (elem.receipt.fileType !== "pdf") {
            //     $uibModal.open({
            //         templateUrl: 'templates/view-image.tpl.html',
            //         controller: 'ModalInstanceCtrl',
            //         resolve: {
            //             veiwReceipt: function() {
            //                 return receipt;
            //             }
            //         }
            //     });
            // } else {
            //     $uibModal.open({
            //         templateUrl: 'templates/view-pdf.tpl.html',
            //         controller: 'ModalInstanceCtrl',
            //         resolve: {
            //             veiwReceipt: function() {
            //                 return receipt;
            //             }
            //         }
            //     });
            // }
        }

        $scope.editFileFromScopeAndReport = function(index) {
            var report = {};
            report.receipts = $scope.expenseReport.receipts;
            report.index = index;

            $uibModal.open({
               templateUrl: 'templates/edit-receipt.tpl.html',
               controller: 'ModalInstanceCtrl',
               resolve: {
                   editReceipt: function() {
                       return report;
                   }
               }
           });
        }
    }
]);
