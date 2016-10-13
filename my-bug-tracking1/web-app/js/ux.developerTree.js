/**
 * An Application
 *
 * @author    krozin
 * @copyright (c) 2011, "Mera NN"
 * @date      November 2011
 * @version   $Id$
 *
 **/

var addDeveloper = function(ev){
	//var newname = Math.floor( Math.random( ) * (100+1) )
	var node;
	node = Ext.getCmp('developersID').getSelectionModel().getSelectedNode();
	if (!node)
		node = Ext.getCmp('developersID').getRootNode();
	var id = node.id;
	var isroot = node.isRoot;
	if (isroot)
		createAddForm();
}
var editDeveloperCallback = function(mid,name){
	createEditForm(mid,name);
}

var editDeveloper = function(ev){
	//console.info("This is editDeveloper");
	var node = Ext.getCmp('developersID').getSelectionModel().getSelectedNode();
	var id = node.id;
	var isroot = node.isRoot;
	var devname = node.attributes.text;
	if (!isroot){
		createEditForm(id,devname);
		/*
		Ext.Ajax.request({
	       	url: 'developer/getnamebyid',
	        method: 'GET',
	   	    success: function(response, opts){
	    		var values = Ext.util.JSON.decode(response.responseText);
	    		var name = values[0].name;
	    		var mid = values[0].id;
	    		this.editDeveloperCallback(mid, name);
	    	},
		    params: {node: node.id}
		});*/
	}
}

var deleteDeveloper = function(ev){
	//console.info("This is deleteDeveloper");
	var node = Ext.getCmp('developersID').getSelectionModel().getSelectedNode();
	var id = node.id;
	var isroot = node.isRoot;
	var devname = node.attributes.text
	if (!isroot){
   		Ext.Msg.show({
			title:'Delete',
			msg: 'Developer ['+devname+'] will be deleted. Are you sure?',
			buttons: Ext.Msg.YESNO,
			fn: function(buttonId,text){
				if (buttonId == 'yes')
					sendDeleteDevAjaxRequest(id,devname);
				//else
				//	console.info('CLICKtoNO')
				},
			animEl: 'elId',
			icon: Ext.MessageBox.QUESTION
		});		        
		var sendDeleteDevAjaxRequest = function(id,devname){		
			Ext.Ajax.request({
		       	url: 'developer/delete?id='+id,
		        method: 'GET',
		   	    success: function(response, opts){
		   	    	Ext.Msg.alert('Status', 'Developer has been deleted successfully.');
		   	    	root = Ext.getCmp('developersID').getRootNode();
		   	    	//root.remove(id);
		   	    	//root.expand();
                    root.reload();		   	    	
			    },
			    params: {node: node.id}
			});
		}
	}
}

var contextMenuActions = function(node, evtObj)
{
	//root  =  node.getOwnerTree().getRootNode()
	node.select();
	var ctxMenu = node.getOwnerTree().contextMenu;	
	if(!ctxMenu){
		Ext.MessageBox.alert("ctxMenu error");
	}
	ctxMenu.contextNode = node;
	var addItem = ctxMenu.getComponent('add');
	var editItem = ctxMenu.getComponent('edit');
	var deleteItem = ctxMenu.getComponent('delete');	
	addItem.disable();
	deleteItem.disable();
	editItem.disable();
	// VISIBILITY
	if (node.isRoot)
		addItem.enable();		
	else{
		addItem.disable();
		editItem.enable();
		deleteItem.enable();		
	}
	//ACTIONS
	if (node.isRoot){
		var action = 1;
	}
	ctxMenu.showAt(evtObj.getXY());
	evtObj.stopEvent();
};

var developerTree = Ext.extend(Ext.tree.TreePanel, {
	id: 'developersID',
	autoscroll:  true,
    loader: new Ext.tree.TreeLoader({
		url: 'developer/loaddeveloperlist',
		requestMethod: 'GET'}),
	root:{
        nodeType: 'async',
        text: 'TEK',		            
        id: 'tekID'
    },
    contextMenu: new Ext.menu.Menu({
    	items: [{itemId: 'add', text:'Add Developer', handler: addDeveloper},
    			{itemId: 'edit', text: 'Edit Developer', handler: editDeveloper},
    			{itemId: 'delete', text:'Delete Developer', handler: deleteDeveloper}],
    	id: "contextMenuID"
    }),
    listeners:{
    	contextmenu: contextMenuActions,
		click: function(node, e){           	 
       		renderTo: Ext.getBody();
       		handler: getBugsbyDeveloperID.createCallback(node.id);
			if (node.isRoot)
	    		getBugsbyDeveloperID(0);
    		else if (node.leaf)
        		getBugsbyDeveloperID(node.id);
	   	}
    },
	initComponent: function(){				
				developerTree.superclass.initComponent.call(this);
	}    
});

Ext.reg('developersID', developerTree);