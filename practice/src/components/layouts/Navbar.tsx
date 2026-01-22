import { ModeToggle } from "../theme-provider/mode-toggler";

export default function Navbar() {
    return (
        <div className="container mx-auto flex items-center justify-between py-4">
            <h1 className="text-[20px] font-bold">Redux</h1>
            <ModeToggle />
        </div>
    );
}
