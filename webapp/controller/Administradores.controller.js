sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], function (Controller, MessageBox, Fragment) {
    "use strict";
    var that;
    return Controller.extend("com.softteck.proyectoempresa.controller.Administradores", {
        onInit: function () {
            debugger;
            that = this;
        },

        onCreateAdministrador: function () {

            if (!this.oCreateFragment) {
                this.oCreateFragment = Fragment.load({
                    name: "com.softteck.proyectoempresa.view.fragments.AddAdmin",
                    controller: this
                }).then(function (oDialog) {
                    that.getView().addDependent(oDialog);
                    let oModel = new sap.ui.model.json.JSONModel({
                        "Nombre": "",
                        "Apellido": "",
                        "Email": ""
                    });
                    oModel.setDefaultBindingMode("TwoWay");
                    oDialog.setModel(oModel, "AddAdmin");
                    return oDialog;
                }).catch(function (error) {
                    MessageBox.error("Error al cargar el diálogo: " + error);
                });
            }


            this.oCreateFragment.then(function (oDialog) {
                oDialog.open();
            }).catch(function (error) {
                MessageBox.error("Error al abrir el diálogo: " + error);
            });
        },


        onCrearAdminPress: function (oEvent) {
            let oEntry = oEvent.getSource().getModel("AddAdmin").getData();
            console.log(oEntry)
            var oDataModel = that.getView().getModel();
            console.log(oDataModel)
            oDataModel.create("/AdminSet", oEntry, {
                success: function () {
                    MessageBox.success("Se creó un administrador de manera correcta");
                    oDataModel.refresh(true, true);
                    that.onCerrarCrearAdminPress();

                }.bind(this),
                error: function () {
                    MessageBox.error("Se generó un error al intentar crear un nuevo administrador");
                }
            });

          
        },

        _afterCloseDialog: function (oEvent) {
            oEvent.getSource().destroy();
            that.oCreateFragment = null;
        },

        onCerrarCrearAdminPress: function () {
            if (this.oCreateFragment) {
                this.oCreateFragment.then(function (oDialog) {
                    oDialog.close();
                }).catch(function (error) {
                    MessageBox.error("Error al cerrar el diálogo: " + error);
                });
            } else {
                MessageBox.error("El fragmento no se ha cargado correctamente.");
            }
        },

        onEliminarAdmin: function(oEvent) {
            let sPath = oEvent.getSource().getBindingContext().getPath();
            var oDataModel = this.getOwnerComponent().getModel();
        
            MessageBox.confirm("¿Estás seguro de que quieres eliminar este administrador?", {
                title: "Confirmación",
                onClose: function(sAction) {
                    if (sAction === MessageBox.Action.OK) {
                       
                        oDataModel.remove(`${sPath}`, {
                            success: function() {
                                MessageBox.success("Se eliminó correctamente el administrador");
                                oDataModel.refresh(true, true);
                            },
                            error: function() {
                                MessageBox.error("Error al eliminar el administrador");
                            }
                        });
                    } else {
                        
                    }
                }
            });
        },
        
        onSelectionChange: function (oEvent) {
            debugger;
                let oTable = oEvent.getSource();
                var oSelected = oTable.getSelectedItem();
                var sAdmin = oSelected.getBindingContext().getProperty("IdAdmin");
                debugger;
                var router = that.getOwnerComponent().getRouter();
                
                router.navTo("AdministradoresDetail", {
                    
                    IdAdmin: sAdmin
                    
                });
                
        }
    });
});
