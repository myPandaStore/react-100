/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-05 08:46:14
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-05 08:50:21
 * @FilePath: \react-100\src\app\utils\load.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export function load(url: string) {
    return new Promise<void>((resolve) => {
        if (document.head.querySelector(`script[src="${url}"]`))
            return resolve()

        const script = document.createElement('script')
        script.src = url
        script.onload = () => resolve()
        document.head.appendChild(script)
    })
}