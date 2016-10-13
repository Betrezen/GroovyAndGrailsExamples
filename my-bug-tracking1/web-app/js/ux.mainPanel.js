/**
 * An Application
 *
 * @author    krozin
 * @copyright (c) 2011, "Mera NN"
 * @date      November 2011
 * @version   0.1
 *
 **/

var mainPanel = Ext.extend( Ext.Panel,{
	xtype: 'mainPanel', 
    renderTo: Ext.getBody(),
    width: 1000,
    height: 600,
    title: 'bugtracking system',
    layout: 'border',
    split: true,   
    initComponent: function(){
    	this.items = [
    		{
        	region : 'center',				
			id :	'bugsListIDs',
			title:  'buglist',
			frame : true,
			split: true,
			autoScroll : true,
			width: 600,
		    height:500,
		    minSize: 50,
		    maxSize: 250},
			{
			region: 'west',
		   	id :	'developersID',
		   	xtype: 'developersID',
		   	title:  'developers',
		   	frame : true,
		   	split: true,
		   	collapsed: false,
		    autoScroll : true,		   	
		    width: 200,
		    height:500,
		    minSize: 50,
		    maxSize: 250
		    }];
    	mainPanel.superclass.initComponent.call(this);
    	}
});

Ext.reg('mainPanel', mainPanel);