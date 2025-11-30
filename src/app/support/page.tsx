
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Support</h1>
        <div className="w-full max-w-md mb-8">
          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-left block mb-2">
                Name
              </Label>
              <Input id="name" type="text" placeholder="Your Name" />
            </div>
            <div>
              <Label htmlFor="family" className="text-left block mb-2">
                Family
              </Label>
              <Input id="family" type="text" placeholder="Your Family Name" />
            </div>
            <div>
              <Label htmlFor="email" className="text-left block mb-2">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Your Email" />
            </div>
            <div>
              <Label htmlFor="message" className="text-left block mb-2">
                Message
              </Label>
              <Textarea id="message" placeholder="Your Message" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
