/**
 * An Application
 *
 * @author    krozin
 * @copyright (c) 2011, "Mera NN"
 * @date      November 2011
 * @version   $Id$
 *
 **/

 var createBugAddForm = function(developerList)
{	
	//var my_values =  developerList;
	//var developerList =  [['Kirill Rozin'],['Oleg Korchagin']]
	var assignedTo = new Ext.form.ComboBox({
	    id: 'assignedTo',
	    fieldLabel: 'assignedTo',
	    hiddenName: 'assignedTo',
	    store: new Ext.data.SimpleStore({
	        fields: ['assignedTo'],
	        url: "developer/getalldevelopernames",
	        autoLoad: true
	        //data : developerList 
	    }),
	    displayField: 'assignedTo',
	    typeAhead: true,
	    mode: 'local',
	    triggerAction: 'all',
	    emptyText:'Choose name...',
	    selectOnFocus:true
	});
	
	var addForm = new Ext.FormPanel({
	  url: 'bug/savebug?operation=create',
	  method: 'GET',
	  autoDestroy: true,
	  buttonAlign: 'center',
	  monitorValid:true,
	  items: [
	  	{     xtype: 'textfield',
	          id: 'number',
	          fieldLabel: 'number',
	          allowBlank:false,
	          anchor: '100%'
	    },
	    assignedTo,
   	  	{     xtype: 'datefield',
	          id: 'deadLine',
	          fieldLabel: 'Dead line',
	          allowBlank:false,
	          anchor: '100%'
	    },
   	  	{     xtype: 'textarea',
	          id: 'notes',
	          fieldLabel: 'Notes',
	          allowBlank:false,
	          anchor: '100%'
	    }
	  ],
	  buttons: [{
	        text: 'Add',
	        formBind:true,
	        handler: function() {
	            addForm.getForm().submit({
	                waitTitle: 'please wait...',
	                waitMsg: 'wait...',	                
	                success: function(form, action) {
       					Ext.Msg.alert('Status', 'Action is successfully.');
       					Ext.getCmp('CreateBugFormID').close();
       					Ext.getCmp('bugsListIDs').getStore().reload();
    				},
    				failure: function(form,action){
                        Ext.Msg.alert('Status', 'Action is failed:'+action.result.errormsg);
                    }
	            });
	        }
	  }]
	});

	var createWindow = new Ext.Window({
		id: 'CreateBugFormID',
		frame:false,
		title:'Add new Bug',
		width:330,
		closable: true,
		items: addForm
	}); 
	createWindow.show();
};


var createBugEditForm = function(bug)
{
	//if (!bug)
	var bug = Ext.getCmp('bugsListIDs').getSelectionModel().getSelected();
	console.info(bug.data)
    var assignedTo = new Ext.form.ComboBox({
        id: 'assignedTo',
        fieldLabel: 'assignedTo',
        hiddenName: 'assignedTo',
        store: new Ext.data.SimpleStore({
            fields: ['assignedTo'],
            url: "developer/getalldevelopernames",
            autoLoad: true
            //data : developerList 
        }),
        displayField: 'assignedTo',
        //typeAhead: true,
        //mode: 'local',
        triggerAction: 'all',
        //emptyText:bug.data.assignedTo,
        text: bug.data.assignedTo,
        value: bug.data.assignedTo,
        selectOnFocus:true
    });	   
	var EditForm = new Ext.FormPanel({
	  url: 'bug/savebug?operation=update&id='+bug.data.id,
	  method: 'GET',
	  autoDestroy: true,
	  buttonAlign: 'center',
	  items: [
        {
            xtype: 'textfield',
            id: 'number',
            text: bug.data.number,
            value: bug.data.number,
            fieldLabel: 'number',
            readOnly: true,
            anchor: '90%'
        },
        assignedTo,
        {     xtype: 'datefield',
              id: 'deadLine',
              fieldLabel: 'Dead line',
              value: bug.data.deadLine,
              allowBlank:false,
              anchor: '100%'
        },
        {     xtype: 'textarea',
              id: 'notes',
              fieldLabel: 'Notes',
              value: bug.data.notes,
              allowBlank:false,
              anchor: '100%'
        }
	  ],
	  buttons: [{
	        text: 'Update',
	        handler: function() {
	            EditForm.getForm().submit({
	                waitTitle: 'please wait...',
	                waitMsg: 'wait...',
	                success: function(form, action) {
       					Ext.Msg.alert('Status', 'Action is successfully.');
       					Ext.getCmp('EditDeveloperFormID').close();
       					Ext.getCmp('bugsListIDs').getStore().reload();
	                },
	                failure: function(form,action){
	                   Ext.Msg.alert('Status', 'Action is failed:'+action.result.errormsg);
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