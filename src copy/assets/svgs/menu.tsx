import clsx from 'clsx';

export default function Menu({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" className={clsx('block h-8 w-8', className)} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    );
}