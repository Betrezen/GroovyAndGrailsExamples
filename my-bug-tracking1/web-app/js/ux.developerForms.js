/**
 * An Application
 *
 * @author    krozin
 * @copyright (c) 2011, "Mera NN"
 * @date      November 2011
 * @version   $Id$
 *
 **/


var createAddForm = function()
{
	var textarea = new Ext.form.TextField({
              xtype: 'textfield',
              id: 'name',
              fieldLabel: 'name',
              allowBlank:false,
              anchor: '100%'		
	});
	var addForm = new Ext.FormPanel({
	  url: 'developer/createdeveloper?operation=create',
	  method: 'GET',
	  autoDestroy: true,
	  buttonAlign: 'center',
	  monitorValid:true,
	  items: [textarea],
	  buttons: [{
	        text: 'Add',
	        formBind:true,
	        handler: function() {
	            addForm.getForm().submit({
	                waitTitle: 'please wait...',
	                waitMsg: 'wait...',
   	                success: function(form, action) {
       					Ext.Msg.alert('Status', 'Action is successfully.');
       					Ext.getCmp('developersID').getRootNode().reload();
       					Ext.getCmp('CreateDeveloperFormID').close();
   	                },
                    failure: function(form,action){
                        console.info(action.result.errormsg)
                        Ext.Msg.alert('Status', 'Action is failed:'+action.result.errormsg);
                        Ext.getCmp('CreateDeveloperFormID').close();
                    }
       					/*
       					root.expand(null, null, function(){
                        	var values = Ext.util.JSON.decode(response.responseText);
                            var name = values[0].name;
                            var mid = values[0].id;
                        	var newNodeCfg = {                                
                                text : mname,
                                id   : ,
                                leaf : true
                            }
                            var newNode = root.insert(newNodeCfg, root.firstChild);                                                                                                                                              
                        }, this);
                        //mname.setValue('');*/
	            });
	        }
	  }]
	});

	var createWindow = new Ext.Window({
		id: 'CreateDeveloperFormID',
		frame:false,
		title:'Add new Develoer',
		width:330,
		closable: true,
		items: addForm
	}); 
	createWindow.show();
};


var createEditForm = function(id,mname)
{
	var EditForm = new Ext.FormPanel({
	  url: 'developer/createdeveloper?operation=update&id='+id,
	  method: 'GET',
	  autoDestroy: true,
	  buttonAlign: 'center',
	  monitorValid:true,
	  items: [{
	          xtype: 'textfield',
	          id: 'name',
	          text: mname,
	          value: mname,
	          fieldLabel: 'name',
	          allowBlank:false,
	          anchor: '90%'
	  }],
	  buttons: [{
	        text: 'Update',
	        formBind:true,
	        handler: function() {
	            EditForm.getForm().submit({
	                waitTitle: 'please wait...',
	                waitMsg: 'wait...',
   	                success: function(form, action) {
       					Ext.Msg.alert('Status', 'Action is successfully.');
                        Ext.getCmp('developersID').getRootNode().reload();
                        Ext.getCmp('EditDeveloperFormID').close();
    				},
    				failure: function(form,action){
                        Ext.Msg.alert('Status', 'Action is failed:'+action.result.errormsg);
                        Ext.getCmp('EditDeveloperFormID').close();
                    }    				
	            });
	        }
	  }]
	});

	var createWindow = new Ext.Window({
		id: 'EditDeveloperFormID',
		frame:false,
		title:'Edit Develoer',
		width:330,
		closable: true,
		items: EditForm
	}); 
	createWindow.show();
};