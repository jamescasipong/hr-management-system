import { Footer } from "./components/footer"

type LayoutProps = {
    children?: React.ReactNode
}
export default function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    );
}
