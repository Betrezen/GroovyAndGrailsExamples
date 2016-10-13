package mera.example
import grails.converters.JSON

class DeveloperController {
	def scaffold = Developer
	def DeveloperService
	def loaddeveloperlist =  {		
		if (DeveloperService.getnode(params)[1] == "root")
			render DeveloperService.GetDeveloperList(params) as JSON
		else
			render params as JSON
		//render {id:0, text:"a", leaf: "false", children:[{}]} as JSON
	}

	def getdeveloperlist = {
		render DeveloperService.GetDeveloperList(params) as JSON
	}

	
	def getbuglistbydeveloperid = {
		render DeveloperService.GetBugListByDeveloperID(params) as JSON
	}
	def getalldevelopernames = {
		render DeveloperService.GetAllDeveloperNames() as JSON
	}
	
	def getnamebyid = {
		render DeveloperService.GetNameByID(params) as JSON
	}
	
	def createdeveloper = {
		render DeveloperService.SaveDeveloper(params) as JSON
		//return DeveloperService.SaveDeveloper(params)
	}
}