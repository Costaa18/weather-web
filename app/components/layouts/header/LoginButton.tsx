import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from 'next/navigation';

export default function LoginButton() {
    // const [hasSession, setHasSession] = useState(false);
    const router = useRouter();
    /*
    async function checkSession() {
        const session = await checkCookie("session");
        setHasSession(session);
        return session;
    }

    useEffect(() => {
        checkSession();
    }), [hasSession];
    */
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={() => (router.push("/login"))} variant="outline" size="icon">
                            <LogIn />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Log In
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}