import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

const Sidebar = () => {
    return (
        <Card className={'w-full max-w-xs h-full bg-zinc-900/40 !rounded-[10px]'}>
            <CardHeader>
                <CardTitle>Your Library</CardTitle>
                <CardAction>
                    <button className={'btn-ghost !p-0'}>
                        <Plus/>
                    </button>
                </CardAction>
            </CardHeader>
            <CardContent className={'px-2'}>
                <Card className={'!rounded-[10px]'}>
                    <CardHeader>
                        <CardTitle>Create your playlists</CardTitle>
                        <CardDescription>
                            It's easy to create your own playlists.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <button className={'btn !py-2'}>
                            create playlist
                        </button>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    )
};

export default Sidebar;