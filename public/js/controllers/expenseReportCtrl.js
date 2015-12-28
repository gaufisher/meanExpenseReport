app.controller('expenseReportCtrl', ['$scope', '$state', 'expenseReportFactory', 'projectFactory', 'LineItemTypes', 'userFactory', 'sharedProperties','Upload', '$timeout', '$uibModal',
    function ($scope, $state, expenseReportFactory, projectFactory, LineItemTypes, userFactory, sharedProperties, Upload, $timeout, $uibModal) {
        $scope.expenseReport = {};

        $scope.project = {};

        $scope.hasProject = true;
        $scope.showButton = false;

        $scope.receipts = [];

        $scope.setExpenseReport = function () {
            $scope.expenseReport = sharedProperties.getExpenseReport();

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
            addReportReceiptsToScopeReceipts();
        };

        $scope.expenseReport.items = [];
        //$scope.expenseReport.receipts = [];

        var persist = function (status) {
            sharedProperties.setExpenseReport({
                items: [],
                receipts: []
            });
            $scope.expenseReport.status = status;
            $scope.expenseReport.user = sharedProperties.getUserId();
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
            sharedProperties.setExpenseReport({
                items: [],
                receipts: []
            });
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
					$scope.expenseReport.status = "submitted";
                }
				expenseReportFactory.sendEmail($scope.expenseReport);
                $state.go("viewReports", {}, {
                    reload: true
                });
            } else {
                $scope.hasProject = false
            }

        };

        $scope.unsubmit = function () {
            $scope.expenseReport.status = "saved";

            expenseReportFactory.updateExpenseReport($scope.expenseReport).then(
                function (success) {
                    $state.go("expenseReport", {}, {
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
            sharedProperties.setExpenseReport({
                items: []
            });
            $state.go("viewReports", {}, {
                reload: true
            });
        };

        $scope.LineItemTypes = LineItemTypes.data;

        /************************* Receipt functions required *****************************/

      $scope.onFileSelect = function(elem) {
          var isFileAlreadyUploaded = isFileExist(elem.files[0].name);
          var fileType= getFileType(elem.files[0].name);
          $scope.fileNamePreview = elem.files[0].name;

          if (fileType === "pdf") {
              $scope.fileThumb = "images/pdf_icon.png";
          } else if (fileType === "") {
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

      $scope.removeUploadPreview = function() {
          $scope.picFile = null;
          $scope.fileThumb = null;
      }

      $scope.uploadReceipt = function(file) {
          file.upload = Upload.upload({
                url: '/app/receipt/upload',
                data: {receipt: file},
          });

          file.upload.then(function (response) {
              $timeout(function () {
                  file.result = response.data;
                  if (file.result) {
                      addFileToExpenseReport(file);
                      addFileToScopeReceipts(file);
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
      }

      var addReportReceiptsToScopeReceipts = function() {
          var receipts = $scope.expenseReport.receipts;

          $scope.receipts = [];

          for (var i = 0; i < receipts.length; i++) {
              console.log("receipts[i] ");
              console.dir(receipts[i]);
              addFileToScopeReceipts(receipts[i]);
          }
      }

      $scope.removeFileFromScopeAndReport = function(index) {
          $scope.expenseReport.receipts.splice(index, 1);
          $scope.receipts.splice(index, 1);
      }

      var addFileToExpenseReport = function(file) {
          var receipt = {};
          // var img = {};

          // img.data = null;
          // img.contentType = getFileType(file.name);

          receipt.name = file.name;
          receipt.imgPath = "uploads/" + file.name;
          // receipt.img = img;

          var arr = $scope.expenseReport.receipts;
          arr.push(receipt);
      }

      var isFileExist = function(fileName) {
          var fileAlreadyExist = false;
          for (var i = 0; i < $scope.receipts.length; i++) {
              if (fileName === $scope.receipts[i].name) {
                  fileAlreadyExist = true;
              }
          }
          return fileAlreadyExist;
      }

      var addFileToScopeReceipts = function(file) {
          var receipt = {};
          receipt.name = file.name;
          var fileType = getFileType(file.name);

          if (fileType ==="pdf") {
              receipt.imgThumb = "images/pdf_icon.png";
          } else {
              receipt.imgThumb = "uploads/" + file.name;
          }

          receipt.img = "uploads/" + file.name;

          $scope.receipts.push(receipt);
      }

      var getFileType = function(fileName) {
          var fileNameSections = fileName.split(".");
          var fileType = fileNameSections[fileNameSections.length-1];
          var type = "";

          if (fileType === "jpg" || fileType === "jpeg" || fileType === "gif" || fileType === "png") {
              type = "image/" + fileType;
          } else if (fileType === "pdf") {
              type = fileType;
          }
          return type;
      }

      $scope.viewReceiptFile = function(elem) {
          var receipt = {};
          receipt.path = elem.receipt.img;
          receipt.name = elem.receipt.name;
          $uibModal.open({
              templateUrl: 'templates/view-receipt.tpl.html',
              controller: 'ModalInstanceCtrl',
              resolve: {
                  veiwReport: function() {
                      return receipt;
                  }
              }
          });
      }

      var getFileDataURL = function(file) {
            var reader  = new FileReader();

            reader.onloadend = function () {
                return reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                return "";
            }
        }

    }
]);
