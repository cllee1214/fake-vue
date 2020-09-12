
let uid = 0
class Dep {
  static target = null
  constructor() {
    this.uid = uid++
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  notify () {
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update()
    }
  }
  depend () {
    if(Dep.target){
      let watcher = Dep.target
      watcher.addDep(this)
    }
  }
}

export default Dep