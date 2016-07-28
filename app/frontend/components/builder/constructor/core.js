'use strict';


angular.module('constructorCore', [
  'palette',
  'graph'
]);

var editorDefinition = {
	templateUrl: 'frontend/components/builder/constructor/core.html',
	controller: ConstructorController,
	controllerAs: 'cstr',
	bindings: {

	}
}

angular.module('constructorCore')
	.service('constructorLoaderService', ConstructorLoaderService)
	.service('constructorService', ['constructorLoaderService', ConstructorDataService])
	.component('constructor', editorDefinition);

function ConstructorDataService(constructorLoaderService) {
	var categories = constructorLoaderService.loadLayerCategories();

    var paletteElements = constructorLoaderService.loadNetworksLayers();

  	var nodes = constructorLoaderService.loadSavedNetwork();

    this.getCategories= function() {
    	return categories;
    };

    this.getPaletteElements= function() {
    	return paletteElements;
    };

	this.getNodes = function() {
    	return nodes;
    };

	this.addNode = function(node) {
		nodes.push(node);
	};

	this.updateNode = function(node) {
		nodes.push(node);
	};
}

function ConstructorLoaderService() {
	
	this.loadSavedNetwork = function () {
		var network = [
			{
				id: 1,
				name : 'websocket',
				content : 'web',
				category : 'input',
				pos: {x: 100, y: 200},
				wires: [
					2
				]
			}, {
				id: 2,
				name : 'socket',
				content : 'socket',
				category : 'input',
				pos: {x: 300, y: 300},
				wires: [
					3, 1
				]
			}, {
				id: 3,
				name : 'db',
				content : 'db',
				category : 'output',
				pos: {x: 300, y: 500},
			}
		];
		
		return network
	};
	
	this.loadNetworksLayers = function () {
		var networksLayers = [
			{
				id: 1,
				name : 'websocket',
				content : 'web',
				category : 'input',
				pos: {x: 100, y: 200},
			}, {
				id: 2,
				name : 'socket',
				content : 'socket',
				category : 'input',
				pos: {x: 300, y: 300},
			}, {
				id: 3,
				name : 'db',
				content : 'db',
				category : 'output',
				pos: {x: 300, y: 500},
			}
		];

		return networksLayers;
	};

	this.loadLayerCategories = function () {

		var categories = [
			{
				name : 'input',
			},
			{
				name : 'output',
			}
		];

		return categories;
	}
}

function ConstructorController() {

	this.$onInit = function() {

    };
}


