import { ConnectWallet } from "@/components/connect-wallet";
import { AtbIcon } from "@/components/icons";
import Link from "next/link";

export function Header() {
  return (
    <header className="p-4 border-b border-white/10">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
            <AtbIcon className="w-8 h-8 text-accent"/>
            <h1 className="text-2xl font-bold text-foreground">
                Linea Luck
            </h1>
            <Link href="/support" className="text-lg font-medium text-foreground hover:text-accent">
                Support
            </Link>
        </div>
        <ConnectWallet />
      </nav>
    </header>
  );
}
