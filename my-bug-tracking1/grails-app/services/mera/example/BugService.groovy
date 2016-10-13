package mera.example

import java.text.DateFormat

class BugService {
    static transactional = true
    def serviceMethod() {
    }
	def GetAllBugs(){
		return (Bug.getAll()).collect{[	id:it.id,number:it.number.toString(),
										createDate:it.createDate,deadLine: it.deadLine,
										notes:it.notes.toString(), assignedTo:it.assignedTo.name]}
	}
	def GetBugsByDeveloper(params){
		//def buglist = Bug.getAll()
		//def sbuglist = buglist.each{assignedTo.id}
		def DID = params.get("devid")
		if (DID == 'undefined')
			return GetAllBugs()
		Developer tdev=Developer.get(params.get("devid"))
		return (Bug.findAllWhere(assignedTo: tdev)).collect{[id:it.id,number:it.number.toString(),
										createDate:it.createDate,deadLine: it.deadLine,
										notes:it.notes.toString(), assignedTo:it.assignedTo.name]}
	}
	def SaveBug(params){
		Date today = new Date()
		//def createDate = today.time
		def dtime = new Date().parse("MM/dd/yyyy", params.get('deadLine'))
		//def deadLine = dtime.time		
		def number=params.get('number')
		def assignedTo = Developer.findWhere(name: params.get('assignedTo'))
		def notes=params.get('notes')
		def bugexist = Bug.findWhere(number: number)
		if (params.get('operation') == 'update' && !bugexist)
			return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Bug doesnt exist']
		else if (params.get('operation') == 'create' && bugexist)
			return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Bug exists']
		if (today && dtime && number && assignedTo && notes){
			if (params.get('operation') == 'create'){
				def mybug=new Bug()
				mybug.number = number
				mybug.assignedTo = assignedTo
				mybug.createDate = today; //createDate
				mybug.deadLine = dtime
				mybug.notes = notes
				mybug.save()
			}
			else{
				bugexist.assignedTo = assignedTo
				bugexist.deadLine = dtime
				bugexist.notes = notes
				bugexist.save()
			}
			return ['success':true]
		}
		return ['success':false, 'failureType':'SERVER_INVALID','errormsg':'Error happens']
	}
}
