'use strict';
angular
.module('dataoutputEditor', ['ngMaterial'])
.directive('dataoutputEditor', function () {
    return {
        scope: {
            layerId: '@',
            doOnSubmit: '&'
        },
        templateUrl: "frontend/components/layers/basic/dataoutput/dataoutput-editor.html",
        controller: function ($scope, networkDataService, layerService, datasetService, dataoutputLayer) {
            this.$onInit = function () {
                // setUpLayerParams($scope, networkDataService, layerService);
                $scope.lossFunctionList = dataoutputLayer.getLossFunctions();
                $scope.selectedDB = null;
                $scope.datasetIdList = null;

                datasetService.getDatasetsInfoStatList().then(
                    function successCallback(response) {
                        var tinfo = response.data;
                        var tlist = [];
                        for(var ii=0; ii<tinfo.length; ii++) {
                            var tmp = {
                                id:         tinfo[ii].id,
                                text:       tinfo[ii].name + ' (' + tinfo[ii].id + ')',
                                shape:      tinfo[ii].shapestr,
                                numLabels:  tinfo[ii].info.numLabels
                            };
                            tlist.push(tmp);
                        }
                        $scope.datasetIdList = tlist;
                        if($scope.datasetIdList.length>0) {
                            $scope.selectedDB = $scope.datasetIdList[0];
                        }
                        setUpLayerParams($scope, tlist, networkDataService, layerService);
                    },
                    function errorCallback(response) {
                        console.log(response.data);
                    });

                // $scope.optimizers = dataoutputLayer.getOptimizers();

                $scope.onSubmit = function () {
                    var layer = networkDataService.getLayerById($scope.layerId);
                    editLayer(layer);
                    networkDataService.pubNetworkUpdateEvent();
                    $scope.doOnSubmit();
                };

                function editLayer(layer) {
                    layer.params.lossFunction = $scope.lossFunction;
                    if ($scope.selectedDB) {
                        layer.params.datasetId = $scope.selectedDB.id;
                    }
                    // layer.params.optimizer = $scope.optimizer;
                }

                function setUpLayerParams($scope, dataSetList, networkDataService, layerService) {
                    var currentLayer = networkDataService.getLayerById($scope.layerId);
                    // var layerParams = networkDataService.getLayerById($scope.layerId).params;
                    var savedParams = currentLayer.params;
                    $scope.lossFunction = savedParams.lossFunction;
                    var savedDataSetIndex = -1;
                    for (var i = 0; i < dataSetList.length; i++) {
                        if (savedParams['datasetId'] == dataSetList[i].id) {
                            savedDataSetIndex = i;
                        }
                    }
                    if (savedDataSetIndex > -1) {
                        $scope.selectedDB = $scope.datasetIdList[savedDataSetIndex];
                    } else {
                        if(dataSetList.length > 0) {
                            $scope.selectedDB = dataSetList[0];
                        }
                        currentLayer.params = layerService.getLayerByType(currentLayer.layerType).params;
                    }





                    // var defaultParams = layerService.getLayerByType(currentLayer.layerType).params;
                    // setUpParam($scope, savedParams, defaultParams, 'datasetType');
                    // setUpParam($scope, savedParams, defaultParams, 'datasetId');
                    // $scope.optimizer = layerParams.optimizer;
                }

                // function setUpParam($scope, savedParams, defaultParams, param) {
                //     if (savedParams[param] == "") {
                //         $scope[param] = defaultParams[param];
                //     } else {
                //         $scope[param] = savedParams[param];
                //     }
                // }
            }
        }
    }
});