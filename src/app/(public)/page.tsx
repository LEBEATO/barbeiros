import { existsSync } from "node:fs";
import path from "node:path";
import PublicPage from "@/components/PublicPage";
export default function Page() {
  return (
    <PublicPage
      video={existsSync(
        path.join(process.cwd(), "public/videos/barber-hero.mp4"),
      )}
    />
  );
}
