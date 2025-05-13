"use client";
import { useRouter } from 'next/navigation';

const AppPage = () => {
    const router = useRouter();
    return router.push("/auth");
}

export default AppPage