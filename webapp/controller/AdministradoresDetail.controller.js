sap.ui.define([
    "./BaseController"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";
        var that;
        return BaseController.extend("com.softteck.proyectoempresa.controller.AdministradoresDetail", {

            onInit: function () {
                that = this;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("AdministradoresDetail").attachPatternMatched(this._onPatternMatched, this);
            },
            _onPatternMatched: function (oEvent) {
                var sAdmin = oEvent.getParameter("arguments").idAdmin;
                var oModel = this.getOwnerComponent().getModel();
                oModel.metadataLoaded().then(function () {
                    var that = this; 
                    var sPath = `/AdminSet('${sAdmin}')`;
                    this.getView().bindElement({
                        path: sPath,
                        events: {
                            dataRequested: function () {
                                that.getView().setBusy(true);
                            },
                            dataReceived: function () {
                                that.getView().setBusy(false);
                            }
                        }
                    });
                }.bind(this));
            },
            
            
            

            _oBindingChange: function (oEvent) {
                debugger
            }

        });
    });
