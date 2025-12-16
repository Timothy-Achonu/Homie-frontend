import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { GoogleIcon } from "@/components/svgs";
export function GoogleSignin() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 shadow-xs border-none text-3xl py-4 h-auto"
    >
      <GoogleIcon />
      <Typography tag="span" variant="text-md" color="gray-500" fontWeight="medium">
        Google
      </Typography>
    </Button> 
  );
}
   