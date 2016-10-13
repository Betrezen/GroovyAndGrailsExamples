package mera.example

class DeveloperService {

    static transactional = true
    def serviceMethod() {
    }

	def getnode(params){
		String ttype = "root"
		if (params.get("node") != "tekID")
			ttype = "node"
		return [params.get("node"),ttype]
	}

	def GetDeveloperList = {params ->
		//def devList = (Developer.getAll().each{[id:it.id.toString()]})
		//def devList = (Developer.getAll())
		//render devList as JSON
		//def devJList = devList.collect{[id:it.id.toString(),text:it.name, leaf: "true"]}
		//render devJList as JSON
		return (Developer.getAll()).collect{[id:it.id.toString(),text:it.name, leaf: "true"]}
	}
	
	def GetBugListByDeveloperID = {params ->
		return Developer.get(getnode(params)[0]).getAt("bugs")
	}
	
	def GetAllDeveloperNames = {
		return (Developer.getAll()).collect{[it.name]}
	}
	
	def GetNameByID = {params ->
		//println Developer.get(getnode(params)[0]).name
		return Developer.get(getnode(params)[0]).collect{[id:it.id.toString(), name:it.name]}
	}
	
	def SaveDeveloper = {params ->
		def name = params.getAt('name')
		def iid = params.getAt('id')
		def action =params.getAt('operation')
		println name
		println iid
		println action
		if (name && action=='create'){
			if(Developer.findWhere(name: name))
				return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Developer already exists']
			Developer newDev = new Developer();
			newDev.name = name
			newDev.save()
			return ['success':true]
		}
		else if(iid && name && action=='update'){
			if(!(Developer.exists(iid)))
				return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Developer doesnt exist']
			def fdev = Developer.get(iid)
			def otherdev = Developer.findWhere(name: name)
			if (fdev && otherdev && fdev != otherdev)
				return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Developer with the same name exists in system']
			fdev.name = name
			fdev.save()
			return ['success':true]
		}
		return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Invalid action']
	}
}
