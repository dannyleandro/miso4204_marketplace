/* ========================================================================
 * Copyright 2014 miso4204
 *
 * Licensed under the MIT, The MIT License (MIT)
 * Copyright (c) 2014 miso4204
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 * ========================================================================
 
 
 Source generated by CrudMaker version 1.0.0.201410261249*/
define(['controller/_bonusController', 'delegate/bonusDelegate'], function () {
    App.Controller.BonusController = App.Controller._BonusController.extend({
        postInit: function () {
            var self = this;
            this.searchTemplate = _.template($('#bonusSearch').html());
            this.listFunction = this.list;
            Backbone.on(this.componentId + '-' + 'bonus-searchBonus', function (call,cont) {
                self.searchBonus(self.call,self.cont);
            });

        },
        search: function (callback,context) {
            this.call = callback;
            this.cont = context;
            if (App.Utils.eventExists(this.componentId + '-' + 'instead-bonus-search')) {
                Backbone.trigger(this.componentId + '-' + 'instead-bonus-search', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-bonus-search', {view: this});
                this.currentModel = new this.modelClass({componentId: this.componentId});
                this._renderSearch();
                Backbone.trigger(this.componentId + '-' + 'post-bonus-search', {view: this});
            }
        },
        _renderSearch: function () {
            var self = this;
            this.$el.slideUp("fast", function () {
                self.$el.html(self.searchTemplate({componentId: self.componentId, bonus: self.currentModel}));
                self.$el.slideDown("fast");
            });
        },
//        postInit: function () {
//            this.searchTemplate = _.template($('#bonusSearch').html());
//            this.listFunction = this.list;
//            var self = this;
//            Backbone.on(this.componentId + '-' + 'bonus-searchBonus', function(params) {
//                self.searchBonus(params);
//            });
//        },
//        showSearch: function () {
//            if (App.Utils.eventExists(this.componentId + '-' + 'instead-bonus-search')) {
//                Backbone.trigger(this.componentId + '-' + 'instead-bonus-search', {view: this});
//            } else {
//                Backbone.trigger(this.componentId + '-' + 'pre-bonus-search', {view: this});
//                this.currentModel = new this.modelClass({componentId: this.componentId});
//                this._renderSearch();
//                Backbone.trigger(this.componentId + '-' + 'post-bonus-search', {view: this});
//            }
//        },
        searchBonus: function (callback,context) {
            var self = this;
            this.setSearchList(true);
            var model = $('#' + this.componentId + '-bonusSearchForm').serializeObject();
            if (!this.searchModel) {
                this.searchModel = model;
            }
            else {
                if (model.minDate || model.maxDate) {
                    this.searchModel.minDate = model.minDate;
                    this.searchModel.maxDate = model.maxDate;
                }
            }
            this.searchModel.page = this.currentList.state.currentPage;
            this.searchModel.maxRecords = this.pageSize;
            
            var delegate = new App.Delegate.BonusDelegate();
            console.log("llama delegate" + this.searchModel);
            delegate.searchBonus(this.searchModel, function (data) {
                self.currentList.reset(data.records);
                var pages = Math.ceil(data.totalRecords / self.pageSize);
                console.log("pages: " + pages);

               callback.call(context, {data: self.currentList, page: self.currentList.state.currentPage, pages: pages, totalRecords: data.totalRecords});
            }, function (data) {
                console.log("error dcs");
                Backbone.trigger(self.componentId + '-' + 'error', {event: 'bonus-search', view: self, id: '', data: data, error: 'Error in bonus search'});
            });
            console.log("Entro al search" + this.searchModel);
        },
        setSearchList: function (flag) {
            if (flag) {
                this.listFunction = this.searchBonus;
            } else {
                this.listFunction = this.list;
            }
        },
        list: function (params, callback, context) {

            this.setSearchList(false);
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' + 'instead-bonus-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-bonus-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-bonus-list', {view: this, data: data});
                var self = this;
                if (!this.currentList) {
                    this.currentList = new this.listModelClass();
                    if (this.pageSize) {
                        this.currentList.setPageSize(this.pageSize);
                    }
                }
                this.currentList.fetch({
                    data: data,
                    success: function (resp) {
                        callback.call(context, {data: self.currentList, page: resp.state.currentPage, pages: resp.state.totalPages, totalRecords: resp.state.totalRecords});
                        Backbone.trigger(self.componentId + '-' + 'post-bonus-list', {view: self});
                    },
                    error: function (mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'bonus-list', view: self, error: error});
                    }
                });
            }
        }
    });
    return App.Controller.BonusController;
}); 