/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-03-04 20:16:35
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-03-04 20:56:01
 * @FilePath: \react-100\src\app\Hooks\miniRc\index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
const Didact = {
    createElement,
    render
}

function render(element, container) {
    const dom =
        element.type === 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(element.type);

    const isProperty = (key) => key !== 'children';
    Object.keys(element.props).filter(isProperty).forEach(name => {
        dom[name] = element.props[name];
    })

    element.props.children.forEach((child) => {
        render(child, dom);
    }
    )

    container.appendChild(dom);
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                typeof child === "object"
                    ? child
                    : createTextElement(child)
            }),
        },
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}


/** @jsx Didact.createElement*/
// const element = (
//     <div id="foo">
//         <a href="">bar</a>
//         <b></b>
//     </div>
// )
const element = {
    type: 'div',
    props: {
        id: 'foo',
    }
}

const container = document?.getElementById('root')
// eslint-disable-next-line react/no-deprecated
Didact.render(element, container)

