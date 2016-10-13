package mera.example
class Developer {
    String name
    static hasMany = [bugs: Bug]
    String toString(){
        return name
    }
}


