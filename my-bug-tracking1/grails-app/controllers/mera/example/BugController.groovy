package mera.example
import grails.converters.JSON

class BugController {
    def scaffold = Bug
	def BugService
    def getbugs = {[Bug.list.findAllByAssignedTo(params.name)]}
	def getallbugs = {
		render BugService.GetAllBugs() as JSON
	}
	def getbugsbydeveloper = {
		render BugService.GetBugsByDeveloper(params) as JSON
	}
	def savebug = {
		render BugService.SaveBug(params) as JSON
	}
}
