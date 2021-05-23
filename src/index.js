import TinyReact from "./TinyReact"

const virtualDOM = (
  <div className="container">
    <h1>你好 我是虚拟DOM</h1>
    {
        1 === 2 && <h1>布尔值节点</h1>
    }
  </div>
)

console.log(JSON.stringify(virtualDOM));
