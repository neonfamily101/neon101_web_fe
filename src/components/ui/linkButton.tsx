interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
}

export default function LinkButton({ children, ...props }: LinkButtonProps) {
    return (
        <a href={props.href} className={props.className}>
            {children}
        </a>
    );
}