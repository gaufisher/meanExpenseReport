app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'projectFactory', 'LineItemTypes', 'userFactory','Upload', '$timeout', '$uibModal', '$window',
    function ($scope, $state, expenseReportFactory, projectFactory, LineItemTypes, userFactory, Upload, $timeout, $uibModal, $window) {
        $scope.expenseReport = {};
        $scope.editReceipt = {};
        $scope.project = {};

        $scope.hasProject = true;

        $scope.expenseReport.receipts = [];
		$scope.showButton = false;
		$scope.valid = true;

        $scope.setExpenseReport = function () {

            $scope.dropdownvalue = {};
			      if($scope.expenseReport.items.length > 0)
				        $scope.showButton = true;

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

        $scope.expenseReport.items = [];

        var persist = function (status) {
            $scope.expenseReport.status = status;
            for (var i = 0; i < $scope.expenseReport.items.length; i++) {

                var datMoney = $scope.expenseReport.items[i].value.toString();
                $scope.expenseReport.items[i].value = datMoney;

            }
            //console.dir($scope.expenseReport.receipts);
            expenseReportFactory.createExpenseReport($scope.expenseReport).then(
              function (success) {				
				  if(status === "submitted"){
					  expenseReportFactory.sendEmail($scope.expenseReport);
				  }
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
			$scope.valid = true;
			for(var i = 0; i < $scope.expenseReport.items.length; i++){
				if($scope.expenseReport.items[i].value === undefined || $scope.expenseReport.items[i].value < 0.01){
					$scope.valid = false;
				}
			}
			if($scope.valid){
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
			}

        };


        $scope.submit = function () {
			$scope.valid = true;
			for(var i = 0; i < $scope.expenseReport.items.length; i++){
				if($scope.expenseReport.items[i].value === undefined || $scope.expenseReport.items[i].value < 0.01){
					$scope.valid = false;
				}
			}
			if($scope.valid){
				if ($scope.expenseReport.project === undefined || Object.keys($scope.expenseReport.project).length === 0) {
					delete $scope.expenseReport.project;
				}
				if ($scope.expenseReport.project != null) {
						  if ($scope.expenseReport.status != null) {
						$scope.expenseReport.status = "submitted";
						updateReport();
					} else {
						console.log("reached else")
						
						persist("submitted");
					}

				} else {
					$scope.hasProject = false
				}
			}

        };

        $scope.unsubmit = function (reportId) {
            $scope.expenseReport.status = "saved";

           if(Array.isArray($scope.expenseReport.unsubmitReasons)){
             $scope.expenseReport.unsubmitReasons.push({date:new Date(), notes:$scope.expenseReport.unsubmitReason})
           }
           else{
             $scope.expenseReport.unsubmitReasons = [];
             $scope.expenseReport.unsubmitReasons.push({date:new Date(), notes:$scope.expenseReport.unsubmitReason});
           }
           console.log($scope.expenseReport)

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

        $scope.LineItemTypes = LineItemTypes.data;

        /************************* Receipt functions required *****************************/

        $scope.onFileSelect = function(elem) {
            var isFileAlreadyUploaded = isFileExist(elem.files[0].name);
            var fileType = getFileType(elem.files[0].name);
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
                $scope.fileError = "Invalid file type, only jpg, jpeg, gif, and png accepted.";
            }
        }

        $scope.inputFileClick = function(elem) {
          //console.dir(elem);
            $scope.fileError = "";
        }

        $scope.removeUploadPreview = function() {
            $scope.picFile = null;
            $scope.fileError = "";
            $scope.newFileName = "";
        }

        $scope.uploadReceipt = function(file) {
            var name = getFileName($scope.newFileName, file.name);
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
                    $scope.fileError = "Invalid file type, only jpg, jpeg, gif, and png accepted.";
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
            if (fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "png") {
                return true;
            }
            return false;
        }

        var addFileToExpenseReport = function(file) {
            var type = getFileType(file.name);
            var fileDataString = file.$ngfDataUrl.split("base64,");
			//console.log(fileDataString);
            var receipt = {};

            receipt.name = getFileName($scope.newFileName, file.name);
            receipt.imgPath = "uploads/" + file.name;
            receipt.fileType = type;
            receipt.dataString = fileDataString[1];

            $scope.expenseReport.receipts.push(receipt);
        }

        var getFileName = function(newName, fileName) {
            if (newName !== undefined) {
                if (newName !== "") {
                   return newName.trim();
                }
                return fileName;
            } else {
                return fileName;
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

        $scope.saveChangeName = function() {
            var name = getFileName($scope.changeName, $scope.editReceipt.name);
            var isFileAlreadyUploaded = isFileExist(name);

            if (isFileAlreadyUploaded) {
                $scope.invalidFile = true;
                $scope.fileError = "Receipt with name already exist.";
            } else {
                $scope.editReceipt.name = name;
                $scope.expenseReport.receipts.push($scope.editReceipt);
                $scope.editReceipt = null;
                $scope.editFile = false;
                $scope.changeName = "";
            }
        }

        $scope.cancelChangeName = function() {
            $scope.expenseReport.receipts.push($scope.editReceipt);
            $scope.editReceipt = null;
            $scope.editFile = false;
            $scope.changeName = "";
        }

        $scope.editFileFromScopeAndReport = function(index) {
            $scope.removeUploadPreview();
            $scope.editReceipt = $scope.expenseReport.receipts[index];
            $scope.editFile = true;
            $scope.removeFileFromScopeAndReport(index);
        }

    }
]);
