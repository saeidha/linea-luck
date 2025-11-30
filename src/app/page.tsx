import { ClaimSection } from "@/components/claim-section";
import { Header } from "@/components/layout/header";
import { AtbIcon, LineaIcon } from "@/components/icons";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <LineaIcon width={64} height={64} className="text-primary" />
            <span className="text-4xl font-bold text-foreground/50">+</span>
            <AtbIcon className="w-16 h-16 text-accent" />
          </div>
          <ClaimSection />
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-muted-foreground">
        Connect your wallet on the Linea network to participate.
      </footer>
    </div>
  );
}
