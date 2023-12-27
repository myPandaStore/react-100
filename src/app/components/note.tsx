import { usePathname } from 'next/navigation';
import { useState } from 'react'

export default function Note({ children = null }: { children?: JSX.Element | null }): JSX.Element {
    const pathname = usePathname();
    const no = pathname.split('/')[1]
    const link = 'https://github.com/myPandaStore/react-100/tree/master/src/app/' + no + '/page.tsx'
    const [active, setActive] = useState<boolean>(false)
    const computedContentClass =
        active
            ? 'content fixed left-1/2 max-w-screen-md  pointer-events-auto -translate-x-1/2 translate-y-0'
            : 'content fixed left-1/2 max-w-screen-md  pointer-events-none -translate-x-1/2 translate-y-full transition-all duration-1000 ease-in-out'

    return (
        <div className="note ">
            <div
                style={{ width: '400px', minHeight: '100px' }}
                className={computedContentClass}>
                {children}
                <br />
                <a
                    href={link}
                    style={{fontSize: 'unset'}}
                    className="link">
                    source
                </a>
            </div>
            <div
                className="handle cursor-pointer fixed bottom-0 right-1/2 translate-x-1/2"
                onClick={() => setActive(!active)}
            >i
            </div>
        </div>
    )
}