
'use client'
import Link from 'next/link'
import { Router, Route, } from 'react-router'
import { works } from '../works'
import { useEffect, useRef } from 'react'
// import { useLocation } from 'react-router-dom';

// console.log(Route, 'Route')
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    useEffect(() => {
        // 这里的代码将在组件挂载到DOM后执行，确保是在客户端
        console.log(router.pathname);
        console.log(router.query);
    }, [router.isReady]); // 只有在router.isReady变化时才会执行


    // // const router = useRouter();

    // // 如果路由器还没有准备好，可以返回加载状态或null
    // if (!router.isReady) {
    //     // 这里可以放置一个加载指示器或返回null
    //     return null; // 或者 <LoadingIndicator />
    // }

    // // 一旦路由器准备好了，就可以安全地访问路由信息
    // console.log(router.pathname); // 现在的路径名
    // console.log(router.query);    // 路由的查询参数
    return (
        <div className="paper">
            <div className="bottom-nav">
                <span>prev.name</span>
                <span>prev.no</span>
                <span>work.name</span>
                <span>work.no</span>
                <span>next.name</span>
                <span>next.no</span>
                <span>work.date</span>
            </div>
            <div className="nav cursor-pointer">
                <Link href={'/'}>
                    &lt;
                </Link>
            </div>
            <div className="slot"></div>
        </div>
    )
}