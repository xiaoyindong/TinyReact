export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
    if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
        // 更新DOM节点内容
        oldDOM.textContent = virtualDOM.props.textContent;
        // 更新老的虚拟DOM
        oldDOM._virtualDOM = virtualDOM;
    }
}