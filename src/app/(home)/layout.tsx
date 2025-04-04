"use server"

import { Footer } from "./components/footer"

type LayoutProps = {
    children?: React.ReactNode
}
export default async function HomeLayout({ children }: LayoutProps) {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    );
}
