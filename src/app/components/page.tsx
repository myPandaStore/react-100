
'use client'
import Link from 'next/link'
import { works } from '../works'
import { usePathname } from 'next/navigation';
import { useTitle } from '../Hooks/index';

export default function Page() {
    const pathname = usePathname();
    const no = pathname.split('/')[1]
    const index = works.findIndex((work) => work.no === no)
    const work = works[index]
    const prev = works[index - 1]
    const next = works[index + 1]

    useTitle(work ? `${no}. ${work.name}` : '404')

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