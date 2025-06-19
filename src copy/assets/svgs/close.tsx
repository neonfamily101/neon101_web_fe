import clsx from 'clsx';

export default function Close({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" className={clsx('block h-8 w-8', className)} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
}