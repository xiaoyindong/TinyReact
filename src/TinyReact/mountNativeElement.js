import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, container) {
    // 将虚拟dom转换成真实的对象
    let newElement = createDOMElement(virtualDOM);
    // 将转换之后的DOM对象放在页面中
    container.appendChild(newElement);
}