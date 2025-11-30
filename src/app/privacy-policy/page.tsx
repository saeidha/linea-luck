import { AtbIcon } from "@/components/icons";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="flex items-center gap-3 mb-8">
            <AtbIcon className="w-8 h-8 text-accent"/>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        <div className="w-full max-w-2xl text-left space-y-6">
          <p>
            Welcome to Linea Luck! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our decentralized application (dApp) operating on the Linea blockchain.
            By using our dApp, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Data Collection</h2>
          <p>
            **Blockchain Interactions:** We primarily interact with your public blockchain address. All transactions on the Linea blockchain are public and immutable. We do not collect or store your private keys.
          </p>
          <p>
            **Wallet Connection:** When you connect your Web3 wallet (e.g., MetaMask), we access your public wallet address to facilitate transactions and interactions with our dApp. We do not have access to your seed phrase or private keys.
          </p>
          <p>
            **Usage Data:** We may collect information on how the dApp is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our dApp that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of Data</h2>
          <p>
            Linea Luck uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>To provide and maintain our dApp</li>
            <li>To notify you about changes to our dApp</li>
            <li>To allow you to participate in interactive features of our dApp when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To monitor the usage of our dApp</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Disclosure of Data</h2>
          <p>
            We may disclose your Personal Data in the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of Linea Luck</li>
            <li>To prevent or investigate possible wrongdoing in connection with the dApp</li>
            <li>To protect the personal safety of users of the dApp or the public</li>
            <li>To protect against legal liability</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. You are responsible for safeguarding your own wallet and private keys.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Rights</h2>
          <p>
            As a user of a decentralized application, many of your interactions are recorded on a public blockchain. This provides transparency and immutability. You have the right to manage your own wallet and the assets within it. For any data we may store off-chain (e.g., Usage Data), you may have rights under applicable data protection laws.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our <Link href="/support" className="text-accent hover:underline">Support Page</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
