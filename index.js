class Mvvm{
    constructor(options){
        this.$data = options.data;
        this.$options = options;
      
        if(options.el){
            let node =  this.isElement(options.el) ? options.el :document.querySelector(options.el)
            this.$el = node
            const fragMent = this.compileFragment(node,this)
            this.$el.appendChild(fragMent)
        } 
    }
    isElement(node){
        return node.nodeType==1
    }
    compileFragment(node,that){
        let firstChild,
        fragMent = document.createDocumentFragment()
        while(firstChild = node.firstChild){
            fragMent.appendChild(firstChild)
        }
        return fragMent
    }
}