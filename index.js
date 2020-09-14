
const compileUtil={
    text(){

    },
    html(node,value,vm,eventName){
        debugger;
    }
}
class Mvvm{
    constructor(options,vm){
        this.$data = options.data;
        this.$options = options;
        this.vm = vm
        if(options.el){
            let node =  this.isElement(options.el) ? options.el :document.querySelector(options.el)
            this.$el = node
            const fragMent = this.compileFragment(node,this)
            this.compile(fragMent)
            this.$el.appendChild(fragMent)
        } 
    }
    compile(fragMent){
        const childNodes = fragMent.childNodes;
        [...childNodes].forEach((child)=>{
            // 如果是元素
            if(this.isElement(child)){
                this.compileElement(child)
            }else{
                this.compileText(child)
            }
            if(child.childNodes && child.childNodes.length){
                this.compile(child)
            }
        })
    }
    compileElement(node){
        let attributes = node.attributes;
        [...attributes].forEach(attr=>{
            const {name,value} = attr  // v-html="obj.name"
            if(this.isDirective(name)){// 是不是指令
                const [,directive] = name.split('v-')   //v-text v-html v-model v-on:click    => text ,html,model on:click
                const[dirName,eventName] = directive.split(':')
                compileUtil[dirName](node,value,this,eventName)
            }else{

            }
        })
    }
    
    compileText(node){

    }
    isDirective(name){
        return name.startsWith('v-')
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