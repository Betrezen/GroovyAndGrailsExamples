/**
 * An Application
 *
 * @author    krozin
 * @copyright (c) 2011, "Mera NN"
 * @date      November 2011
 * @version   $Id$
 *
 **/
 
/*
 for (var i in bugListByDeveloper){
    console.info(bugListByDeveloper[i].number);
}
*/
var addbug = function(){
	createBugAddForm();
}

var editbug = function(bugid){
    createBugEditForm(bugid);
    //console.info(Ext.getCmp('bugsListIDs').getStore().data.item(bugid));
}
var deletebug = function(){
	Ext.Msg.show({
    	title:'Delete',
    	msg: 'Bug will be deleted. You sure?',
    	buttons: Ext.Msg.YESNO,
    	fn: function(buttonId,text){
    		if (buttonId == 'yes'){
    			var bug = Ext.getCmp('bugsListIDs').getSelectionModel().getSelected(); 
	   			sendDeleteBugAjaxRequest(bug.data.id);
	   		}
    	}
	});
	var sendDeleteBugAjaxRequest = function(id){		
		Ext.Ajax.request({
	       	url: 'bug/delete?id='+id,
	        method: 'GET',
	   	    success: function(response, opts){
	   	    	Ext.Msg.alert('Status', 'Bug has been deleted successfully.');
	   	    	Ext.getCmp('bugsListIDs').getStore().reload();
		    },
		    failure: function(response, opts){
		        Ext.Msg.alert('Status', 'Error happens.');
		    }
		});
	}
	
};

var contextMenuBugsActions = function(evtObj){
	var ctxMenu = Ext.getCmp('contextMenuBugsID');	
	if(!ctxMenu){
		Ext.MessageBox.alert("ctxMenu error");
	}
	var addItem = ctxMenu.getComponent('add');
	var editItem = ctxMenu.getComponent('edit');
	var deleteItem = ctxMenu.getComponent('delete');
	// VISIBILITY
	addItem.enable();
	editItem.enable();
	deleteItem.enable();
	ctxMenu.showAt(evtObj.getXY());
	evtObj.stopEvent();
};

var myfields = [
         { name: "id", 	       type: "int"},
         { name: "number",     type: "string"},
         { name: "assignedTo", type: "string"},
         { name: "createDate", type: "date"},
         { name: "deadLine",   type: "date"},
         { name: "notes",      type: "string"}
];

var cm = new Ext.grid.ColumnModel({
        columns:[
         { header: "id", dataIndex: "id", width: 40},
         { header: "number", dataIndex: "number", width: 60 },
         { header: "assignedTo", dataIndex: "assignedTo", width: 100 },
         { header: "createDate",   dataIndex: "createDate", width: 100},
         { header: "deadLine",   dataIndex: "deadLine", width: 100},
         { header: "notes",   dataIndex: "notes", width: 500}
        ],
        defaults: {
    		sortable: true,
    		//menuDisabled: true,
    		width: 100
        }
});

var getJsonProxy = function(devid){
    var proxy = new Ext.data.HttpProxy({
        method: 'GET',
        prettyUrls: false,
        url: 'bug/getbugsbydeveloper?devid='+devid, // see options parameter for Ext.Ajax.request
        api: {
            // all actions except the following will use above url
            create  : 'bug/savebug?operation=create',
            update  : 'bug/savebug?operation=update'
        }
    });
    return proxy;
};

var getJsonWriter = function(){
    var writer = new Ext.data.JsonWriter({
        encode: true,
        writeAllFields: true // write all fields, not just those that changed
    });
	return writer
}

var getJsonReader = function(){
     JsonReader = new Ext.data.JsonReader({
        idProperty: 'id',
        fields: myfields
     });
     return JsonReader;
};	

var getStore  = function(buglist,devid){
    reader = this.getJsonReader(devid);
    proxy = this.getJsonProxy(devid);
    writer = this.getJsonWriter();
    store = new Ext.data.Store({
       id: 'store',
       reader: reader,
       writer: writer,
       proxy: proxy,
       //url: 'bug/getbugsbydeveloper?id='+devid,
       //data: buglist,
       autoLoad: true
       //remoteSort: true
    });   
    return store;
};

var getGrid = function(buglist,devid){
  	var ct = Ext.getCmp('bugsListIDs').body;
	var pluginFormId = Ext.id();
	ct.update(String.format('<div id="{0}"/>', pluginFormId));
    store = this.getStore(buglist,devid);
    var grid = new Ext.grid.GridPanel({
    	id: 'bugsListIDs',
    	renderTo:pluginFormId,
    	autoHeight: true,
    	autoWidth: true,
    	store: store,
    	cm: cm,
	    contextMenu: new Ext.menu.Menu({
    		items: [{itemId: 'add', text:'add', handler: addbug},
    				{itemId: 'edit', text:'edit', handler: editbug},
    				{itemId: 'delete', text:'delete', handler: deletebug}],
    		id: "contextMenuBugsID"
    	}),
	    listeners:{
	    	contextmenu: contextMenuBugsActions	    	
	    }
    });
    Ext.reg('bugsListIDs', grid)
    return grid;    
};

var getNodeID = function() {
	var node = Ext.getCmp('developersID').getSelectionModel().getSelectedNode();
	if (node){
		var id = node.id;
		var isroot = node.isRoot;
		if (isroot)
			return [id,'root'];
		return [id,'node']
	}
	return [-1,'none'];
}

var callbackGetBugs = function (buglist,devid){
	//var g = Ext.getCmp('bugsListIDs')
	//if (g){g.destroy();}
	getGrid(buglist,devid);
}

var getBugsbyDeveloperID = function(nodeid){	
	var id;
	var node;
	var isroot;
	var bugListByDeveloper;
	if (nodeid==0 || !nodeid){
		//node = Ext.getCmp('developersID').getSelectionModel().getSelectedNode();
		//if (node == null)
			node = Ext.getCmp('developersID').getRootNode();
	}
	else{
		node = Ext.getCmp('developersID').getNodeById(nodeid)	
	}
	id = node.id;
	isroot = node.isRoot;
	if (!isroot){
		Ext.Ajax.request({
			url: 'bug/getbugsbydeveloper',
			method: 'GET',
			success: function(response, opts){
				bugListByDeveloper =  Ext.decode(response.responseText);
				callbackGetBugs(bugListByDeveloper,id);
			},
			params: {devid: id}
		});
	}
	//get all?
	else{				
		Ext.Ajax.request({
			url: 'bug/getallbugs',
			method: 'GET',
			success: function(response, opts){
				bugListByDeveloper =  Ext.decode(response.responseText);				
				callbackGetBugs(bugListByDeveloper);
			},
			params: {devid: id}
		});
	}
	//return bugListByDeveloper;
};
Ext.onReady(function(){
	//loadOldgrid();
	getBugsbyDeveloperID(0);
});

