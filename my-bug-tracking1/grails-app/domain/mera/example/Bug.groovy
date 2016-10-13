package mera.example

class Bug { 
    Developer assignedTo
    String number
    Date createDate
    Date deadLine
    String notes
    static constraints = {
		assignedTo(blank: false)
		number(blank: false)
        createDate(blank: false)
        deadLine(blank: false)
        notes(blank: false)
    }
}
